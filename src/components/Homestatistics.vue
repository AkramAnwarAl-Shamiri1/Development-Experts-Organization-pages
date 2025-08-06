<template>
<section class="stats max-w-6xl mx-auto px-5 py-10 fade-in">
<h2 class="text-2xl font-bold mb-8 text-center">إحصائيات المؤسسة</h2>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
<div v-for="(stat, index) in stats" :key="index" class="stat-card bg-white rounded shadow p-6 hover:shadow-lg cursor-pointer">
<h3 class="text-4xl font-extrabold text-blue-600 mb-2">{{ stat.count }}</h3>
<p class="text-gray-700 font-semibold">{{ stat.label }}</p>
</div>
</div>
</section>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const stats = ref([])
onMounted(() => {
  const programs = JSON.parse(localStorage.getItem('programs') || '[]')
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const campaigns = JSON.parse(localStorage.getItem('campaigns') || '[]')
  const activities = JSON.parse(localStorage.getItem('activities') || '[]')
  const donors = JSON.parse(localStorage.getItem('donors') || '[]')
  const partnerships = JSON.parse(localStorage.getItem('partnerships') || '[]')
  stats.value = [
    { label: 'عدد البرامج', count: programs.length },
    { label: 'عدد المستخدمين', count: users.length },
    { label: 'عدد حملات التبرع', count: campaigns.length },
    { label: 'عدد الأنشطة', count: activities.length },
    { label: 'عدد المتبرعين', count: donors.length },
    { label: 'عدد الشراكات', count: partnerships.length },
  ]
})
</script>
