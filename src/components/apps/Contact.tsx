import { useState } from 'react';
import { Mail, Copy, Check, Linkedin, Github, Instagram, Send, MapPin, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { LINKS } from '@/constants';
import { BIO_DATA } from '@data';

export const Contact = () => {
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        const email = LINKS.EMAIL.replace('mailto:', '');
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const rawEmail = LINKS.EMAIL.replace('mailto:', '');
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${rawEmail}`;

    return (
        <div className="relative flex items-center justify-center h-full w-full bg-gray-50 dark:bg-[#0f1115] overflow-hidden">

            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                 style={{
                     backgroundImage: `linear-gradient(#9ca3af 1px, transparent 1px), linear-gradient(to right, #9ca3af 1px, transparent 1px)`,
                     backgroundSize: '24px 24px'
                 }}
            />

            {/* Decorative Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative w-full max-w-sm mx-4"
            >
                {/* Glass Card */}
                <div className="relative overflow-hidden rounded-2xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur-xl shadow-2xl">

                    {/* Header Image / Gradient */}
                    <div className="h-24 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }}></div>
                    </div>

                    {/* Avatar Container (Floating) */}
                    <div className="relative px-6 -mt-12 flex justify-between items-end">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-2xl border-4 border-white dark:border-[#1d1f27] overflow-hidden shadow-lg bg-white dark:bg-gray-800">
                                <img
                                    src={BIO_DATA.profile.avatar}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Status Indicator */}
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white dark:bg-[#1d1f27] rounded-full flex items-center justify-center">
                                <span className="relative flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                            </div>
                        </div>

                        {/* Social Mini Actions */}
                        <div className="flex gap-2 mb-1">
                            <a href={LINKS.LINKEDIN} target="_blank"
                               className="p-2 rounded-lg bg-white/50 dark:bg-white/5 hover:bg-blue-50 dark:hover:bg-blue-500/20 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors border border-gray-200 dark:border-white/5 backdrop-blur-sm">
                                <Linkedin size={18}/>
                            </a>
                            <a href={LINKS.GITHUB_REPO} target="_blank"
                               className="p-2 rounded-lg bg-white/50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-colors border border-gray-200 dark:border-white/5 backdrop-blur-sm">
                                <Github size={18}/>
                            </a>
                            <a href={LINKS.INSTAGRAM} target="_blank"
                               className="p-2 rounded-lg bg-white/50 dark:bg-white/5 hover:bg-pink-50 dark:hover:bg-pink-500/20 text-gray-600 dark:text-gray-300 hover:text-pink-600 transition-colors border border-gray-200 dark:border-white/5 backdrop-blur-sm">
                                <Instagram size={18}/>
                            </a>
                        </div>
                    </div>

                    {/* Body Info */}
                    <div className="p-6 pt-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            {BIO_DATA.profile.name}
                        </h2>
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">
                            {BIO_DATA.profile.role}
                        </p>

                        <div className="flex flex-col gap-2 mb-6 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <MapPin size={14} />
                                <span>{BIO_DATA.profile.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe size={14} />
                                <span>Open to remote opportunities</span>
                            </div>
                        </div>

                        {/* Email Action Box */}
                        <div className="group relative p-1 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                            <div className="relative flex items-center justify-between p-3 rounded-[10px] bg-white dark:bg-[#15171c] border border-gray-100 dark:border-white/5">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                                        <Mail size={18} />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Email Me</span>
                                        <span className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                            {LINKS.EMAIL.replace('mailto:', '')}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCopyEmail}
                                    className="ml-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 transition-colors active:scale-95"
                                    title="Copy"
                                >
                                    {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <a
                            href={gmailUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:opacity-90 transition-opacity shadow-lg group"
                        >
                            <Send size={16}
                                  className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"/>
                            Send via Gmail
                        </a>

                        <div className="mt-3 text-center">
                            <a
                                href={LINKS.EMAIL}
                                className="text-[10px] text-gray-400 hover:text-blue-500 transition-colors cursor-pointer"
                            >
                                or use default mail app
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
