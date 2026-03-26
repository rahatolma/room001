import { Sparkles } from "lucide-react";

export const metadata = {
    title: "Maintenance - Room001",
    description: "Room001 is currently undergoing scheduled maintenance.",
};

export default function MaintenancePage() {
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: `
                header, footer { display: none !important; }
                body { background: #000 !important; color: #fff !important; margin: 0; padding: 0; }
                .maintenance-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    text-align: center;
                    padding: 2rem;
                    position: relative;
                    z-index: 10;
                    font-family: var(--font-dm-sans), sans-serif;
                }
                .maintenance-sparkles {
                    margin-bottom: 2rem;
                    color: #fff;
                }
                .maintenance-title {
                    font-size: 3rem;
                    font-weight: 800;
                    margin-bottom: 1rem;
                    letter-spacing: -1px;
                }
                .maintenance-desc {
                    font-size: 1.2rem;
                    color: #999;
                    max-width: 500px;
                    line-height: 1.6;
                    margin: 0 auto;
                }
                .status-badge {
                    margin-top: 2rem;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    background: rgba(255,255,255,0.1);
                    padding: 8px 16px;
                    border-radius: 50px;
                    font-family: monospace;
                    font-size: 0.9rem;
                    letter-spacing: 1px;
                    color: #fff;
                }
                .pulse-dot {
                    width: 10px;
                    height: 10px;
                    background: #f5a623;
                    border-radius: 50%;
                    box-shadow: 0 0 10px #f5a623;
                    animation: pulse 1.5s infinite;
                }
                @keyframes pulse {
                    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(245, 166, 35, 0.7); }
                    70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(245, 166, 35, 0); }
                    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(245, 166, 35, 0); }
                }
            `}} />
            <main className="maintenance-container">
                <div className="maintenance-sparkles">
                    <Sparkles size={64} />
                </div>
                <h1 className="maintenance-title">Site Maintenance</h1>
                <p className="maintenance-desc">
                    Room001 is preparing the ultimate creator experience.
                    <br/><br/>
                    We are refining our systems to serve you better.
                </p>
                <div className="status-badge">
                    <div className="pulse-dot"></div>
                    SYSTEMS OFFLINE
                </div>
            </main>
        </>
    );
}

