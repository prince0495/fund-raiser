'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';


type FormData = {
  email: string;
  password: string;
};


const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400">
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

export default function App() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  const router = useRouter()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const res = await axios.post('/api/auth/signin', data, {withCredentials: true});
    if(res.data?.success) {
      router.push('/')
    }
    else {
      alert(res.data?.msg)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans text-black">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Welcome Back</span>
          <span className="font-light text-gray-500 mb-8">
            Please enter your details to sign in.
          </span>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-2">
              <span className="mb-2 text-md font-medium text-gray-700">Email</span>
               <div className="relative">
                <MailIcon />
                <input
                  type="email"
                  {...register("email", { 
                    required: "Email is required", 
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                  })}
                  className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                  placeholder="your.email@provider.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            
            <div className="py-2">
              <span className="mb-2 text-md font-medium text-gray-700">Password</span>
               <div className="relative">
                <LockIcon />
                <input
                  type="password"
                  {...register("password", { 
                    required: "Password is required"
                  })}
                  className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-indigo-600 text-white p-3 rounded-lg mt-6 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center text-gray-500 mt-8">
            Don&apos;t have an account? 
            <Link href={'/auth/signup'}>
                <span className="font-medium text-indigo-600 hover:text-indigo-800 ml-1">Sign Up</span>
            </Link>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
            alt="A group of professionals collaborating"
            className="w-[400px] h-full hidden md:block object-cover rounded-r-2xl"
          />
          <div className="absolute hidden md:block inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent rounded-r-2xl"></div>
        </div>
      </div>
    </div>
  );
}
