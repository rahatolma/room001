'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Button from '@/components/Button';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Package, Clock, Gift, Copy, Tag, Sparkles, Building2, ChevronRight, CheckCircle2, X, Zap } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Modal from '@/components/Modal';
import { useAuth } from '@/context/AuthContext';
import { getCreatorApplications, respondToOffer } from '@/actions/campaign';

// --- TYPES ---
type TabType = 'GIFTING' | 'CODES' | 'OFFERS' | 'CAMPAIGNS';

function CollaborationsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const tabParam = searchParams.get('tab');

    // Determine active tab from URL or default
    const getTabFromUrl = (): TabType => {
        if (tabParam === 'CODES') return 'CODES';
        if (tabParam === 'OFFERS') return 'OFFERS';
        if (tabParam === 'CAMPAIGNS') return 'CAMPAIGNS';
        return 'GIFTING';
    }

    const [activeTab, setActiveTabState] = useState<TabType>(getTabFromUrl());

    // Application Flow State
    const [isAppModalOpen, setAppModalOpen] = useState(false);
    const [selectedOpp, setSelectedOpp] = useState<any>(null);
    const [appliedCampaigns, setAppliedCampaigns] = useState<string[]>([]);
    const [appForm, setAppForm] = useState({ pitch: '', budget: '', includeStats: true });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch integration State
    const { user } = useAuth();
    const [myApplications, setMyApplications] = useState<any[]>([]);
    const [incomingOffers, setIncomingOffers] = useState<any[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    const loadApplications = async () => {
        if (!user) return;
        setLoadingData(true);
        const res = await getCreatorApplications(user.id);
        if (res.success && res.applications) {
            setMyApplications(res.applications);
            setIncomingOffers(res.applications.filter((a: any) => a.status === 'offered'));
            setAppliedCampaigns(res.applications.map((a: any) => a.campaignId));
        }
        setLoadingData(false);
    };

    useEffect(() => {
        loadApplications();
    }, [user]);

    // Sync state with URL changes
    useEffect(() => {
        setActiveTabState(getTabFromUrl());
    }, [tabParam]);

    const handleTabChange = (tab: TabType) => {
        setActiveTabState(tab);
        // Update URL without refresh
        router.push(`/dashboard/collaborations?tab=${tab}`);
    };

    const copyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        toast.success(`${code} kopyalandı!`);
    };

    const handleApplyClick = (opp: any) => {
        if (appliedCampaigns.includes(opp.id)) return;
        setSelectedOpp(opp);
        setAppModalOpen(true);
        setAppForm({ pitch: '', budget: '', includeStats: true }); // Reset form
    };

    const submitApplication = () => {
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setAppliedCampaigns(prev => [...prev, selectedOpp.id]);
            setIsSubmitting(false);
            setAppModalOpen(false);
            toast.success('Başvurunuz başarıyla markaya iletildi!');
        }, 1200);
    };

    const handleRespondToOffer = async (appId: string, accepted: boolean) => {
        toast.loading(accepted ? 'Teklif kabul ediliyor...' : 'Teklif reddediliyor...', { id: 'respond_toast' });
        const res = await respondToOffer(appId, accepted);
        if (res.success) {
            toast.success(accepted ? 'Teklifi kabul ettiniz. Marka sizinle iletişime geçecek!' : 'Teklif reddedildi.', { id: 'respond_toast' });
            loadApplications(); // Refresh list
        } else {
            toast.error(res.error || 'İşlem başarısız.', { id: 'respond_toast' });
        }
    };

    // Mock Opportunities Data
    const opportunities = [
        {
            id: 'opp-1', name: "L'Oréal Paris Cilt Bakım Serisi", type: 'PAYMENT', tag: 'Yeni Kampanya', budget: '₺15.000', expected: 'Instagram Reels + 2 Story',
            desc: "Yeni Revitalift serisi için cilt bakımı odaklı creatorlar arıyoruz.", color: '#dc2626', bg: '#fef2f2', icon: <Sparkles size={14} />
        },
        {
            id: 'opp-2', name: 'Nike Koşu Koleksiyonu', type: 'AFFILIATE', tag: 'Affiliate Odaklı', budget: '%15 Komisyon', expected: 'Açık Program',
            desc: "Nike'ın yeni koşu koleksiyonunu takipçilerinle paylaşarak komisyon kazan.", color: '#475569', bg: '#f8fafc', icon: <Tag size={14} />
        }
    ];

    return (
        <div style={{ maxWidth: 1200, paddingBottom: 100, }}>

            {/* Header Area based on Active Tab */}
            <div style={{ marginBottom: 40 }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0 0 10px 0', letterSpacing: -1 }}>
                    Marka İşbirlikleri
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: 600, margin: 0, lineHeight: 1.5 }}>
                    Sana özel fırsatları değerlendir, indirim kodlarını paylaş ve marka hediyelerinin takibini yap.
                </p>
            </div>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: 15, marginBottom: 50, flexWrap: 'wrap' }}>
                <TabButton
                    label="HEDİYELEŞME"
                    isActive={activeTab === 'GIFTING'}
                    onClick={() => handleTabChange('GIFTING')}
                />
                <TabButton
                    label="İNDİRİM KODLARI"
                    isActive={activeTab === 'CODES'}
                    onClick={() => handleTabChange('CODES')}
                />
                <TabButton
                    label="GELEN TEKLİFLER"
                    isActive={activeTab === 'OFFERS'}
                    onClick={() => handleTabChange('OFFERS')}
                />
                <TabButton
                    label="AÇIK KAMPANYALAR"
                    isActive={activeTab === 'CAMPAIGNS'}
                    onClick={() => handleTabChange('CAMPAIGNS')}
                />
            </div>

            {/* --- TAB CONTENT: GIFTING --- */}
            {activeTab === 'GIFTING' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 25 }}>
                    {/* Mock Gifting Item 1 */}
                    <div style={{ background: 'white', border: '1px solid #eaeaea', borderRadius: 12, padding: 25, display: 'flex', flexDirection: 'column', gap: 15 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                <div style={{ width: 45, height: 45, borderRadius: 8, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                                    <Building2 size={20} />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600 }}>Dyson Türkiye</h3>
                                    <span style={{ fontSize: '0.8rem', color: '#888' }}>Airwrap Multi-styler</span>
                                </div>
                            </div>
                            <span style={{ background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Package size={14} /> Kargoya Verildi
                            </span>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#666', margin: 0, lineHeight: 1.5 }}>
                            İçerik planlaması için ürününüz 2 gün içinde teslim edilecektir. Takip no: Yurtiçi Kargo (1Z99999).
                        </p>
                    </div>

                    {/* Mock Gifting Item 2 */}
                    <div style={{ background: 'white', border: '1px solid #eaeaea', borderRadius: 12, padding: 25, display: 'flex', flexDirection: 'column', gap: 15 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                <div style={{ width: 45, height: 45, borderRadius: 8, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                                    <Building2 size={20} />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600 }}>Sephora</h3>
                                    <span style={{ fontSize: '0.8rem', color: '#888' }}>Yaz Koleksiyonu Kiti</span>
                                </div>
                            </div>
                            <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Clock size={14} /> Beklemede
                            </span>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#666', margin: 0, lineHeight: 1.5 }}>
                            Marka hediye isteğinizi inceliyor. Onaylandığında adres bilgilerinizi teyit edeceğiz.
                        </p>
                    </div>
                </div>
            )}

            {/* --- TAB CONTENT: CODES --- */}
            {activeTab === 'CODES' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>

                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0, color: '#0f172a', marginBottom: 4 }}>Varsayılan Kod Formatınız</h3>
                            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Markalar kod oluştururken genellikle bu formatı tercih edecektir.</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: 1 }}>ASENA20</span>
                            <Link href="/dashboard/settings">
                                <Button variant="outline" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>DÜZENLE</Button>
                            </Link>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
                        {/* Mock Code 1 */}
                        <div style={{ border: '1px solid #eaeaea', borderRadius: 12, overflow: 'hidden' }}>
                            <div style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #eaeaea', background: 'white' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ background: '#111', color: 'white', padding: '4px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 700 }}>%15 İNDİRİM</div>
                                    <span style={{ fontWeight: 600, fontSize: '1.05rem' }}>Trendyol</span>
                                </div>
                                <span style={{ fontSize: '0.75rem', color: '#888' }}>Geçerlilik: Sınırsız</span>
                            </div>
                            <div style={{ padding: 20, background: '#fafafa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: 1, color: '#111' }}>ASENA15</span>
                                <button onClick={() => copyCode('ASENA15')} style={{ background: 'white', border: '1px solid #ddd', padding: '8px', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#555' } as any}>
                                    <Copy size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Mock Code 2 */}
                        <div style={{ border: '1px solid #eaeaea', borderRadius: 12, overflow: 'hidden' }}>
                            <div style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #eaeaea', background: 'white' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ background: '#059669', color: 'white', padding: '4px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 700 }}>%20 İNDİRİM</div>
                                    <span style={{ fontWeight: 600, fontSize: '1.05rem' }}>Boyner</span>
                                </div>
                                <span style={{ fontSize: '0.75rem', color: '#888' }}>Son: 31 Mart</span>
                            </div>
                            <div style={{ padding: 20, background: '#fafafa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: 1, color: '#111' }}>ASENA20</span>
                                <button onClick={() => copyCode('ASENA20')} style={{ background: 'white', border: '1px solid #ddd', padding: '8px', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#555' } as any}>
                                    <Copy size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- TAB CONTENT: OFFERS --- */}
            {activeTab === 'OFFERS' && (
                <div>
                    {/* Incoming Offers Section */}
                    {incomingOffers.length > 0 ? (
                        <div style={{ marginBottom: 40, padding: 30, background: '#fcfdfd', border: '1px solid #059669', borderRadius: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                                <Sparkles color="#059669" />
                                <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#064e3b' }}>ÖZEL TEKLİFLER ({incomingOffers.length})</h3>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 20 }}>
                                {incomingOffers.map(offer => (
                                    <div key={offer.id} style={{ background: 'white', border: '1px solid #10b981', borderRadius: 12, padding: 25, boxShadow: '0 4px 15px rgba(5, 150, 105, 0.1)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 }}>
                                            <span style={{ background: offer.campaign.type === 'gifting' ? '#fdf2f8' : '#eff6ff', color: offer.campaign.type === 'gifting' ? '#db2777' : '#1d4ed8', padding: '4px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 700 }}>
                                                {offer.campaign.type === 'gifting' ? '🎁 HEDİYE' : '💸 BÜTÇELİ'}
                                            </span>
                                            {offer.campaign.budget && <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#166534' }}>₺{Number(offer.campaign.budget).toLocaleString()}</span>}
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                                            {offer.campaign.brand?.logoUrl ? (
                                                <img src={offer.campaign.brand.logoUrl} alt="Brand" style={{ width: 30, height: 30, borderRadius: '50%' }} />
                                            ) : (
                                                <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Building2 size={16} /></div>
                                            )}
                                            <span style={{ fontSize: '1rem', fontWeight: 600 }}>{offer.campaign.brand?.name || 'Marka'}</span>
                                        </div>

                                        <p style={{ fontSize: '0.9rem', color: '#444', lineHeight: 1.5, marginBottom: 20, background: '#fafafa', padding: 15, borderRadius: 8, fontStyle: 'italic' }}>
                                            "{offer.campaign.description}"
                                        </p>

                                        <div style={{ display: 'flex', gap: 10 }}>
                                            <Button variant="outline" onClick={() => handleRespondToOffer(offer.id, false)} style={{ flex: 1, borderColor: '#f87171', color: '#ef4444', padding: '8px' }}>
                                                <X size={16} style={{ marginRight: 5 }} /> REDDET
                                            </Button>
                                            <Button onClick={() => handleRespondToOffer(offer.id, true)} style={{ flex: 1, background: '#111', color: 'white', padding: '8px' }}>
                                                <CheckCircle2 size={16} style={{ marginRight: 5 }} /> KABUL ET
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div style={{ padding: '40px 20px', textAlign: 'center', background: 'white', borderRadius: 12, border: '1px solid #eaeaea' }}>
                            <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#888' }}>
                                <Zap size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 10 }}>Henüz Gelen Teklif Yok</h3>
                            <p style={{ color: '#666', maxWidth: 400, margin: '0 auto 20px' }}>Markalar sizi Marka Kataloğu'nda keşfettiklerinde gönderdikleri özel hediye veya kampanya teklifleri burada listelenecektir.</p>
                            <Link href="/dashboard/brand-match">
                                <Button variant="outline">Kataloğu Görüntüle</Button>
                            </Link>
                        </div>
                    )}
                </div>
            )}

            {/* --- TAB CONTENT: CAMPAIGNS --- */}
            {activeTab === 'CAMPAIGNS' && (
                <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 20 }}>Açık Kampanyalar</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 25 }}>
                        {opportunities.map(opp => {
                            const isApplied = appliedCampaigns.includes(opp.id);
                            return (
                                <div key={opp.id} style={{ border: isApplied ? '1px solid #059669' : '1px solid #eaeaea', borderRadius: 12, padding: 25, background: isApplied ? '#fcfdfd' : 'white', transition: 'box-shadow 0.2s', cursor: isApplied ? 'default' : 'pointer' }} className={!isApplied ? "hover:shadow-lg" : ""}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 }}>
                                        <span style={{ background: opp.bg, color: opp.color, padding: '4px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                                            {opp.icon} {opp.tag}
                                        </span>
                                        <span style={{ fontSize: '0.8rem', color: '#888', fontWeight: 500 }}>{opp.budget}</span>
                                    </div>
                                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', fontWeight: 700 }}>{opp.name}</h3>
                                    <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.5, marginBottom: 20 }}>{opp.desc}</p>
                                    <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '0 0 20px 0' }} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.85rem', color: '#888' }}>{opp.expected}</span>
                                        {isApplied ? (
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#059669', fontSize: '0.85rem', fontWeight: 700 }}>
                                                <CheckCircle2 size={16} /> BAŞVURULDU
                                            </span>
                                        ) : (
                                            <Button variant={opp.type === 'AFFILIATE' ? 'outline' : 'primary'} onClick={() => handleApplyClick(opp)} style={{ fontSize: '0.8rem', padding: '8px 16px', background: opp.type === 'AFFILIATE' ? 'transparent' : '#111', color: opp.type === 'AFFILIATE' ? 'black' : 'white' }}>
                                                BAŞVUR <ChevronRight size={14} style={{ display: opp.type === 'AFFILIATE' ? 'inline' : 'none', verticalAlign: 'middle', marginLeft: 4 }} />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* --- APPLICATION MODAL --- */}
            <Modal isOpen={isAppModalOpen} onClose={() => !isSubmitting && setAppModalOpen(false)}>
                {selectedOpp && (
                    <div style={{ width: '100%', maxWidth: 500 }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 5px 0' }}>Kampanya Başvurusu</h2>
                        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: 25 }}><strong>{selectedOpp.name}</strong> kampanyası için markaya teklifini ilet.</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            {/* Pitch Area */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8 }}>Neden Sen? (Kapak Yazısı) *</label>
                                <textarea
                                    value={appForm.pitch}
                                    onChange={(e) => setAppForm({ ...appForm, pitch: e.target.value })}
                                    placeholder="Markaya tarzından, kitle demografiklerinden ve kampanyaya nasıl değer katacağından bahset..."
                                    style={{ width: '100%', minHeight: 120, padding: 12, borderRadius: 8, border: '1px solid #ddd', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }}
                                />
                            </div>

                            {/* Budget (Only show if payment type) */}
                            {selectedOpp.type === 'PAYMENT' && (
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8 }}>Teklif Ettiğin Bütçe (₺)</label>
                                    <input
                                        type="number"
                                        value={appForm.budget}
                                        onChange={(e) => setAppForm({ ...appForm, budget: e.target.value })}
                                        placeholder="Örn: 12000"
                                        style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: '0.9rem', outline: 'none' }}
                                    />
                                    <span style={{ fontSize: '0.75rem', color: '#888', marginTop: 4, display: 'block' }}>Markanın belirttiği bütçe: {selectedOpp.budget}</span>
                                </div>
                            )}

                            {/* Include Media Kit */}
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: '#f8fafc', padding: 15, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                                <input
                                    type="checkbox"
                                    id="includeStats"
                                    checked={appForm.includeStats}
                                    onChange={(e) => setAppForm({ ...appForm, includeStats: e.target.checked })}
                                    style={{ marginTop: 3 }}
                                />
                                <label htmlFor="includeStats" style={{ fontSize: '0.85rem', color: '#333', cursor: 'pointer', lineHeight: 1.4 }}>
                                    <strong style={{ display: 'block', color: 'black' }}>Medya Kitimi Başvuruya Ekle</strong>
                                    Marka son 30 günlük erişim verilerimi ve takipçi demografiklerimi görebilsin. (Başvuru oranını %80 artırır)
                                </label>
                            </div>

                            {/* Actions */}
                            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                                <Button
                                    onClick={submitApplication}
                                    disabled={!appForm.pitch.trim() || isSubmitting}
                                    style={{ flex: 1, background: '#111', color: 'white', display: 'flex', justifyContent: 'center' }}
                                >
                                    {isSubmitting ? 'GÖNDERİLİYOR...' : 'BAŞVURUYU GÖNDER'}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

        </div>
    );
}

// --- SUB COMPONENTS ---

function TabButton({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            style={{
                padding: '12px 25px',
                background: 'white',
                border: '1px solid',
                borderColor: isActive ? '#059669' : '#ddd', // Active green border
                borderRadius: 4,
                color: isActive ? 'black' : '#666',
                fontWeight: 600,
                fontSize: '0.8rem',
                letterSpacing: 1,
                cursor: 'pointer',
                boxShadow: isActive ? '0 4px 0 0 #059669' : 'none', // Bottom border stress
                transform: isActive ? 'translateY(-2px)' : 'none',
                transition: 'all 0.2s ease'
            }}
        >
            {label}
        </button>
    );
}

export default function CollaborationsPage() {
    return (
        <Suspense fallback={<div>Yükleniyor...</div>}>
            <CollaborationsContent />
        </Suspense>
    );
}
