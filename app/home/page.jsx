import { UserButton, currentUser } from '@clerk/nextjs'
import React from 'react'

const page = async () => {
  const user = await currentUser();
  
  return (
    <div>
      <h1>hi {user?.firstName}</h1>
      <UserButton afterSignOutUrl="/"></UserButton>
    </div>
  );
}

export default page