"use server";

import * as cheerio from 'cheerio';
import prisma from "@/lib/prisma";
import { getSessionAction } from './auth';

export interface ScrapedProductData {
    title: string;
    image: string;
    brand: string;
    price?: number;
    currency?: string;
    url: string;
}

export async function scrapeProductUrl(url: string): Promise<{ success: boolean; product?: ScrapedProductData; error?: string }> {
    try {
        const user = await getSessionAction();
        if (!user) {
            return { success: false, error: 'Unauthorized' };
        }

        // Validate URL
        let validUrl;
        try {
            validUrl = new URL(url);
        } catch {
            return { success: false, error: 'Geçersiz URL formatı.' };
        }

        // Fetch the HTML content
        const response = await fetch(validUrl.href, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
            },
            next: { revalidate: 3600 } // Cache for 1 hour to prevent abuse
        });

        if (!response.ok) {
            return { success: false, error: 'Web sitesine ulaşılamadı. (HTTP Error)' };
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // Extract Open Graph Data
        const ogTitle = $('meta[property="og:title"]').attr('content');
        const ogImage = $('meta[property="og:image"]').attr('content');
        const ogSiteName = $('meta[property="og:site_name"]').attr('content');
        const ogDescription = $('meta[property="og:description"]').attr('content');

        // Fallbacks
        const title = ogTitle || $('title').text() || '';
        const image = ogImage || $('img').first().attr('src') || '';

        // Get Brand: Try OG site name, or domain name as fallback
        let brandName = ogSiteName;
        if (!brandName) {
            // e.g. "www.zara.com" -> "zara"
            const domainParts = validUrl.hostname.replace('www.', '').split('.');
            if (domainParts.length > 0) {
                brandName = domainParts[0].charAt(0).toUpperCase() + domainParts[0].slice(1);
            } else {
                brandName = "Bilinmeyen Marka";
            }
        }

        // Try to find price (very naive attempt for general sites)
        let price: number | undefined = undefined;
        let currency: string | undefined = undefined;

        // Look for standard schema.org product price
        const schemaPriceUrl = $('meta[property="product:price:amount"]').attr('content');
        const schemaCurrency = $('meta[property="product:price:currency"]').attr('content');

        if (schemaPriceUrl) {
            const p = parseFloat(schemaPriceUrl);
            if (!isNaN(p)) price = p;
        }
        if (schemaCurrency) {
            currency = schemaCurrency;
        }

        // If no explicit schema, try to regex the description or title (unreliable but helpful)
        if (!price && ogDescription) {
            const priceRegex = /([0-9.,]+)\s*(TL|TRY|\$|€)/i;
            const match = ogDescription.match(priceRegex);
            if (match) {
                const p = parseFloat(match[1].replace(',', '.')); // rudimentary replace
                if (!isNaN(p)) {
                    price = p;
                    currency = match[2];
                }
            }
        }

        if (!title || !image) {
            return { success: false, error: 'İlgili sayfada ürün bilgisi (başlık veya görsel) bulunamadı.' };
        }

        return {
            success: true,
            product: {
                title: title.trim(),
                image: image,
                brand: brandName?.trim() || 'Bilinmeyen Marka',
                price,
                currency: currency || 'TL',
                url: validUrl.href
            }
        };

    } catch (error: any) {
        console.error("Scraping error:", error);
        return { success: false, error: 'Ürün bilgileri çekilirken beklenmeyen bir hata oluştu.' };
    }
}

// Function to actually save the scraped product to the platform database
export async function saveExternalProduct(data: ScrapedProductData) {
    try {
        const user = await getSessionAction();
        if (!user) return { success: false, error: 'Unauthorized' };

        // 1. Check if the brand exists, if not, create a dummy one or associate with an 'External' generic brand
        let brandId = null;
        let brand = await prisma.brand.findFirst({
            where: { name: data.brand }
        });

        if (!brand) {
            // Create a stub brand
            brand = await prisma.brand.create({
                data: {
                    name: data.brand,
                    slug: data.brand.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.floor(Math.random() * 1000),
                    description: 'External brand created automatically from URL submission.',
                }
            });
        }
        brandId = brand.id;

        // 2. Check if product exists by URL
        const existingProduct = await prisma.product.findFirst({
            where: { productUrl: data.url }
        });

        if (existingProduct) {
            return { success: true, product: existingProduct };
        }

        // 3. Create the external product
        // We set commissionRate to 0 assuming external unpartnered products don't yield commission by default
        const newProduct = await prisma.product.create({
            data: {
                title: data.title,
                imageUrl: data.image,
                productUrl: data.url,
                price: data.price ? data.price : 0,
                brandId: brandId,
                category: null, // Unknown category
            }
        });

        const safeProduct = {
            ...newProduct,
            price: newProduct.price ? Number(newProduct.price) : 0
        };

        return { success: true, product: safeProduct };

    } catch (error) {
        console.error("Error saving external product", error);
        return { success: false, error: "Veritabanına kaydedilemedi." };
    }
}
