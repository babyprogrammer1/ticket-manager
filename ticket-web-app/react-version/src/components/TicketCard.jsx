import React from 'react'

const statusClass = (s)=>`status ${s.replace(/\s+/g,'_')}`

export default function TicketCard({ticket,onEdit,onDelete}){
  return (
    <article className="card ticket-card" aria-labelledby={`t-${ticket.id}`}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h3 id={`t-${ticket.id}`}>{ticket.title}</h3>
        <span className={statusClass(ticket.status)}>{ticket.status}</span>
      </div>
      <p style={{color:'var(--color-muted)'}}>{ticket.description}</p>
      <div style={{display:'flex',gap:8}}>
        <button className="button" onClick={()=>onEdit(ticket)}>Edit</button>
        <button className="button" onClick={()=>onDelete(ticket)} style={{background:'#ef4444'}}>Delete</button>
      </div>
    </article>
  )
}
