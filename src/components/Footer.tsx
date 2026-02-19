import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Column 1: For Insiders */}
                <div className={styles.column}>
                    <h3 className={styles.columnHeader}>INSIDER'LAR İÇİN</h3>
                    <ul className={styles.linkList}>
                        <li className={styles.linkItem}><Link href="#" className={styles.link}>Insider'lar İçin Room001</Link></li>
                        <li className={styles.linkItem}><Link href="#" className={styles.link}>Dijital Mağazalar</Link></li>
                        <li className={styles.linkItem}><Link href="#" className={styles.link}>Affiliate Linkler</Link></li>
                        <li className={styles.linkItem}><Link href="#" className={styles.link}>Marka İşbirlikleri</Link></li>
                        <li className={styles.linkItem}><Link href="/become-creator" className={styles.link}>Insider Başvurusu</Link></li>
                    </ul>
                </div>

                {/* Column 2: For Brands */}
                <div className={styles.column}>
                    <h3 className={styles.columnHeader}>MARKALAR İÇİN</h3>
                    <ul className={styles.linkList}>
                        <li className={styles.linkItem}><Link href="#" className={styles.link}>Markalar İçin Room001</Link></li>
                        <li className={styles.linkItem}><Link href="#" className={styles.link}>Keşfet</Link></li>
                        <li className={styles.linkItem}><Link href="#" className={styles.link}>Etkileşim</Link></li>
                        <li className={styles.linkItem}><Link href="#" className={styles.link}>Takip</Link></li>
                        <li className={styles.linkItem}><Link href="#" className={styles.link}>Yükselt</Link></li>
                    </ul>
                </div>

                {/* Column 3: For Shoppers */}
                <div className={styles.column}>
                    <h3 className={styles.columnHeader}>ALIŞVERİŞ SEVERLER İÇİN</h3>
                    <ul className={styles.linkList}>
                        <li className={styles.linkItem}><Link href="#" className={styles.link}>Insider Seçkileri</Link></li>
                        <li className={styles.linkItem}><Link href="#" className={styles.link}>Kolektifler</Link></li>
                        <li className={styles.linkItem}><Link href="#" className={styles.link}>Markaya Göre Alışveriş</Link></li>
                        <li className={styles.linkItem}><Link href="#" className={styles.link}>Kategoriye Göre Alışveriş</Link></li>
                        <li className={styles.linkItem}><Link href="#" className={styles.link}>Kolektiflerim</Link></li>
                        <li className={styles.linkItem}><Link href="#" className={styles.link}>Zevk Profilim</Link></li>
                    </ul>
                </div>

                {/* Column 4: Explore */}
                <div className={styles.column}>
                    <h3 className={styles.columnHeader}>KEŞFET</h3>
                    <ul className={styles.linkList}>
                        <li className={styles.linkItem}><Link href="#" className={styles.link}>Blog</Link></li>
                        <li className={styles.linkItem}><Link href="#" className={styles.link}>Hakkımızda</Link></li>
                        <li className={styles.linkItem}><Link href="#" className={styles.link}>Kariyer</Link></li>
                        <li className={styles.linkItem}><Link href="#" className={styles.link}>Tüm Kategoriler</Link></li>
                    </ul>
                </div>

                {/* Column 5: Support + Legal */}
                <div className={styles.column}>
                    <h3 className={styles.columnHeader}>DESTEK + YASAL</h3>
                    <ul className={styles.linkList}>
                        <li className={styles.linkItem}><Link href="#" className={styles.link}>Insider Rehberi</Link></li>
                        <li className={styles.linkItem}><Link href="#" className={styles.link}>Marka Rehberi</Link></li>
                        <li className={styles.linkItem}><Link href="#" className={styles.link}>İletişim</Link></li>
                        <li className={styles.linkItem}><Link href="#" className={styles.link}>Hizmet Şartları</Link></li>
                        <li className={styles.linkItem}><Link href="#" className={styles.link}>Gizlilik</Link></li>
                    </ul>
                </div>
            </div>

            <div className={styles.bottomBar}>
                <div className={styles.container} style={{ alignItems: 'center', marginTop: 0 }}>
                    <div>
                        <span className={styles.logo}>room001</span>
                        <p className={styles.copyright}>© Copyright 2026 Room001, Inc. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
