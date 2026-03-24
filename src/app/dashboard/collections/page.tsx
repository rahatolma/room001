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
import { GripVertical, FolderOpen, ArrowRight } from 'lucide-react';
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
        padding: '24px 30px',
        background: 'white',
        border: '1px solid #eaeaea',
        borderRadius: '20px',
        marginBottom: '16px',
        justifyContent: 'space-between',
        boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
        cursor: 'default'
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} className="hover:shadow-md hover:-translate-y-1 transition-all">
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <div {...listeners} style={{ cursor: 'grab', color: '#999', padding: 12, background: '#f5f5f5', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }} className="hover:bg-gray-200 hover:text-black">
                    <GripVertical size={20} />
                </div>
                <div>
                    <h3 style={{ margin: '0 0 6px 0', fontSize: '1.25rem', fontWeight: 700, color: '#111' }}>{props.title}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 700, background: '#ecfdf5', padding: '4px 10px', borderRadius: 20 }}>
                            {props.productCount} Ürün
                        </span>
                        <span style={{ fontSize: '0.85rem', color: '#666' }}>Sürükle bırak ile sırayı değiştir</span>
                    </div>
                </div>
            </div>
            <div>
                <Link href={`/dashboard/collections/${props.id}`} style={{ fontSize: '0.95rem', background: 'linear-gradient(90deg, #111 0%, #333 100%)', color: 'white', padding: '12px 24px', borderRadius: 12, textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    İçeriği Yönet
                    <ArrowRight size={16} />
                </Link>
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

                // Update server
                const orderUpdates = newItems.map((item, index) => ({
                    id: item.id,
                    displayOrder: index
                }));
                updateCollectionOrder(orderUpdates);

                return newItems;
            });
        }
    }

    if (loading) return <div style={{ padding: 40, textAlign: 'center', color: '#666', fontSize: '1.1rem' }}>Vitrinler Yükleniyor...</div>;

    return (
        <div style={{ maxWidth: 850 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, borderBottom: '1px solid #eaeaea', paddingBottom: 20 }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 10px 0', letterSpacing: '-0.03em', color: '#111' }}>Koleksiyon Vitrini</h1>
                    <p style={{ color: '#666', fontSize: '1.1rem', margin: 0 }}>Vitrinlerinizi sürükleyip bırakarak profilinizdeki sırasını değiştirin.</p>
                </div>
                <Link href="/dashboard/collections/new" style={{ padding: '14px 28px', background: 'linear-gradient(90deg, #111 0%, #333 100%)', color: 'white', borderRadius: 100, textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    Yeni Vitrin Ekle
                </Link>
            </div>

            {items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '100px 20px', background: 'linear-gradient(180deg, #fafafa 0%, #ffffff 100%)', borderRadius: 32, border: '1px dashed #e0e0e0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
                        <FolderOpen size={36} color="#aaa" />
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 12px 0', letterSpacing: '-0.02em', color: '#111' }}>Henüz Bir Koleksiyonun Yok</h2>
                    <p style={{ color: '#666', marginBottom: 36, fontSize: '1.1rem', maxWidth: 450 }}>Ürünlerinizi kategorize ederek takipçileriniz için muhteşem vitrinler oluşturun.</p>
                    <Link href="/dashboard/collections/new" style={{ padding: '14px 32px', background: 'black', color: 'white', borderRadius: 100, textDecoration: 'none', fontWeight: 600, display: 'inline-block', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                        İlk Vitrinini Oluştur
                    </Link>
                </div>
            ) : (
                <div style={{ background: '#fdfdfd', padding: 24, borderRadius: 24, border: '1px solid #f0f0f0', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
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
