<template>
  <div class="max-w-6xl mx-auto px-5 py-12">
    <h2 class="text-2xl font-bold mb-8 text-center">إحصائيات المؤسسة</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
      
      <div class="bg-blue-100 rounded p-6 shadow">
        <p class="text-5xl font-extrabold text-blue-700">{{ programCount }}</p>
        <p class="mt-2 font-semibold text-blue-800">عدد البرامج</p>
      </div>

      <div class="bg-yellow-100 rounded p-6 shadow">
        <p class="text-5xl font-extrabold text-yellow-700">{{ userCount }}</p>
        <p class="mt-2 font-semibold text-yellow-800">عدد المستخدمين</p>
      </div>

      <div class="bg-pink-100 rounded p-6 shadow">
        <p class="text-5xl font-extrabold text-pink-700">{{ campaignCount }}</p>
        <p class="mt-2 font-semibold text-pink-800">عدد حملات التبرع</p>
      </div>

      <div class="bg-green-100 rounded p-6 shadow">
        <p class="text-5xl font-extrabold text-green-700">{{ activityCount }}</p>
        <p class="mt-2 font-semibold text-green-800">عدد الأنشطة</p>
      </div>

      <div class="bg-purple-100 rounded p-6 shadow">
        <p class="text-5xl font-extrabold text-purple-700">{{ donorCount }}</p>
        <p class="mt-2 font-semibold text-purple-800">عدد المتبرعين</p>
      </div>

      <div class="bg-red-100 rounded p-6 shadow">
        <p class="text-5xl font-extrabold text-red-700">{{ partnershipCount }}</p>
        <p class="mt-2 font-semibold text-red-800">عدد الشراكات</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const programCount = ref(0)
const userCount = ref(0)
const campaignCount = ref(0)
const activityCount = ref(0)
const donorCount = ref(0)
const partnershipCount = ref(0)

onMounted(() => {
  const programs = JSON.parse(localStorage.getItem('programs') || '[]')
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const campaigns = JSON.parse(localStorage.getItem('campaigns') || '[]')
  const activities = JSON.parse(localStorage.getItem('activities') || '[]')
  const donors = JSON.parse(localStorage.getItem('donors') || '[]')
  const partnerships = JSON.parse(localStorage.getItem('partnerships') || '[]')

  programCount.value = programs.length
  userCount.value = users.length
  campaignCount.value = campaigns.length
  activityCount.value = activities.length
  donorCount.value = donors.length
  partnershipCount.value = partnerships.length
})
</script>

<style scoped>
</style>
