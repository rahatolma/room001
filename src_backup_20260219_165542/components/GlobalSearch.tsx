'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { searchGlobal, SearchResult } from '@/actions/search';
import Image from 'next/image';
import Link from 'next/link';

export default function GlobalSearch() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length >= 2) {
                setLoading(true);
                const data = await searchGlobal(query);
                setResults(data);
                setLoading(false);
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (url: string) => {
        setIsOpen(false);
        setQuery('');
        router.push(url);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && query.length >= 2) {
            setIsOpen(false);
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div ref={searchRef} style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Search size={18} style={{ position: 'absolute', left: 10, color: '#999' }} />
                <input
                    type="text"
                    placeholder="Ara (Küratör, Ürün, Marka)..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    style={{
                        width: '100%',
                        padding: '10px 10px 10px 35px',
                        border: '1px solid #eee',
                        borderRadius: '4px',
                        fontSize: '0.9rem',
                        outline: 'none',
                        backgroundColor: '#f9f9f9',
                        fontFamily: 'inherit'
                    }}
                />
            </div>

            {isOpen && query.length >= 2 && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    marginTop: 5,
                    zIndex: 1000,
                    maxHeight: '400px',
                    overflowY: 'auto'
                }}>
                    {loading ? (
                        <div style={{ padding: 20, textAlign: 'center', color: '#999' }}>Aranıyor...</div>
                    ) : results.length > 0 ? (
                        <>
                            {results.some(r => r.type === 'curator') && (
                                <div style={{ padding: '10px 15px', fontSize: '0.75rem', color: '#999', fontWeight: 600 }}>KÜRATÖRLER</div>
                            )}
                            {results.filter(r => r.type === 'curator').map(result => (
                                <Link
                                    key={result.id}
                                    href={result.url}
                                    onClick={() => handleSelect(result.url)}
                                    style={{ display: 'flex', alignItems: 'center', padding: '10px 15px', textDecoration: 'none', color: 'inherit', borderBottom: '1px solid #f5f5f5' }}
                                >
                                    <div style={{ width: 30, height: 30, borderRadius: '50%', overflow: 'hidden', marginRight: 10, position: 'relative' }}>
                                        {result.image && <Image src={result.image} alt={result.title} fill style={{ objectFit: 'cover' }} />}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{result.title}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#666' }}>{result.subtitle}</div>
                                    </div>
                                </Link>
                            ))}

                            {/* Products & Brands Sections similar logic... simple map for now */}
                            {results.filter(r => r.type !== 'curator').map(result => (
                                <Link
                                    key={result.id}
                                    href={result.url}
                                    onClick={() => handleSelect(result.url)}
                                    style={{ display: 'flex', alignItems: 'center', padding: '10px 15px', textDecoration: 'none', color: 'inherit', borderBottom: '1px solid #f5f5f5' }}
                                >
                                    {result.image && (
                                        <div style={{ width: 30, height: 30, borderRadius: '4px', overflow: 'hidden', marginRight: 10, position: 'relative' }}>
                                            <Image src={result.image} alt={result.title} fill style={{ objectFit: 'cover' }} />
                                        </div>
                                    )}
                                    <div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{result.title}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#666' }}>{result.type === 'brand' ? 'Marka' : result.subtitle}</div>
                                    </div>
                                </Link>
                            ))}

                            <Link
                                href={`/search?q=${encodeURIComponent(query)}`}
                                onClick={() => setIsOpen(false)}
                                style={{
                                    display: 'block',
                                    padding: '12px 15px',
                                    textAlign: 'center',
                                    fontSize: '0.9rem',
                                    color: 'var(--color-primary)',
                                    fontWeight: 500,
                                    borderTop: '1px solid #eee',
                                    background: '#fafafa'
                                }}
                            >
                                Tüm sonuçları gör
                            </Link>
                        </>
                    ) : (
                        <div style={{ padding: 20, textAlign: 'center', color: '#999' }}>Sonuç bulunamadı.</div>
                    )}
                </div>
            )}
        </div>
    );
}
