<template>
<div class="p-6 space-y-6">
<button class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"@click="showDialog = true">إضافة نشاط جديد
</button>
<div v-if="showDialog"class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" >
<div class="bg-white p-6 rounded w-full max-w-lg shadow space-y-4 relative">
<h2 class="text-xl font-semibold">إضافة نشاط جديد</h2>
<div class="border border-dashed border-gray-300 rounded-lg h-40 flex items-center justify-center cursor-pointer"@click="selectImage">
<img v-if="newActivity.image" :src="newActivity.image" class="h-full object-cover w-full rounded" />
<span v-else class="text-gray-500">+ إضافة صورة</span>
</div>
<input ref="fileInput" type="file" class="hidden" @change="handleImageUpload" />
<input v-model="newActivity.title" placeholder="العنوان" class="w-full border p-2 rounded" />
<textarea v-model="newActivity.description" placeholder="الوصف" class="w-full border p-2 rounded"></textarea>
<input v-model="newActivity.date" type="date" class="w-full border p-2 rounded" />
<div class="flex justify-end gap-2">
<button class="px-4 py-2 bg-gray-200 rounded" @click="cancelDialog">إلغاء</button>
<button class="px-4 py-2 bg-green-600 text-white rounded" @click="addActivity">حفظ</button>
</div>
</div>
 </div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
<div v-for="activity in activities" :key="activity.id" class="bg-white shadow rounded overflow-hidden flex flex-col">
<img :src="activity.image" class="h-40 w-full object-cover" />
<div class="p-4 flex-grow">
<h3 class="text-lg font-bold">{{ activity.title }}</h3>
<p class="text-sm text-gray-600 mt-1">{{ activity.description.slice(0, 70) }}...</p>
</div>
<div class="flex justify-between items-center px-4 pb-4">
<span class="text-xs text-gray-500">{{ activity.date }}</span>
<div class="flex gap-2">
<PencilSquareIcon
class="h-5 w-5 text-blue-500 cursor-pointer hover:text-blue-700" @click="editActivity(activity.id)" />
<TrashIcon class="h-5 w-5 text-red-500 cursor-pointer hover:text-red-700"
@click="confirmDelete(activity.id)"/></div>
</div>
</div></div>
</div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
const activities = ref([])
const newActivity = ref({
  title: '',
  description: '',
  date: '',
  image: '',
})
const showDialog = ref(false)
const fileInput = ref(null)
const editingId = ref(null)
onMounted(() => {
  const saved = localStorage.getItem('activities')
  if (saved) activities.value = JSON.parse(saved)
})
watch(activities, (val) => {
  localStorage.setItem('activities', JSON.stringify(val))
}, { deep: true })
function selectImage() {
  fileInput.value.click()
}
function handleImageUpload(e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      newActivity.value.image = reader.result
    }
    reader.readAsDataURL(file)
  }
}
function addActivity() {
  if (!newActivity.value.title || !newActivity.value.image) return
  if (editingId.value !== null) {
    const index = activities.value.findIndex(a => a.id === editingId.value)
    if (index !== -1) {
      activities.value[index] = { id: editingId.value, ...newActivity.value }
    }
    editingId.value = null
  } else {
    activities.value.push({ id: Date.now(), ...newActivity.value })
  }
  resetForm()
  showDialog.value = false
}
function cancelDialog() {
  resetForm()
  showDialog.value = false
}
function resetForm() {
  newActivity.value = {
    title: '',
    description: '',
    date: '',
    image: '',
  }
  editingId.value = null
  if (fileInput.value) fileInput.value.value = null
}
function confirmDelete(id) {
  if (confirm('هل تريد حذف هذا النشاط؟')) {
    deleteActivity(id)
  }
}
function deleteActivity(id) {
  const index = activities.value.findIndex(a => a.id === id)
  if (index !== -1) {
    activities.value.splice(index, 1)
  }
}
function editActivity(id) {
  const activity = activities.value.find(a => a.id === id)
  if (activity) {
    newActivity.value = { ...activity }
    editingId.value = id
    showDialog.value = true
  }
}
</script>
