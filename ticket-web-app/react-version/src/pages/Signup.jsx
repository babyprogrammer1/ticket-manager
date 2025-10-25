import React, {useState} from 'react'
import {login} from '../utils/auth'

export default function Signup({onNavigate,showToast}){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [errors,setErrors]=useState({})

  function validate(){
    const e={}
    if(!email) e.email='Email required'
    if(!password) e.password='Password required'
    setErrors(e)
    return Object.keys(e).length===0
  }

  function submit(e){
    e.preventDefault()
    if(!validate()) return
    login({email})
    showToast('Account created')
    window.location.hash='#/dashboard'
  }

  return (
    <main className="container" style={{minHeight:'calc(100vh - 120px)',display:'flex',alignItems:'center',justifyContent:'center',padding:'48px 16px'}}>
      <div className="card" style={{width:'100%',maxWidth:480}}>
        <div style={{padding:18}}>
          <h1 style={{fontSize:28,margin:0}}>Create Your Account</h1>
          <p style={{color:'var(--color-muted)',marginTop:8}}>Get your tickets in just a few taps.</p>
          <form onSubmit={submit} style={{marginTop:18,display:'grid',gap:12}}>
            {/* Full name removed for consistency across frameworks */}
            <label style={{display:'flex',flexDirection:'column',gap:6}}>
              <span style={{fontSize:13,color:'#374151'}}>Email address</span>
              <input className="input focus-outline" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
            </label>
            <label style={{display:'flex',flexDirection:'column',gap:6}}>
              <span style={{fontSize:13,color:'#374151'}}>Password</span>
              <input type="password" className="input focus-outline" value={password} onChange={e=>setPassword(e.target.value)} />
              <small style={{fontSize:12,color:'var(--color-muted)'}}>Must be at least 8 characters.</small>
            </label>
            <button className="button" type="submit" style={{width:'100%'}}>Create Account</button>
            <p style={{textAlign:'center',margin:0,fontSize:14,color:'var(--color-muted)'}}>Already have an account? <button type="button" onClick={()=>onNavigate('/auth/login')} style={{background:'none',border:'none',color:'var(--primary)',fontWeight:700,cursor:'pointer'}}>Log In</button></p>
          </form>
        </div>
      </div>
    </main>
  )
}
