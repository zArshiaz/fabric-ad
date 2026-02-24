import Swal from 'sweetalert2';

export const toast=Swal.mixin({
  toast:true,
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  position: 'top-end',
  showCloseButton:true

})
