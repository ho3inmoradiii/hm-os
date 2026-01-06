import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@utils';
import { TECH_STACK } from '@data';

export const Stack = () => {
    return (
        <div className="w-full h-full bg-gray-50 dark:bg-os-primary-bg p-6 overflow-y-auto relative">

            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                 style={{
                     backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
                     backgroundSize: '24px 24px'
                 }}
            />

            <div className="relative z-10 h-full flex flex-col">

                {/* Header */}
                <div className="mb-8 max-w-2xl">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Tech Stack</h1>
                    <p className="text-gray-500 dark:text-os-primary-muted">
                        A versatile toolset refined over <span className="text-ph-orange font-bold">4+ years</span>.
                        From scalable backends with <span className="text-red-400 font-medium">Laravel</span> to
                        immersive frontends with React.
                    </p>
                </div>

                <div className="grid gap-6 pb-10 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
                    {TECH_STACK.map((group, groupIndex) => (
                        <div key={groupIndex} className="flex flex-col gap-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-os-primary-muted/70 pl-1">
                                {group.category}
                            </h3>

                            <div className="flex flex-col gap-3 h-full">
                                {group.items.map((tech, i) => (
                                    <TechCard key={i} tech={tech} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Sub-component ---
const TechCard = ({ tech }: { tech: typeof TECH_STACK[0]['items'][0] }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={cn(
                "relative p-4 rounded-xl border transition-all duration-300 cursor-default group overflow-hidden",
                "bg-white dark:bg-white/5",
                "border-gray-200 dark:border-white/5",
                "h-[100px] flex flex-col justify-center",
                isHovered ? tech.bg : ""
            )}
        >
            {isHovered && (
                <motion.div
                    layoutId="glow"
                    className={cn("absolute inset-0 opacity-20 blur-xl", tech.bg)}
                />
            )}

            <div className="relative z-10 flex items-center justify-between w-full">
                <div className="flex items-center gap-3 w-full">
                    {/* Icon Container */}
                    <div className={cn(
                        "p-2 rounded-lg transition-colors duration-300 shrink-0",
                        "bg-gray-100 dark:bg-white/10",
                        isHovered ? "bg-white/20" : ""
                    )}>
                        <tech.icon size={20} className={cn("transition-colors duration-300", isHovered ? tech.color : "text-gray-600 dark:text-gray-400")} />
                    </div>

                    <div className="flex flex-col w-full overflow-hidden">
                        <span className="font-bold text-gray-900 dark:text-white text-sm truncate">
                            {tech.name}
                        </span>

                        <div className="relative h-4 mt-0.5 w-full">
                            <motion.span
                                initial={{ opacity: 1, y: 0 }}
                                animate={{
                                    opacity: isHovered ? 0 : 1,
                                    y: isHovered ? -10 : 0
                                }}
                                className="absolute left-0 top-0 text-[10px] text-gray-500 dark:text-os-primary-muted font-mono"
                            >
                                {tech.level}
                            </motion.span>

                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                    opacity: isHovered ? 1 : 0,
                                    y: isHovered ? 0 : 10
                                }}
                                className="absolute left-0 top-0 text-[10px] text-gray-600 dark:text-gray-300 truncate w-full"
                            >
                                {tech.desc}
                            </motion.span>
                        </div>
                    </div>
                </div>

                {/* Arrow Icon */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                    className={cn("text-xs font-medium ml-2 shrink-0", tech.color)}
                >
                    <tech.icon size={14} />
                </motion.div>
            </div>
        </motion.div>
    );
};
