import React from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';
import styles from './Hero.module.css';

const Hero = () => {
    const router = useRouter();

    return (
        <section className={styles.hero}>
            <h1 className={styles.title}>
                Favori İçerik Üreticilerinden<br />
                <span className={styles.highlight}>Alışveriş Yap</span>
            </h1>

            <p className={styles.subtitle}>
                Room001, içerik üreticilerinin favori ürünlerini keşfetmeniz ve satın almanız için en güvenilir platformdur.
            </p>

            <div className={styles.ctaGroup}>
                <Button
                    variant="primary"
                    onClick={() => router.push('/creators')}
                    style={{ padding: '15px 30px', fontSize: '1.1rem' }}
                >
                    Küratörleri Keşfet
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => window.location.href = '#how-it-works'}
                    style={{ padding: '15px 30px', fontSize: '1.1rem', background: 'transparent', color: 'white', border: '1px solid white' }}
                >
                    Nasıl Çalışır?
                </Button>
            </div>
            <div className={styles.imageContainer}>
                {/* Placeholder image until we generate one */}
                <span>Platform Ekran Görüntüsü Gelecek</span>
            </div>
        </section>
    );
};

export default Hero;
