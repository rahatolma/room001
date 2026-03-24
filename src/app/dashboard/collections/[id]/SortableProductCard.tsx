import React from 'react';
import Image from 'next/image';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, GripVertical } from 'lucide-react';

export function SortableProductCard({ item, handleRemoveItem }: { item: any; handleRemoveItem: (id: string) => void }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
    const product = item.product;

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || 'box-shadow 0.2s',
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.8 : 1,
    };

    return (
        <div ref={setNodeRef} style={{ ...style, border: '1px solid #eaeaea', borderRadius: 20, overflow: 'hidden', background: 'white', position: 'relative', boxShadow: isDragging ? '0 10px 30px rgba(0,0,0,0.1)' : 'none' }}>
            {/* Image Area */}
            <div style={{ height: 260, position: 'relative', background: '#f5f5f5' }}>
                {product.imageUrl ? (
                    <Image src={product.imageUrl} alt={product.title} fill style={{ objectFit: 'cover' }} />
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999' }}>Görsel Yok</div>
                )}

                {/* Action Overlays */}
                <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6 }}>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleRemoveItem(product.id); }}
                        style={{ width: 32, height: 32, borderRadius: '50%', background: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', color: '#ef4444' }}
                        title="Koleksiyondan Çıkar"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
                <div style={{ position: 'absolute', top: 12, left: 12 }}>
                    <div {...attributes} {...listeners} style={{ width: 32, height: 32, borderRadius: '50%', background: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'grab', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', color: '#666' }}>
                        <GripVertical size={16} />
                    </div>
                </div>

                {/* Commission Badge (Mock logic based on brand) */}
                {product.brand && (
                    <div style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(0,0,0,0.7)', color: 'white', padding: '4px 10px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 600, backdropFilter: 'blur(4px)' }}>
                        %{Number(product.brand.commissionRate || 10)} Komisyon
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div style={{ padding: 16 }}>
                <div style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
                    {product.brand?.name || 'DIŞ LİNK'}
                </div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '0.95rem', fontWeight: 600, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4 }}>
                    {product.title}
                </h3>
                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                    {product.price ? `${product.price} TL` : 'Fiyat Yok'}
                </div>
            </div>
        </div>
    );
}
