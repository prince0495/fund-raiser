'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios';

const Logout = () => {
  const router = useRouter();
  return (
    <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"
        onClick={async() => {
          const res = await axios.post('/api/auth/logout');
          if(res.data?.success === true) {
            router.push('/auth/signin')
          }
          else {
            alert('Slow internet, retry again')
          }
        }}
    >
        Logout
    </span>
  )
}

export default Logout
