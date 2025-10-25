<template>
  <main class="container" style="min-height:calc(100vh - 120px);display:flex;align-items:center;justify-content:center;padding:48px 16px">
    <div class="card" style="width:100%;max-width:480px">
      <div style="padding:18px">
        <h1 style="font-size:28px;margin:0">Create Your Account</h1>
        <p style="color:var(--color-muted);margin-top:8px">Get your tickets in just a few taps.</p>
        <form @submit.prevent="submit" style="margin-top:18px;display:grid;gap:12px">
          <!-- Full name removed for consistency across frameworks -->
          <label style="display:flex;flex-direction:column;gap:6px">
            <span style="font-size:13px;color:#374151">Email address</span>
            <input v-model="email" class="input focus-outline" placeholder="you@example.com" />
          </label>
          <label style="display:flex;flex-direction:column;gap:6px">
            <span style="font-size:13px;color:#374151">Password</span>
            <input type="password" v-model="password" class="input focus-outline" />
            <small style="font-size:12px;color:var(--color-muted)">Must be at least 8 characters.</small>
          </label>
          <button class="button" type="submit" style="width:100%">Create Account</button>
          <p style="text-align:center;margin:0;font-size:14px;color:var(--color-muted)">Already have an account? <button type="button" @click.prevent="cancel" style="background:none;border:none;color:var(--primary);font-weight:700;cursor:pointer">Log In</button></p>
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
    const email=ref('')
    const password=ref('')
    function submit(){ login({email:email.value}); emit('toast','Account created'); window.location.hash='#/dashboard' }
    function cancel(){ window.location.hash='#/auth/login' }
    return {email,password,submit,cancel}
  }
}
</script>
