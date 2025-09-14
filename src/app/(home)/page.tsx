import Founder from "@/components/screen/Founder";
import Investor from "@/components/screen/Investor";
import { Role } from "@prisma/client";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode("james"); 

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  if(!token) {
    return (
      <div>
        Don&apos;t try to hijack
      </div>
    )
  }

  try {

    const { payload } = await jwtVerify(token, secret);   
    
    if(payload?.role as Role === 'Investor') {
      return <Investor userId={`${payload?.userId}`} />
    }
    else if(payload?.role as Role === 'Founder') {
      return <Founder userId={`${payload?.userId}`} />
    }
    else {
      return (
        <div>
          Only users are allowed
        </div>
      ); 
    }

  } catch (error) {
    console.log(error);
    
    return (
    <div>
      Invalid token or session expired
    </div>
  ); 
  }
}
