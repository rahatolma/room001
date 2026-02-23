'use client';

import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableCollectionList } from '@/components/SortableCollectionList';
import { Plus, Search } from 'lucide-react';
import Button from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { getMyCollections, updateCollectionOrder } from '@/actions/admin';



export default function CollectionsPage() {
    const { user } = useAuth();
    const [collections, setCollections] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (user?.id) {
            loadCollections();
        }
    }, [user?.id]);

    const loadCollections = async () => {
        try {
            const data = await getMyCollections(user!.id);
            setCollections(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = async (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setCollections((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);

                // Persist order
                const updates = newItems.map((item, index) => ({
                    id: item.id,
                    displayOrder: index
                }));
                updateCollectionOrder(updates); // Optimistic update

                return newItems;
            });
        }
    };

    const filteredCollections = collections.filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>Yükleniyor...</div>;

    return (
        <div style={{ maxWidth: 1000, paddingBottom: 100, fontFamily: 'sans-serif' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontFamily: 'serif', margin: 0, marginBottom: 10 }}>Koleksiyonlar (Menü Başlıkları)</h1>
                    <p style={{ color: '#666' }}>Mağazanızdaki bölümleri ve ürünleri organize edin.</p>
                </div>
                <Button onClick={() => window.open(`/${user?.username}`, '_blank')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'black', color: 'white' }}>
                    <Plus size={18} /> YENİ KOLEKSİYON (Profilde Düzenle)
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
                    Henüz hiç koleksiyonunuz yok. Profil sayfanıza giderek ekleyebilirsiniz.
                </div>
            )}

        </div>
    );
}
