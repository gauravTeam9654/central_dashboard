
import React from 'react';
import { NetworkIcon, BarChartIcon, BellIcon, SettingsIcon, ShieldIcon } from './Icons';

interface NavLinkProps {
    icon: React.ReactNode;
    label: string;
    isActive?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ icon, label, isActive = false }) => (
    <a
        href="#"
        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
            isActive
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
        }`}
    >
        {icon}
        <span className="ml-3">{label}</span>
    </a>
);

export const Sidebar: React.FC = () => {
    return (
        <div className="hidden md:flex flex-col w-64 bg-gray-800 text-white">
            <div className="flex items-center justify-center h-20 border-b border-gray-700">
                <ShieldIcon className="h-8 w-8 text-blue-400" />
                <h1 className="text-xl font-bold ml-2">Central Dashboard</h1>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                <NavLink icon={<BarChartIcon className="h-5 w-5" />} label="Dashboard" isActive={true} />
                <NavLink icon={<NetworkIcon className="h-5 w-5" />} label="Devices" />
                <NavLink icon={<BellIcon className="h-5 w-5" />} label="Alerts" />
                <NavLink icon={<SettingsIcon className="h-5 w-5" />} label="Settings" />
            </nav>
        </div>
    );
};
