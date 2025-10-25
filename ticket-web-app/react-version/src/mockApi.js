import {SESSION_KEY} from './utils/auth'
const DATA_KEY = 'ticketapp_data'

function _read(){
  try{
    const raw = localStorage.getItem(DATA_KEY)
    return raw? JSON.parse(raw):[]
  }catch(e){return[]}
}
function _write(data){localStorage.setItem(DATA_KEY,JSON.stringify(data))}

export function seedIfEmpty(){
  const d = _read()
  if(d.length===0){
    const demo = [
      {id:1,title:'Website down',description:'Main site returns 500',status:'open'},
      {id:2,title:'Billing bug',description:'Invoice total incorrect',status:'in_progress'},
      {id:3,title:'Feature request',description:'Add dark mode',status:'closed'}
    ]
    _write(demo)
  }
}

export function listTickets(){
  // simulate auth check
  if(!localStorage.getItem(SESSION_KEY)){
    return Promise.reject({code:'UNAUTHORIZED', message:'Your session has expired — please log in again.'})
  }
  return Promise.resolve(_read())
}

export function getTicket(id){
  if(!localStorage.getItem(SESSION_KEY)){
    return Promise.reject({code:'UNAUTHORIZED', message:'Your session has expired — please log in again.'})
  }
  const t = _read().find(x=>x.id===Number(id))
  return Promise.resolve(t||null)
}

export function createTicket(payload){
  if(!localStorage.getItem(SESSION_KEY)){
    return Promise.reject({code:'UNAUTHORIZED', message:'Your session has expired — please log in again.'})
  }
  const d = _read()
  const id = d.length?Math.max(...d.map(x=>x.id))+1:1
  const ticket = {id,...payload}
  d.unshift(ticket)
  _write(d)
  return Promise.resolve(ticket)
}

export function updateTicket(id,payload){
  if(!localStorage.getItem(SESSION_KEY)){
    return Promise.reject({code:'UNAUTHORIZED', message:'Your session has expired — please log in again.'})
  }
  const d = _read()
  const i = d.findIndex(x=>x.id===Number(id))
  if(i===-1) return Promise.reject(new Error('Not found'))
  d[i] = {...d[i],...payload}
  _write(d)
  return Promise.resolve(d[i])
}

export function deleteTicket(id){
  if(!localStorage.getItem(SESSION_KEY)){
    return Promise.reject({code:'UNAUTHORIZED', message:'Your session has expired — please log in again.'})
  }
  let d = _read()
  d = d.filter(x=>x.id!==Number(id))
  _write(d)
  return Promise.resolve(true)
}
