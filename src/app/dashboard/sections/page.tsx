'use client';

import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableCollectionList } from '@/components/SortableCollectionList';
import { Plus, Search } from 'lucide-react';
import Button from '@/components/Button';

// --- MOCK DATA ---
const INITIAL_COLLECTIONS = [
    { id: '1', title: 'Yaz Favorileri', productCount: 12, visibility: 'public' },
    { id: '2', title: 'Ofis Şıklığı', productCount: 8, visibility: 'private' },
    { id: '3', title: 'Cilt Bakım Rutinim', productCount: 5, visibility: 'public' },
    { id: '4', title: 'Spor & Aktivite', productCount: 20, visibility: 'public' },
    { id: '5', title: 'Ev Dekorasyonu', productCount: 3, visibility: 'private' },
];

export default function CollectionsPage() {
    const [collections, setCollections] = useState(INITIAL_COLLECTIONS);
    const [searchTerm, setSearchTerm] = useState('');

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setCollections((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const filteredCollections = collections.filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ maxWidth: 1000, paddingBottom: 100, fontFamily: 'sans-serif' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontFamily: 'serif', margin: 0, marginBottom: 10 }}>Koleksiyonlar</h1>
                    <p style={{ color: '#666' }}>Mağazanızdaki ürünleri organize edin ve paylaşın.</p>
                </div>
                <Button style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'black', color: 'white' }}>
                    <Plus size={18} /> YENİ KOLEKSİYON
                </Button>
            </div>

            {/* Search & Filter Bar */}
            <div style={{ background: 'white', padding: 15, borderRadius: 8, border: '1px solid #eee', marginBottom: 20, display: 'flex', gap: 10 }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                    <input
                        type="text"
                        placeholder="Koleksiyon ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: 6, border: '1px solid #ddd', fontSize: '0.9rem' }}
                    />
                </div>
                <select style={{ padding: '0 15px', borderRadius: 6, border: '1px solid #ddd', background: 'white', fontSize: '0.9rem', color: '#666' }}>
                    <option>Tümü</option>
                    <option>Yayında olanlar</option>
                    <option>Gizli olanlar</option>
                </select>
            </div>

            {/* Drag & Drop Context */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={filteredCollections}
                    strategy={verticalListSortingStrategy}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {filteredCollections.map((col) => (
                            <SortableCollectionList key={col.id} id={col.id} title={col.title} count={col.productCount} visibility={col.visibility} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {filteredCollections.length === 0 && (
                <div style={{ textAlign: 'center', padding: 50, color: '#999' }}>
                    Koleksiyon bulunamadı.
                </div>
            )}

        </div>
    );
}
