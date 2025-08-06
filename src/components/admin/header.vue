<template>
  <header class="flex justify-between items-center bg-white dark:bg-gray-900 shadow p-4 rounded-b-md" dir="rtl">
    <h1 class="text-xl font-bold text-gray-800 dark:text-white">
      لوحة التحكم
    </h1>
    <div class="flex items-center gap-4">
      <button
        @click="goHome"
        class="text-gray-600 dark:text-white hover:text-blue-500"
        title="الصفحة الرئيسية" >
        <HomeIcon class="w-6 h-6" />
      </button>
      <button
        @click="toggleTheme"
        class="text-gray-600 dark:text-white hover:text-yellow-400 transition-colors duration-300"
        title="تبديل الوضع">
        <component :is="isDark ? SunIcon : MoonIcon" class="w-6 h-6" />
      </button>
      <button class="relative text-gray-600 dark:text-white hover:text-blue-500">
        <BellIcon class="w-6 h-6" />
        <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-900"></span>
      </button>
      <img src="https://i.pravatar.cc/40"
        alt="User Avatar"
        class="w-10 h-10 rounded-full border-2 dark:border-gray-700"/>
    </div>
  </header>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { BellIcon, HomeIcon, MoonIcon, SunIcon } from '@heroicons/vue/24/outline'
const router = useRouter()
function goHome() {
  router.push('/')
}
const isDark = ref(false)
onMounted(() => {
  isDark.value = localStorage.theme === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', isDark.value)
})
function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.theme = isDark.value ? 'dark' : 'light'
}
</script>
