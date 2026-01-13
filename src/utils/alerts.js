let Swal: any = null

const getSwal = async () => {
  if (!Swal) {
    const module = await import('sweetalert2')
    Swal = module.default
  }
  return Swal
}

export const showSuccessAlert = async (title: string, message?: string) => {
  const swal = await getSwal()
  return swal.fire({
    icon: 'success',
    title,
    text: message,
    confirmButtonColor: '#b45309',
    confirmButtonText: 'OK',
    timer: 2000,
    timerProgressBar: true,
  })
}

export const showErrorAlert = async (title: string, message?: string) => {
  const swal = await getSwal()
  return swal.fire({
    icon: 'error',
    title,
    text: message,
    confirmButtonColor: '#b45309',
    confirmButtonText: 'OK',
  })
}

export const showWarningAlert = async (title: string, message?: string) => {
  const swal = await getSwal()
  return swal.fire({
    icon: 'warning',
    title,
    text: message,
    confirmButtonColor: '#b45309',
    confirmButtonText: 'OK',
  })
}

export const showConfirmAlert = async (
  title: string,
  message?: string,
  confirmText: string = 'Confirm',
  cancelText: string = 'Cancel'
) => {
  const swal = await getSwal()
  return swal.fire({
    icon: 'question',
    title,
    text: message,
    showCancelButton: true,
    confirmButtonColor: '#b45309',
    cancelButtonColor: '#6b7280',
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  })
}

export const showLoadingAlert = async (title: string = 'Loading...') => {
  const swal = await getSwal()
  return swal.fire({
    title,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: (modal: any) => {
      swal.showLoading()
    },
  })
}

export const closeAlert = async () => {
  const swal = await getSwal()
  swal.close()
}

export const updateAlert = async (options: any) => {
  const swal = await getSwal()
  swal.update(options)
}

export const showInfoAlert = async (title: string, message?: string) => {
  const swal = await getSwal()
  return swal.fire({
    icon: 'info',
    title,
    text: message,
    confirmButtonColor: '#b45309',
    confirmButtonText: 'OK',
  })
}
