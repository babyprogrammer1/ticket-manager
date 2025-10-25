export function handleApiError(err, showToast, onUnauthorized){
  const code = err && err.code ? err.code : null
  const message = err && err.message ? err.message : (err && err.toString ? err.toString() : 'An error occurred')
  if(code === 'UNAUTHORIZED'){
    if(showToast) showToast({text: 'Your session has expired — please log in again.', variant: 'error'})
    if(typeof onUnauthorized === 'function') onUnauthorized()
    return
  }
  if(showToast) showToast({text: message || 'Request failed. Please retry.', variant: 'error'})
}
