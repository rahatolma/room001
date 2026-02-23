'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Pencil } from 'lucide-react';

interface SortableNavItemProps {
    section: any;
    isActive: boolean;
    onClick: () => void;
    isOwner: boolean;
    onEdit: (e: React.MouseEvent) => void;
}

export function SortableNavItem({ section, isActive, onClick, isOwner, onEdit }: SortableNavItemProps) {
    // Only enable dragging if owner
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: section.id,
        disabled: !isOwner
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        position: 'relative' as 'relative',
        display: 'flex',
        alignItems: 'center'
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <span
                onClick={onClick}
                style={{
                    border: isActive ? '1px solid var(--color-primary, black)' : '1px solid transparent',
                    borderRadius: '20px',
                    padding: '5px 15px',
                    cursor: 'pointer',
                    opacity: isActive ? 1 : 0.6,
                    whiteSpace: 'nowrap'
                }}
            >
                {section.title}
            </span>
            {isOwner && (
                <button
                    onClick={onEdit}
                    onPointerDown={(e) => e.stopPropagation()} // Prevent drag start when clicking edit
                    style={{
                        marginLeft: 4, padding: 4, background: '#f5f5f5', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                >
                    <Pencil size={12} color="#666" />
                </button>
            )}
        </div>
    );
}
