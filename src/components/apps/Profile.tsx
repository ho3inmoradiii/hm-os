import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Briefcase, MessageSquare, Download,
    ExternalLink, MapPin
} from 'lucide-react';
import { cn } from '@utils';
import { BIO_DATA } from '@data';

const TABS = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'journey', label: 'Journey', icon: Briefcase },
    { id: 'thoughts', label: 'Thoughts', icon: MessageSquare },
] as const;

type TabId = typeof TABS[number]['id'];

export const Profile = () => {
    const [activeTab, setActiveTab] = useState<TabId>('overview');

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
    const isCompact = width < 768;

    return (
        <div
            ref={containerRef}
            className={cn(
                "flex w-full h-full bg-gray-50 dark:bg-os-primary-bg overflow-hidden transition-all",
                isCompact ? "flex-col" : "flex-row"
            )}
        >
            {/* --- Sidebar / Navigation --- */}
            <div className={cn(
                "bg-white dark:bg-black/20 border-gray-200 dark:border-white/5 p-4 flex gap-2 shrink-0 transition-all",
                isCompact
                    ? "w-full border-b flex-row overflow-x-auto no-scrollbar"
                    : "w-64 border-r flex-col"
            )}>

                {/* Tabs */}
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium whitespace-nowrap",
                            activeTab === tab.id
                                ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 shadow-sm"
                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
                        )}
                    >
                        <tab.icon size={18} strokeWidth={2} />
                        {tab.label}
                    </button>
                ))}

                {/* Footer only visible in desktop mode */}
                {!isCompact && (
                    <div className="flex flex-col mt-auto pt-4 border-t border-gray-200 dark:border-white/5">
                        <span className="text-xs text-gray-400 font-mono">v2.4.0 (Stable)</span>
                        <span className="text-[10px] text-gray-300 dark:text-white/20 mt-1">
                            &copy; 2025 Hossein Moradi
                        </span>
                    </div>
                )}
            </div>

            {/* --- Main Content Area --- */}
            <div className="flex-1 overflow-y-auto relative p-6 scroll-smooth">
                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <OverviewTab key="overview" containerWidth={width} />
                    )}
                    {activeTab === 'journey' && (
                        <JourneyTab key="journey" />
                    )}
                    {activeTab === 'thoughts' && (
                        <ThoughtsTab key="thoughts" />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

// ------------------------------------------------------------------
// 🔥 Tab 1: Overview Component (Container Aware)
// ------------------------------------------------------------------
const OverviewTab = ({ containerWidth }: { containerWidth: number }) => {
    const { profile } = BIO_DATA;

    const isStacked = containerWidth < 600;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-8 max-w-2xl mx-auto"
        >
            {/* Header Section */}
            <div className={cn(
                "flex gap-6 transition-all duration-300",
                isStacked
                    ? "flex-col items-center text-center"
                    : "flex-row items-center text-left"
            )}>
                {/* Avatar */}
                <div className="relative group shrink-0">
                    <div className={cn(
                        "rounded-full overflow-hidden border-4 border-white dark:border-white/10 shadow-xl relative z-10 transition-all",
                        isStacked ? "w-32 h-32" : "w-40 h-40"
                    )}>
                        <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover"/>
                    </div>
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white dark:border-[#1d1f27] rounded-full z-20" title={profile.status}/>
                    <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full -z-10 group-hover:bg-blue-500/30 transition-all duration-500"/>
                </div>

                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
                        {profile.name}
                    </h1>
                    <div className="flex flex-col">
                        <span className="text-lg font-medium text-blue-600 dark:text-blue-400">
                            {profile.role}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-os-primary-muted">
                            {profile.subRole}
                        </span>
                    </div>
                    <div className={cn(
                        "flex items-center gap-2 text-xs text-gray-400 mt-1 font-mono",
                        isStacked ? "justify-center" : "justify-start"
                    )}>
                        <MapPin size={12}/>
                        {profile.location}
                    </div>
                </div>
            </div>

            <div className="h-px w-full bg-gray-200 dark:bg-white/10"/>

            {/* Bio */}
            <div className="prose dark:prose-invert">
                <p className={cn(
                    "text-gray-600 dark:text-gray-300 leading-relaxed text-lg",
                    isStacked ? "text-center" : "text-left"
                )}>
                    {profile.bio}
                </p>
            </div>

            {/* Socials & Actions */}
            <div className="flex flex-col gap-4 mt-4">
                {/* Icons */}
                <div className={cn(
                    "flex flex-wrap gap-3",
                    isStacked ? "justify-center" : "justify-start"
                )}>
                    {profile.socials.map((social, i) => (
                        <a
                            key={i}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-colors"
                        >
                            <social.icon size={20} />
                        </a>
                    ))}
                </div>

                {/* Buttons */}
                <div className={cn(
                    "flex gap-3 mt-4 w-full",
                    containerWidth < 450 ? "flex-col" : "flex-row"
                )}>
                    <button
                        onClick={() => window.open(profile.actions.resume, '_blank')}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:opacity-90 transition-opacity shadow-lg whitespace-nowrap"
                    >
                        <Download size={18} />
                        Download Resume
                    </button>
                    <button
                        onClick={() => window.open(profile.actions.contact)}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 font-semibold text-gray-900 dark:text-white transition-colors whitespace-nowrap"
                    >
                        Contact Me
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const JourneyTab = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-6 max-w-2xl mx-auto"
        >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Professional Journey</h2>
            <div className="relative border-l-2 border-gray-200 dark:border-white/10 ml-3 space-y-12">
                {BIO_DATA.experience.map((job, i) => (
                    <motion.div
                        key={job.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative pl-8"
                    >
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-[#1d1f27] border-4 border-blue-500 dark:border-blue-400" />
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{job.role}</h3>
                            <span className="text-xs font-mono px-2 py-1 rounded bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 w-fit">
                                {job.period}
                            </span>
                        </div>
                        <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">
                            {job.company}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                            {job.desc}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {job.skills.map(skill => (
                                <span key={skill} className="text-[10px] px-2 py-0.5 rounded-full border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

const ThoughtsTab = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4 max-w-2xl mx-auto"
        >
            <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Featured Thoughts</h2>
                <p className="text-sm text-gray-500 dark:text-os-primary-muted">
                    Selected writings and insights from my LinkedIn.
                </p>
            </div>
            <div className="grid gap-4">
                {BIO_DATA.posts.map((post, i) => (
                    <motion.a
                        key={post.id}
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={cn(
                            "group block p-5 rounded-xl border transition-all duration-300",
                            "bg-white dark:bg-white/5 border-gray-200 dark:border-white/5",
                            "hover:border-blue-400/50 hover:bg-blue-50/50 dark:hover:bg-white/10"
                        )}
                    >
                        <div className="flex justify-between items-start gap-4">
                            <div className="flex flex-col gap-2">
                                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                    {post.snippet}
                                </p>
                                <div className="flex items-center gap-3 mt-2 text-xs text-gray-400 font-medium">
                                    <span>{post.stats}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"/>
                                    <span className="flex items-center gap-1 group-hover:underline">
                                        Read on LinkedIn <ExternalLink size={10} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.a>
                ))}
            </div>
        </motion.div>
    );
};
