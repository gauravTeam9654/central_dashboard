
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { TrafficDataPoint } from '../types';

interface TrafficChartProps {
    data: TrafficDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-700 text-white p-2 rounded-md shadow-lg border border-gray-600">
                <p className="label text-sm font-bold">{`${label}`}</p>
                <p className="intro text-xs text-cyan-400">{`Download: ${payload[0].value} Mbps`}</p>
                <p className="intro text-xs text-fuchsia-400">{`Upload: ${payload[1].value} Mbps`}</p>
            </div>
        );
    }
    return null;
};

export const TrafficChart: React.FC<TrafficChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 15, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" strokeOpacity={0.5} />
                <XAxis dataKey="time" tick={{ fill: '#A0AEC0', fontSize: 10 }} axisLine={{ stroke: '#4A5568' }} tickLine={false} />
                <YAxis tick={{ fill: '#A0AEC0', fontSize: 10 }} axisLine={{ stroke: '#4A5568' }} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }} />
                <Line type="monotone" dataKey="download" stroke="#22D3EE" strokeWidth={2} dot={false} name="Download (Mbps)" />
                <Line type="monotone" dataKey="upload" stroke="#D946EF" strokeWidth={2} dot={false} name="Upload (Mbps)" />
            </LineChart>
        </ResponsiveContainer>
    );
};
