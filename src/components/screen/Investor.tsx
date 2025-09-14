import React from 'react'
import Search from '../ui/Search'

const Investor = ({userId}: {userId: string}) => {
  return (
    <div className='text-black w-full h-full  '>
      <Search userId={userId} />
    </div>
  )
}

export default Investor
