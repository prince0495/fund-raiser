'use client';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Loader2, XCircle, Archive } from 'lucide-react';

type InterestStatus = 'Active' | 'Pending' | 'Closed' | 'Rejected';

export type ActiveDeal = {
  deal: {
    id: string;
    description: string;
  };
  investor: {
    name: string;
  };
  investorMessage: string;
  status: InterestStatus;
  dealPartner: string | null;
  lastActivity: string | null;
};


const LoadingState = () => (
    <div className="flex flex-col items-center justify-center h-80 text-gray-500">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="text-lg font-medium">Loading Active Deals...</p>
        <p className="text-sm">Please wait a moment.</p>
    </div>
);

const ErrorState = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center h-80 bg-red-50 text-red-700 rounded-lg p-6">
        <XCircle className="w-12 h-12 mb-4" />
        <p className="text-lg font-semibold">An Error Occurred</p>
        <p className="text-sm">{message}</p>
    </div>
);

const EmptyState = () => (
    <div className="text-center py-16 px-6">
        <Archive className="w-16 h-16 mx-auto text-gray-400" />
        <h3 className="mt-4 text-xl font-semibold text-gray-800">No Active Deals Found</h3>
        <p className="mt-2 text-gray-500">There are currently no deals with an &apos;Active&apos; status.</p>
    </div>
);


const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return 'Invalid Date';
  }
};

const StatusBadge = ({ status }: { status: InterestStatus }) => {
    const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full inline-flex items-center gap-1.5";
    const statusStyles = {
        Active: "bg-green-100 text-green-800",
        Pending: "bg-yellow-100 text-yellow-800",
        Closed: "bg-blue-100 text-blue-800",
        Rejected: "bg-red-100 text-red-800",
    };
    const dotStyles = {
        Active: "bg-green-500",
        Pending: "bg-yellow-500",
        Closed: "bg-blue-500",
        Rejected: "bg-red-500",
    };
    return (
        <span className={`${baseClasses} ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
            <span className={`w-2 h-2 rounded-full ${dotStyles[status] || 'bg-gray-500'}`}></span>
            {status}
        </span>
    );
};


const ActiveDealsTable = ({ deals }: { deals: ActiveDeal[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investor&apos;s Message</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal Partner</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {deals.map((item) => (
            <tr key={item.deal.id} className="hover:bg-gray-50 transition-colors duration-200 align-top">
              
              <td className="px-6 py-4 text-sm text-gray-700 font-mono">
                {item.deal.id}
              </td>

              <td className="px-6 py-4 text-sm text-gray-900">
                {item.investor.name}
              </td>

              <td className="px-6 py-4 text-sm text-gray-700 whitespace-normal break-words">
                {item.deal.description}
              </td>

              <td className="px-6 py-4 text-sm text-gray-600 whitespace-normal break-words">
                {item.investorMessage}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={item.status} />
              </td>

              <td className="px-6 py-4 text-sm text-gray-600">
                {item.dealPartner || 'N/A'}
              </td>

              <td className="px-6 py-4 text-sm text-gray-600">
                {formatDate(item.lastActivity)}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default function ActiveDealsPage({ userId }: { userId: string }) {
  const [deals, setDeals] = useState<ActiveDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActiveDeals = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post('/api/interest/founder/active', { userId });
        if (response.data?.success) {
          setDeals(response.data.interests);
        } else {
          throw new Error(response.data?.msg || 'Failed to fetch active deals.');
        }
      } catch (err) {
        console.error("Fetch error:", err);
        let errorMessage = 'An unknown error occurred.';
        if (axios.isAxiosError(err)) {
          errorMessage = err.response?.data?.msg || err.message;
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }

        setError(errorMessage);
        setDeals([]);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchActiveDeals();
    } else {
        setLoading(false);
        setError("User ID is not provided.");
    }
  }, [userId]); 

  const renderContent = () => {
    if (loading) return <LoadingState />;
    if (error) return <ErrorState message={error} />;
    if (deals.length === 0) return <EmptyState />;
    return <ActiveDealsTable deals={deals} />;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Active Deals Dashboard</h1>
          <p className="mt-2 text-md text-gray-600">A real-time overview of your ongoing investment opportunities.</p>
        </header>
        <main>
          <div className="bg-white rounded-xl shadow-lg animate-fade-in">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}