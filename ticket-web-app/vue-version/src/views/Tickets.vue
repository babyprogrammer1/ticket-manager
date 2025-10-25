<template>
  <main class="container">
    <div style="display:grid;grid-template-columns:360px 1fr;gap:16px">
      <div class="card">
        <h3>{{editing? 'Edit Ticket':'Create Ticket'}}</h3>
        <form @submit.prevent="submit" style="display:grid;gap:8px">
          <input class="input" v-model="form.title" placeholder="Title" :aria-invalid="errors.title?true:false" />
          <small v-if="errors.title" style="color:#ef4444">{{errors.title}}</small>
          <textarea class="input" v-model="form.description" placeholder="Description"></textarea>
          <select class="input" v-model="form.status">
            <option v-for="s in statuses" :key="s" :value="s">{{s}}</option>
          </select>
          <div style="display:flex;gap:8px">
            <button class="button" type="submit">{{editing? 'Save':'Create'}}</button>
            <button v-if="editing" type="button" class="button" style="background:#6b7280" @click="cancel">Cancel</button>
          </div>
        </form>
      </div>
      <div>
        <div v-if="loadingError" class="card" style="margin-bottom:12px">
          <p style="color:var(--color-muted);margin:0">{{loadingError}}</p>
          <div style="margin-top:8px"><button class="button" @click="refresh">Retry</button></div>
        </div>
        <div class="grid cols-3">
          <TicketCard v-for="t in tickets" :key="t.id" :ticket="t" @edit="startEdit" @delete="doDelete"/>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue'
import * as api from '../mockApi'
import { handleApiError } from '../utils/errors'
import TicketCard from '../components/TicketCard.vue'
export default {
  components:{TicketCard},
  emits:['toast'],
  setup(_, {emit}){
    const statuses=['open','in_progress','closed']
    const tickets = ref([])
    const editing = ref(null)
    const form = ref({title:'',description:'',status:'open'})
    const errors = ref({})
    const loadingError = ref(null)

    function refresh(){
      loadingError.value = null
      api.listTickets().then(d=>tickets.value=d).catch(err=>{
        loadingError.value = 'Failed to load tickets. Please retry.'
        handleApiError(err, (p)=>{ emit('toast', p) }, ()=>{ window.location.hash = '#/auth/login' })
      })
    }
    onMounted(()=>refresh())
    function startEdit(t){ editing.value = t; form.value = {title:t.title,description:t.description,status:t.status}; errors.value = {} }
    function doDelete(t){ if(!confirm('Delete?')) return; api.deleteTicket(t.id).then(()=>{ emit('toast',{text:'Deleted',size:'small',variant:'success'}); refresh() }).catch(err=>{ handleApiError(err,(p)=>{emit('toast',p)}, ()=>{ window.location.hash='#/auth/login' }) }) }
    function submit(){
      errors.value = {}
      if(!form.value.title) errors.value.title = 'Title required'
      if(Object.keys(errors.value).length){ emit('toast',{text:'Please fix form errors and try again.', variant:'error'}); return }
      if(editing.value){ api.updateTicket(editing.value.id, form.value).then(()=>{ emit('toast',{text:'Updated',variant:'success'}); editing.value=null; form.value={title:'',description:'',status:'open'}; refresh() }).catch(err=>{ handleApiError(err,(p)=>{emit('toast',p)}, ()=>{ window.location.hash='#/auth/login' }) }) }
      else{ api.createTicket(form.value).then(()=>{ emit('toast',{text:'Created',variant:'success'}); form.value={title:'',description:'',status:'open'}; refresh() }).catch(err=>{ handleApiError(err,(p)=>{emit('toast',p)}, ()=>{ window.location.hash='#/auth/login' }) }) }
    }
    function cancel(){ editing.value=null; form.value={title:'',description:'',status:'open'} }
    return {tickets,statuses,form,editing,startEdit,doDelete,submit,cancel,errors,loadingError,refresh}
  }
}
</script>
