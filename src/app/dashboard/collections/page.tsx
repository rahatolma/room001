"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getMyCollections, updateCollectionOrder } from '@/actions/admin';
import Button from '@/components/Button';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import Link from 'next/link';

// Sortable Item Component
function SortableItem(props: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        display: 'flex',
        alignItems: 'center',
        padding: '15px 20px',
        background: 'white',
        border: '1px solid #eee',
        borderRadius: '8px',
        marginBottom: '10px',
        justifyContent: 'space-between',
        boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                <div {...listeners} style={{ cursor: 'grab', color: '#ccc', padding: 5 }}>
                    <GripVertical size={20} />
                </div>
                <div>
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>{props.title}</h3>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>{props.productCount} Ürün</span>
                </div>
            </div>
            <div>
                <Link href={`/dashboard/collections/${props.id}`} style={{ fontSize: '0.9rem', textDecoration: 'underline', color: 'black' }}>Düzenle</Link>
            </div>
        </div>
    );
}

export default function CollectionsPage() {
    const { user } = useAuth();
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        if (user) {
            getMyCollections(user.id).then(data => {
                setItems(data);
                setLoading(false);
            });
        }
    }, [user]);

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over?.id);
                const newItems = arrayMove(items, oldIndex, newIndex);

                // Update server (Fire and forget, or handle error separately)
                const orderUpdates = newItems.map((item, index) => ({
                    id: item.id,
                    displayOrder: index
                }));
                // We don't await here to keep UI responsive, but in prod we might want toast notification
                updateCollectionOrder(orderUpdates);

                return newItems;
            });
        }
    }

    if (loading) return <div style={{ padding: 40 }}>Yükleniyor...</div>;

    return (
        <div style={{ maxWidth: 800 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: 10 }}>Koleksiyon Vitrini</h1>
                    <p style={{ color: '#666' }}>Koleksiyonlarınızı sürükleyip bırakarak vitrindeki sırasını değiştirin.</p>
                </div>
                <Button href="/dashboard/collections/new">Yeni Koleksiyon</Button>
            </div>

            {items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 60, background: '#f9f9f9', borderRadius: 12 }}>
                    <p style={{ marginBottom: 20, color: '#666' }}>Henüz hiç koleksiyonunuz yok.</p>
                    <Button href="/dashboard/collections/new">İlk Koleksiyonunu Oluştur</Button>
                </div>
            ) : (
                <div style={{ background: '#fcfcfc', padding: 20, borderRadius: 12, border: '1px solid #f0f0f0' }}>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={items}
                            strategy={verticalListSortingStrategy}
                        >
                            {items.map(item => (
                                <SortableItem
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    productCount={item.productCount}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>
            )}
        </div>
    );
}
