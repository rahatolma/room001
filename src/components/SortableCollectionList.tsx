'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, MoreVertical, Eye, EyeOff } from 'lucide-react';

interface SortableCollectionListProps {
    id: string;
    title: string;
    count: number;
    visibility: string;
    onEdit: (id: string) => void;
    onToggleVisibility?: (id: string) => void; // Optional for now
}

export function SortableCollectionList({ id, title, count, visibility, onEdit, onToggleVisibility }: SortableCollectionListProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="sortable-item">
            <div style={{
                display: 'flex', alignItems: 'center', gap: 15, padding: 20,
                background: 'white', border: '1px solid #eee', borderRadius: 8,
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}>
                {/* Drag Handle */}
                <div {...attributes} {...listeners} style={{ cursor: 'grab', color: '#ccc', display: 'flex', alignItems: 'center' }}>
                    <GripVertical size={20} />
                </div>

                {/* Collection Preview (Square) */}
                <div style={{ width: 50, height: 50, background: '#f5f5f5', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#ddd' }}>
                    {/* Ideally replace with first product image */}
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#333' }}>{title}</h3>
                    <div style={{ fontSize: '0.8rem', color: '#999' }}>{count} Ürün • {visibility === 'public' ? 'Yayında' : 'Gizli'}</div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 10 }}>
                    <button style={{ padding: 8, borderRadius: 6, border: 'none', background: 'transparent', cursor: 'pointer', color: '#666' }}>
                        {visibility === 'public' ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                    <button style={{ padding: 8, borderRadius: 6, border: 'none', background: 'transparent', cursor: 'pointer', color: '#666' }}>
                        <MoreVertical size={18} />
                    </button>
                    <button onClick={() => onEdit(id)} style={{
                        padding: '8px 16px', borderRadius: 6, border: '1px solid #eee', background: 'white',
                        cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600
                    }}>
                        DÜZENLE
                    </button>
                </div>
            </div>
        </div>
    );
}
