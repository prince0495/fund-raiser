import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Loader2, MessageSquare, Briefcase, User, Inbox } from 'lucide-react';
import axios from 'axios';


type InterestReceived = {
  id: string;
  investorId: string;
  dealId: string;
  investorMessage: string;
  slots: {
    id:string;
    startTime: string; 
    endTime: string;
    interestId: string;
  }[];
  deal: {
    description: string;
  };
  investor: {
    name: string;
  };
};

const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="text-lg">Loading Interests...</p>
    </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center h-64 bg-red-50 text-red-700 rounded-lg p-4">
        <XCircle className="w-12 h-12 mb-4" />
        <p className="text-lg font-semibold">An Error Occurred</p>
        <p>{message}</p>
    </div>
);

const NoInterestsFound = () => (
    <div className="text-center py-16 px-6">
        <Inbox className="w-16 h-16 mx-auto text-gray-400" />
        <h3 className="mt-4 text-xl font-semibold text-gray-800">No Pending Interests</h3>
        <p className="mt-2 text-gray-500">You don&apos;t have any pending investment interests at the moment. Check back later!</p>
    </div>
);

const InterestReceivedPage = ({userId}: {userId: string}) => {
    const [interests, setInterests] = useState<InterestReceived[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selections, setSelections] = useState<{
        [key: string]: {
            selectedSlotId: string | null;
            action: 'Accepted' | 'Rejected' | null;
            isSubmitting: boolean;
            error: string | null;
        }
    }>({});

    useEffect(() => {
        const fetchInterests = async () => {
            setLoading(true);
            setError(null);
            try {
                
                const res = await axios.get(`/api/interest/founder/received/${userId}`);
                if(res.data?.interests) {
                    console.log(res.data?.interests);
                    
                    setInterests(res.data.interests)
                }

            } catch (err) {
                setError('Failed to fetch data. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchInterests();
    }, [userId]);

    const updateSelection = (interestId: string, updates: Partial<typeof selections[string]>) => {
        setSelections(prev => ({
            ...prev,
            [interestId]: {
                ...prev[interestId],
                selectedSlotId: prev[interestId]?.selectedSlotId || null,
                action: prev[interestId]?.action || null,
                isSubmitting: prev[interestId]?.isSubmitting || false,
                error: null, 
                ...updates,
            }
        }));
    };
    
    const handleConfirm = async (interestId: string) => {
        const selection = selections[interestId];
        if (!selection?.selectedSlotId || !selection?.action) {
            updateSelection(interestId, { error: "Please select a slot and an action." });
            return;
        }

        updateSelection(interestId, { isSubmitting: true, error: null });

        try {

            if(selection.action === 'Accepted') {
                const res = await axios.post('/api/interest/founder/received', {interestId, selectedSlotId: selection.selectedSlotId})
                if(res.data?.success === true)  {
                    console.log('accepted interest');
                    setInterests(prev => prev.filter(interest => interest.id !== interestId));
                }
            }
            else if(selection.action === 'Rejected') {
                const res = await axios.put('/api/interest/founder/received', {interestId})
                if(res.data?.success === true)  {
                    setInterests(prev => prev.filter(interest => interest.id !== interestId));
                }
            }

                setInterests(prev => prev.filter(interest => interest.id !== interestId));
        } catch (error) {
            console.error("Submission error:", error);
            updateSelection(interestId, { error: "Submission failed. Please try again." });
        } finally {
            updateSelection(interestId, { isSubmitting: false });
        }
    };
    
    const formatSlot = (start: string, end: string) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true
        };
        return `${new Intl.DateTimeFormat('en-US', options).format(startDate)} - ${new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(endDate)}`;
    };

    const renderContent = () => {
        if (loading) return <LoadingSpinner />;
        if (error) return <ErrorMessage message={error} />;
        if (interests.length === 0) return <NoInterestsFound />;

        return (
             <div className="overflow-x-auto text-black">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal Description</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Choose Slot</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {interests.map((interest, index) => {
                            const selection = selections[interest.id] || {};
                            const isConfirmDisabled = !selection.selectedSlotId || !selection.action || selection.isSubmitting;
                            
                            return (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <User className="w-5 h-5 mr-2 text-gray-400" />
                                            <span className="text-sm font-medium text-gray-900">{interest.investor.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-start">
                                          <Briefcase className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0 mt-1" />
                                          <p className="text-sm text-gray-700 max-w-xs">{interest.deal.description}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                       <div className="flex items-start">
                                          <MessageSquare className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0 mt-1" />
                                          <p className="text-sm text-gray-700 max-w-xs" title={interest.investorMessage}>{interest.investorMessage}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            value={selection.selectedSlotId || ""}
                                            onChange={(e) => updateSelection(interest.id, { selectedSlotId: e.target.value })}
                                            className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                        >
                                            <option value="" disabled>Select a time slot</option>
                                            {interest.slots.map(slot => (
                                                <option key={slot.id} value={slot.id}>{formatSlot(slot.startTime, slot.endTime)}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex flex-col space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <button onClick={() => updateSelection(interest.id, { action: 'Accepted' })} className={`inline-flex items-center justify-center px-3 py-1.5 border text-sm font-medium rounded-md focus:outline-none transition-colors ${selection.action === 'Accepted' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-green-700 border-green-300 hover:bg-green-50'}`}>
                                                    <CheckCircle className="-ml-0.5 mr-2 h-4 w-4" /> Accept
                                                </button>
                                                <button onClick={() => updateSelection(interest.id, { action: 'Rejected' })} className={`inline-flex items-center justify-center px-3 py-1.5 border text-sm font-medium rounded-md focus:outline-none transition-colors ${selection.action === 'Rejected' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-red-700 border-red-300 hover:bg-red-50'}`}>
                                                    <XCircle className="-ml-0.5 mr-2 h-4 w-4" /> Reject
                                                </button>
                                                <button onClick={() => handleConfirm(interest.id)} disabled={isConfirmDisabled} className={`inline-flex items-center justify-center px-4 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${isConfirmDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                                                    {selection.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm'}
                                                </button>
                                            </div>
                                            {selection.error && <p className="text-xs text-red-600 mt-1">{selection.error}</p>}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
            <div className="w-full mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Interest Received</h1>
                    <p className="mt-2 text-md text-gray-600">Review and respond to investment interests for your active deals.</p>
                </header>
                <main>
                    <div className="bg-white rounded-xl shadow-lg animate-fade-in">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default InterestReceivedPage;
