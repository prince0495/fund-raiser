'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import Logout from './Logout';

const LogoIcon = () => (
    <svg 
        className="h-8 w-auto text-indigo-600" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
    </svg>
);

const UserProfileIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="h-6 w-6"
    >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

type NavbarLayoutProps = {
    children: React.ReactNode;
};

export const Navbar = ({ children }: NavbarLayoutProps) => {
    const pathname = usePathname();
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const navLinkClasses = (path: string) => 
        `px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 relative ${
            pathname === path 
            ? 'text-gray-900' 
            : 'text-gray-500 hover:text-gray-900'
        }`;

    const activeLinkUnderline = (path: string) =>
        pathname === path && (
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-0.5 bg-indigo-600 rounded-full"></span>
        );
    
    return (
        <div className="w-full font-sans bg-gray-50 min-h-screen">
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-8">
                            <Link href={'/'}>
                            <span className="flex items-center space-x-2 flex-shrink-0">
                                <LogoIcon />
                                <span className="text-xl font-bold text-gray-800 tracking-tight">Raiser</span>
                            </span>
                            </Link>
                            <div className="hidden md:flex items-baseline space-x-4">
                                <Link href={'/dashboard'}>
                                <span className={navLinkClasses('/dashboard')}>
                                    Dashboard
                                    {activeLinkUnderline('/dashboard')}
                                </span>
                                </Link>
                                <Link href={'/'}>
                                <span className={navLinkClasses('/')}>
                                    Deals
                                    {activeLinkUnderline('/')}
                                </span>
                                </Link>
                            </div>
                        </div>

                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                aria-expanded={isDropdownOpen}
                                aria-haspopup="true"
                            >
                                <UserProfileIcon />
                            </button>
                            
                            {isDropdownOpen && (
                                <div 
                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" 
                                    role="menu" 
                                    aria-orientation="vertical" 
                                    aria-labelledby="user-menu-button"
                                >
                                    <Link href={'/dashboard'}>
                                        <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                            Profile
                                        </span>
                                    </Link>
                                    <Logout/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
};
