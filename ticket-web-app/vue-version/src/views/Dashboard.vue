<template>
  <main class="container">
    <div class="grid cols-3">
      <div class="card"><h4>Total tickets</h4><p style="font-size:28px">{{stats.total}}</p></div>
      <div class="card"><h4>Open</h4><p style="font-size:28px;color:var(--color-open)">{{stats.open}}</p></div>
      <div class="card"><h4>Resolved</h4><p style="font-size:28px;color:var(--color-closed)">{{stats.resolved}}</p></div>
    </div>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue'
import * as api from '../mockApi'
export default {
  setup(){
    const stats = ref({total:0,open:0,resolved:0})
    onMounted(()=>{ api.listTickets().then(tickets=>{ stats.value.total = tickets.length; stats.value.open = tickets.filter(t=>t.status==='open').length; stats.value.resolved = tickets.filter(t=>t.status==='closed').length }) })
    return {stats}
  }
}
</script>
