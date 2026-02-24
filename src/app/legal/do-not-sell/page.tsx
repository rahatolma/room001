import React from 'react';

export default function DoNotSellPage() {
    return (
        <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-1px', marginBottom: '20px' }}>Kişisel Verilerim (Do Not Sell)</h1>
            <p style={{ color: '#666', marginBottom: '40px', fontSize: '1.1rem' }}>CCPA/KVKK Haklarınız</p>

            <div style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444' }}>
                <p style={{ marginBottom: '20px', fontWeight: 600 }}>
                    Room001, kişisel verilerinizi asla üçüncü taraf pazarlama ajanslarına veya veri tüccarlarına satmaz.
                </p>
                <p style={{ marginBottom: '30px' }}>
                    Yasadışı veri paylaşımına karşı şeffaf bir tavır alıyoruz. Ancak, eğer sitemizdeki tüm çerez tabanlı takip işlemlerinden (kişiselleştirilmiş analizler dahil) tamamen çıkmak isterseniz (Opt-Out), aşağıdaki talimatları takip edebilirsiniz:
                </p>

                <button style={{
                    background: '#111', color: '#fff', padding: '14px 28px', fontSize: '1rem',
                    borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600
                }}>
                    Veri Takibini Durdur
                </button>
                <p style={{ marginTop: '15px', fontSize: '0.9rem', color: '#999' }}>* Bu işlemi yaptığınızda affiliate komisyon takiplerinizin düzgün çalışmayabileceğini unutmayın.</p>
            </div>
        </div>
    );
}
