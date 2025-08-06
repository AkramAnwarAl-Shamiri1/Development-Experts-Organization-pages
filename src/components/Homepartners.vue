<template>
<div class="max-w-6xl mx-auto p-5">
<h2 class="text-2xl font-bold mb-6 text-center">الشراكات </h2>
<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
<div v-for="(partner, index) in partners" :key="index" class="flex justify-center items-center p-4 border rounded shadow bg-white">
<img :src="partner.logo" alt="شعار الشركة" class="max-h-20 object-contain" />
</div>
</div>
</div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const partners = ref([])
onMounted(() => {
  const saved = localStorage.getItem('partnerships')
  if (saved) {
    partners.value = JSON.parse(saved)
  }
})
</script>
