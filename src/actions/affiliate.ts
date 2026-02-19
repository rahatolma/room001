'use server';

// Mock Affiliate Configuration
const AFFILIATE_NETWORKS = {
    TRENDYOL: {
        baseUrl: 'https://ty.gl/affiliate_id', // Mock
        param: 'ref=room001'
    },
    HEPSIBURADA: {
        baseUrl: 'https://app.hps.im/d7ct/mock',
        param: 'utm_source=affiliate&utm_campaign=room001'
    },
    GENERIC: {
        param: 'ref=room001'
    }
};

/**
 * Transforms a raw product URL into a monetizable affiliate link.
 * @param originalUrl The raw URL from the brand (e.g. zara.com/product/123)
 * @param curatorId The ID of the curator sharing the link (for attribution)
 */
export async function generateAffiliateLink(originalUrl: string, curatorId: string) {
    try {
        const url = new URL(originalUrl);

        // 1. Identify Network
        let network = 'GENERIC';
        if (url.hostname.includes('trendyol.com')) network = 'TRENDYOL';
        if (url.hostname.includes('hepsiburada.com')) network = 'HEPSIBURADA';

        // 2. Add Tracking Parameters
        // In a real scenario, we would use the Network's API (DeepLink Generator)
        // For now, we simulate this by appending parameters.

        const trackingParams = new URLSearchParams(url.search);
        trackingParams.set('utm_source', 'room001');
        trackingParams.set('utm_medium', 'affiliate');
        trackingParams.set('utm_campaign', curatorId); // Track which curator sold it

        // This is where the magic happens (Deep Linking)
        // e.g. https://trendyol.com/gomlek?utm_source=room001&curator=123

        url.search = trackingParams.toString();

        return url.toString();

    } catch (error) {
        // If URL is invalid, return original
        return originalUrl;
    }
}

/**
 * Calculates estimated commission for a sale
 * (This would normally come from the Affiliate Network Postback/Webhook)
 */
export function calculateCommission(saleAmount: number, brandCommissionRate: number = 0.10) {
    const totalCommission = saleAmount * brandCommissionRate;

    // Revenue Share Model
    const platformShare = 0.30; // We define 30% for platform logic here, though user said 3%? 
    // User said: "Biz %3 aliriz, %7 kuratore". Total 10%.
    // So Platform Share of Total Commission = 3 / 10 = 30%.

    const platformEarnings = totalCommission * platformShare;
    const curatorEarnings = totalCommission - platformEarnings;

    return {
        total: totalCommission,
        platform: platformEarnings,
        curator: curatorEarnings
    };
}
