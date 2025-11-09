import React, { useState, useEffect, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { generateMockDevices } from './services/mockData';
import type { Device } from './types';

const App: React.FC = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching data
        setTimeout(() => {
            setDevices(generateMockDevices(25));
            setIsLoading(false);
        }, 1000);
    }, []);

    const filteredDevices = useMemo(() => {
        if (!searchTerm) {
            return devices;
        }
        const lowercasedTerm = searchTerm.toLowerCase();
        return devices.filter(device => {
            const searchCorpus = [
                device.name,
                device.model,
                device.ipAddress,
                device.macAddress,
                'serialNumber' in device ? device.serialNumber : '',
            ].join(' ').toLowerCase();

            return searchCorpus.includes(lowercasedTerm);
        });
    }, [devices, searchTerm]);

    return (
        <div className="flex h-screen bg-gray-900 font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-4 md:p-6 lg:p-8">
                    {isLoading ? (
                         <div className="flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <Dashboard devices={filteredDevices} allDevices={devices} />
                    )}
                </main>
            </div>
        </div>
    );
};

export default App;