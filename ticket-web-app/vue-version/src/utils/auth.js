import { ref } from 'vue'

export const SESSION_KEY = 'ticketapp_session'

// reactive session ref so Vue components update when login/logout occur
export const session = ref(null)
try {
	const v = localStorage.getItem(SESSION_KEY)
	session.value = v ? JSON.parse(v) : null
} catch (e) {
	session.value = null
}

export function isAuthenticated(){
	return Boolean(session.value)
}

export function login(s){
	try{ localStorage.setItem(SESSION_KEY, JSON.stringify(s)) }catch(e){}
	session.value = s
}

export function logout(){
	try{ localStorage.removeItem(SESSION_KEY) }catch(e){}
	session.value = null
}

export function getSession(){
	return session.value
}
