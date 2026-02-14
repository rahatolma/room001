import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.links}>
                    <Link href="/about">Hakkında</Link>
                    <Link href="/creators">İçerik Üreticileri</Link>
                    <Link href="/brands">Markalar</Link>
                    <Link href="/contact">İletişim</Link>
                    <Link href="/legal/privacy">Gizlilik</Link>
                    <Link href="/legal/terms">Şartlar</Link>
                </div>
                <div className={styles.copyright}>
                    &copy; {new Date().getFullYear()} Room001. Tüm hakları saklıdır.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
