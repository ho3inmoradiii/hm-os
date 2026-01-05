import {
    Code2, Palette, Database, Terminal,
    Globe, Layers, GitBranch, Zap,
    Server, Braces, Box, LayoutTemplate,
    Hexagon
} from 'lucide-react';

export const TECH_STACK = [
    {
        category: "Frontend Core",
        items: [
            { name: "React", icon: Code2, level: "4+ Years Exp", desc: "Main library for SPAs", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
            { name: "TypeScript", icon: Terminal, level: "Daily Driver", desc: "Strict type safety everywhere", color: "text-blue-600", bg: "bg-blue-600/10 border-blue-600/20" },
            { name: "Next.js", icon: Globe, level: "Advanced", desc: "App Router & Server Actions", color: "text-blue-800", bg: "bg-blue-800/10 border-blue-800/20" },
        ]
    },
    {
        category: "Backend Engineering",
        items: [
            { name: "Laravel", icon: Server, level: "4+ Years Exp", desc: "Robust Monolithic Architecture", color: "text-red-500", bg: "bg-red-500/10 border-red-500/20" },
            { name: "PHP", icon: Braces, level: "4+ Years Exp", desc: "Modern OOP & Patterns", color: "text-indigo-400", bg: "bg-indigo-400/10 border-indigo-400/20" },
            { name: "MySQL", icon: Database, level: "Proficient", desc: "Optimization & Complex Queries", color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/20" },
        ]
    },
    {
        category: "Visual Engineering",
        items: [
            { name: "Three.js", icon: Hexagon, level: "Proficient", desc: "3D Interactions & WebGL", color: "text-pink-500", bg: "bg-pink-500/10 border-pink-500/20" },
            { name: "Framer Motion", icon: Zap, level: "Proficient", desc: "Complex gesture animations", color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/20" },
            { name: "Tailwind CSS", icon: Palette, level: "Daily Driver", desc: "Utility-first architecture", color: "text-cyan-400", bg: "bg-cyan-400/10 border-cyan-400/20" },
        ]
    },
    {
        category: "Alternative Ecosystem",
        items: [
            { name: "Vue.js", icon: Box, level: "Production Ready", desc: "Progressive Framework", color: "text-green-500", bg: "bg-green-500/10 border-green-500/20" },
            { name: "Nuxt.js", icon: LayoutTemplate, level: "Proficient", desc: "Full-stack Vue Applications", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
        ]
    },
    {
        category: "State Architecture",
        items: [
            { name: "Zustand", icon: Layers, level: "Preferred Choice", desc: "Atomic State Management", color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20" },
            { name: "TanStack Query", icon: Database, level: "Industry Standard", desc: "Server state handling", color: "text-red-400", bg: "bg-red-400/10 border-red-400/20" },
        ]
    },
    {
        category: "Tools",
        items: [
            { name: "Git", icon: GitBranch, level: "Professional Workflow", desc: "CI/CD & Team Collaboration", color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/20" },
        ]
    }
];
