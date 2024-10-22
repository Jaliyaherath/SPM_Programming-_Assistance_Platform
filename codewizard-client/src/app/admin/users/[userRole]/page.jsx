import UserList from '@/components/userManagement/UserList'
import React from 'react'

export default function page({params}) {
  return (
    <div>
      {/* {params.userRole} */}
      <UserList userRole={params.userRole}/>
    </div>
  )
}
