'use client'
import { Role } from '@prisma/client';
import axios from 'axios';
import React, { JSX, useState, useEffect } from 'react';


export interface UserType {
    name: string;
    email: string;
    role: Role;
    location: string | null;
    bio: string | null;
    linkedinUrl: string | null;
    twitterUrl: string | null;
    personalWebsite: string | null;
    companyName: string | null;
    industry: string | null;
}

export interface FormUserType {
    name: string;
    email: string;
    role: Role;
    location: string;
    bio: string;
    linkedinUrl: string;
    twitterUrl: string;
    personalWebsite: string;
    companyName: string;
    industry: string;
}

const EditIcon = (): JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
        <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        <path d="m15 5 4 4" />
    </svg>
);

const UserIcon = (): JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const MailIcon = (): JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

const MapPinIcon = (): JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const BuildingIcon = (): JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500">
        <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
        <path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" />
    </svg>
);

const BriefcaseIcon = (): JSX.Element => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500">
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
);

const LinkedinIcon = (): JSX.Element => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const TwitterIcon = (): JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.4 3.3 4.4s-1.4 1.4-2.8 1.4c-.7 0-1.4-.3-1.4-.3s-1.4 4.4-4.2 4.4c-1.4 0-2.8-.9-2.8-.9s-1.4 1.4-2.8 1.4c-2.1 0-4.2-2.1-4.2-2.1s-1.4-1.4-1.4-2.8c0-2.1 2.1-4.2 2.1-4.2s-1.4-1.4-1.4-2.8c0-1.4 1.4-2.8 1.4-2.8s.7-.7 1.4-.7c1.4 0 2.8 2.1 2.8 2.1s1.4-2.1 2.8-2.1c1.4 0 2.8 1.4 2.8 1.4s1.4-2.1 2.8-2.1c2.1 0 2.8 2.1 2.8 2.1z" />
    </svg>
);

const LinkIcon = (): JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" />
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

interface InfoFieldProps {
    icon: React.ReactNode;
    label: string;
    value: string | null | undefined;
    isLink?: boolean;
}

const InfoField = ({ icon, label, value, isLink = false }: InfoFieldProps) => (
    <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 pt-1">{icon}</div>
        <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            {value ? (
                isLink ? <a href={value} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline break-all">{value}</a>
                : <p className="text-sm text-gray-800">{value}</p>
            ) : <p className="text-sm text-gray-500 italic">Not provided</p>}
        </div>
    </div>
);
    
interface InputFieldProps {
    name: keyof FormUserType;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    type?: string;
}

const InputField = ({ name, label, value, onChange, type = "text" }: InputFieldProps) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            className="w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
);


const UserProfilePage = ({ userId }: { userId: string }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormUserType>({
        name: "",
        email: "",
        role: "Founder",
        location: "",
        bio: "",
        linkedinUrl: "",
        twitterUrl: "",
        personalWebsite: "",
        companyName: "",
        industry: "",
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`/api/user/${userId}`);
                if (res.data?.user) {
                    const userData = res.data.user;
                    setUser(userData);
                    
                    setFormData({
                        name: userData.name ?? "",
                        email: userData.email ?? "",
                        role: userData.role ?? "Founder",
                        location: userData.location ?? "",
                        bio: userData.bio ?? "",
                        linkedinUrl: userData.linkedinUrl ?? "",
                        twitterUrl: userData.twitterUrl ?? "",
                        personalWebsite: userData.personalWebsite ?? "",
                        companyName: userData.companyName ?? "",
                        industry: userData.industry ?? "",
                    });
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [userId]); 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditToggle = () => {
        if (isEditing && user) {
            setFormData({
                name: user.name ?? "",
                email: user.email ?? "",
                role: user.role ?? "Founder",
                location: user.location ?? "",
                bio: user.bio ?? "",
                linkedinUrl: user.linkedinUrl ?? "",
                twitterUrl: user.twitterUrl ?? "",
                personalWebsite: user.personalWebsite ?? "",
                companyName: user.companyName ?? "",
                industry: user.industry ?? "",
            });
        }
        setIsEditing(!isEditing);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        console.log("Submitting the following data to API:", formData);
        
        const res = await axios.post(`/api/user/${userId}`, formData);
        if(res.data?.success === true) {
            setUser(formData);
        }
        setIsEditing(false);

    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!user) {
        return <div className="min-h-screen bg-gray-100 flex items-center justify-center text-red-500 font-semibold">Failed to load user data.</div>;
    }
    
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{isEditing ? 'Edit Profile' : user.name}</h1>
                        <p className="text-md text-indigo-600">{isEditing ? 'Update your information below' : user.role}</p>
                    </div>
                    {!isEditing && (
                        <button onClick={handleEditToggle} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                            <EditIcon /> Edit Profile
                        </button>
                    )}
                </div>

                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                           <InputField name="name" label="Full Name" value={formData.name} onChange={handleInputChange} />
                           <InputField name="email" label="Email" value={formData.email} onChange={handleInputChange} type="email" />
                           <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-600 mb-1">Role</label>
                                <select name="role" id="role" value={formData.role} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="Investor">Investor</option>
                                    <option value="Founder">Founder</option>
                                </select>
                           </div>
                           <InputField name="location" label="Location" value={formData.location} onChange={handleInputChange} />
                           <InputField name="companyName" label="Company Name" value={formData.companyName} onChange={handleInputChange} />
                           <InputField name="industry" label="Industry" value={formData.industry} onChange={handleInputChange} />
                           <div className="md:col-span-2">
                                <label htmlFor="bio" className="block text-sm font-medium text-gray-600 mb-1">Bio</label>
                                <textarea name="bio" id="bio" rows={4} value={formData.bio} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                           </div>
                           <InputField name="linkedinUrl" label="LinkedIn URL" value={formData.linkedinUrl} onChange={handleInputChange} />
                           <InputField name="twitterUrl" label="Twitter URL" value={formData.twitterUrl} onChange={handleInputChange} />
                           <InputField name="personalWebsite" label="Personal Website URL" value={formData.personalWebsite} onChange={handleInputChange} />
                        </div>
                        <div className="flex justify-end gap-4">
                            <button type="button" onClick={handleEditToggle} className="bg-white hover:bg-gray-50 text-gray-800 font-bold py-2 px-6 rounded-lg transition duration-300 border border-gray-300">Cancel</button>
                            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">Save Changes</button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-8">
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">About</h2>
                            <p className="text-gray-700 leading-relaxed">{user.bio || <span className="italic text-gray-500">No bio provided.</span>}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
                               <h3 className="text-lg font-semibold text-gray-900">Professional Details</h3>
                               <InfoField icon={<UserIcon />} label="Role" value={user.role} />
                               <InfoField icon={<BuildingIcon />} label="Company" value={user.companyName} />
                               <InfoField icon={<BriefcaseIcon />} label="Industry" value={user.industry} />
                            </div>
                            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
                               <h3 className="text-lg font-semibold text-gray-900">Contact & Location</h3>
                               <InfoField icon={<MailIcon />} label="Email" value={user.email} />
                               <InfoField icon={<MapPinIcon />} label="Location" value={user.location} />
                            </div>
                            <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">Online Presence</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <InfoField icon={<LinkedinIcon />} label="LinkedIn" value={user.linkedinUrl} isLink={true} />
                                    <InfoField icon={<TwitterIcon />} label="Twitter" value={user.twitterUrl} isLink={true} />
                                    <InfoField icon={<LinkIcon />} label="Website" value={user.personalWebsite} isLink={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfilePage;
