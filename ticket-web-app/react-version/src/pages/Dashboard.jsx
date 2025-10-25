import React, {useEffect, useState} from 'react'
import {listTickets} from '../mockApi'
import {handleApiError} from '../utils/errors'

export default function Dashboard({showToast}){
  const [stats,setStats]=useState({total:0,open:0,resolved:0})

  useEffect(()=>{
    listTickets().then(tickets=>{
      const total = tickets.length
      const open = tickets.filter(t=>t.status==='open').length
      const resolved = tickets.filter(t=>t.status==='closed').length
      setStats({total,open,resolved})
    }).catch(err=>{
      // show a friendly message or redirect on unauthorized
      if(err && err.code === 'UNAUTHORIZED'){
        if(showToast) showToast({text: 'Your session has expired — please log in again.', variant:'error'})
        window.location.hash = '#/auth/login'
      }else{
        if(showToast) showToast({text: 'Failed to load tickets. Please retry.', variant:'error'})
      }
    })
  },[])

  return (
    <main className="container">
      <div className="grid cols-3">
        <div className="card">
          <h4>Total tickets</h4>
          <p style={{fontSize:28}}>{stats.total}</p>
        </div>
        <div className="card">
          <h4>Open</h4>
          <p style={{fontSize:28,color:'var(--color-open)'}}>{stats.open}</p>
        </div>
        <div className="card">
          <h4>Resolved</h4>
          <p style={{fontSize:28,color:'var(--color-closed)'}}>{stats.resolved}</p>
        </div>
      </div>
    </main>
  )
}
