<template>
  <div class="app-shell">
  <header class="header absolute-top">
      <nav class="container nav">
          <div style="display:flex;align-items:center;gap:12px">
          <div class="brand"><strong>TicketFlow</strong></div>
          <button class="nav-toggle" aria-label="Toggle navigation" :aria-expanded="navOpen" @click="toggleNav">☰</button>
        </div>
        <div class="nav-right">
          <button class="nav-close" aria-label="Close navigation" :aria-hidden="!navOpen" @click="toggleNav">✕</button>
          <a href="#/">Home</a>
          <a href="#/dashboard">Dashboard</a>
          <a href="#/tickets">Tickets</a>
          <div style="display:inline-block">
            <button v-if="authed" class="button" @click="doLogout">Logout</button>
            <a v-else class="button" href="#/auth/login">Login</a>
          </div>
        </div>
      </nav>
    </header>

    <main class="content">
      <!-- Protect dashboard and tickets routes by showing Login when not authenticated -->
      <component v-if="!protectedRoute || authed" :is="view" @toast="showToast" />
      <Login v-else @toast="showToast" />
    </main>

  <footer class="footer">© TicketFlow. All rights reserved.</footer>

    <div v-if="toast" :class="['toast', toast.size ? 'toast--'+toast.size : '', toast.variant ? 'toast--'+toast.variant : 'toast--info']" role="status" aria-live="polite">
      <span class="icon-wrap"><span class="material-symbols-outlined">{{ toast.variant==='success' ? 'check_circle' : 'error' }}</span></span>
      <p>{{ toast.text }}</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { session, logout } from './utils/auth'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Dashboard from './views/Dashboard.vue'
import Tickets from './views/Tickets.vue'
import * as api from './mockApi'

export default {
    setup(){
  const navOpen = ref(false)
  function toggleNav(){
    navOpen.value = !navOpen.value
    document.documentElement.classList.toggle('nav-open', navOpen.value)
  }
    const route = ref(window.location.hash.replace('#','')||'/')
  const toast = ref(null)
  const authed = computed(()=> Boolean(session.value))
    function onHash(){ route.value = window.location.hash.replace('#','') || '/' }
    onMounted(()=>{ window.addEventListener('hashchange', onHash); api.seedIfEmpty() })
    function showToast(msg, opts){
      const payload = (typeof msg === 'object' && msg !== null) ? msg : Object.assign({text: String(msg)}, opts || {})
      toast.value = payload
      const timeout = payload.timeout || 2200
      setTimeout(()=>{ toast.value = null }, timeout)
    }
    function doLogout(){ logout(); showToast('Logged out'); window.location.hash='#/auth/login' }

    const protectedRoute = computed(()=> route.value.startsWith('/dashboard') || route.value.startsWith('/tickets'))

    // Redirect unauthenticated users to login when they try to access protected routes
    watch([protectedRoute, authed], ([p,a])=>{
      if(p && !a){
        window.location.hash = '#/auth/login'
      }
    })

    const view = computed(()=>{
      if(route.value==='/') return Home
      if(route.value.startsWith('/auth/login')) return Login
      if(route.value.startsWith('/auth/signup')) return Signup
      if(route.value.startsWith('/dashboard')) return Dashboard
      if(route.value.startsWith('/tickets')) return Tickets
      return Home
    })
    return { view, showToast, toast, authed, doLogout, protectedRoute, toggleNav, navOpen }
  }
}
</script>
