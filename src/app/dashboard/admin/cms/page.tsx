"use client";

import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import { getContent, updateContent, getAllUsers, getAllCircles, getAllCategories, getAllBrands } from '@/actions/admin';
import { Save, RefreshCw, Layout, Users, Star, User, Tag, ShoppingBag, Layers } from 'lucide-react';

export default function AdminCMSPage() {
    const [content, setContent] = useState<any>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [circles, setCircles] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [brands, setBrands] = useState<any[]>([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [searchTerms, setSearchTerms] = useState({
        curators: '',
        circles: '',
        categories: '',
        brands: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        const [contentData, usersData, circlesData, categoriesData, brandsData] = await Promise.all([
            getContent(),
            getAllUsers(),
            getAllCircles(),
            getAllCategories(),
            getAllBrands()
        ]);

        if (contentData) setContent(contentData);
        if (usersData) setUsers(usersData);
        if (circlesData) setCircles(circlesData);
        if (categoriesData) setCategories(categoriesData);
        if (brandsData) setBrands(brandsData);

        setLoading(false);
    };

    const handleSearchChange = (section: string, value: string) => {
        setSearchTerms(prev => ({
            ...prev,
            [section]: value
        }));
    };

    const handleHeroChange = (field: string, value: string) => {
        setContent((prev: any) => ({
            ...prev,
            hero: {
                ...prev.hero,
                [field]: value
            }
        }));
    };

    const toggleFeaturedItem = (section: 'curators' | 'circles' | 'categories' | 'brands', itemId: string) => {
        setContent((prev: any) => {
            const currentIds = prev.sections?.[section]?.featuredIds || [];
            const isSelected = currentIds.includes(itemId);

            let newIds;
            if (isSelected) {
                newIds = currentIds.filter((id: string) => id !== itemId);
            } else {
                newIds = [...currentIds, itemId];
            }

            return {
                ...prev,
                sections: {
                    ...prev.sections,
                    [section]: {
                        ...prev.sections?.[section],
                        featuredIds: newIds
                    }
                }
            };
        });
    };

    const handleSave = async () => {
        setSaving(true);
        const result = await updateContent(content);
        if (result.success) {
            alert('İçerik başarıyla güncellendi!');
        } else {
            alert('Hata oluştu.');
        }
        setSaving(false);
    };

    if (loading) return <div>Yükleniyor...</div>;
    if (!content) return <div>İçerik yüklenemedi.</div>;

    // Filter only creators for selection
    const creators = users.filter(u => u.role === 'creator' || u.role === 'admin');

    const renderSelectionGrid = (items: any[], sectionKey: 'curators' | 'circles' | 'categories' | 'brands', titleKey = 'title') => {
        const searchTerm = searchTerms[sectionKey] || '';
        const filteredItems = items.filter(item => {
            const name = item.fullName || item.name || item.title || '';
            return name.toLowerCase().includes(searchTerm.toLowerCase());
        });

        return (
            <div>
                <input
                    type="text"
                    placeholder="Ara..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(sectionKey, e.target.value)}
                    style={{ width: '100%', padding: '10px', marginBottom: 15, borderRadius: 8, border: '1px solid #ddd' }}
                />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 15 }}>
                    {filteredItems.map(item => {
                        const itemId = item.slug || item.id;
                        const isSelected = content.sections?.[sectionKey]?.featuredIds?.includes(itemId);
                        return (
                            <div
                                key={item.id}
                                onClick={() => toggleFeaturedItem(sectionKey, itemId)}
                                style={{
                                    border: isSelected ? '2px solid black' : '1px solid #eee',
                                    borderRadius: 8,
                                    padding: 15,
                                    cursor: 'pointer',
                                    background: isSelected ? '#f9f9f9' : 'white',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10
                                }}
                            >
                                <div style={{
                                    width: 40, height: 40, borderRadius: '50%', background: '#ddd',
                                    overflow: 'hidden', flexShrink: 0
                                }}>
                                    {item.profileImage || item.image ? (
                                        <img src={item.profileImage || item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: '0.8rem' }}>
                                            {item.name ? item.name.charAt(0) : '?'}
                                        </div>
                                    )}
                                </div>
                                <div style={{ overflow: 'hidden' }}>
                                    <div style={{ fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {item.fullName || item.name || item.title}
                                    </div>
                                    {item.username && (
                                        <div style={{ fontSize: '0.8rem', color: '#888' }}>
                                            @{item.username}
                                        </div>
                                    )}
                                </div>
                                {isSelected && <Star size={16} fill="black" style={{ marginLeft: 'auto' }} />}
                            </div>
                        );
                    })}
                </div>
                {filteredItems.length === 0 && <div style={{ textAlign: 'center', color: '#888', padding: 20 }}>Sonuç bulunamadı.</div>}
            </div>
        );
    };

    return (
        <div style={{ maxWidth: 800 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: 10, }}>Site İçerik Yönetimi (CMS)</h1>
                    <p style={{ color: '#666' }}>Ana sayfa ve diğer alanlardaki metinleri buradan düzenleyebilirsiniz.</p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button
                        onClick={loadData}
                        style={{ padding: '10px', borderRadius: 8, border: '1px solid #ddd', background: 'white', cursor: 'pointer' }}
                        title="Yenile"
                    >
                        <RefreshCw size={20} />
                    </button>
                    <Button onClick={handleSave} disabled={saving}>
                        <Save size={18} style={{ marginRight: 8 }} />
                        {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                    </Button>
                </div>
            </div>

            {/* Hero Section Editor */}
            <div style={{ background: 'white', borderRadius: 12, border: '1px solid #eee', padding: 30, marginBottom: 30 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, borderBottom: '1px solid #f5f5f5', paddingBottom: 15 }}>
                    <Layout size={24} color="#555" />
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Hero (Ana Manşet) Bölümü</h2>
                </div>
                {/* Hero Inputs - kept same as before but abbreviated for replacement context if needed, 
                    since I am replacing the whole return block roughly due to the helper function. 
                    Actually I will just re-render the hero inputs here explicitly to be safe.
                 */}
                <div style={{ display: 'grid', gap: 20 }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Üst Başlık (Title)</label>
                        <input
                            type="text"
                            value={content.hero.title}
                            onChange={(e) => handleHeroChange('title', e.target.value)}
                            style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Ana Başlık (Subtitle)</label>
                        <input
                            type="text"
                            value={content.hero.subtitle}
                            onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                            style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd', fontSize: '1.1rem', fontWeight: 600 }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Açıklama</label>
                        <textarea
                            value={content.hero.description}
                            onChange={(e) => handleHeroChange('description', e.target.value)}
                            rows={3}
                            style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd', }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Buton Yazısı (CTA)</label>
                        <input
                            type="text"
                            value={content.hero.cta}
                            onChange={(e) => handleHeroChange('cta', e.target.value)}
                            style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd' }}
                        />
                    </div>
                </div>
            </div>

            {/* Featured Curators Editor */}
            <div style={{ background: 'white', borderRadius: 12, border: '1px solid #eee', padding: 30, marginBottom: 30 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, borderBottom: '1px solid #f5f5f5', paddingBottom: 15 }}>
                    <Users size={24} color="#555" />
                    <div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Öne Çıkan Küratörler</h2>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>Ana sayfada gösterilecek küratörleri seçin. (Siyah: Seçili)</p>
                    </div>
                </div>
                {renderSelectionGrid(creators, 'curators')}
            </div>

            {/* Circles Editor */}
            <div style={{ background: 'white', borderRadius: 12, border: '1px solid #eee', padding: 30, marginBottom: 30 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, borderBottom: '1px solid #f5f5f5', paddingBottom: 15 }}>
                    <Layers size={24} color="#555" />
                    <div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Topluluklar (Circles) Bölümü</h2>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>Ana sayfada gösterilecek toplulukları seçin.</p>
                    </div>
                </div>
                <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Bölüm Başlığı</label>
                    <input
                        type="text"
                        value={content.sections?.circles?.title || ''}
                        onChange={(e) => setContent((prev: any) => ({ ...prev, sections: { ...prev.sections, circles: { ...prev.sections?.circles, title: e.target.value } } }))}
                        style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd' }}
                    />
                </div>
                {renderSelectionGrid(circles, 'circles')}
            </div>

            {/* Categories Editor */}
            <div style={{ background: 'white', borderRadius: 12, border: '1px solid #eee', padding: 30, marginBottom: 30 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, borderBottom: '1px solid #f5f5f5', paddingBottom: 15 }}>
                    <Tag size={24} color="#555" />
                    <div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Kategoriler Bölümü</h2>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>Ana sayfada gösterilecek kategorileri seçin.</p>
                    </div>
                </div>
                <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Bölüm Başlığı</label>
                    <input
                        type="text"
                        value={content.sections?.categories?.title || ''}
                        onChange={(e) => setContent((prev: any) => ({ ...prev, sections: { ...prev.sections, categories: { ...prev.sections?.categories, title: e.target.value } } }))}
                        style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd' }}
                    />
                </div>
                {renderSelectionGrid(categories, 'categories')}
            </div>

            {/* Brands Editor */}
            <div style={{ background: 'white', borderRadius: 12, border: '1px solid #eee', padding: 30, marginBottom: 30 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, borderBottom: '1px solid #f5f5f5', paddingBottom: 15 }}>
                    <ShoppingBag size={24} color="#555" />
                    <div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Markalar Bölümü</h2>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>Ana sayfada gösterilecek markaları seçin.</p>
                    </div>
                </div>
                <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Bölüm Başlığı</label>
                    <input
                        type="text"
                        value={content.sections?.brands?.title || ''}
                        onChange={(e) => setContent((prev: any) => ({ ...prev, sections: { ...prev.sections, brands: { ...prev.sections?.brands, title: e.target.value } } }))}
                        style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd' }}
                    />
                </div>
                {renderSelectionGrid(brands, 'brands')}
            </div>



            {/* Info */}
            <div style={{ padding: 20, background: '#f8f9fa', borderRadius: 8, fontSize: '0.9rem', color: '#666', lineHeight: 1.5 }}>
                <p><strong>Not:</strong> Yaptığınız değişiklikler "Değişiklikleri Kaydet" butonuna bastığınız anda <strong>Ana Sayfa</strong>'da yayınlanacaktır.</p>
            </div>
        </div>
    );
}
