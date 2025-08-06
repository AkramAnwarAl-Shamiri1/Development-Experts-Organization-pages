<template>
<div>
<section class="programs max-w-6xl mx-auto px-5 py-10 fade-in">
<h2 class="text-2xl font-bold mb-8 text-center">برامج المؤسسة</h2>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
<div v-for="(program, index) in programs" :key="index" class="program-card bg-white rounded shadow hover:shadow-lg overflow-hidden cursor-pointer flex flex-col items-center p-4">
<component :is="program.icon" class="h-12 w-12 text-yellow-600 mb-4" />
<h3 class="font-semibold text-lg mb-2 text-center">{{ program.name }}</h3>
<p class="text-gray-700 text-sm text-center">{{ program.description.slice(0, 70) }}...</p>
</div>
</div>
</section>
</div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { AcademicCapIcon, HeartIcon, BriefcaseIcon } from '@heroicons/vue/24/solid'
const iconMap = {
  AcademicCapIcon,
  HeartIcon,
  BriefcaseIcon,
}
const programs = ref([])
onMounted(() => {
  const saved = localStorage.getItem('programs')
  if (saved) {
    const savedPrograms = JSON.parse(saved)
    programs.value = savedPrograms.map(p => ({
      ...p,
      icon: iconMap[p.iconName] || AcademicCapIcon
    }))
  }
})
</script>
