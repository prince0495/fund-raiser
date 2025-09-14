"use client"
import { SignupBody } from '@/app/api/auth/signup/route';
import { Role } from '@prisma/client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';


const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

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

const RoleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
);


const Page = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupBody>();
  const router = useRouter()

  const onSubmit: SubmitHandler<SignupBody> = async (data) => {
    const res = await axios.post('/api/auth/signup', data, {withCredentials: true})

    if(res.data?.success === true) {

      router.push('/')
    }
    else {
      alert(res.data?.msg)
    }
  };

  return (
<div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans text-black">
  <div className="relative flex flex-col space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 max-h-[90vh] overflow-y-auto">
    
    <div className="flex flex-col justify-center p-8 md:p-14 w-full md:w-[400px]">
      <span className="mb-3 text-4xl font-bold">Create Account</span>
      <span className="font-light text-gray-500 mb-8">
        Join our community of innovators and investors!
      </span>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <span className="mb-2 text-md font-medium text-gray-700">Name</span>
              <div className="relative">
                <UserIcon />
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                  placeholder="Enter your name"
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

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
                    required: "Password is required",
                    minLength: { value: 8, message: "Password must be at least 8 characters" }
                  })}
                  className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
  
            <div className="py-2">
              <span className="mb-2 text-md font-medium text-gray-700">I am a...</span>
              <div className="relative">
                <RoleIcon />
                <select 
                  defaultValue=""
                  {...register("role", { required: "Please select a role" })}
                  className="w-full border border-gray-300 rounded-lg p-3 pl-10 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow bg-white"
                >
                  <option value="" disabled>Select your role</option>
                  <option value={Role.Founder}>Founder</option>
                  <option value={Role.Investor}>Investor</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
              {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
            </div>
            
         
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-indigo-600 text-white p-3 rounded-lg mt-6 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="text-center text-gray-500 mt-8">
            Already have an account? 
            <Link href={'/auth/signin'}>
              <span className="font-medium text-indigo-600 hover:text-indigo-800 ml-1">Sign In</span>
            </Link>
          </div>
        </div>
    <div className="relative hidden md:block w-[400px]">
          <img
        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
        alt="A group of professionals collaborating"
        className="w-full h-full object-cover rounded-r-2xl"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent rounded-r-2xl"></div>
        </div>
      </div>
    </div>
  );
}

export default Page;