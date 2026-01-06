import { Linkedin, Github, Mail, Instagram, type LucideIcon } from 'lucide-react';
import { LINKS } from '@constants';

export interface SocialLink {
    label: string;
    icon: LucideIcon;
    url: string;
}

export interface ExperienceItem {
    id: number;
    role: string;
    company: string;
    period: string;
    desc: string;
    skills: string[];
}

export interface PostItem {
    id: number;
    title: string;
    snippet: string;
    stats: string;
    url: string;
}

export interface ProfileData {
    name: string;
    role: string;
    subRole: string;
    location: string;
    status: string;
    avatar: string;
    bio: string;
    socials: SocialLink[];
    actions: {
        resume: string;
        contact: string;
    };
}

export interface BioDataType {
    profile: ProfileData;
    experience: ExperienceItem[];
    posts: PostItem[];
}

export const BIO_DATA: BioDataType = {
    profile: {
        name: "Hossein Moradi",
        role: "Software Engineer (Front-End Architect)",
        subRole: "Turning Technical Debt into Performance | Creative Engineering",
        location: "Tehran, Iran",
        status: "Open to new challenges",
        avatar: "/assets/me.jpg",

        bio: "I believe real engineering is balancing 'today's velocity' with 'tomorrow's stability'. My focus is on one thing: building User Experiences with React & Next.js that don't just 'work', they perform flawlessly.",

        socials: [
            {
                label: "GitHub",
                icon: Github,
                url: LINKS.GITHUB_REPO
            },
            {
                label: "LinkedIn",
                icon: Linkedin,
                url: LINKS.LINKEDIN
            },
            {
                label: "Instagram",
                icon: Instagram,
                url: LINKS.INSTAGRAM
            },
            {
                label: "Email",
                icon: Mail,
                url: LINKS.EMAIL
            },
        ],
        actions: {
            resume: LINKS.RESUME,
            contact: LINKS.EMAIL
        }
    },

    // --- Journey (Experience Updated) ---
    experience: [
        {
            id: 1,
            role: "Founding Frontend Engineer",
            company: "Iranian Embedded Systems",
            period: "Dec 2023 - Present",
            desc: "Leading the end-to-end frontend architecture for SaaS products in PropTech & FinTech. Translated complex business requirements into scalable Next.js applications, including a Digital Real Estate Contract Platform and a Real-Time Stock Market Dashboard.",
            skills: ["Product Dev (MVP)", "Next.js", "FinTech & PropTech", "Complex Forms", "Data Viz"]
        },
        {
            id: 2,
            role: "Senior Software Engineer",
            company: "ESEMINAR",
            period: "Dec 2023 - Apr 2024",
            desc: "Played a pivotal role in optimizing Iran's leading webinar platform. Refactored legacy monoliths into modular Nuxt.js components and leveraged Redis caching to enhance SSR performance for high-traffic rooms.",
            skills: ["Nuxt.js", "Refactoring", "Redis", "SSR", "Tech Debt Mgmt"]
        },
        {
            id: 3,
            role: "Software Engineer",
            company: "Rahatbin",
            period: "Aug 2022 - Dec 2023",
            desc: "Lead Frontend Engineer for a fast-paced agency. Architected a Ride-Hailing PWA using Leaflet/Mapbox and engineered a Real-Time Multiplayer Game (Mafia) using WebRTC and WebSockets for sub-second latency.",
            skills: ["WebRTC", "WebSocket", "Next.js", "Mapbox", "PWA"]
        },
        {
            id: 4,
            role: "Software Engineer",
            company: "FaraDars",
            period: "Oct 2021 - May 2022",
            desc: "Key role in the platform modernization of Iran's leading e-learning service. Executed a strategic migration from a legacy Monolithic architecture to a modern React-based SPA, ensuring SEO preservation and zero downtime.",
            skills: ["Migration", "React.js", "Scalable Arch", "JavaScript", "SPA"]
        },
        {
            id: 5,
            role: "Software Engineer",
            company: "RAYAN",
            period: "Feb 2021 - Aug 2021",
            desc: "Contributed to a scalable B2B Marketplace Platform. Developed customizable white-label storefront themes and optimized checkout flows using REST APIs to bridge the gap between complex backends and user interfaces.",
            skills: ["JavaScript", "REST APIs", "HTML5/CSS3", "MVC", "Git"]
        }
    ],

    // --- Thoughts ---
    posts: [
        {
            id: 1,
            title: "The 'Ugly' Product Won",
            snippet: "We were polishing buttons while our competitor took the market with a buggy MVP. Feature Creep is the silent killer of startups. Launch before you're ready.",
            stats: "MVP • Product Strategy",
            url: LINKS.FIRST_POST
        },
        {
            id: 2,
            title: "5 Years Exp. or 1 Year x5?",
            snippet: "True seniority isn't about closing Jira tickets. It's about understanding the 'Business Value' behind the code. Don't be just another 'Code Monkey'.",
            stats: "Career • Leadership",
            url: LINKS.SECOND_POST
        },
        {
            id: 3,
            title: "Resume-Driven Development (RDD)",
            snippet: "Inheriting Microservices & Kafka for 500 req/day? That's not architecture; that's someone else's visa strategy leaving you with the technical debt.",
            stats: "Architecture • RDD",
            url: LINKS.THIRD_POST
        }
    ]
};
