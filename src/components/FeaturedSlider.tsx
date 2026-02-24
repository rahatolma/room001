'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { GridItem } from '@/types/shop';
import ImageFallback from './ImageFallback';

interface FeaturedSliderProps {
    items: GridItem[];
    type: 'curator' | 'circle' | 'brand' | 'category';
}

const FeaturedSlider: React.FC<FeaturedSliderProps> = ({ items, type }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!items || items.length === 0) return null;

    const activeItem = items[activeIndex];

    // Helper for Turkish grammar
    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'curator': return 'INSIDER';
            case 'circle': return 'KOLEKTİF';
            case 'brand': return 'MARKA';
            case 'category': return 'KATEGORİ';
            default: return type.toUpperCase();
        }
    };

    const getShopByLabel = (type: string) => {
        switch (type) {
            case 'curator': return 'Öne Çıkan Insider';
            case 'brand': return 'Öne Çıkan Marka';
            case 'circle': return 'Öne Çıkan Kolektif';
            default: return 'Keşfet';
        }
    };

    const getSearchPlaceholder = (type: string) => {
        switch (type) {
            case 'curator': return 'Tüm Insiderlar Arasında Ara...';
            case 'brand': return 'Tüm Markalar Arasında Ara...';
            case 'circle': return 'Tüm Kolektifler Arasında Ara...';
            default: return 'Ara...';
        }
    };

    const getItemLink = (item: GridItem) => {
        if (type === 'curator') return `/${item.slug}`;
        if (type === 'brand') return `/brands/${item.slug}`;
        if (type === 'circle') return `/circles/${item.slug}`;
        if (type === 'category') return `/categories/${item.slug}`;
        return `/${type}/${item.slug}`;
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    };

    return (
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden', backgroundColor: '#fff', paddingTop: 40, paddingBottom: 60 }}>
            {/* Desktop Layout Helper Container */}
            <div className="featured-slider-container" style={{
                maxWidth: 'var(--max-width)',
                margin: '0 auto',
                padding: '0 var(--page-padding-x)',
                display: 'flex',
                gap: '5%',
                alignItems: 'center'
            }}>

                {/* LEFT CONTENT AREA */}
                <div style={{ flex: '0 0 40%', position: 'relative', zIndex: 10 }}>
                    {/* Navigation Dots */}
                    <div style={{ display: 'flex', gap: 8, marginBottom: 40 }}>
                        {items.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    background: idx === activeIndex ? '#333' : '#e0e0e0',
                                    border: 'none',
                                    padding: 0,
                                    cursor: 'pointer',
                                    transition: 'background 0.3s ease'
                                }}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>

                    {/* Shop By Line */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 10 }}>
                        <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.2rem', color: '#111' }}>
                            {getShopByLabel(type)}
                        </span>
                        <div style={{ height: 1, flex: 1, backgroundColor: '#eaeaea' }} />
                    </div>

                    {/* Watermark & Title Container */}
                    <div style={{ position: 'relative', marginBottom: 20 }}>
                        {/* Huge Watermark */}
                        <div style={{
                            position: 'absolute',
                            top: -40,
                            left: -20,
                            fontSize: '8rem',
                            fontFamily: 'var(--font-playfair), Georgia, serif',
                            color: '#f5f5f5',
                            zIndex: -1,
                            letterSpacing: '-2px',
                            whiteSpace: 'nowrap',
                            pointerEvents: 'none',
                            userSelect: 'none'
                        }}>
                            {getTypeLabel(type)}
                        </div>

                        {/* Title (Animated per slide) */}
                        <AnimatePresence mode="wait">
                            <motion.h1
                                key={activeItem.title}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.4 }}
                                style={{
                                    fontFamily: 'var(--font-playfair), Georgia, serif',
                                    fontSize: '3.5rem',
                                    fontWeight: 400,
                                    lineHeight: 1.1,
                                    color: '#000',
                                    margin: '40px 0 20px 0'
                                }}
                            >
                                {activeItem.title}
                            </motion.h1>
                        </AnimatePresence>
                    </div>

                    {/* Description */}
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={`desc-${activeItem.title}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            style={{
                                fontSize: '0.95rem',
                                color: '#666',
                                lineHeight: 1.6,
                                marginBottom: 40,
                                maxWidth: '90%'
                            }}
                        >
                            {activeItem.subtitle || "Stil önerileri, seçilmiş özel ürünler ve daha fazlası için profili ziyaret edin."}
                        </motion.p>
                    </AnimatePresence>

                    {/* Expanded Search Button Action */}
                    <div style={{ marginTop: 10 }}>
                        <Link href={`/${type === 'curator' ? 'creators' : type + 's'}`} style={{ textDecoration: 'none' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                background: '#f8f8f8',
                                border: '1px solid #eaeaea',
                                padding: '14px 24px',
                                borderRadius: 30,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                maxWidth: 400
                            }}
                                onMouseOver={(e) => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.background = '#fff'; }}
                                onMouseOut={(e) => { e.currentTarget.style.borderColor = '#eaeaea'; e.currentTarget.style.background = '#f8f8f8'; }}
                            >
                                <Search size={20} color="#666" style={{ marginRight: 15 }} />
                                <span style={{ color: '#666', fontSize: '0.95rem', fontWeight: 500, flex: 1 }}>
                                    {getSearchPlaceholder(type)}
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* RIGHT IMAGES CAROUSEL */}
                <div style={{ flex: '1', position: 'relative' }}>

                    {/* Image Track */}
                    <div style={{ position: 'relative', height: 500, width: '100%', overflow: 'hidden' }}>
                        {/* We use specific width items and animate the container's X position */}
                        <motion.div
                            animate={{
                                x: `calc(-${activeIndex * 360}px - ${activeIndex * 20}px)`
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            style={{
                                display: 'flex',
                                gap: 20,
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%'
                            }}
                        >
                            {items.map((item, idx) => {
                                // Calculate scale based on whether it is the active item or next items
                                const isActive = idx === activeIndex;
                                const isPast = idx < activeIndex;

                                return (
                                    <motion.div
                                        key={item.id || idx}
                                        animate={{
                                            opacity: isPast ? 0 : (isActive ? 1 : 0.8),
                                            scale: isActive ? 1 : 0.95,
                                            filter: isActive ? 'blur(0px)' : 'blur(0px)' // Optional: can add blur to inactive
                                        }}
                                        transition={{ duration: 0.4 }}
                                        style={{
                                            width: 360,
                                            height: '100%',
                                            position: 'relative',
                                            flexShrink: 0,
                                            cursor: 'pointer',
                                            transformOrigin: 'center left'
                                        }}
                                        onClick={() => setActiveIndex(idx)}
                                    >
                                        <ImageFallback
                                            src={item.imageUrl}
                                            alt={item.title || 'Image'}
                                            fill
                                            style={{
                                                objectFit: 'cover',
                                                backgroundColor: '#f5f5f5' // Placeholder color
                                            }}
                                            sizes="400px"
                                        />
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Navigation Arrows */}
                    <div style={{ display: 'flex', gap: 15, marginTop: 25 }}>
                        <button
                            onClick={handlePrev}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                width: 44, height: 44, borderRadius: '50%', border: '1px solid #111',
                                background: 'transparent', color: '#111', cursor: 'pointer',
                                transition: 'background 0.2s, color 0.2s'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.background = '#111'; e.currentTarget.style.color = '#fff'; }}
                            onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#111'; }}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={handleNext}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                width: 44, height: 44, borderRadius: '50%', border: '1px solid #111',
                                background: 'transparent', color: '#111', cursor: 'pointer',
                                transition: 'background 0.2s, color 0.2s'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.background = '#111'; e.currentTarget.style.color = '#fff'; }}
                            onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#111'; }}
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 900px) {
                    .featured-slider-container {
                        flex-direction: column !important;
                        gap: 40px !important;
                    }
                    .featured-slider-container > div {
                        flex: 1 1 100% !important;
                        width: 100% !important;
                    }
                }
            `}} />
        </div>
    );
};

export default FeaturedSlider;
