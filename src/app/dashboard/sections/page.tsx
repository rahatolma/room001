"use client";

import React, { useState } from 'react';
import Button from '@/components/Button'; // Assuming Button component exists
import { Edit2, Trash2, Plus, GripVertical } from 'lucide-react';

interface Section {
    id: string;
    title: string;
    productCount: number;
}

// Initial Mock Data
const INITIAL_SECTIONS: Section[] = [
    { id: '1', title: 'Yaz Kombinleri', productCount: 12 },
    { id: '2', title: 'Cilt Bakım Rutinim', productCount: 8 },
    { id: '3', title: 'Favori Kitaplarım', productCount: 5 },
    { id: '4', title: 'Teknoloji Köşesi', productCount: 3 },
];

export default function CreatorSectionsPage() {
    const [sections, setSections] = useState<Section[]>(INITIAL_SECTIONS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSection, setEditingSection] = useState<Section | null>(null);
    const [newTitle, setNewTitle] = useState('');

    const handleAddClick = () => {
        setEditingSection(null);
        setNewTitle('');
        setIsModalOpen(true);
    };

    const handleEditClick = (section: Section) => {
        setEditingSection(section);
        setNewTitle(section.title);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id: string) => {
        if (confirm('Bu başlığı silmek istediğinize emin misiniz?')) {
            setSections(sections.filter(s => s.id !== id));
        }
    };

    const handleSave = () => {
        if (!newTitle.trim()) return;

        if (editingSection) {
            // Update existing
            setSections(sections.map(s => s.id === editingSection.id ? { ...s, title: newTitle } : s));
        } else {
            // Add new
            const newSection: Section = {
                id: Date.now().toString(),
                title: newTitle,
                productCount: 0
            };
            setSections([...sections, newSection]);
        }
        setIsModalOpen(false);
    };

    return (
        <div style={{ maxWidth: 1000 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: 10, fontFamily: 'Playfair Display, serif' }}>Menu Başlıkları</h1>
                    <p style={{ color: '#666' }}>Profilinizde görünecek kategorileri buradan yönetebilirsiniz.</p>
                </div>
                <Button onClick={handleAddClick}>
                    <Plus size={18} style={{ marginRight: 8 }} />
                    Yeni Başlık Ekle
                </Button>
            </div>

            <div style={{ background: 'white', borderRadius: 12, border: '1px solid #eee', overflow: 'hidden' }}>
                {sections.length === 0 ? (
                    <div style={{ padding: 40, textAlign: 'center', color: '#999' }}>
                        Henüz hiç başlık eklemediniz.
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {sections.map((section, index) => (
                            <div
                                key={section.id}
                                style={{
                                    padding: '20px 25px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderBottom: index !== sections.length - 1 ? '1px solid #f5f5f5' : 'none',
                                    background: 'white',
                                    transition: 'background 0.2s'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                                    <div style={{ color: '#ccc', cursor: 'grab' }}>
                                        <GripVertical size={20} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 4 }}>{section.title}</h3>
                                        <span style={{ fontSize: '0.9rem', color: '#666', background: '#f5f5f5', padding: '2px 8px', borderRadius: 4 }}>
                                            {section.productCount} Ürün
                                        </span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 10 }}>
                                    <button
                                        onClick={() => handleEditClick(section)}
                                        style={{ padding: 8, borderRadius: 6, border: '1px solid #ddd', background: 'white', cursor: 'pointer', color: '#666' }}
                                        title="Düzenle"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(section.id)}
                                        style={{ padding: 8, borderRadius: 6, border: '1px solid #fee', background: '#fff0f0', cursor: 'pointer', color: '#e00' }}
                                        title="Sil"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Simple Modal */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', zIndex: 100,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div style={{ background: 'white', padding: 30, borderRadius: 16, width: 400, boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: 20, fontFamily: 'Playfair Display, serif' }}>
                            {editingSection ? 'Başlığı Düzenle' : 'Yeni Başlık Ekle'}
                        </h3>

                        <div style={{ marginBottom: 20 }}>
                            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Başlık Adı</label>
                            <input
                                autoFocus
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                placeholder="Örn: Yaz Kombinleri"
                                style={{
                                    width: '100%', padding: '12px', borderRadius: 8,
                                    border: '1px solid #ddd', fontSize: '1rem', outline: 'none'
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSave();
                                    if (e.key === 'Escape') setIsModalOpen(false);
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#f5f5f5', cursor: 'pointer', fontWeight: 500 }}
                            >
                                İptal
                            </button>
                            <Button onClick={handleSave}>
                                Kaydet
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
