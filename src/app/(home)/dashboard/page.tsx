import UserProfilePage from '@/components/screen/UserProfilePage'
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import React from 'react'

const secret = new TextEncoder().encode("james");

const page = async() => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if(!token) {
      return (<div>
        Don&apos;t try to Hijack
      </div>)
    }
    try {
      const { payload } = await jwtVerify(token, secret);
      
      return (
        <UserProfilePage userId={payload?.userId as string} />
      )
      
    } catch (error) {
      console.log(error);
      
      return (
        <div>
          Invalid token or session expired
        </div>
      ); 
    }
}

export default page
