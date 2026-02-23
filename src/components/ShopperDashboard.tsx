'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ShopperDashboard({ user }: { user: any }) {
    const [activeTab, setActiveTab] = useState('all');

    return (
        <div style={{ display: 'flex', minHeight: '80vh', }}>
            {/* Sidebar */}
            <div style={{ width: 250, paddingRight: 40, borderRight: '1px solid #eaeaea' }}>
                <div style={{ marginBottom: 40, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#999', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
                    </div>
                    <div>
                        <div style={{ fontWeight: 600 }}>{user.fullName || 'Shopper'}</div>
                        <div style={{ fontSize: '0.8rem', color: '#666' }}>Shopper</div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <SidebarItem label="All" icon="🏠" active={activeTab === 'all'} onClick={() => setActiveTab('all')} />
                    <SidebarItem label="Account Settings" icon="⚙️" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
                    <SidebarItem label="Upgrade to Earn" icon="💰" active={activeTab === 'upgrade'} onClick={() => setActiveTab('upgrade')} />
                    <SidebarItem label="Notifications" icon="🔔" active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} />
                </div>

                <div style={{ marginTop: 'auto', paddingTop: 40 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', color: '#666' }}>
                        <span>↪️</span> Logout
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, paddingLeft: 60, paddingRight: 40, paddingTop: 20 }}>
                <div style={{ marginBottom: 40 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 10 }}>Primary Email</label>
                    <div style={{ fontSize: '0.8rem', color: '#999', marginBottom: 10 }}>
                        This is the email you use to log in and receive notifications.
                    </div>
                    <div style={{ padding: 15, border: '1px solid #eaeaea', borderRadius: 6, background: '#fcfcfc', color: '#666' }}>
                        {user.email}
                    </div>
                </div>

                <h1 style={{  fontSize: '2.5rem', marginBottom: 15 }}>Upgrade to a creator account.</h1>
                <p style={{ color: '#666', lineHeight: 1.6, maxWidth: 600, marginBottom: 30 }}>
                    Your account is currently a shopper account, in order to access earning opportunities you must apply to upgrade it to a creator account.
                </p>

                <Link href="/become-creator">
                    <button style={{
                        background: '#1a1a1a',
                        color: 'white',
                        padding: '16px 32px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        border: 'none',
                        cursor: 'pointer',
                        textTransform: 'uppercase'
                    }}>
                        APPLY TO UPGRADE
                    </button>
                </Link>

                <div style={{ marginTop: 60, borderTop: '1px solid #eaeaea', paddingTop: 40 }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 10 }}>Notification Settings</h3>
                    <p style={{ fontSize: '0.85rem', color: '#999', maxWidth: 600, marginBottom: 30 }}>
                        Customize the emails and push notifications that you receive. Download the app to receive push notifications on your mobile device.
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderTop: '1px solid #f5f5f5' }}>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Weekly Roundups</div>
                            <div style={{ fontSize: '0.8rem', color: '#666', maxWidth: 400 }}>Get weekly updates on new products added by curators in your circles.</div>
                        </div>
                        <select style={{ padding: '10px 20px', borderRadius: 4, border: '1px solid #ddd', minWidth: 200 }}>
                            <option>Email Notifications</option>
                            <option>None</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SidebarItem({ label, icon, active, onClick }: any) {
    return (
        <div
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 15,
                padding: '12px 15px',
                cursor: 'pointer',
                borderRadius: 8,
                background: active ? '#f0f0f0' : 'transparent',
                fontWeight: active ? 600 : 400
            }}
        >
            <span>{icon}</span>
            <span style={{ fontSize: '0.9rem' }}>{label}</span>
        </div>
    );
}
