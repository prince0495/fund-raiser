'use client'
import React, { useState, useRef, useEffect } from 'react';
export type sectorType = "Technology" | "Healthcare" | "Finance" | "E-commerce" | "Education" | "Real Estate";
export type interestPayloadType = {
    dealId: string,
    investorMessage: string,
    slots: slotType[],
    userId: string,
    founderId: string,
}

export type slotType = {
    startTime: Date,
    endTime: Date
}

import axios from 'axios';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

const SearchIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="h-5 w-5"
    >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const FilterIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
    >
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
);

type Deal = {
    id: string;
    userId: string;
    sector: sectorType
    companyAge: number;
    description: string;
    TTMRevenue: number;
    AskPrice: number;
    customers: number;
};
const iconProps = {
    className: "w-6 h-6 mr-2 text-indigo-600"
};

const TechnologyIcon = () => <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>;
const HealthcareIcon = () => <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>;
const FinanceIcon = () => <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
const EcommerceIcon = () => <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>;
const EducationIcon = () => <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 5 4 5 6 5s6-0 6-5v-5"></path></svg>;
const RealEstateIcon = () => <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const VerifiedIcon = () => <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>;
const HeartIcon = () => <svg className="w-6 h-6 text-gray-400 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z"></path></svg>;

const getSectorIcon = (sector: string) => {
    switch (sector) {
        case 'Technology': return <TechnologyIcon />;
        case 'Healthcare': return <HealthcareIcon />;
        case 'Finance': return <FinanceIcon />;
        case 'E-commerce': return <EcommerceIcon />;
        case 'Education': return <EducationIcon />;
        case 'Real Estate': return <RealEstateIcon />;
        default: return null;
    }
};

