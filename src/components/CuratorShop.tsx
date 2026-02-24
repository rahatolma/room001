"use client";

import React, { useState, useMemo, useEffect } from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import ProductGrid from '@/components/ProductGrid';
import ShopSectionEditorModal from '@/components/ShopSectionEditorModal';
import { Pencil, Plus, Grip, Search, Link as LinkIcon, Edit2, ShoppingBag, Eye, Copy, Share2, Grid, Layers, List, BookmarkPlus, ChevronRight } from 'lucide-react';
import ImageFallback from './ImageFallback';
import { createSection, updateSection, deleteSection } from '@/actions/sections';
import { updateCollectionOrder } from '@/actions/admin';
import { toast } from 'sonner';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableNavItem } from './SortableNavItem';


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
    const [searchQuery, setSearchQuery] = useState('');

    // Editor State
    const [isEditMode, setIsEditMode] = useState(false); // New: Toggle for edit mode
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingSection, setEditingSection] = useState<any>(null);
    const [localSections, setLocalSections] = useState<Section[]>(sections);

    useEffect(() => {
        setLocalSections(sections);
    }, [sections]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = async (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setLocalSections((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);

                // Optimistic update of backend
                const updates = newItems.map((item, index) => ({
                    id: item.id,
                    displayOrder: index
                }));
                updateCollectionOrder(updates);

                return newItems;
            });
        }
    };


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
            const q = searchQuery.toLowerCase();
            const matchesSearch = !q || (product.title?.toLowerCase().includes(q) || product.brand?.toLowerCase().includes(q));

            return matchesSection && matchesCategory && matchesSearch;
        });
    }, [products, activeSection, activeCategory, searchQuery]);

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
                if (result.success && result.section) {
                    toast.success('Yeni bölüm oluşturuldu!');

                    // If there are pending products, add them now
                    if (data.pendingProducts && data.pendingProducts.length > 0) {
                        const { addProductToCollection } = await import('@/actions/catalog');
                        // Add sequentially for now
                        for (const product of data.pendingProducts) {
                            await addProductToCollection(result.section.id, product.id, product.customDetails);
                        }
                        toast.success(`${data.pendingProducts.length} ürün eklendi.`);
                    }
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

    const handleDeleteSection = async (id: string) => {
        try {
            const result = await deleteSection(id);
            if (result.success) {
                toast.success('Bölüm silindi.');
                setIsEditorOpen(false);
                setEditingSection(null);
                if (activeSection === id) {
                    setActiveSection('all');
                }
            } else {
                toast.error('Silme başarısız oldu.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Bir hata oluştu.');
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
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0 0 10px 0' }}>{activePost.caption}</h1>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>
                            <ImageFallback src={profile.initials ? `https://ui-avatars.com/api/?name=${profile.initials}&background=random` : "https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=100"} alt="Avatar" style={{ width: 24, height: 24, borderRadius: '50%' }} />
                            <span>{profile.name}</span>
                            <span>|</span>
                            <span>{postProducts.length} Products</span>
                            <span>|</span>
                            <span>More on this collection</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 60 }}>
                        <div style={{ maxWidth: 500, width: '100%' }}>
                            <ImageFallback src={activePost.imageUrl} alt="Post" style={{ width: '100%', borderRadius: 4 }} />
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

            {/* Edit Mode Toggle (Owner Only) */}
            {isOwner && (
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'center', marginTop: 5, marginBottom: 30, position: 'relative', zIndex: 10 }}>
                    <button
                        onClick={() => setIsEditMode(!isEditMode)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '8px 16px',
                            backgroundColor: isEditMode ? 'black' : 'white',
                            color: isEditMode ? 'white' : 'black',
                            border: '1px solid #ddd',
                            borderRadius: 20,
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}
                    >
                        <Pencil size={14} />
                        {isEditMode ? 'Düzenlemeyi Bitir' : 'Vitrinini Düzenle'}
                    </button>
                </div>
            )}

            {/* Sticky Navigation Bars */}
            <div style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                backgroundColor: theme?.backgroundColor === 'white' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
            }}>

                {/* Primary Nav (Sections) */}
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={localSections}
                        strategy={horizontalListSortingStrategy}
                    >
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

                            {localSections.map((section: any) => (
                                <SortableNavItem
                                    key={section.id}
                                    section={section}
                                    isActive={activeSection === section.id}
                                    onClick={() => { setActiveSection(section.id); setActiveCategory('all'); }}
                                    isOwner={isOwner && isEditMode}
                                    onEdit={(e) => handleEditSection(section, e)}
                                />
                            ))}

                            {/* Add Section Button (Owner Only) */}
                            {isOwner && isEditMode && (
                                <button
                                    onClick={handleAddSection}
                                    style={{
                                        width: 32, height: 32, borderRadius: '50%', border: '1px dashed #ccc', background: 'transparent',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginLeft: 10, flexShrink: 0
                                    }}
                                >
                                    <Plus size={16} color="#666" />
                                </button>
                            )}

                        </div>
                    </SortableContext>
                </DndContext>

                {/* Secondary Nav (Categories with counts) */}
                {
                    activeSection !== 'instagram' && (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 15,
                            padding: '15px 20px',
                            borderBottom: '1px solid rgba(0,0,0,0.03)'
                        }}>
                            {/* Search Bar */}
                            <div style={{ position: 'relative', width: '100%', maxWidth: 400 }}>
                                <Search size={16} color="#999" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="text"
                                    placeholder="Ürün veya marka ara..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px 14px 10px 40px',
                                        borderRadius: 20,
                                        border: '1px solid #e0e0e0',
                                        backgroundColor: '#f9f9f9',
                                        fontSize: '0.85rem',
                                        outline: 'none',
                                        transition: 'all 0.2s',
                                    }}
                                    onFocus={(e) => { e.currentTarget.style.borderColor = '#000'; e.currentTarget.style.backgroundColor = '#fff'; }}
                                    onBlur={(e) => { e.currentTarget.style.borderColor = '#e0e0e0'; e.currentTarget.style.backgroundColor = '#f9f9f9'; }}
                                />
                            </div>

                            <div style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 40,
                                fontSize: '0.7rem',
                                color: '#999',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                overflowX: 'auto',
                                whiteSpace: 'nowrap',
                                paddingBottom: 5 // space for scrollbar
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
                        </div>
                    )
                }
            </div >

            {/* Product Feed */}
            <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--page-padding-x)' }}>
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
                                <ImageFallback
                                    src={post.imageUrl}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                                    onMouseOver={(e: any) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseOut={(e: any) => e.currentTarget.style.transform = 'scale(1)'}
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

            <ShopSectionEditorModal
                isOpen={isEditorOpen}
                onClose={() => setIsEditorOpen(false)}
                section={editingSection}
                onSave={async (data) => {
                    await handleSaveSection(data);
                }}
                onDelete={handleDeleteSection}
            />

        </main >
    );
}
