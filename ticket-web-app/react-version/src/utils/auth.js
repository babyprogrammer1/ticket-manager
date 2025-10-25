export const SESSION_KEY = 'ticketapp_session'

export function isAuthenticated(){
  try{
    return Boolean(localStorage.getItem(SESSION_KEY))
  }catch(e){return false}
}

export function login(session){
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function logout(){
  localStorage.removeItem(SESSION_KEY)
}

export function getSession(){
  const v = localStorage.getItem(SESSION_KEY)
  return v? JSON.parse(v):null
}
