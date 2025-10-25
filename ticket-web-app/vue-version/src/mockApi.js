import { SESSION_KEY } from './utils/auth'

const DATA_KEY = 'ticketapp_data'
function _read(){ try{const raw=localStorage.getItem(DATA_KEY); return raw?JSON.parse(raw):[] }catch(e){return[]} }
function _write(d){ localStorage.setItem(DATA_KEY,JSON.stringify(d)) }
export function seedIfEmpty(){ const d=_read(); if(d.length===0){ _write([{id:1,title:'Site down',description:'Urgent',status:'open'},{id:2,title:'Billing',description:'Total wrong',status:'in_progress'},{id:3,title:'Design tweak',description:'Logo',status:'closed'}]) } }
export function listTickets(){
	if(!localStorage.getItem(SESSION_KEY)){
		return Promise.reject({code:'UNAUTHORIZED', message:'Your session has expired — please log in again.'})
	}
	return Promise.resolve(_read())
}
export function createTicket(payload){
	if(!localStorage.getItem(SESSION_KEY)){
		return Promise.reject({code:'UNAUTHORIZED', message:'Your session has expired — please log in again.'})
	}
	const d=_read();const id=d.length?Math.max(...d.map(x=>x.id))+1:1;const t={id,...payload};d.unshift(t);_write(d);return Promise.resolve(t)
}
export function updateTicket(id,payload){
	if(!localStorage.getItem(SESSION_KEY)){
		return Promise.reject({code:'UNAUTHORIZED', message:'Your session has expired — please log in again.'})
	}
	const d=_read();const i=d.findIndex(x=>x.id===Number(id)); if(i===-1) return Promise.reject('Not found'); d[i]={...d[i],...payload};_write(d);return Promise.resolve(d[i])
}
export function deleteTicket(id){
	if(!localStorage.getItem(SESSION_KEY)){
		return Promise.reject({code:'UNAUTHORIZED', message:'Your session has expired — please log in again.'})
	}
	let d=_read();d=d.filter(x=>x.id!==Number(id));_write(d);return Promise.resolve(true)
}
export function getTicket(id){
	if(!localStorage.getItem(SESSION_KEY)){
		return Promise.reject({code:'UNAUTHORIZED', message:'Your session has expired — please log in again.'})
	}
	const t=_read().find(x=>x.id===Number(id));return Promise.resolve(t||null)
}
