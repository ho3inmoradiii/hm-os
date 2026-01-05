import { User, Briefcase, Award, Linkedin, Github, Mail } from 'lucide-react';
import { LINKS } from '@constants';

export const BIO_DATA = {
    // --- Overview ---
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
                url: LINKS.GITHUB
            },
            {
                label: "LinkedIn",
                icon: Linkedin,
                url: LINKS.LINKEDIN
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

    // --- Journey ---
    experience: [
        {
            id: 1,
            role: "Front-End Architect",
            company: "Current Company",
            period: "2023 - Present",
            desc: "Architecting high-performance client-side apps. implementing 3D concepts with Three.js, and optimizing Next.js render cycles for maximum speed.",
            skills: ["React Architecture", "Next.js", "Three.js", "Performance"]
        },
        {
            id: 2,
            role: "Senior Front-End Engineer",
            company: "Previous Company",
            period: "2021 - 2023",
            desc: "Focused on bridging the gap between technical architecture and visual experiences. Migrated legacy systems to modern React workflows.",
            skills: ["React", "TypeScript", "Redux/Zustand", "UI Systems"]
        },
        {
            id: 3,
            role: "Full-Stack Developer (Foundation)",
            company: "Early Career",
            period: "2019 - 2021",
            desc: "Started with scalable backends in Laravel and dynamic UIs with Vue.js. This backend foundation allows me to understand the full system lifecycle today.",
            skills: ["Laravel", "Vue.js", "MySQL", "System Design"]
        }
    ],

    // --- Thoughts ---
    posts: [
        {
            id: 1,
            title: "Seniority is about 'Ownership'",
            snippet: "Why years of experience matter less than understanding the 'Business Impact' of your technical decisions.",
            stats: "Featured • Philosophy",
            url: "https://linkedin.com/post/..."
        },
        {
            id: 2,
            title: "Performance IS User Experience",
            snippet: "How we turned technical debt into a 40% faster load time using Next.js optimizations.",
            stats: "2.5k views • Case Study",
            url: "https://linkedin.com/post/..."
        },
        {
            id: 3,
            title: "Three.js on the Web: Beyond the Hype",
            snippet: "Implementing complex 3D concepts efficiently without killing the browser's main thread.",
            stats: "1.8k views • 3D Tech",
            url: "https://linkedin.com/post/..."
        }
    ]
};
