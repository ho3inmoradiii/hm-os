import React, { useState, useRef, useEffect } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { cn } from '@utils';
import { IMPACT_CHART_DATA, IMPACT_STATS } from '@data';
import { LINKS } from '@/constants';

export const Impact = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setWidth(entry.contentRect.width);
            }
        });

        resizeObserver.observe(containerRef.current);

        return () => resizeObserver.disconnect();
    }, []);

    const isMobile = width < 500;
    const isTablet = width >= 500 && width < 900;

    return (
        <div
            ref={containerRef}
            className="w-full h-full flex flex-col gap-6 p-4 sm:p-6 overflow-y-auto bg-gray-50 dark:bg-os-primary-bg transition-colors duration-300 overflow-x-hidden"
        >
            {/* Header Text */}
            <div className="flex flex-col gap-1">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    LinkedIn Analytics
                </h2>

                <div className={cn(
                    "text-sm text-gray-500 dark:text-os-primary-muted flex gap-2",
                    isMobile ? "flex-col items-start" : "flex-row items-center"
                )}>
                    <span>Performance overview over the last 60 days.</span>
                    <span className="inline-block w-fit px-2 py-0.5 rounded text-[10px] font-medium bg-green-100 text-green-700 border border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20">
                        Top 1% in Tech Community
                    </span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className={cn(
                "grid gap-4",
                isMobile ? "grid-cols-1" : (isTablet ? "grid-cols-2" : "grid-cols-4")
            )}>
                {IMPACT_STATS.map((stat, index) => (
                    <div
                        key={index}
                        className={cn(
                            "flex flex-col p-4 rounded-xl border transition-all hover:scale-[1.02]",
                            "shadow-sm dark:shadow-none backdrop-blur-sm",
                            stat.bg
                        )}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-gray-600 dark:text-white/70">{stat.label}</span>
                            <stat.icon size={16} className={stat.color} />
                        </div>
                        <span className={cn("text-2xl font-bold tracking-tight", stat.color.split(' ')[0])}>
                            {stat.value}
                        </span>
                    </div>
                ))}
            </div>

            {/* Main Chart */}
            <div className={cn(
                "flex-1 flex flex-col min-h-[300px] w-full p-4 rounded-xl border backdrop-blur-md transition-colors",
                "bg-white border-gray-200 shadow-sm",
                "dark:bg-black/20 dark:border-white/5"
            )}>
                <div className={cn(
                    "mb-4 flex justify-between gap-2",
                    isMobile ? "flex-col items-start" : "flex-row items-center"
                )}>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Impressions Trend</h3>
                    <div className="flex gap-2 text-[10px] text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-ph-orange"/> Viral Posts</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"/> Consistency</span>
                    </div>
                </div>

                <div className="flex-1 w-full min-h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={IMPACT_CHART_DATA}>
                            <defs>
                                <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#88888840" vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke="#9ca3af"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(val) => isMobile ? val.replace('Week ', 'W') : val}
                            />
                            <YAxis
                                stroke="#9ca3af"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value / 1000}k`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1d1f27',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    color: '#fff'
                                }}
                                itemStyle={{ color: '#fff' }}
                                cursor={{ stroke: '#9ca3af', strokeWidth: 1 }}
                            />
                            <Area
                                type="monotone"
                                dataKey="impressions"
                                stroke="#f59e0b"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorImpressions)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Footer / CTA */}
            <div className={cn(
                "flex justify-between gap-4 p-4 rounded-lg border transition-colors",
                "bg-white border-gray-200 shadow-sm",
                "dark:bg-white/5 dark:border-white/10",
                isMobile ? "flex-col" : "flex-row items-center"
            )}>
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Want to collaborate?</span>
                    <span className="text-xs text-gray-500 dark:text-os-primary-muted">My network is active and growing.</span>
                </div>

                <button
                    onClick={() => window.open(LINKS.LINKEDIN, '_blank')}
                    className={cn(
                        "px-4 py-2.5 text-xs font-bold rounded-lg transition-colors shadow-sm text-center",
                        "bg-blue-600 hover:bg-blue-700 text-white",
                        "dark:bg-blue-600 dark:hover:bg-blue-500",
                        isMobile ? "w-full" : "w-auto"
                    )}
                >
                    Connect on LinkedIn
                </button>
            </div>
        </div>
    );
};
