<template>
  <div>
<section class="active-events max-w-6xl mx-auto px-5 py-10 fade-in">
<h2 class="text-2xl font-bold mb-8 text-center">الأحداث النشطة</h2>
<div  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
<div v-for="(activity, index) in activities" :key="index"
class="event-card bg-white rounded shadow hover:shadow-lg overflow-hidden cursor-pointer" >
<img :src="activity.image" alt="" class="w-full h-48 object-cover" />
<div class="p-4">
<h3 class="font-semibold text-lg mb-2">{{ activity.title }}</h3>
<p class="text-gray-700 text-sm">{{ activity.description.slice(0, 70) }}...</p>
</div>
</div>
</div>
</section>
</div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const activities = ref([])
const newActivity = ref({
  title: '',
  description: '',
  date: '',
  image: '',
})
onMounted(() => {
  const saved = localStorage.getItem('activities')
  if (saved) {
    activities.value = JSON.parse(saved)
  }
})
</script>
