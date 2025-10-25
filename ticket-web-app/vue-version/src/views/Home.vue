<template>
    <section class="hero--alt container">
      <div class="hero-inner">
        <h1 class="hero-title">TicketFlow</h1>
        <p class="hero-lead">Your tickets, simplified and secure.</p>
        <div class="hero-ctas">
          <button class="btn btn-primary" @click="() => window.location.hash='#/auth/signup'">Get Started</button>
          <button class="btn btn-outline" @click="() => window.location.hash='#/auth/login'">Login</button>
        </div>
      </div>
      <div class="decor-circle one" aria-hidden="true"></div>
      <div class="decor-circle small two" aria-hidden="true"></div>
      <svg class="wave" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0,50 C360,110 1080,0 1440,50 L1440,100 L0,100 Z" fill="currentColor"/></svg>
    </section>

    <section class="container" style="padding:48px 24px">
      <div style="text-align:center;max-width:900px;margin:0 auto 28px">
        <h2 style="font-size:28px;margin:0">Manage Complaints & Requests</h2>
        <p style="color:var(--color-muted);margin:0">Centralize customer complaints, track status, and resolve issues faster.</p>
      </div>
      <div class="grid cols-3">
        <div class="card" style="text-align:center">
          <div style="width:64px;height:64px;margin:0 auto;border-radius:50%;background:rgba(17,115,212,0.08);display:flex;align-items:center;justify-content:center;color:var(--primary)">
            <span class="material-symbols-outlined">support_agent</span>
          </div>
          <h3 style="margin-top:12px">Centralize Complaints</h3>
          <p style="color:var(--color-muted)">Collect customer complaints and requests in one place to prioritize and act on them quickly.</p>
        </div>
        <div class="card" style="text-align:center">
          <div style="width:64px;height:64px;margin:0 auto;border-radius:50%;background:rgba(17,115,212,0.08);display:flex;align-items:center;justify-content:center;color:var(--primary)">
            <span class="material-symbols-outlined">pending_actions</span>
          </div>
          <h3 style="margin-top:12px">Track Status &amp; SLAs</h3>
          <p style="color:var(--color-muted)">Monitor progress, set priorities, and ensure timely responses with configurable statuses.</p>
        </div>
        <div class="card" style="text-align:center">
          <div style="width:64px;height:64px;margin:0 auto;border-radius:50%;background:rgba(17,115,212,0.08);display:flex;align-items:center;justify-content:center;color:var(--primary)">
            <span class="material-symbols-outlined">thumb_up</span>
          </div>
          <h3 style="margin-top:12px">Resolve Faster</h3>
          <p style="color:var(--color-muted)">Assign issues to teams, communicate updates, and close complaints efficiently.</p>
        </div>
      </div>
    </section>
</template>
