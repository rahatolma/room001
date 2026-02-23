'use client';

import React, { useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Edit2, Archive, BarChart2, Plus, X } from 'lucide-react';
import { updateCollectionsOrder, deleteCollection, createCollection } from '@/actions/collections';
import Button from '@/components/Button';

interface Collection {
    id: string;
    title: string;
    description?: string | null;
    displayOrder: number;
    _count?: {
        items: number;
    };
}

interface SortableCollectionItemProps {
    id: string;
    collection: Collection;
    onDelete: (id: string) => void;
}

function SortableCollectionItem({ id, collection, onDelete }: SortableCollectionItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.8 : 1,
        marginBottom: 12,
        backgroundColor: 'white',
        borderRadius: 8,
        border: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        padding: '16px 20px',
        boxShadow: isDragging ? '0 10px 20px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.05)',
        cursor: 'grab',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            {/* Grip Handle Only */}
            <div {...listeners} style={{ marginRight: 16, cursor: 'grab', color: '#9ca3af', display: 'flex', alignItems: 'center' }}>
                <GripVertical size={20} />
            </div>

            <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#111827' }}>
                    {collection.title}
                </h3>
                <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: 4, display: 'flex', gap: 12 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Archive size={14} /> {collection._count?.items || 0} Ürün
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <BarChart2 size={14} /> {(collection._count?.items || 0) * 12} Görüntülenme
                    </span>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
                <button
                    onClick={() => onDelete(collection.id)}
                    style={{ padding: 8, borderRadius: 6, border: 'none', background: '#fee2e2', cursor: 'pointer', color: '#ef4444' }}
                    title="Sil"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
}

export default function SortableCollectionList({ initialCollections }: { initialCollections: Collection[] }) {
    const [items, setItems] = useState(initialCollections);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('');

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setItems((prevItems) => {
                const oldIndex = prevItems.findIndex((item) => item.id === active.id);
                const newIndex = prevItems.findIndex((item) => item.id === over.id);

                const newOrder = arrayMove(prevItems, oldIndex, newIndex);

                // Call Backend Optimistically
                const updates = newOrder.map((item, index) => ({
                    id: item.id,
                    displayOrder: index + 1
                }));

                updateCollectionsOrder(updates);

                return newOrder;
            });
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Bu koleksiyonu silmek istediğinize emin misiniz?')) {
            const result = await deleteCollection(id);
            if (result.success) {
                setItems(items.filter(i => i.id !== id));
            } else {
                alert('Silinemedi: ' + result.error);
            }
        }
    };

    const handleCreate = async () => {
        if (!newTitle.trim()) return;

        const result = await createCollection(newTitle);
        if (result.success && result.collection) {
            setItems([...items, result.collection]);
            setNewTitle('');
            setIsModalOpen(false);
        } else {
            alert('Hata: ' + result.error);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Koleksiyonların</h2>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus size={16} style={{ marginRight: 8 }} />
                    Yeni Ekle
                </Button>
            </div>

            {/* Add Modal */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div style={{ background: 'white', borderRadius: 12, padding: 24, width: 400, position: 'relative' }}>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            style={{ position: 'absolute', top: 10, right: 10, border: 'none', background: 'transparent', cursor: 'pointer' }}
                        >
                            <X size={20} />
                        </button>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 16 }}>Yeni Koleksiyon</h3>
                        <input
                            type="text"
                            placeholder="Koleksiyon Adı (Örn: Yaz Favorileri)"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8, marginBottom: 20, fontSize: '1rem' }}
                        />
                        <Button fullWidth onClick={handleCreate}>Oluştur</Button>
                    </div>
                </div>
            )}

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={items.map(i => i.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {items.length === 0 ? (
                            <div style={{ padding: 40, textAlign: 'center', color: '#999', border: '2px dashed #eee', borderRadius: 12 }}>
                                Henüz hiç koleksiyon yok.
                            </div>
                        ) : (
                            items.map((collection) => (
                                <SortableCollectionItem
                                    key={collection.id}
                                    id={collection.id}
                                    collection={collection}
                                    onDelete={handleDelete}
                                />
                            ))
                        )}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}
