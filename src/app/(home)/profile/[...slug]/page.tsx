import ProfilePage from '@/components/screen/ProfilePage';
import React from 'react'

const page = async(context: { params: Promise<{ slug?: string[] }> }) => {
  const { slug } = await context.params;
  if (!slug || slug.length === 0) {
      return null;
  }
  const founderId = slug[0];
  return (
    <ProfilePage founderId={founderId} />
  )
}

export default page
