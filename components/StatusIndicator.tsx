import React from 'react';
import { DeviceStatus } from '../types';

interface StatusIndicatorProps {
    status: DeviceStatus;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
    const statusConfig = {
        [DeviceStatus.ONLINE]: { color: 'bg-green-500', text: 'Online' },
        [DeviceStatus.CONNECTED]: { color: 'bg-green-500', text: 'Connected' },
        [DeviceStatus.OFFLINE]: { color: 'bg-red-500', text: 'Offline' },
        [DeviceStatus.DISCONNECTED]: { color: 'bg-red-500', text: 'Disconnected' },
        [DeviceStatus.WARNING]: { color: 'bg-yellow-500', text: 'Warning' },
    };

    const config = statusConfig[status] || { color: 'bg-gray-500', text: 'Unknown' };

    return (
        <div className="flex items-center space-x-2">
            <div className={`w-2.5 h-2.5 rounded-full ${config.color} animate-pulse`}></div>
            <span className="text-xs font-medium text-gray-300">{config.text}</span>
        </div>
    );
};