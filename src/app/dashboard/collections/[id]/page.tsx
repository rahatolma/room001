'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Trash2, Plus, GripVertical, Settings, Copy } from 'lucide-react';
import { getCollectionDetails, removeProductFromCollection, updateCollectionItemOrder } from '@/actions/collections';
import { toast } from 'sonner';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable';
import { SortableProductCard } from './SortableProductCard';

export default function CollectionDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [collection, setCollection] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCollection();
    }, [params.id]);

    const loadCollection = async () => {
        const data = await getCollectionDetails(params.id);
        if (!data) {
            toast.error('Koleksiyon bulunamadı.');
            router.push('/dashboard/collections');
            return;
        }
        setCollection(data);
        setLoading(false);
    };

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = collection.items.findIndex((i: any) => i.id === active.id);
            const newIndex = collection.items.findIndex((i: any) => i.id === over.id);

            const newItems = arrayMove(collection.items, oldIndex, newIndex);
            const updatedItems = newItems.map((item: any, index: number) => ({
                ...item,
                displayOrder: index
            }));

            // Optimistic update
            setCollection({ ...collection, items: updatedItems });

            // API update
            const payload = updatedItems.map((i: any) => ({ id: i.id, displayOrder: i.displayOrder }));
            const res = await updateCollectionItemOrder(collection.id, payload);
            if (!res.success) {
                toast.error('Sıralama kaydedilemedi.');
                loadCollection(); // Rollback
            }
        }
    };

    const handleCopyLink = () => {
        const username = collection?.user?.username || collection?.userId;
        const url = `${window.location.origin}/${username}/c/${collection.id}`;
        navigator.clipboard.writeText(url);
        toast.success("Koleksiyon linki kopyalandı!");
    };

    const handleRemoveItem = async (productId: string) => {
        if (!confirm('Bu ürünü koleksiyondan çıkarmak istediğinize emin misiniz?')) return;

        const res = await removeProductFromCollection(params.id, productId);
        if (res.success) {
            toast.success('Ürün çıkarıldı.');
            setCollection((prev: any) => ({
                ...prev,
                items: prev.items.filter((item: any) => item.productId !== productId)
            }));
        } else {
            toast.error(res.error || 'Bir hata oluştu.');
        }
    };

    if (loading) {
        return <div style={{ padding: 40, textAlign: 'center' }}>Koleksiyon Yükleniyor...</div>;
    }

    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', paddingBottom: 50 }}>
            {/* HER0 / HEADER HEADER */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 40 }}>
                <div>
                    <button
                        onClick={() => router.push('/dashboard/collections')}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#666', cursor: 'pointer', marginBottom: 15, padding: 0, fontWeight: 500 }}
                    >
                        <ArrowLeft size={16} />
                        Koleksiyonlara Dön
                    </button>
                    <h1 style={{ fontSize: '2.5rem', margin: 0, letterSpacing: '-0.02em' }}>{collection.title}</h1>
                    <p style={{ color: '#666', marginTop: 8 }}>{collection.items.length} ürün listeleniyor.</p>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={handleCopyLink} style={{ padding: '10px 16px', borderRadius: 12, border: '1px solid #ddd', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
                        <Copy size={18} />
                        Link Kopyala
                    </button>
                    <button style={{ padding: '10px 16px', borderRadius: 12, border: '1px solid #ddd', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
                        <Settings size={18} />
                        Koleksiyon Ayarları
                    </button>
                    <button
                        onClick={() => router.push(`/dashboard/products/add?collection=${collection.id}`)}
                        style={{ padding: '10px 20px', borderRadius: 12, border: 'none', background: 'black', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}
                    >
                        <Plus size={18} />
                        Ürün Ekle
                    </button>
                </div>
            </div>

            {/* PRODUCT GRID */}
            {collection.items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 80, background: '#f9f9f9', borderRadius: 24, border: '2px dashed #eaeaea' }}>
                    <div style={{ width: 64, height: 64, background: '#eee', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                        <Plus size={32} color="#999" />
                    </div>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.25rem' }}>Bu koleksiyon henüz boş</h3>
                    <p style={{ color: '#666', margin: '0 0 24px 0' }}>Takipçilerinle paylaşmak için hemen ürün eklemeye başla.</p>
                    <button
                        onClick={() => router.push(`/dashboard/products/add?collection=${collection.id}`)}
                        style={{ padding: '12px 24px', background: 'black', color: 'white', borderRadius: 12, border: 'none', cursor: 'pointer', fontWeight: 600 }}
                    >
                        Ürün Ekle
                    </button>
                </div>
            ) : (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={collection.items.map((i: any) => i.id)} strategy={rectSortingStrategy}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24 }}>
                            {collection.items.map((item: any) => (
                                <SortableProductCard key={item.id} item={item} handleRemoveItem={handleRemoveItem} />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            )}
        </div>
    );
}
