<template>
  <article class="card ticket-card" :aria-labelledby="`t-${ticket.id}`">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <h3 :id="`t-${ticket.id}`">{{ticket.title}}</h3>
      <span :class="['status', ticket.status.replace(/\s+/g,'_')]">{{ticket.status}}</span>
    </div>
    <p style="color:var(--color-muted)">{{ticket.description}}</p>
    <div style="display:flex;gap:8">
      <button class="button" @click="$emit('edit', ticket)">Edit</button>
      <button class="button" style="background:#ef4444" @click="$emit('delete', ticket)">Delete</button>
    </div>
  </article>
</template>

<script>
export default { props:{ ticket:Object } }
</script>
