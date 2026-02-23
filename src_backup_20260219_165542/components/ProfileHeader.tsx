import React from 'react';
import styles from './ProfileHeader.module.css';

interface ProfileHeaderProps {
    name: string;
    bio: string;
    avatarInitials: string;
    socialLinks?: { platform: string; url: string }[];
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    name,
    bio,
    avatarInitials,
    socialLinks = []
}) => {
    return (
        <header className={styles.header} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '40px 20px 60px',
            fontFamily: 'var(--font-primary, var(--font-dm-sans), sans-serif)',
            color: 'var(--text-primary, #000)'
        }}>
            <div className={styles.avatarContainer} style={{ marginBottom: 20 }}>
                <div className={styles.avatar} style={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    backgroundColor: '#eee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    color: '#333',
                    border: '1px solid #ddd',
                    overflow: 'hidden'
                }}>
                    <img src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=200&auto=format&fit=crop" alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            </div>

            <div className={styles.content} style={{ maxWidth: 600 }}>
                <span style={{
                    fontFamily: 'var(--font-primary, var(--font-dm-sans), sans-serif)',
                    fontStyle: 'normal',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                    color: 'var(--text-primary, #666)',
                    marginBottom: 10,
                    display: 'block'
                }}>
                    INSIDER
                </span>
                <h1 className={styles.name} style={{
                    fontFamily: 'var(--font-primary, var(--font-dm-sans), sans-serif)',
                    fontSize: '3.5rem',
                    fontWeight: 800,
                    margin: '0 0 10px 0',
                    lineHeight: 1.1,
                    color: 'var(--text-primary, #000)'
                }}>{name}</h1>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: '0.9rem', color: 'var(--text-primary, #666)', marginBottom: 25 }}>
                    <span>{name.split(' ').map(n => n[0]).join('')}</span>
                    <span style={{ color: 'var(--color-primary, #2962ff)' }}>●</span>
                    <span>{bio}</span>
                </div>

                <button style={{
                    background: 'var(--color-primary, black)',
                    color: 'white',
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    border: 'none',
                    borderRadius: 'var(--btn-radius, 0px)',
                    padding: '14px 28px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    marginBottom: 30,
                    textTransform: 'uppercase'
                }}>
                    TAKİP ET
                </button>

                {/* <p style={{
                    fontFamily: 'Playfair Display, serif',
                    fontStyle: 'italic',
                    fontSize: '0.9rem',
                    color: '#666'
                }}>
                    Trendsetter • Trusted by 17.7k shoppers
                </p> */}

                {socialLinks.length > 0 && (
                    <div className={styles.socials} style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 15 }}>
                        {socialLinks.map((link) => (
                            <a
                                key={link.platform}
                                href={link.platform === 'instagram' ? '#' : link.url}
                                target={link.platform === 'instagram' ? undefined : "_blank"}
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                style={{ color: '#000', textDecoration: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
                                onClick={(e) => {
                                    if (link.platform === 'instagram') {
                                        e.preventDefault();
                                        window.dispatchEvent(new CustomEvent('switchToInstagram'));
                                    } else if (link.platform === 'tiktok') {
                                        e.preventDefault();
                                        window.dispatchEvent(new CustomEvent('switchToTiktok'));
                                    }
                                }}
                            >
                                {link.platform === 'instagram' ? (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                    </svg>
                                ) : link.platform === 'tiktok' ? (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                                    </svg>
                                ) : link.platform === 'Dolap' ? (
                                    <div title="Dolap Hesabı" style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.8rem', fontWeight: 600, border: '1px solid #ddd', padding: '5px 10px', borderRadius: 20 }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
                                        </svg>
                                        Dolap
                                    </div>
                                ) : link.platform === 'Gardrops' ? (
                                    <div title="Gardrops Hesabı" style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.8rem', fontWeight: 600, border: '1px solid #ddd', padding: '5px 10px', borderRadius: 20 }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                                        </svg>
                                        Gardrops
                                    </div>
                                ) : link.platform}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
};

export default ProfileHeader;
