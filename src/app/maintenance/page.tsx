import { Sparkles } from "lucide-react";

export const metadata = {
    title: "Maintenance - Room001",
    description: "Room001 is currently undergoing scheduled maintenance.",
};

export default function MaintenancePage() {
    return (
        <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

            <div className="max-w-xl w-full text-center relative z-10 space-y-8">
                {/* Logo / Icon Area */}
                <div className="relative group cursor-pointer p-8 rounded-full bg-zinc-950 border border-white/10 shadow-[0_0_0_8px_rgba(255,255,255,0.02)] mx-auto inline-block">
                    <Sparkles className="w-16 h-16 text-white relative z-10" />
                    <div className="absolute inset-0 bg-white/10 blur-3xl opacity-50"></div>
                </div>

                {/* Typography */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter">Site Maintenance</h1>
                    <p className="text-lg text-muted-foreground font-medium max-w-md mx-auto">
                        Room001 is preparing the ultimate creator experience.<br />
                        <span className="text-sm mt-3 inline-block opacity-80">We are refining our systems to serve you better.</span>
                    </p>
                </div>

                {/* Status Indicator */}
                <div className="inline-flex items-center justify-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full mt-4">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                    </span>
                    <span className="text-sm font-bold tracking-widest uppercase text-white/80 font-mono">Systems Offline</span>
                </div>
            </div>
        </main>
    );
}
