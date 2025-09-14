'use client'
import React, { useEffect, useRef, useState } from 'react';
import InterestReceivedPage from '../ui/InterestReceivedPage';
import ActiveDealsPage from '../ui/ActiveDealsPage';
import CreateDealPage from '../ui/CreateDealPage';
import Notification from '../ui/Notification';

type Tab = 'interest-received' | 'active-deals' | 'create-deal';

const DealsTabs = ({userId}: {userId: string}) => {
    const [activeTab, setActiveTab] = useState<Tab>('active-deals');
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsNotificationOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const tabs: { id: Tab; label: string; index: number }[] = [
        { id: 'interest-received', label: 'Interest Received', index: 0 },
        { id: 'active-deals', label: 'Active Deals', index: 1 },
        { id: 'create-deal', label: 'Create Deal', index: 2 },
    ];

    const activeTabIndex = tabs.findIndex(tab => tab.id === activeTab);
    
    const renderContent = () => {
        switch(activeTab) {
            case 'interest-received':
                return <InterestReceivedPage userId={userId} />;
            case 'active-deals':
                return <ActiveDealsPage userId={userId} />;
            case 'create-deal':
                return <CreateDealPage userId={userId} />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full max-w-full mx-auto font-sans">
            <div className="flex justify-center items-center gap-4">
            <div className="relative w-fit mx-auto bg-gray-100 p-1 rounded-full shadow-inner">
                <div 
                    className="absolute top-1 left-1 h-[calc(100%-8px)] w-1/3 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(calc(100% * ${activeTabIndex}))` }}
                />
                <div className="relative flex justify-center items-center">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-2.5 text-sm font-semibold rounded-full focus:outline-none transition-colors duration-300 w-48 text-center ${
                                activeTab === tab.id ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-800'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative" ref={notificationRef}>
                <button
                    onClick={() => setIsNotificationOpen(prev => !prev)}
                    className={`p-2.5 rounded-full focus:outline-none transition-colors duration-300 ${isNotificationOpen ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    aria-haspopup="true"
                    aria-expanded={isNotificationOpen}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </button>

                {isNotificationOpen && (
                    <Notification userId={userId} />
                )}
            </div>
            </div>
            <div className="mt-8 w-full ">
                {renderContent()}
            </div>
        </div>
    );
};

export default function App({userId}: {userId: string}) {
    return (
        <>
            <div className="bg-gray-50 p-8 min-h-screen flex items-start justify-center">
                <DealsTabs userId={userId} />
            </div>
        </>
    );
}

