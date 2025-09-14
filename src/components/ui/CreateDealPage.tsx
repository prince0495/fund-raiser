'use client'
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

export type DealFormData = {
    sector: sectorType;
    companyAge: number;
    description: string;
    TTMRevenue: number;
    AskPrice: number;
    customers: number;
};

export type sectorType = "Technology" | "Healthcare" | "Finance" | "E-commerce" | "Education" | "Real Estate";

const CreateDealPage = ({userId}: {userId: string}) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<DealFormData>();
    const sectors = ["Technology", "Healthcare", "Finance", "E-commerce", "Education", "Real Estate"];

    const onSubmit: SubmitHandler<DealFormData> = async (data) => {
        const res = await axios.post('/api/deal', {
            ...data,
            userId: userId
        })
        reset()
        if(res.data.success === true) {
            alert('Deal created successfully')
        }
        else {
            alert("There is some network problem, try again later")
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md animate-fade-in">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 text-center">Create a New Deal</h2>
                <p className="mt-2 text-gray-500 text-center mb-8">Fill in the details below to list your deal for potential investors.</p>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-black">
                    <div>
                        <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
                        <select
                            id="sector"
                            {...register("sector", { required: "Sector is required" })}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                        >
                            <option value="" disabled>Select a sector</option>
                            {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.sector && <p className="text-red-500 text-sm mt-1">{errors.sector.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            id="description"
                            rows={4}
                            {...register("description", { 
                                required: "A brief description is required",
                                minLength: { value: 20, message: "Description must be at least 20 characters long." }
                            })}
                            placeholder="Describe the company, its mission, and the deal..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="TTMRevenue" className="block text-sm font-medium text-gray-700 mb-1">TTM Revenue (in Crores)</label>
                            <input
                                id="TTMRevenue"
                                type="number"
                                {...register("TTMRevenue", { 
                                    required: "Revenue is required", 
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Revenue cannot be negative." }
                                })}
                                placeholder="e.g., 50"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                            />
                            {errors.TTMRevenue && <p className="text-red-500 text-sm mt-1">{errors.TTMRevenue.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="AskPrice" className="block text-sm font-medium text-gray-700 mb-1">Ask Price (in Crores)</label>
                            <input
                                id="AskPrice"
                                type="number"
                                {...register("AskPrice", { 
                                    required: "Ask price is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Price cannot be negative." }
                                })}
                                placeholder="e.g., 100"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                            />
                            {errors.AskPrice && <p className="text-red-500 text-sm mt-1">{errors.AskPrice.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="companyAge" className="block text-sm font-medium text-gray-700 mb-1">Company Age (in years)</label>
                            <input
                                id="companyAge"
                                type="number"
                                {...register("companyAge", { 
                                    required: "Company age is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Age cannot be negative." }
                                })}
                                placeholder="e.g., 5"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                            />
                            {errors.companyAge && <p className="text-red-500 text-sm mt-1">{errors.companyAge.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="customers" className="block text-sm font-medium text-gray-700 mb-1">Number of Customers</label>
                            <input
                                id="customers"
                                type="number"
                                {...register("customers", { 
                                    required: "Number of customers is required",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Customers cannot be negative." }
                                })}
                                placeholder="e.g., 10000"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                            />
                            {errors.customers && <p className="text-red-500 text-sm mt-1">{errors.customers.message}</p>}
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Submitting Deal...' : 'Create Deal'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default CreateDealPage;