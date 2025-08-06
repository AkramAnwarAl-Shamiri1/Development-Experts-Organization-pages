<template>
 
    <section class="mb-6">
      <h3 class="text-xl font-semibold mb-4">إعدادات التواصل</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input v-model="settings.email" type="email" placeholder="البريد الإلكتروني" class="input" />
        <input v-model="settings.phone" type="text" placeholder="رقم الهاتف" class="input" />
        <input v-model="settings.address" type="text" placeholder="العنوان" class="input" />
        <input v-model="settings.facebook" type="text" placeholder="رابط فيسبوك" class="input" />
        <input v-model="settings.twitter" type="text" placeholder="رابط تويتر" class="input" />
        <input v-model="settings.youtube" type="text" placeholder="رابط يوتيوب" class="input" />
      </div>
    </section>
    
 

</template>

<script setup>
import { ref, onMounted } from 'vue'

const defaultSettings = {
  siteName: '',
  siteDescription: '',
  logoUrl: '',
  email: '',
  phone: '',
  address: '',
  facebook: '',
  twitter: '',
  youtube: '',
  darkMode: false,
  primaryColor: '#3B82F6',
  metaDescription: '',
  keywords: ''
}

const settings = ref({ ...defaultSettings })

onMounted(() => {
  const saved = localStorage.getItem('siteSettings')
  if (saved) {
    settings.value = JSON.parse(saved)
  }
})

const saveSettings = () => {
  localStorage.setItem('siteSettings', JSON.stringify(settings.value))
  alert('تم حفظ الإعدادات بنجاح!')
}
</script>

<style scoped>
.input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  width: 100%;
}
</style>