const DealCard = ({ deal, onViewListing }: { deal: Deal, onViewListing: (deal: Deal) => void }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg hover:border-indigo-300 transition-all duration-300">
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div className="flex items-center">
                        {getSectorIcon(deal.sector)}
                        <span className="text-indigo-600 font-semibold tracking-wide text-sm uppercase">{deal.sector}</span>
                    </div>
                    <div className="flex items-center bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        <VerifiedIcon />
                        <span className="ml-1">Verified</span>
                    </div>
                </div>

                <p className="mt-4 text-gray-500 text-sm h-20 overflow-hidden">{deal.description}</p>
                
                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div className="text-gray-600"><span className="font-semibold text-gray-800">Revenue:</span> {deal.TTMRevenue} Cr</div>
                    <div className="text-gray-600"><span className="font-semibold text-gray-800">Ask Price:</span> {deal.AskPrice} Cr</div>
                    <div className="text-gray-600"><span className="font-semibold text-gray-800">Customers:</span> {deal.customers.toLocaleString()}</div>
                    <div className="text-gray-600"><span className="font-semibold text-gray-800">Age:</span> {deal.companyAge} yrs</div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                    <button onClick={() => onViewListing(deal)} className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                        View Listing
                    </button>
                    <button className="focus:outline-none">
                        <HeartIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

const DealDetailModal = ({ deal, onClose, userId }: { deal: Deal | null; onClose: () => void; userId: string}) => {
    const [viewMode, setViewMode] = useState<'details' | 'interestForm'>('details');
    const [reason, setReason] = useState('');
    const [selectedSlots, setSelectedSlots] = useState<Date[]>([]);
    const [slotDuration, setSlotDuration] = useState<number>(30); 
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    useEffect(() => {
        if (deal) {
            setViewMode('details');
            setReason('');
            setSelectedSlots([]);
            setSlotDuration(30);
        }
    }, [deal]);

    if (!deal) return null;

    const generateTimeSlots = (): Date[] => {
        const slots: Date[] = [];
        const now = new Date();
        const startOfDay = new Date(now);
        startOfDay.setDate(now.getDate() + 1); 
        startOfDay.setHours(9, 0, 0, 0);

        for (let day = 0; day < 3; day++) { 
            const currentDay = new Date(startOfDay);
            currentDay.setDate(startOfDay.getDate() + day);
            for (let hour = 9; hour < 18; hour++) {
                const slotTime = new Date(currentDay);
                slotTime.setHours(hour);
                slots.push(slotTime);
            }
        }
        return slots;
    };

    const availableTimeSlots = generateTimeSlots();

    const handleSlotClick = (slot: Date) => {
        setSelectedSlots(prev => {
            const isSelected = prev.some(s => s.getTime() === slot.getTime());
            if (isSelected) {
                return prev.filter(s => s.getTime() !== slot.getTime());
            }
            if (prev.length < 2) {
                return [...prev, slot];
            }
            return prev;
        });
    };
    const handleSubmitInterest = async(e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true)
        const interestPayload: interestPayloadType = {
            dealId: deal.id,
            investorMessage: reason,
            slots: selectedSlots.map(startTime => {
                const endTime = new Date(startTime.getTime() + slotDuration * 60000); 
                return {
                    startTime, 
                    endTime,   
                };
            }),
            userId: userId,
            founderId: deal.userId
        };

        const res = await axios.post('/api/interest', interestPayload)

        if(res.data?.msg == 'Interest already exist for this deal') {
            alert(res.data?.msg as string)
        }
        else if(res.data?.success === true) {
            console.log('interest created');
        }
        console.log(res.data?.msg);
        setIsSubmitting(false)
        onClose();
    };

    const formatSlot = (date: Date) => {
        return date.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
    };

    return (
        <div 
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4"
        >
            <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 ease-in-out"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-8 relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors z-20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    
                    {viewMode === 'details' && (
                        <div>
                             <div className="absolute top-8 right-20 flex items-center space-x-2">
                                <button onClick={() => setViewMode('interestForm')} className="px-3 py-1.5 bg-green-500 text-white text-xs font-semibold rounded-md hover:bg-green-600 transition-colors">
                                    Express Interest
                                </button>
                                <button onClick={onClose} className="px-3 py-1.5 bg-gray-200 text-gray-600 text-xs font-semibold rounded-md hover:bg-gray-300 transition-colors">
                                    Pass
                                </button>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Deal Details</h2>
                            <p className="mt-2 text-gray-600">High-level overview of the investment opportunity.</p>
                             <div className="mt-4 border-t pt-4">
                                <p className="font-semibold">Currently viewing: <span className="text-indigo-600">{deal.sector} Deal</span></p>
                                <p className="mt-2 text-gray-600 text-sm">{deal.description}</p>
                                <Link href={`/profile/${deal.userId}`} target='blank'>
                                <button className="mt-4 text-indigo-600 font-semibold text-sm hover:underline">
                                    View Founder&apos;s Full Dashboard
                                </button>
                                </Link>
                             </div>
                        </div>
                    )}

                    {viewMode === 'interestForm' && (
                        <form onSubmit={handleSubmitInterest}>
                             <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Express Interest</h2>
                                <button type="button" onClick={() => setViewMode('details')} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                                    &larr; Back
                                </button>
                            </div>

                            <div>
                                <label htmlFor="interest-reason" className="block text-sm font-medium text-gray-700 mb-1">
                                    Why are you interested in this company?
                                </label>
                                <textarea id="interest-reason" rows={4} value={reason} onChange={(e) => setReason(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Briefly explain your interest..." required />
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4 items-end">
                                <div>
                                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                                      Meeting Duration
                                    </label>
                                    <select id="duration" value={slotDuration} onChange={(e) => setSlotDuration(Number(e.target.value))}
                                        className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                        <option value={15}>15 minutes</option>
                                        <option value={30}>30 minutes</option>
                                        <option value={45}>45 minutes</option>
                                        <option value={60}>60 minutes</option>
                                    </select>
                                </div>
                                <div className="text-sm text-gray-600">
                                    Select two preferred time slots below.
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Available Slots:
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-2">
                                    {availableTimeSlots.map(slot => (
                                        <button type="button" key={slot.toISOString()} onClick={() => handleSlotClick(slot)}
                                            className={`p-2 border rounded-md text-center text-xs transition-colors ${
                                                selectedSlots.some(s => s.getTime() === slot.getTime()) 
                                                ? 'bg-indigo-600 text-white border-indigo-600' 
                                                : 'bg-white hover:bg-gray-100'
                                            }`}>
                                            {formatSlot(slot)}
                                        </button>
                                    ))}
                                </div>
                                {selectedSlots.length !== 2 && <p className="text-xs text-red-500 mt-1">Please select exactly 2 time slots.</p>}
                            </div>

                            <div className="mt-6 border-t pt-4">
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Submitting...
                                    </>
                                ) : 
                                (<button type="submit" disabled={selectedSlots.length !== 2 || !reason
                                    
                                }
                                    className="w-full py-2.5 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
                                    Submit Interest
                                </button>)}
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

const Search = ({userId}: {userId: string}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);
    const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

    const [sector, setSector] = useState('');
    const [revenue, setRevenue] = useState({ min: '', max: '' });
    const [ebitda, setEbitda] = useState({ min: '', max: '' });
    const [age, setAge] = useState({ min: '', max: '' });
    const [deals, setDeals] = useState<Deal[]>([])
    const [dealsLoading, setDealsLoading] = useState(false)

    useEffect(() => {
      getAllDeals();
    }, [])
    
    const getAllDeals = async() => {
        setDealsLoading(true)
        try {
            const res = await axios.get('/api/deal')
            if(res.data?.deals) {
                setDeals(res.data?.deals as Deal[])
            }
        } catch (error) {
            console.error("Error fetching deals:", error);
        }
        setDealsLoading(false)
      }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const filters = { sector, revenue, ebitda, age };
        console.log("Searching for:", searchTerm);
        console.log("With Filters:", filters);
        
        try {
             const res = await axios.post('/api/deal/filter', {
                sector,
                revenue,
                ebitda,
                age,
                searchTerm
            })
            if(res.data?.deals) {
                setDeals(res.data.deals)
            }
            if(isFilterOpen === true) {
                setIsFilterOpen(false)
            }
        } catch (error) {
            console.log(error);
            
        }
    };
    
    const handleResetFilters = () => {
        setSector('');
        setRevenue({ min: '', max: '' });
        setEbitda({ min: '', max: '' });
        setAge({ min: '', max: '' });
        setIsFilterOpen(false);
        getAllDeals()
    }

    const handleFilter = async() => {
        try {
            const res = await axios.post('/api/deal/filter', {
                sector,
                revenue,
                ebitda,
                age,
            })
            if(res.data?.deals) {
                setDeals(res.data?.deals)
            }
            setIsFilterOpen(false)
        } catch (error) {
            console.log(error);
               
        }
    }

    const handleViewListing = (deal: Deal) => {
        setSelectedDeal(deal);
    };

    const handleCloseModal = () => {
        setSelectedDeal(null);
    };

    const sectors: sectorType[] = ["Technology", "Healthcare", "Finance", "E-commerce", "Education", "Real Estate"];

    return (
        <>
            <div className='flex justify-between items-center w-full p-4 bg-white rounded-lg shadow-md font-sans mb-8'>
                <div className='flex-grow'>
                    <form onSubmit={handleSearch} className="relative flex w-full max-w-lg">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search for deals, founders, or investors..."
                            className="w-full pl-4 pr-32 py-2.5 text-gray-700 bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                        />
                        <button
                            type="submit"
                            className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all duration-300"
                        >
                            <SearchIcon />
                            <span className="ml-2 font-semibold text-sm">Search</span>
                        </button>
                    </form>
                </div>
                
                <div className='relative ml-4' ref={filterRef}>
                    <button 
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="flex items-center justify-center px-4 py-2.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    >
                        <FilterIcon />
                        <span className="ml-2 font-semibold text-sm">Filters</span>
                    </button>

                    {isFilterOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl p-6 z-10 origin-top-right">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Advanced Filters</h3>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
                                <select value={sector} onChange={e => setSector(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                    <option value="">All Sectors</option>
                                    {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Revenue Range (in Crores)</label>
                                <div className="flex items-center space-x-2">
                                    <input type="number" placeholder="Min" value={revenue.min} onChange={e => setRevenue({...revenue, min: e.target.value})} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                    <span className="text-gray-500">-</span>
                                    <input type="number" placeholder="Max" value={revenue.max} onChange={e => setRevenue({...revenue, max: e.target.value})} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">EBITDA Range (in Crores)</label>
                                <div className="flex items-center space-x-2">
                                    <input type="number" placeholder="Min" value={ebitda.min} onChange={e => setEbitda({...ebitda, min: e.target.value})} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                    <span className="text-gray-500">-</span>
                                    <input type="number" placeholder="Max" value={ebitda.max} onChange={e => setEbitda({...ebitda, max: e.target.value})} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company Age (in years)</label>
                                <div className="flex items-center space-x-2">
                                    <input type="number" placeholder="Min" value={age.min} onChange={e => setAge({...age, min: e.target.value})} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                    <span className="text-gray-500">-</span>
                                    <input type="number" placeholder="Max" value={age.max} onChange={e => setAge({...age, max: e.target.value})} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                            </div>
                            
                            <div className="flex justify-between">
                                <button onClick={handleResetFilters} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition">Reset</button>
                                <button onClick={handleFilter} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition">Apply</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            { dealsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-64 w-full rounded-xl bg-gray-200 animate-pulse" 
                        />
                    ))}
                </div>
            ) : (
                <div className="animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {deals.map(deal => (
                            <DealCard key={deal.id} deal={deal} onViewListing={handleViewListing} />
                        ))}
                    </div>
                </div>
            )}
            <DealDetailModal deal={selectedDeal} onClose={handleCloseModal} userId={userId} />
        </>
    );
};

export default Search;
