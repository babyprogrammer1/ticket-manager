import React, {useEffect, useState} from 'react'
import * as api from '../mockApi'
import TicketCard from '../components/TicketCard'

const VALID_STATUSES = ['open','in_progress','closed']

import {handleApiError} from '../utils/errors'

export default function Tickets({showToast}){
  const [tickets,setTickets]=useState([])
  const [editing,setEditing]=useState(null)
  const [form,setForm]=useState({title:'',description:'',status:'open'})
  const [errors,setErrors]=useState({})
  const [loadingError,setLoadingError]=useState(null)

  useEffect(()=>{
    api.listTickets().then(setTickets).catch(err=>{
      setLoadingError('Failed to load tickets. Please retry.')
      handleApiError(err, showToast, ()=>{ window.location.hash = '#/auth/login' })
    })
  },[])

  function refresh(){
    setLoadingError(null)
    api.listTickets().then(setTickets).catch(err=>{
      setLoadingError('Failed to load tickets. Please retry.')
      handleApiError(err, showToast, ()=>{ window.location.hash = '#/auth/login' })
    })
  }

  function onEdit(t){setEditing(t);setForm({title:t.title,description:t.description,status:t.status}); setErrors({})}
  function onDelete(t){
    if(!confirm('Delete this ticket?')) return
    api.deleteTicket(t.id).then(()=>{showToast({text:'Deleted',size:'small',variant:'success'});refresh()}).catch(err=>{
      handleApiError(err, showToast, ()=>{ window.location.hash = '#/auth/login' })
    })
  }

  function onSubmit(e){
    e.preventDefault()
    const eobj = {}
    if(!form.title) eobj.title = 'Title required'
    setErrors(eobj)
    if(Object.keys(eobj).length) {
      showToast({text:'Please fix form errors and try again.', variant:'error'})
      return
    }
    if(editing){
      api.updateTicket(editing.id,form).then(()=>{showToast({text:'Updated',variant:'success'});setEditing(null);setForm({title:'',description:'',status:'open'});refresh()}).catch(err=>{
        handleApiError(err, showToast, ()=>{ window.location.hash = '#/auth/login' })
      })
    }else{
      api.createTicket(form).then(()=>{showToast({text:'Created',variant:'success'});setForm({title:'',description:'',status:'open'});refresh()}).catch(err=>{
        handleApiError(err, showToast, ()=>{ window.location.hash = '#/auth/login' })
      })
    }
  }

  return (
    <main className="container">
      <div style={{display:'grid',gridTemplateColumns:'360px 1fr',gap:16}}>
        <div className="card">
          <h3>{editing? 'Edit Ticket' : 'Create Ticket'}</h3>
          <form onSubmit={onSubmit} style={{display:'grid',gap:8}}>
            <input className="input" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} aria-invalid={errors.title?true:false} />
            {errors.title && <small style={{color:'#ef4444'}}>{errors.title}</small>}
            <textarea className="input" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
            <label>
              Status
              <select className="input" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
                {VALID_STATUSES.map(s=> <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
            <div style={{display:'flex',gap:8}}>
              <button className="button" type="submit">{editing? 'Save':'Create'}</button>
              {editing && <button type="button" className="button" style={{background:'#6b7280'}} onClick={()=>{setEditing(null);setForm({title:'',description:'',status:'open'})}}>Cancel</button>}
            </div>
          </form>
        </div>
        <div>
          {loadingError && <div className="card" style={{marginBottom:12}}><p style={{color:'var(--color-muted)',margin:0}}>{loadingError}</p><div style={{marginTop:8}}><button className="button" onClick={refresh}>Retry</button></div></div>}
          <div className="grid cols-3">
            {tickets.map(t=> (<TicketCard key={t.id} ticket={t} onEdit={onEdit} onDelete={onDelete}/>))}
          </div>
        </div>
      </div>
    </main>
  )
}
