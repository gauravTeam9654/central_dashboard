
import React from 'react';

interface HeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm }) => {
    return (
        <header className="flex items-center justify-between h-20 px-4 md:px-8 bg-gray-800 border-b border-gray-700">
            <h1 className="text-xl md:text-2xl font-semibold text-white">Network Overview</h1>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </span>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-48 md:w-64 pl-10 pr-4 py-2 text-sm text-gray-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search by name, IP..."
                />
            </div>
        </header>
    );
};
