import { TrendingUp, Users, Eye, Zap, type LucideIcon } from 'lucide-react';

export interface ImpactStatItem {
    label: string;
    value: string;
    icon: LucideIcon;
    color: string;
    bg: string;
}

export const IMPACT_CHART_DATA = [
    { name: 'Week 1', impressions: 20194 },
    { name: 'Week 2', impressions: 12680 },
    { name: 'Week 3', impressions: 89613 },
    { name: 'Week 4', impressions: 48646 },
    { name: 'Week 5', impressions: 24960 },
    { name: 'Week 6', impressions: 10278 },
    { name: 'Week 7', impressions: 106587 },
    { name: 'Week 8', impressions: 43947 },
];

export const IMPACT_STATS: ImpactStatItem[] = [
    {
        label: 'Total Impressions',
        value: '357K+',
        icon: Eye,
        color: 'text-blue-600 dark:text-blue-400',
        bg: 'bg-blue-50 border-blue-200 dark:bg-blue-400/10 dark:border-blue-400/20'
    },
    {
        label: 'Top Post',
        value: '107K',
        icon: Zap,
        color: 'text-yellow-600 dark:text-yellow-400',
        bg: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-400/10 dark:border-yellow-400/20'
    },
    {
        label: 'Profile Growth',
        value: '+1,250%',
        icon: TrendingUp,
        color: 'text-green-600 dark:text-green-400',
        bg: 'bg-green-50 border-green-200 dark:bg-green-400/10 dark:border-green-400/20'
    },
    {
        label: 'Job Offers',
        value: '6',
        icon: Users,
        color: 'text-purple-600 dark:text-purple-400',
        bg: 'bg-purple-50 border-purple-200 dark:bg-purple-400/10 dark:border-purple-400/20'
    }
];
