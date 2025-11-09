
import React from 'react';

interface SummaryWidgetProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
}

export const SummaryWidget: React.FC<SummaryWidgetProps> = ({ title, value, icon }) => {
    return (
        <div className="bg-gray-800 rounded-lg p-6 flex items-center justify-between shadow-lg hover:shadow-blue-500/20 transition-shadow duration-300">
            <div>
                <p className="text-sm font-medium text-gray-400">{title}</p>
                <p className="text-3xl font-bold text-white mt-1">{value}</p>
            </div>
            <div className="text-blue-400">
                {icon}
            </div>
        </div>
    );
};
