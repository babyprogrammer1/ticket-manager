<template>
  <main class="container" style="min-height:calc(100vh - 120px);display:flex;align-items:center;justify-content:center;padding:48px 16px">
    <div class="card" style="width:100%;max-width:480px">
      <div style="padding:18px">
        <h1 style="font-size:28px;margin:0">Welcome Back!</h1>
        <p style="color:var(--color-muted);margin-top:8px">Sign in to continue to your dashboard</p>
        <form @submit.prevent="submit" style="margin-top:18px;display:grid;gap:12px">
          <label style="display:flex;flex-direction:column;gap:6px">
            <span style="font-size:13px;color:#374151">Email</span>
            <input v-model="email" class="input focus-outline" :aria-invalid="errors.email?true:false" />
            <small v-if="errors.email" style="color:#ef4444">{{errors.email}}</small>
          </label>
          <label style="display:flex;flex-direction:column;gap:6px">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <span style="font-size:13px;color:#374151">Password</span>
              <a href="#" style="font-size:13px;color:var(--primary)">Forgot?</a>
            </div>
            <input type="password" v-model="password" class="input focus-outline" :aria-invalid="errors.password?true:false" />
            <small v-if="errors.password" style="color:#ef4444">{{errors.password}}</small>
          </label>
          <button class="button" type="submit" style="width:100%">Login</button>
          <p style="text-align:center;margin:0;font-size:14px;color:var(--color-muted)">Don't have an account? <button type="button" @click.prevent="gotoSignup" style="background:none;border:none;color:var(--primary);font-weight:700;cursor:pointer">Sign up</button></p>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue'
import { login } from '../utils/auth'

export default {
  emits:['toast'],
  setup(_, {emit}){
    const email = ref('')
    const password = ref('')
    const errors = ref({})

    function validate(){
      const e = {}
      if(!email.value) e.email = 'Email required'
      if(!password.value) e.password = 'Password required'
      errors.value = e
      return Object.keys(e).length === 0
    }

    function submit(){
      if(!validate()) return
      // mock login
      login({email: email.value})
      emit('toast','Logged in')
      window.location.hash = '#/dashboard'
    }

    function gotoSignup(){ window.location.hash = '#/auth/signup' }

    return { email, password, errors, submit, gotoSignup }
  }
}
</script>
