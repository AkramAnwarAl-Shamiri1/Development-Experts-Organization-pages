<template>
<div class="flex justify-end items-center gap-4 px-5 py-1 bg-[#242856] text-white text-base">
<a href="#" class="hover:text-yellow-400"><i class="fab fa-facebook-f"></i></a>
<a href="#" class="hover:text-yellow-400"><i class="fab fa-twitter"></i></a>
<a href="#" class="hover:text-yellow-400"><i class="fab fa-youtube"></i></a>
<a href="mailto:info@edoyemen.org" class="hover:text-yellow-400"><i class="fas fa-envelope"></i></a>
<button class="ml-4 text-xl hover:text-yellow-400" @click="goDashboard" title="لوحة التحكم">
 <i class="fas fa-tachometer-alt"></i>
</button>
<button class="ml-4 text-xl hover:text-yellow-400" title="الوضع الليلي">
<i class="fas fa-moon"></i>
</button>
</div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goDashboard() {
  router.push('/dashboard') 
}
</script>
