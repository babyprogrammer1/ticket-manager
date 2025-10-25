import React, {useState} from 'react'
import {login} from '../utils/auth'

export default function Login({onNavigate,showToast}){
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
    // mock auth: accept any credentials but store session
    login({email})
    showToast('Logged in')
    window.location.hash='#/dashboard'
  }

  return (
    <main className="container" style={{minHeight:'calc(100vh - 120px)',display:'flex',alignItems:'center',justifyContent:'center',padding:'48px 16px'}}>
      <div className="card" style={{width:'100%',maxWidth:480}}>
        <div style={{padding:18}}>
          <h1 style={{fontSize:28,margin:0}}>Welcome back</h1>
          <p style={{color:'var(--color-muted)',marginTop:8}}>Sign in to manage your tickets</p>
          <form onSubmit={submit} style={{marginTop:18,display:'grid',gap:12}}>
            <label style={{display:'flex',flexDirection:'column',gap:6}}>
              <span style={{fontSize:13,color:'#374151'}}>Email</span>
              <input className="input focus-outline" value={email} onChange={e=>setEmail(e.target.value)} aria-invalid={errors.email?true:false} />
              {errors.email && <small style={{color:'#ef4444'}}>{errors.email}</small>}
            </label>
            <label style={{display:'flex',flexDirection:'column',gap:6}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span style={{fontSize:13,color:'#374151'}}>Password</span>
                <a href="#" style={{fontSize:13,color:'var(--primary)'}}>Forgot?</a>
              </div>
              <input type="password" className="input focus-outline" value={password} onChange={e=>setPassword(e.target.value)} aria-invalid={errors.password?true:false} />
              {errors.password && <small style={{color:'#ef4444'}}>{errors.password}</small>}
            </label>
            <button className="button" type="submit" style={{width:'100%'}}>Login</button>
            <p style={{textAlign:'center',margin:0,fontSize:14,color:'var(--color-muted)'}}>Don't have an account? <button type="button" onClick={()=>onNavigate('/auth/signup')} style={{background:'none',border:'none',color:'var(--primary)',fontWeight:700,cursor:'pointer'}}>Sign up</button></p>
          </form>
        </div>
      </div>
    </main>
  )
}
