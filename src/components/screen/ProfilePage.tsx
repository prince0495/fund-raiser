'use client'

import { JSX, useEffect, useState } from "react"
import { UserType } from "./UserProfilePage";
import axios from "axios";

const LocationIcon = (): JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);

const LinkedInIcon = (): JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-gray-500 hover:text-blue-700 transition-colors">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const TwitterIcon = (): JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-gray-500 hover:text-sky-500 transition-colors">
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.791 4.649-.562.152-1.158.22-1.778.085.608 1.884 2.373 3.256 4.466 3.293-1.623 1.272-3.666 2.028-5.88 1.747 2.109 1.353 4.615 2.148 7.29 2.148 8.568 0 13.255-7.098 13.255-13.254 0-.202-.005-.403-.014-.602.91-.658 1.7-1.476 2.323-2.41z" />
    </svg>
);

const WebsiteIcon = (): JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 hover:text-gray-800 transition-colors">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
);

const ProfilePlaceholderIcon = (): JSX.Element => (
    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const LoadingSpinner = (): JSX.Element => (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex items-center space-x-3">
            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-xl text-gray-700 font-semibold">Loading Profile...</span>
        </div>
    </div>
);

const ProfilePage = ({founderId}: {founderId: string}) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUserData = async() => {
      try {
        const res = await axios.get(`/api/user/${founderId}`);
        if(res.data?.user) {
          const userData = res.data.user;
          setUser(userData)
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }
    fetchUserData()
  }, [founderId])
  

  return (
    <div>
      {user ? (
            <div className="bg-gray-50 min-h-screen font-sans antialiased">
                <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="p-6 md:p-8">
                            <div className="md:flex md:items-start md:justify-between">
                                <div className="flex items-center mb-6 md:mb-0">
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-100 overflow-hidden ring-4 ring-blue-100 flex-shrink-0">
                                          <ProfilePlaceholderIcon/>
                                    </div>
                                    <div className="ml-5 sm:ml-6">
                                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{user.name}</h1>
                                        <span className="inline-block mt-1 px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">{user.role}</span>
                                        {user.location && (
                                            <p className="text-sm text-gray-500 mt-2 flex items-center">
                                                <LocationIcon />
                                                {user.location}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex space-x-4 justify-start md:justify-end items-center">
                                    {user.linkedinUrl && <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile"><LinkedInIcon /></a>}
                                    {user.twitterUrl && <a href={user.twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile"><TwitterIcon /></a>}
                                    {user.personalWebsite && <a href={user.personalWebsite} target="_blank" rel="noopener noreferrer" aria-label="Personal Website"><WebsiteIcon /></a>}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 p-6 md:p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-3">About</h2>
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                        {user.bio || 'No biography provided.'}
                                    </p>
                                </div>

                                <div className="lg:col-span-1">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-3">Details</h2>
                                    <dl className="space-y-4">
                                        {user.companyName && (
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Company</dt>
                                                <dd className="mt-1 text-md text-gray-900 font-medium">{user.companyName}</dd>
                                            </div>
                                        )}
                                        {user.industry && (
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Industry</dt>
                                                <dd className="mt-1 text-md text-gray-900 font-medium">{user.industry}</dd>
                                            </div>
                                        )}
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                                            <dd className="mt-1 text-md text-gray-900 font-medium break-words">
                                                <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">{user.email}</a>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ): (
        <LoadingSpinner/>
      )}
    </div>
  )
}

export default ProfilePage
