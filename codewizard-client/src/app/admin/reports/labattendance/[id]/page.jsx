"use client";
import AtendanceList from '@/components/userManagement/AtendanceList'
import React from 'react'

export default function page({params}) {
  return (
    <div>
      {/* {params.userRole} */}
      <AtendanceList sid={params.id}/>
      {/* <h1>hello my id {params.id}</h1> */}
    </div>
  )
}

