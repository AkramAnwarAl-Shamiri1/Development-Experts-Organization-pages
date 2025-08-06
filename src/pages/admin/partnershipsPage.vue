<template>
  <div class="p-6 max-w-5xl mx-auto">
    <h2 class="text-2xl font-bold mb-6">إدارة الشراكات</h2>

    <button @click="showModal = true" class="mb-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
      + إضافة شراكة
    </button>

    <div v-if="partnerships.length > 0" class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead class="bg-gray-100 text-right text-gray-700 text-sm">
          <tr>
            <th class="p-3 border">الشعار</th>
            <th class="p-3 border">اسم المنظمة</th>
            <th class="p-3 border">نوع الشراكة</th>
            <th class="p-3 border">تاريخ</th>
            <th class="p-3 border">التحكم</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in partnerships" :key="index" class="text-right text-sm">
            <td class="p-2 border text-center">
              <img :src="item.logo" alt="Logo" class="w-12 h-12 object-cover mx-auto rounded" />
            </td>
            <td class="p-2 border">{{ item.name }}</td>
            <td class="p-2 border">{{ item.type }}</td>
            <td class="p-2 border">{{ item.date }}</td>
            <td class="p-2 border text-center">
              <button @click="editPartnership(index)" class="text-blue-600 hover:text-blue-800 font-semibold text-sm mr-2">تعديل</button>
              <button @click="confirmDelete(index)" class="text-red-600 hover:text-red-800 font-semibold text-sm">حذف</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="text-gray-500 text-sm">لا توجد شراكات حالياً.</p>
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        <h3 class="text-lg font-semibold mb-4">{{ isEditing ? 'تعديل الشراكة' : 'إضافة شراكة' }}</h3>

        <div class="space-y-4">
          <div>
            <label class="block mb-1 text-sm">اسم المنظمة</label>
            <input v-model="form.name" type="text" class="w-full border rounded p-2" />
          </div>

          <div>
            <label class="block mb-1 text-sm">نوع الشراكة</label>
            <input v-model="form.type" type="text" class="w-full border rounded p-2" />
          </div>

          <div>
            <label class="block mb-1 text-sm">تاريخ الشراكة</label>
            <input v-model="form.date" type="date" class="w-full border rounded p-2" />
          </div>

          <div>
            <label class="block mb-1 text-sm">شعار المنظمة</label>
            <input @change="handleFile" type="file" accept="image/*" class="w-full border rounded p-2" />
            <div v-if="form.logo" class="mt-2 text-center">
              <img :src="form.logo" class="w-20 h-20 object-cover mx-auto rounded border" />
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end gap-2">
          <button @click="isEditing ? updatePartnership() : addPartnership()" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            حفظ
          </button>
          <button @click="resetForm" class="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded">
            إلغاء
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const showModal = ref(false)
const isEditing = ref(false)
const editingIndex = ref(null)

const partnerships = ref([])

const form = ref({
  name: '',
  type: '',
  date: '',
  logo: ''
})

function handleFile(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      form.value.logo = reader.result
    }
    reader.readAsDataURL(file)
  }
}

function addPartnership() {
  if (form.value.name && form.value.type && form.value.date && form.value.logo) {
    partnerships.value.push({ ...form.value })
    saveToLocalStorage()
    resetForm()
  } else {
    alert('يرجى ملء جميع الحقول')
  }
}

function editPartnership(index) {
  editingIndex.value = index
  form.value = { ...partnerships.value[index] }
  isEditing.value = true
  showModal.value = true
}

function updatePartnership() {
  if (editingIndex.value !== null) {
    partnerships.value[editingIndex.value] = { ...form.value }
    saveToLocalStorage()
    resetForm()
  }
}

function resetForm() {
  form.value = { name: '', type: '', date: '', logo: '' }
  showModal.value = false
  isEditing.value = false
  editingIndex.value = null
}

function confirmDelete(index) {
  if (confirm('هل أنت متأكد من حذف هذه الشراكة؟')) {
    partnerships.value.splice(index, 1)
    saveToLocalStorage()
  }
}

function saveToLocalStorage() {
  localStorage.setItem('partnerships', JSON.stringify(partnerships.value))
}

onMounted(() => {
  const saved = localStorage.getItem('partnerships')
  if (saved) {
    partnerships.value = JSON.parse(saved)
  }
})
</script>

<style scoped>
</style>
