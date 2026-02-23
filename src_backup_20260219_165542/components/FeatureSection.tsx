import React from 'react';
import styles from './FeatureSection.module.css';
import Button from './Button';

interface FeatureSectionProps {
    title: string;
    description: string;
    imageAlt: string;
    reversed?: boolean;
    ctaText?: string;
    ctaLink?: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
    title,
    description,
    imageAlt,
    reversed = false,
    ctaText,
    ctaLink
}) => {
    return (
        <section className={`${styles.section} ${reversed ? styles.reverse : ''}`}>
            <div className={styles.content}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>
                {ctaText && ctaLink && (
                    <Button href={ctaLink} variant="secondary">
                        {ctaText}
                    </Button>
                )}
            </div>
            <div className={styles.imageWrapper}>
                <div className={styles.imagePlaceholder}>
                    {imageAlt} (Görsel)
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;
