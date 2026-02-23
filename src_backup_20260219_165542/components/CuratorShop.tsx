"use client";

import React, { useState, useMemo } from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import ProductGrid from '@/components/ProductGrid';
import ShopSectionEditorModal from '@/components/ShopSectionEditorModal';
import { Pencil, Plus } from 'lucide-react';
import { createSection, updateSection } from '@/actions/sections';
import { toast } from 'sonner';

interface Product {
    id: string;
    image: string;
    brand: string;
    title: string;
    price: string;
    sectionId: string;
    category?: string;
    curator: {
        name: string;
        avatar: string;
    };
}

interface Section {
    id: string;
    title: string;
}

interface CuratorShopProps {
    profile: any;
    sections: Section[];
    products: any[];
    instagramPosts?: any[];
    tiktokPosts?: any[];
    theme?: {
        primaryColor: string;
        backgroundColor: string;
        fontFamily: string;
        buttonStyle: string;
    };
    isOwner?: boolean;
}

const THEME_COLORS: Record<string, string> = {
    black: '#000000',
    midnight: '#1e3a8a',
    emerald: '#059669',
    rose: '#be123c',
    purple: '#7e22ce',
    orange: '#ea580c',
};

export default function CuratorShop({ profile, sections, products, instagramPosts = [], tiktokPosts = [], theme, isOwner = false }: CuratorShopProps) {
    const [activeSection, setActiveSection] = useState<string>('all');
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [activePost, setActivePost] = useState<any>(null);

    // Editor State
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingSection, setEditingSection] = useState<any>(null);

    React.useEffect(() => {
        const handleSwitchIG = () => {
            setActiveSection('instagram');
            setActiveCategory('all');
            // Smooth scroll to nav content
            window.scrollTo({ top: 400, behavior: 'smooth' });
        };
        const handleSwitchTT = () => {
            setActiveSection('tiktok');
            setActiveCategory('all');
            // Smooth scroll to nav content
            window.scrollTo({ top: 400, behavior: 'smooth' });
        };
        window.addEventListener('switchToInstagram', handleSwitchIG);
        window.addEventListener('switchToTiktok', handleSwitchTT);
        return () => {
            window.removeEventListener('switchToInstagram', handleSwitchIG);
            window.removeEventListener('switchToTiktok', handleSwitchTT);
        }
    }, []);

    const getPostProducts = (post: any) => {
        if (!post || !post.productIds) return [];
        return products.filter(p => post.productIds.includes(p.id));
    };

    // Calculate Category Counts
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        products.forEach(p => {
            if (p.category) {
                counts[p.category] = (counts[p.category] || 0) + 1;
            }
        });
        return counts;
    }, [products]);

    // Filter Products
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSection = activeSection === 'all' || product.sectionId === activeSection;
            const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
            return matchesSection && matchesCategory;
        });
    }, [products, activeSection, activeCategory]);

    // Available Categories
    const categories = [
        "APPAREL", "MAKEUP", "SKINCARE", "FOOTWEAR",
        "COATS & OUTERWEAR", "BAGS & PURSES", "HAIRCARE",
        "SWIMWEAR", "EYEWEAR", "BATH & BODY", "JEWELRY"
    ];

    const formatProductsForGrid = (prods: any[]) => {
        return prods.map(p => ({
            ...p,
            curator: {
                name: profile.name.split(' ')[0],
                avatar: 'https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=100' // Fallback or real avatar
            }
        }));
    };

    const handleEditSection = (section: any, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingSection(section);
        setIsEditorOpen(true);
    };

    const handleAddSection = () => {
        setEditingSection(null);
        setIsEditorOpen(true);
    };

    const handleSaveSection = async (data: any) => {
        try {
            if (data.id) {
                // Update existing
                const result = await updateSection(data.id, data);
                if (result.success) {
                    toast.success('Bölüm güncellendi!');
                } else {
                    toast.error('Güncelleme başarısız oldu.');
                }
            } else {
                // Create new
                const result = await createSection(data);
                if (result.success) {
                    toast.success('Yeni bölüm oluşturuldu!');
                } else {
                    toast.error('Oluşturma başarısız oldu.');
                }
            }
        } catch (error) {
            console.error(error);
            toast.error('Bir hata oluştu.');
        } finally {
            setIsEditorOpen(false);
        }
    };

    if (activePost) {
        const postProducts = getPostProducts(activePost);
        return (
            <main style={{ backgroundColor: theme?.backgroundColor === 'white' ? 'white' : 'black', color: theme?.backgroundColor === 'white' ? 'black' : 'white', minHeight: '100vh', padding: '20px' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <button
                        onClick={() => setActivePost(null)}
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            fontSize: '0.9rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase',
                            marginBottom: 30, display: 'flex', alignItems: 'center', gap: 5
                        }}
                    >
                        ← Back
                    </button>

                    <div style={{ textAlign: 'center', marginBottom: 40 }}>
                        <h1 style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '2.5rem', fontWeight: 700, margin: '0 0 10px 0' }}>{activePost.caption}</h1>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>
                            <img src={profile.initials ? `https://ui-avatars.com/api/?name=${profile.initials}&background=random` : "https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=100"} alt="Avatar" style={{ width: 24, height: 24, borderRadius: '50%' }} />
                            <span>{profile.name}</span>
                            <span>|</span>
                            <span>{postProducts.length} Products</span>
                            <span>|</span>
                            <span>More on this collection</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 60 }}>
                        <div style={{ maxWidth: 500, width: '100%' }}>
                            <img src={activePost.imageUrl} alt="Post" style={{ width: '100%', borderRadius: 4 }} />
                        </div>
                    </div>

                    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                        <ProductGrid products={formatProductsForGrid(postProducts)} />
                    </div>
                </div>
            </main>
        );
    }

    const themeStyle = useMemo(() => {
        if (!theme) return {};

        const primaryColor = THEME_COLORS[theme.primaryColor] || theme.primaryColor;

        let borderRadius = '0px';
        if (theme.buttonStyle === 'rounded') borderRadius = '8px';
        if (theme.buttonStyle === 'pill') borderRadius = '50px';

        return {
            '--color-primary': primaryColor,
            '--font-primary': `var(--font-${theme.fontFamily})`,
            '--bg-primary': theme.backgroundColor === 'white' ? '#ffffff' : '#000000',
            '--text-primary': theme.backgroundColor === 'white' ? '#000000' : '#ffffff',
            '--btn-radius': borderRadius,
            fontFamily: `var(--font-${theme.fontFamily})`,
            backgroundColor: theme.backgroundColor === 'white' ? '#ffffff' : '#000000',
            color: theme.backgroundColor === 'white' ? '#000000' : '#ffffff',
        } as React.CSSProperties;
    }, [theme]);

    return (
        <main style={{ minHeight: '100vh', ...themeStyle }}>
            {/* Header Section */}
            <ProfileHeader
                name={profile.name}
                bio={profile.bio}
                avatarInitials={profile.initials}
                socialLinks={profile.socials}
            />

            {/* Sticky Navigation Bars */}
            <div style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: theme?.backgroundColor === 'white' ? 'white' : 'black', borderBottom: '1px solid #eee' }}>
                {/* Primary Nav (Sections) */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 15,
                    padding: '15px 0',
                    borderBottom: '1px solid #f0f0f0',
                    fontSize: '0.85rem',
                    color: '#333',
                    fontWeight: 500,
                    overflowX: 'auto',
                    whiteSpace: 'nowrap'
                }}>
                    <span
                        onClick={() => { setActiveSection('all'); setActiveCategory('all'); }}
                        style={{
                            border: activeSection === 'all' ? '1px solid var(--color-primary, black)' : '1px solid transparent',
                            borderRadius: '20px',
                            padding: '5px 15px',
                            cursor: 'pointer',
                            opacity: activeSection === 'all' ? 1 : 0.6
                        }}
                    >
                        Tümü
                    </span>

                    {sections.filter((s: any) => ['latest-finds', 'most-popular', 'fashion', 'beauty', 'baby', 'x-sofia'].includes(s.id)).map((section: any) => (
                        <div key={section.id} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <span
                                onClick={() => { setActiveSection(section.id); setActiveCategory('all'); }}
                                style={{
                                    border: activeSection === section.id ? '1px solid var(--color-primary, black)' : '1px solid transparent',
                                    borderRadius: '20px',
                                    padding: '5px 15px',
                                    cursor: 'pointer',
                                    opacity: activeSection === section.id ? 1 : 0.6
                                }}
                            >
                                {section.title}
                            </span>
                            {isOwner && (
                                <button
                                    onClick={(e) => handleEditSection(section, e)}
                                    style={{
                                        marginLeft: 4, padding: 4, background: '#f5f5f5', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}
                                >
                                    <Pencil size={12} color="#666" />
                                </button>
                            )}
                        </div>
                    ))}

                    <span
                        onClick={() => { setActiveSection('instagram'); setActiveCategory('all'); }}
                        style={{
                            border: activeSection === 'instagram' ? '1px solid var(--color-primary, black)' : '1px solid transparent',
                            borderRadius: '20px',
                            padding: '5px 15px',
                            cursor: 'pointer',
                            opacity: activeSection === 'instagram' ? 1 : 0.6
                        }}
                    >
                        Instagram
                    </span>

                    <span
                        onClick={() => { setActiveSection('tiktok'); setActiveCategory('all'); }}
                        style={{
                            border: activeSection === 'tiktok' ? '1px solid var(--color-primary, black)' : '1px solid transparent',
                            borderRadius: '20px',
                            padding: '5px 15px',
                            cursor: 'pointer',
                            opacity: activeSection === 'tiktok' ? 1 : 0.6
                        }}
                    >
                        Tiktok
                    </span>

                    {sections.filter((s: any) => !['latest-finds', 'most-popular', 'fashion', 'beauty', 'baby', 'x-sofia'].includes(s.id)).map((section: any) => (
                        <div key={section.id} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <span
                                onClick={() => { setActiveSection(section.id); setActiveCategory('all'); }}
                                style={{
                                    border: activeSection === section.id ? '1px solid var(--color-primary, black)' : '1px solid transparent',
                                    borderRadius: '20px',
                                    padding: '5px 15px',
                                    cursor: 'pointer',
                                    opacity: activeSection === section.id ? 1 : 0.6
                                }}
                            >
                                {section.title}
                            </span>
                            {isOwner && (
                                <button
                                    onClick={(e) => handleEditSection(section, e)}
                                    style={{
                                        marginLeft: 4, padding: 4, background: '#f5f5f5', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}
                                >
                                    <Pencil size={12} color="#666" />
                                </button>
                            )}
                        </div>
                    ))}

                    {/* Add Section Button (Owner Only) */}
                    {isOwner && (
                        <button
                            onClick={handleAddSection}
                            style={{
                                width: 32, height: 32, borderRadius: '50%', border: '1px dashed #ccc', background: 'transparent',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginLeft: 10
                            }}
                        >
                            <Plus size={16} color="#666" />
                        </button>
                    )}

                </div>

                {/* Secondary Nav (Categories with counts) */}
                {
                    activeSection !== 'instagram' && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 40,
                            padding: '12px 0',
                            fontSize: '0.7rem',
                            color: '#999',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            overflowX: 'auto',
                            whiteSpace: 'nowrap'
                        }}>
                            {categories.map(cat => {
                                const count = categoryCounts[cat] || 0;
                                if (count === 0) return null; // Hide empty categories

                                return (
                                    <span
                                        key={cat}
                                        onClick={() => setActiveCategory(cat === activeCategory ? 'all' : cat)}
                                        style={{
                                            color: activeCategory === cat ? 'var(--color-primary, black)' : '#999',
                                            fontWeight: activeCategory === cat ? 600 : 400,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {cat} {count}
                                    </span>
                                );
                            })}
                        </div>
                    )
                }
            </div >

            {/* Product Feed */}
            <div style={{ padding: '0 40px' }}>
                {activeSection === 'instagram' ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                        {instagramPosts?.map((post) => (
                            <div
                                key={post.id}
                                onClick={() => setActivePost(post)}
                                style={{
                                    aspectRatio: '1/1',
                                    backgroundColor: '#eee',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <img
                                    src={post.imageUrl}
                                    alt={post.caption}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                />
                            </div>
                        ))}
                        {instagramPosts?.length === 0 && (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 50, color: '#999' }}>
                                Henüz Instagram postu yok.
                            </div>
                        )}
                    </div>
                ) : (
                    filteredProducts.length > 0 ? (
                        <ProductGrid products={formatProductsForGrid(filteredProducts)} />
                    ) : (
                        <div style={{ textAlign: 'center', padding: 50, color: '#999' }}>
                            Bu kategoride henüz ürün yok.
                        </div>
                    )
                )}
            </div >

            {/* Editor Modal */}
            <ShopSectionEditorModal
                isOpen={isEditorOpen}
                onClose={() => setIsEditorOpen(false)}
                section={editingSection}
                onSave={handleSaveSection}
            />

        </main >
    );
}
