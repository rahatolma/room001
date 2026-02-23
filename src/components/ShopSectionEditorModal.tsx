'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus, Grip, Search, Link as LinkIcon, ShoppingBag, Settings, CheckCircle2, Loader2, Trash2, ChevronLeft, Image as ImageIcon, ImagePlus } from 'lucide-react';
import { toast } from 'sonner';
import { searchCatalog, createProductFromUrl, addProductToCollection, getBrandProducts } from '@/actions/catalog';
import { Product } from '@prisma/client';
import ImageFallback from './ImageFallback';

export type ExtendedProduct = Product & { brand?: any };

// Mock Brands Data (Move to a better place later)
const PARTNER_BRANDS = [
    { id: '1', name: 'MYTHERESA', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Mytheresa_Logo.png', commission: '12%' },
    { id: '2', name: 'SSENSE', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Ssense_logo.svg/2560px-Ssense_logo.svg.png', commission: '17%' },
    { id: '3', name: '1STDIBS', logo: 'https://mma.prnewswire.com/media/1063385/1stDibs_Logo.jpg?p=facebook', commission: '8%' },
    { id: '4', name: 'LIBERTY.', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Liberty_London_logo.svg/1200px-Liberty_London_logo.svg.png', commission: '8%' },
    { id: '5', name: 'HOURGLASS', logo: 'https://companieslogo.com/img/orig/HOURGLASS-38507204.png?t=1659685350', commission: '15%' },
    { id: '6', name: 'Madewell', logo: 'https://logos-world.net/wp-content/uploads/2020/11/Madewell-Logo.png', commission: '12%' },
    { id: '7', name: 'olga berg', logo: 'https://cdn.shopify.com/s/files/1/0006/5277/1389/files/Olga_Berg_Logo_Black_1.png?v=1613697268', commission: '15%' },
    { id: '8', name: 'BOLL & BRANCH', logo: 'https://financialpost.com/wp-content/uploads/2019/08/boll-branch_logo.jpg?quality=100&strip=all', commission: '15%' },
];

interface ShopSectionEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    section?: any; // If editing existing
    onSave: (data: any) => void;
    onDelete?: (id: string) => void;
}

export default function ShopSectionEditorModal({ isOpen, onClose, section, onSave, onDelete }: ShopSectionEditorModalProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [addProductOpen, setAddProductOpen] = useState(false);
    const [addProductStep, setAddProductStep] = useState<'initial' | 'url' | 'catalog' | 'brand-products' | 'customize-product'>('initial');

    // Product State
    const [currentProducts, setCurrentProducts] = useState<ExtendedProduct[]>([]);
    const [pendingProducts, setPendingProducts] = useState<{ id: string, customDetails: any }[]>([]); // URLs or IDs to be added on save for new collections

    // Catalog Search State
    const [catalogSearch, setCatalogSearch] = useState('');
    const [searchResults, setSearchResults] = useState<{ brands: any[], products: any[] }>({ brands: [], products: [] });
    const [isSearching, setIsSearching] = useState(false);

    // Brand & Product Selection State
    const [selectedBrand, setSelectedBrand] = useState<any>(null);
    const [brandProducts, setBrandProducts] = useState<ExtendedProduct[]>([]);
    const [isLoadingBrandProducts, setIsLoadingBrandProducts] = useState(false);

    // Customization State
    const [productToCustomize, setProductToCustomize] = useState<ExtendedProduct | null>(null);
    const [customDetails, setCustomDetails] = useState({ title: '', description: '', imageUrl: '' });

    // URL Import State
    const [urlInput, setUrlInput] = useState('');
    const [isImporting, setIsImporting] = useState(false);

    // Settings State
    const [showSettings, setShowSettings] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [layoutType, setLayoutType] = useState('grid');
    const [socialSources, setSocialSources] = useState<string[]>([]);

    useEffect(() => {
        if (isOpen) {
            if (section) {
                setTitle(section.title);
                setDescription(section.description || ''); // Assuming description field
                setIsVisible(section.isVisible ?? true);
                setLayoutType(section.layoutType || 'grid');
                // Assuming existingProducts is defined elsewhere or passed as prop
                // For now, let's use an empty array if not defined
                const existingProducts: Product[] = section.products || [];
                setCurrentProducts(existingProducts);
            } else {
                setTitle('Koleksiyon adını girin');
                setDescription('');
                setIsVisible(true);
                setLayoutType('grid');
                setAddProductOpen(false);
                setAddProductStep('initial');
                setCurrentProducts([]);
                setPendingProducts([]);
            }
        }
    }, [isOpen, section]); // Removed existingProducts from dependency array as it's not a prop

    // --- Search Logic ---
    useEffect(() => {
        if (!catalogSearch.trim()) {
            setSearchResults({ brands: [], products: [] });
            return;
        }

        const timer = setTimeout(async () => {
            setIsSearching(true);
            try {
                const res = await searchCatalog(catalogSearch);
                console.log("Client search res:", res); // debug
                if (res.success) {
                    setSearchResults({
                        brands: res.brands || [],
                        products: res.products || []
                    });
                } else {
                    console.error("Search failed:", res.error);
                }
            } catch (err) {
                console.error("Search thrown error:", err);
            } finally {
                setIsSearching(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [catalogSearch]);

    const handleSave = () => {
        onSave({
            id: section?.id,
            title: title === 'Koleksiyon adını girin' ? 'İsimsiz Koleksiyon' : title,
            description,
            isVisible,
            layoutType,
            socialSources,
            pendingProducts // Include pending products in the save data
        });
    };

    const addProductLocally = (product: Product) => {
        setCurrentProducts(prev => [...prev, product]);
    };

    const handleUrlImport = async () => {
        if (!urlInput) {
            toast.error('Please enter a URL.');
            return;
        }
        setIsImporting(true);
        try {
            const res = await createProductFromUrl(urlInput);
            if (res.success && res.product) {
                toast.success('Product imported successfully!');
                setProductToCustomize(res.product as Product);
                setCustomDetails({
                    title: res.product.title,
                    description: '',
                    imageUrl: res.product.imageUrl || ''
                });
                setAddProductStep('customize-product');
            } else {
                toast.error(res.error || 'Failed to import product.');
            }
        } catch (error) {
            console.error('Error importing product:', error);
            toast.error('An unexpected error occurred during import.');
        } finally {
            setIsImporting(false);
        }
    };

    const handleBrandSelect = async (brand: any) => {
        setSelectedBrand(brand);
        setAddProductStep('brand-products');
        setIsLoadingBrandProducts(true);
        const res = await getBrandProducts(brand.id);
        if (res.success && res.products) {
            setBrandProducts(res.products as ExtendedProduct[]);
        } else {
            toast.error('Failed to load products');
        }
        setIsLoadingBrandProducts(false);
    };

    const handleCustomizeProduct = (product: ExtendedProduct) => {
        setProductToCustomize(product);
        setCustomDetails({
            title: product.title,
            description: '',
            imageUrl: product.imageUrl || ''
        });
        setAddProductStep('customize-product');
    };

    const handleFinalizeAddProduct = async () => {
        if (!productToCustomize) return;

        const productToAdd = {
            ...productToCustomize,
            title: customDetails.title, // Override component display
            // description: customDetails.description // We might want to show this on hover?
            // image: customDetails.imageUrl // Override component display
        };

        addProductLocally(productToAdd);

        // If persisting immediately
        if (section?.id) {
            // We need to pass custom details to the action
            // But existing action signature might need update or we handle it here
            // Since we updated addProductToCollection signature, let's use it.
            addProductToCollection(section.id, productToCustomize.id, {
                title: customDetails.title,
                description: customDetails.description,
                imageUrl: customDetails.imageUrl
            }).then(res => {
                if (res.success) toast.success('Koleksiyona eklendi');
                else toast.error('Eklenerken hata oluştu');
            });
        }

        // For new collections, we need to store custom details too
        if (!section?.id) {
            setPendingProducts(prev => [...prev, { id: productToCustomize.id, customDetails }]);
            toast.success('Listeye eklendi (Kaydedince kesinleşecek)');
        }

        setAddProductOpen(false);
        setProductToCustomize(null);
        setAddProductStep('initial');
    };

    // --- RENDERERS ---

    const renderAddProductModal = () => {
        if (!addProductOpen) return null;

        return (
            <div style={{ position: 'fixed', inset: 0, zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)' }}>
                <div style={{ background: 'white', borderRadius: 12, width: '90%', maxWidth: 1000, height: '85vh', maxHeight: 800, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
                    {/* Header */}
                    <div style={{ padding: 20, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {addProductStep !== 'initial' && (
                            <button onClick={() => {
                                if (addProductStep === 'customize-product') setAddProductStep('brand-products');
                                else if (addProductStep === 'brand-products') setAddProductStep('catalog');
                                else setAddProductStep('initial');
                            }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', color: '#666', display: 'flex', alignItems: 'center', gap: 5 }}>
                                <ChevronLeft size={16} /> Geri
                            </button>
                        )}
                        <div style={{ flex: 1, textAlign: 'center', fontWeight: 600, fontSize: '1rem' }}>
                            {addProductStep === 'customize-product' ? 'FINALIZE AND ADD' :
                                addProductStep === 'brand-products' ? selectedBrand?.name :
                                    'Koleksiyona Ürün Ekle'}
                        </div>
                        <button onClick={() => setAddProductOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                    </div>

                    {/* Step: Initial Selection */}
                    {addProductStep === 'initial' && (
                        <div style={{ padding: 40, textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: 10 }}>Koleksiyona Ürün Ekle</h2>
                            <p style={{ color: '#666', marginBottom: 40 }}>Kitlenizin bayılacağı ürünleri seçin</p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 700, margin: '0 auto', width: '100%' }}>
                                {/* Option 1: URL */}
                                <button
                                    onClick={() => setAddProductStep('url')}
                                    style={{ border: '1px solid #ddd', borderRadius: 12, padding: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15, cursor: 'pointer', transition: 'all 0.2s', background: 'white' }}
                                    onMouseOver={(e) => e.currentTarget.style.borderColor = 'black'}
                                    onMouseOut={(e) => e.currentTarget.style.borderColor = '#ddd'}
                                >
                                    <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <LinkIcon size={24} />
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: 5 }}>Link ile Ekle</div>
                                        <div style={{ fontSize: '0.9rem', color: '#666' }}>Herhangi bir online mağazadan ürün linkini kopyalayıp yapıştırın</div>
                                    </div>
                                </button>

                                {/* Option 2: Catalog */}
                                <button
                                    onClick={() => setAddProductStep('catalog')}
                                    style={{ border: '1px solid #ddd', borderRadius: 12, padding: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15, cursor: 'pointer', transition: 'all 0.2s', background: 'white' }}
                                    onMouseOver={(e) => e.currentTarget.style.borderColor = 'black'}
                                    onMouseOut={(e) => e.currentTarget.style.borderColor = '#ddd'}
                                >
                                    <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <ShoppingBag size={24} />
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: 5 }}>Katalogdan Seç</div>
                                        <div style={{ fontSize: '0.9rem', color: '#666' }}>ShopMy partner markalarının ürünleri arasında arama yapın</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step: URL Input */}
                    {addProductStep === 'url' && (
                        <div style={{ padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            <div style={{ width: '100%', maxWidth: 500 }}>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: 20, textAlign: 'center' }}>Ürün linkini yapıştırın</h3>
                                <div style={{ display: 'flex', gap: 10 }}>
                                    <input
                                        value={urlInput}
                                        onChange={(e) => setUrlInput(e.target.value)}
                                        placeholder="https://..."
                                        style={{ flex: 1, padding: '15px', borderRadius: 8, border: '1px solid #ddd', fontSize: '1rem' }}
                                    />
                                    <button
                                        onClick={handleUrlImport}
                                        disabled={isImporting}
                                        style={{ background: 'black', color: 'white', border: 'none', borderRadius: 8, padding: '0 25px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
                                    >
                                        {isImporting && <Loader2 size={16} className="animate-spin" />}
                                        {isImporting ? 'Ekleniyor...' : 'Ekle'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step: Catalog Search */}
                    {addProductStep === 'catalog' && (
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <div style={{ padding: '20px 40px', borderBottom: '1px solid #eee' }}>
                                <div style={{ position: 'relative' }}>
                                    <Search size={20} style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                                    <input
                                        value={catalogSearch}
                                        onChange={(e) => setCatalogSearch(e.target.value)}
                                        placeholder="Marka, ürün veya kategori ara..."
                                        style={{ width: '100%', padding: '15px 15px 15px 45px', borderRadius: 30, border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }}
                                    />
                                    {isSearching && (
                                        <div style={{ position: 'absolute', right: 40, top: '50%', transform: 'translateY(-50%)' }}>
                                            <Loader2 size={16} className="animate-spin" color="#999" />
                                        </div>
                                    )}
                                    {catalogSearch && (
                                        <button onClick={() => setCatalogSearch('')} style={{ position: 'absolute', right: 15, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                                            <X size={16} color="#999" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 40px' }}>
                                <h4 style={{ fontSize: '1.1rem', marginBottom: 20, }}>Partner Markalar</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 15 }}>
                                    {searchResults.brands.length > 0 ? (
                                        searchResults.brands.map(brand => (
                                            <div key={brand.id} onClick={() => handleBrandSelect(brand)} style={{ position: 'relative', height: 120, borderRadius: 8, overflow: 'hidden', cursor: 'pointer', border: '1px solid #eee' }}>
                                                {brand.logoUrl ? (
                                                    <ImageFallback src={brand.logoUrl} alt={brand.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <div style={{ width: '100%', height: '100%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1.5rem' }}>
                                                        {brand.name[0]}
                                                    </div>
                                                )}

                                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', display: 'flex', alignItems: 'flex-end', padding: 15 }}>
                                                    <div style={{ color: 'white' }}>
                                                        <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{brand.name}</div>
                                                        <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>ShopMy Partner</div>
                                                    </div>
                                                    <div style={{ marginLeft: 'auto', background: 'white', color: 'black', padding: '4px 8px', borderRadius: 4, fontSize: '0.8rem', fontWeight: 700 }}>
                                                        %{Number(brand.commissionRate)}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        catalogSearch && !isSearching ? (
                                            <div style={{ gridColumn: '1 / -1', padding: 20, textAlign: 'center', color: '#666', background: '#f9f9f9', borderRadius: 8 }}>
                                                Marka bulunamadı
                                            </div>
                                        ) : (
                                            !isSearching && !catalogSearch && (
                                                PARTNER_BRANDS.map(brand => (
                                                    <div key={brand.id} onClick={() => handleBrandSelect(brand)} style={{ position: 'relative', height: 120, borderRadius: 8, overflow: 'hidden', cursor: 'pointer', border: '1px solid #eee' }}>
                                                        <ImageFallback src={brand.logo} alt={brand.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', display: 'flex', alignItems: 'flex-end', padding: 15 }}>
                                                            <div style={{ color: 'white' }}>
                                                                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{brand.name}</div>
                                                            </div>
                                                            <div style={{ marginLeft: 'auto', background: 'white', color: 'black', padding: '4px 8px', borderRadius: 4, fontSize: '0.8rem', fontWeight: 700 }}>
                                                                {brand.commission}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )
                                        )
                                    )}
                                </div>
                                {searchResults.products.length > 0 && (
                                    <>
                                        <h4 style={{ fontSize: '1.1rem', margin: '30px 0 20px 0', }}>Ürünler</h4>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
                                            {searchResults.products.map(product => (
                                                <div key={product.id} style={{ border: '1px solid #eee', borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                                    <div style={{ position: 'relative', height: 200, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <ImageFallback src={product.imageUrl || 'https://via.placeholder.com/200'} alt={product.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                                        <button
                                                            onClick={() => handleCustomizeProduct(product)}
                                                            style={{ position: 'absolute', top: 10, right: 10, width: 32, height: 32, borderRadius: '50%', background: 'black', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                                        >
                                                            <Plus size={18} />
                                                        </button>
                                                    </div>
                                                    <div style={{ padding: 15, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                        <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 5, lineHeight: 1.4 }}>{product.title}</div>
                                                        <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: 5 }}>{product.brand?.name}</div>
                                                        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                                                            <span style={{ color: '#666' }}>{product.price ? `${product.price} ${product.currency}` : ''}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step: Brand Products Grid */}
                    {addProductStep === 'brand-products' && (
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <div style={{ padding: '20px 30px', borderBottom: '1px solid #eee', background: 'white' }}>
                                <div style={{ marginBottom: 15 }}>
                                    <div style={{ fontSize: '0.8rem', color: '#333', marginBottom: 8 }}>Markaya Göre Filtrele</div>
                                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                        {['Yoé', 'Azalea Wang', 'DR.BARBARA STURM', 'Dolce&Gabbana', 'Johnny Was', 'Level Shoes Global', 'ORRIS'].map(b => (
                                            <span key={`b-${b}`} style={{ padding: '4px 12px', border: '1px solid #ddd', borderRadius: 20, fontSize: '0.75rem', color: '#666' }}>{b}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.8rem', color: '#333', marginBottom: 8 }}>Mağaza Sitesine Göre Filtrele</div>
                                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                        {['Yoé', 'Level Shoes Global', 'DSW', 'Johnny Was', 'LUISAVIAROMA', 'ORRIS', 'Saks Fifth Avenue'].map(b => (
                                            <span key={`m-${b}`} style={{ padding: '4px 12px', border: '1px solid #ddd', borderRadius: 20, fontSize: '0.75rem', color: '#666' }}>{b}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div style={{ flex: 1, overflowY: 'auto', padding: 20, background: '#fafafa' }}>
                                {isLoadingBrandProducts ? (
                                    <div style={{ display: 'flex', justifyContent: 'center', padding: 50 }}><Loader2 className="animate-spin" /></div>
                                ) : (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 15 }}>
                                        {brandProducts.map(product => (
                                            <div key={product.id} style={{ border: '1px solid #efefef', borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'row', background: 'white', position: 'relative', height: 160 }}>
                                                {/* Left Image */}
                                                <div style={{ width: 140, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 15 }}>
                                                    <ImageFallback src={product.imageUrl || 'https://via.placeholder.com/200'} alt={product.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                                </div>

                                                {/* Right Content */}
                                                <div style={{ padding: '20px 20px 20px 15px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                    <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: 5, color: '#111', lineHeight: 1.2 }}>{product.title}</div>
                                                    <div style={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{product.brand?.name}</div>

                                                    <div style={{ marginTop: 'auto' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.8rem', fontWeight: 600, color: '#111' }}>
                                                            {product.brand?.name} <LinkIcon size={10} color="#999" />
                                                        </div>
                                                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#333', marginTop: 2 }}>
                                                            %{product.brand?.commissionRate || 10} komisyon
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', fontWeight: 600, color: '#10b981', marginTop: 4 }}>
                                                            <CheckCircle2 size={12} fill="#10b981" color="white" /> ShopMy Partner
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() => handleCustomizeProduct(product)}
                                                        style={{ position: 'absolute', bottom: 15, right: 15, background: 'none', border: 'none', color: '#999', fontSize: '0.7rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                                                        <Plus size={12} /> HIZLI EKLE
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => handleCustomizeProduct(product)}
                                                    style={{ position: 'absolute', top: -10, right: -10, width: 32, height: 32, borderRadius: '50%', background: '#222', color: 'white', border: '3px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        ))}
                                        {brandProducts.length === 0 && <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 50, color: '#999' }}>Bu markaya ait ürün bulunamadı.</div>}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step: Customize Product (Finalize) */}
                    {addProductStep === 'customize-product' && productToCustomize && (
                        <div style={{ display: 'flex', height: '100%' }}>
                            {/* Left: Image Selection */}
                            <div style={{ width: 400, borderRight: '1px solid #eee', padding: 30, overflowY: 'auto' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 20, color: '#333', textTransform: 'uppercase', letterSpacing: '1px' }}>Bir Görsel Seçin</h3>

                                <div style={{ marginBottom: 20 }}>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 10, color: '#666' }}>Siteden seçilen:</div>
                                    <div
                                        onClick={() => setCustomDetails({ ...customDetails, imageUrl: productToCustomize.imageUrl || '' })}
                                        style={{
                                            border: customDetails.imageUrl === productToCustomize.imageUrl ? '2px solid black' : '1px solid #ddd',
                                            borderRadius: 8, padding: 20, cursor: 'pointer', textAlign: 'center'
                                        }}
                                    >
                                        <img src={productToCustomize.imageUrl || 'https://via.placeholder.com/150'} alt="Varsayılan" style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'contain', marginBottom: 10 }} />
                                        <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Varsayılan</div>
                                    </div>
                                </div>

                                {/* Placeholder for alternative images logic */}
                                <div style={{ marginBottom: 20 }}>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 10, color: '#666' }}>Özel Görsel Yükle</div>
                                    <button style={{
                                        width: '100%', padding: '15px', border: '1px dashed #ccc', borderRadius: 8, background: 'white', color: '#666',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600
                                    }}>
                                        <ImagePlus size={18} />
                                        Görsel Yükle
                                    </button>
                                </div>

                            </div>

                            {/* Right: Details & Options */}
                            <div style={{ flex: 1, padding: 30, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

                                <div style={{ marginBottom: 20 }}>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#999', marginBottom: 5 }}>TITLE</label>
                                    <input
                                        value={customDetails.title}
                                        onChange={(e) => setCustomDetails({ ...customDetails, title: e.target.value })}
                                        style={{ width: '100%', padding: '12px', borderRadius: 6, border: '1px solid #ddd', fontSize: '1rem', fontWeight: 600 }}
                                    />
                                </div>

                                <div style={{ marginBottom: 20 }}>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#999', marginBottom: 5 }}>AÇIKLAMA (Not)</label>
                                    <textarea
                                        value={customDetails.description}
                                        onChange={(e) => setCustomDetails({ ...customDetails, description: e.target.value })}
                                        placeholder="Neden sevdiğine dair daha fazla detay ekle..."
                                        style={{ width: '100%', padding: '12px', borderRadius: 6, border: '1px solid #ddd', fontSize: '0.9rem', minHeight: 100, }}
                                    />
                                </div>

                                {/* Toggles (Mocked UI) */}
                                <div style={{ marginBottom: 30 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f5f5f5' }}>
                                        <span style={{ fontSize: '0.9rem' }}>Link Kazancı</span>
                                        <div style={{ width: 40, height: 20, background: '#4ade80', borderRadius: 10, position: 'relative' }}><div style={{ width: 16, height: 16, background: 'white', borderRadius: '50%', position: 'absolute', top: 2, right: 2 }}></div></div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f5f5f5' }}>
                                        <span style={{ fontSize: '0.9rem' }}>"En Son Favoriler"de Göster</span>
                                        <div style={{ width: 40, height: 20, background: '#4ade80', borderRadius: 10, position: 'relative' }}><div style={{ width: 16, height: 16, background: 'white', borderRadius: '50%', position: 'absolute', top: 2, right: 2 }}></div></div>
                                    </div>
                                </div>

                                <div style={{ marginTop: 'auto' }}>
                                    <button
                                        onClick={handleFinalizeAddProduct}
                                        style={{ width: '100%', background: '#333', color: 'white', padding: '18px', borderRadius: 8, fontSize: '1rem', fontWeight: 700, border: 'none', cursor: 'pointer', letterSpacing: '1px', textTransform: 'uppercase' }}
                                    >
                                        ÜRÜN EKLE
                                    </button>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    if (!isOpen) return null;

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.95)' }}>
            <div style={{ width: '100%', maxWidth: 1000, height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>

                {/* Close Button */}
                <button onClick={onClose} style={{ position: 'absolute', top: 30, right: 30, background: 'none', border: 'none', cursor: 'pointer' }}>
                    <X size={32} strokeWidth={1.5} />
                </button>

                {/* Settings Toggle */}
                <div style={{ position: 'absolute', top: 30, right: 100 }}>
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f5f5f5', border: 'none', padding: '8px 16px', borderRadius: 20, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500 }}
                    >
                        <Settings size={16} />
                        Ayarlar
                    </button>
                    {/* Settings Popup */}
                    {showSettings && (
                        <div style={{ position: 'absolute', top: '120%', right: 0, width: 250, background: 'white', borderRadius: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.1)', padding: 15, border: '1px solid #eee', zIndex: 20 }}>
                            <div style={{ marginBottom: 15 }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 8 }}>Görünürlük</label>
                                <div style={{ display: 'flex', gap: 10 }}>
                                    <button onClick={() => setIsVisible(true)} style={{ flex: 1, padding: 8, borderRadius: 6, border: isVisible ? '1px solid black' : '1px solid #ddd', background: isVisible ? 'black' : 'white', color: isVisible ? 'white' : 'black', fontSize: '0.8rem' }}>Açık</button>
                                    <button onClick={() => setIsVisible(false)} style={{ flex: 1, padding: 8, borderRadius: 6, border: !isVisible ? '1px solid black' : '1px solid #ddd', background: !isVisible ? 'black' : 'white', color: !isVisible ? 'white' : 'black', fontSize: '0.8rem' }}>Gizli</button>
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 8 }}>Düzen</label>
                                <select
                                    value={layoutType}
                                    onChange={(e) => setLayoutType(e.target.value)}
                                    style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ddd', fontSize: '0.85rem' }}
                                >
                                    <option value="grid">Grid (Varsayılan)</option>
                                    <option value="list">Liste</option>
                                    <option value="carousel">Kaydırmalı</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '80px 40px 40px 40px', maxWidth: 800, margin: '0 auto', width: '100%' }}>

                    {/* Title Input */}
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Koleksiyon adını girin"
                        style={{
                            fontSize: '3.5rem',

                            border: 'none',
                            outline: 'none',
                            width: '100%',
                            background: 'transparent',
                            marginBottom: 10,
                            color: title === 'Koleksiyon adını girin' ? '#999' : 'black'
                        }}
                        onFocus={() => { if (title === 'Koleksiyon adını girin') setTitle(''); }}
                        onBlur={() => { if (title === '') setTitle('Koleksiyon adını girin'); }}
                    />

                    {/* Description Input */}
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Koleksiyonunu açıkla (isteğe bağlı)"
                        style={{
                            fontSize: '1.2rem',
                            border: 'none',
                            outline: 'none',
                            width: '100%',
                            background: 'transparent',
                            marginBottom: 60,
                            color: '#666'
                        }}
                    />

                    {/* Add Product Area */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 40 }}>

                        {/* Empty State */}
                        <div style={{ textAlign: 'center' }}>
                            <button
                                onClick={() => { setAddProductOpen(true); setAddProductStep('initial'); }}
                                style={{
                                    width: 60, height: 60, borderRadius: '50%', background: '#333', color: 'white', border: 'none',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', margin: '0 auto 15px auto',
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                                }}
                            >
                                <Plus size={30} />
                            </button>
                            <div style={{ fontSize: '1rem', fontWeight: 500, color: '#333', letterSpacing: '1px' }}>ÜRÜN EKLE</div>
                        </div>

                    </div>

                </div>

                {/* Footer Actions */}
                <div style={{ padding: '30px 60px', borderTop: '1px solid #eee', display: 'flex', justifyContent: section ? 'space-between' : 'flex-end', gap: 20 }}>
                    {section && onDelete && (
                        <button onClick={() => {
                            if (window.confirm("Bu koleksiyonu silmek istediğinize emin misiniz?")) {
                                onDelete(section.id);
                            }
                        }} style={{ background: '#ffeeee', color: '#ff4444', padding: '15px 40px', borderRadius: 8, fontSize: '0.9rem', fontWeight: 600, border: 'none', cursor: 'pointer', letterSpacing: '1px' }}>
                            SİL
                        </button>
                    )}
                    <button onClick={handleSave} style={{ background: 'black', color: 'white', padding: '15px 40px', borderRadius: 8, fontSize: '0.9rem', fontWeight: 600, border: 'none', cursor: 'pointer', letterSpacing: '1px' }}>
                        {section ? 'DEĞİŞİKLİKLERİ KAYDET' : 'KOLEKSİYON OLUŞTUR'}
                    </button>
                </div>

            </div>

            {renderAddProductModal()}

        </div>
    );
}
