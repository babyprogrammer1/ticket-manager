import React, {useEffect, useState} from 'react'
import {isAuthenticated,logout} from './utils/auth'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Tickets from './pages/Tickets'
import * as api from './mockApi'

function parseRoute(){
  const hash = window.location.hash.replace(/^#/, '') || '/'
  return hash
}

export default function App(){
  const [navOpen, setNavOpen] = useState(false)
  const [route,setRoute]=useState(parseRoute())
  const [toast,setToast]=useState(null)
  const [authed,setAuthed]=useState(isAuthenticated())

  useEffect(()=>{
    api.seedIfEmpty()
    function onHash(){setRoute(parseRoute())}
    window.addEventListener('hashchange', onHash)
    return ()=>window.removeEventListener('hashchange', onHash)
  },[])

  useEffect(()=>{setAuthed(isAuthenticated())},[route])

  function navigate(path){window.location.hash = path}
  function showToast(msg, opts){
    // msg may be string or object
    const payload = typeof msg === 'object' && msg !== null ? msg : Object.assign({text: String(msg)}, opts || {})
    setToast(payload)
    const timeout = (payload.timeout||2500)
    setTimeout(()=>setToast(null), timeout)
  }

  function toggleNav(){
    setNavOpen(v=>{
      const next = !v
      document.documentElement.classList.toggle('nav-open', next)
      return next
    })
  }

  // protect paths that start with /dashboard or /tickets
  if((route.startsWith('/dashboard')||route.startsWith('/tickets')) && !isAuthenticated()){
    window.location.hash = '/auth/login'
    return null
  }

  return (
    <div className="app-shell">
      <header className="header absolute-top">
        <nav className="container nav">
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div className="brand"><strong>TicketFlow</strong></div>
            <button className="nav-toggle" aria-label="Toggle navigation" aria-expanded={navOpen} onClick={toggleNav}>☰</button>
          </div>
          <div className="nav-right">
            <button className="nav-close" aria-label="Close navigation" onClick={toggleNav}>✕</button>
            <a href="#/">Home</a>
            <a href="#/dashboard">Dashboard</a>
            <a href="#/tickets">Tickets</a>
            {isAuthenticated() ? (
              <button className="button" onClick={()=>{logout();showToast('Logged out');window.location.hash='#/auth/login'}}>Logout</button>
            ) : (
              <a href="#/auth/login" className="button">Login</a>
            )}
          </div>
        </nav>
      </header>

      <main className="content">
        {route==='/' && (
          <>
            <section className="hero--alt container">
              <div className="hero-inner">
                <h1 className="hero-title">TicketFlow</h1>
                <p className="hero-lead">Your tickets, simplified and secure.</p>
                <div className="hero-ctas">
                  <button className="btn btn-primary" onClick={()=>window.location.hash='#/auth/signup'}>Get Started</button>
                  <button className="btn btn-outline" onClick={()=>window.location.hash='#/auth/login'}>Login</button>
                </div>
              </div>
              <div className="decor-circle one" aria-hidden="true"></div>
              <div className="decor-circle small two" aria-hidden="true"></div>
              <svg className="wave" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0,50 C360,110 1080,0 1440,50 L1440,100 L0,100 Z" fill="currentColor"/></svg>
            </section>

            <section className="container" style={{padding:'48px 24px'}}>
              <div style={{textAlign:'center',maxWidth:900,margin:'0 auto 28px'}}>
                <h2 style={{fontSize:28,margin:0}}>Manage Complaints & Requests</h2>
                <p style={{color:'var(--color-muted)',margin:0}}>Centralize customer complaints, track status, and resolve issues faster.</p>
              </div>
              <div className="grid cols-3">
                <div className="card" style={{textAlign:'center'}}>
                  <div style={{width:64,height:64,margin:'0 auto',borderRadius:'50%',background:'rgba(17,115,212,0.08)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--primary)'}}>
                    <span className="material-symbols-outlined">support_agent</span>
                  </div>
                  <h3 style={{marginTop:12}}>Centralize Complaints</h3>
                  <p style={{color:'var(--color-muted)'}}>Collect customer complaints and requests in one place to prioritize and act on them quickly.</p>
                </div>
                <div className="card" style={{textAlign:'center'}}>
                  <div style={{width:64,height:64,margin:'0 auto',borderRadius:'50%',background:'rgba(17,115,212,0.08)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--primary)'}}>
                    <span className="material-symbols-outlined">pending_actions</span>
                  </div>
                  <h3 style={{marginTop:12}}>Track Status & SLAs</h3>
                  <p style={{color:'var(--color-muted)'}}>Monitor progress, set priorities, and ensure timely responses with configurable statuses.</p>
                </div>
                <div className="card" style={{textAlign:'center'}}>
                  <div style={{width:64,height:64,margin:'0 auto',borderRadius:'50%',background:'rgba(17,115,212,0.08)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--primary)'}}>
                    <span className="material-symbols-outlined">thumb_up</span>
                  </div>
                  <h3 style={{marginTop:12}}>Resolve Faster</h3>
                  <p style={{color:'var(--color-muted)'}}>Assign issues to teams, communicate updates, and close complaints efficiently.</p>
                </div>
              </div>
            </section>
          </>
        )}

        {route.startsWith('/auth/login') && <Login onNavigate={navigate} showToast={showToast} />}
        {route.startsWith('/auth/signup') && <Signup onNavigate={navigate} showToast={showToast} />}
  {route.startsWith('/dashboard') && <Dashboard showToast={showToast} />}
        {route.startsWith('/tickets') && <Tickets showToast={showToast} />}
      </main>

  <footer className="footer">© TicketFlow. All rights reserved.</footer>

      {toast && (
        <div role="status" className={"toast " + (toast.size?('toast--'+toast.size):'') + ' ' + (toast.variant?('toast--'+toast.variant):'toast--info')} aria-live="polite">
          <span className="icon-wrap"><span className="material-symbols-outlined">{toast.variant==='success'?'check_circle':'error'}</span></span>
          <p>{toast.text}</p>
        </div>
      )}
    </div>
  )
}
