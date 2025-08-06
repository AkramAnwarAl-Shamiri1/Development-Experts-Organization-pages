<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center">إدارة المستخدمين</h1>
    <button
      @click="openAdd"
      class="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
    >
      + إضافة مستخدم جديد
    </button>
    <table class="min-w-full table-auto border-collapse border border-gray-300 shadow rounded-lg overflow-hidden">
      <thead class="bg-gray-100">
        <tr>
          <th class="border border-gray-300 px-4 py-3 text-center text-gray-700 uppercase font-semibold w-12">اختيار</th>
          <th class="border border-gray-300 px-6 py-3 text-center text-gray-700 uppercase font-semibold w-16">الصورة</th>
          <th class="border border-gray-300 px-6 py-3 text-right text-gray-700 uppercase font-semibold">الاسم الكامل</th>
          <th class="border border-gray-300 px-6 py-3 text-right text-gray-700 uppercase font-semibold">اسم المستخدم</th>
          <th class="border border-gray-300 px-6 py-3 text-right text-gray-700 uppercase font-semibold">البريد الإلكتروني</th>
          <th class="border border-gray-300 px-6 py-3 text-right text-gray-700 uppercase font-semibold">الدور</th>
          <th class="border border-gray-300 px-6 py-3 text-center text-gray-700 uppercase font-semibold">إجراءات</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in users"
          :key="user.id"
          :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
          class="hover:bg-blue-50 transition-colors"
        >
          <td class="border border-gray-300 px-4 py-3 text-center">
            <input type="checkbox" v-model="user.selected" />
          </td>
          <td class="border border-gray-300 px-6 py-3 text-center">
            <img
              v-if="user.avatar"
              :src="user.avatar"
              alt="avatar"
              class="h-10 w-10 rounded-full object-cover mx-auto"
            />
            <div v-else class="h-10 w-10 rounded-full bg-gray-300 mx-auto flex items-center justify-center text-gray-600">
              لا صورة
            </div>
          </td>
          <td class="border border-gray-300 px-6 py-3 text-right">{{ user.fullName }}</td>
          <td class="border border-gray-300 px-6 py-3 text-right">{{ user.username }}</td>
          <td class="border border-gray-300 px-6 py-3 text-right">{{ user.email }}</td>
          <td class="border border-gray-300 px-6 py-3 text-right">{{ user.role }}</td>
          <td class="border border-gray-300 px-6 py-3 text-center space-x-3">
            <button
              @click="openEdit(index)"
              class="text-yellow-600 hover:text-yellow-800"
              title="تعديل"
              aria-label="تعديل المستخدم"
            >
              تعديل
            </button>
            <button
              @click="confirmDelete(index)"
              class="text-red-600 hover:text-red-800"
              title="حذف"
              aria-label="حذف المستخدم"
            >
              حذف
            </button>
          </td>
        </tr>
        <tr v-if="users.length === 0">
          <td colspan="7" class="text-center py-6 text-gray-500">لا يوجد مستخدمين حتى الآن.</td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="showDialog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="closeDialog"
    >
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 class="text-xl font-bold mb-4 text-center">{{ isEditing ? 'تعديل مستخدم' : 'إضافة مستخدم جديد' }}</h2>
        <form @submit.prevent="isEditing ? handleEdit() : handleAdd()">
          <div class="space-y-4">
            <div>
              <label class="block mb-1 font-semibold">الاسم الكامل</label>
              <input v-model="form.fullName" required type="text" class="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label class="block mb-1 font-semibold">اسم المستخدم</label>
              <input v-model="form.username" required type="text" class="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label class="block mb-1 font-semibold">البريد الإلكتروني</label>
              <input v-model="form.email" required type="email" class="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label class="block mb-1 font-semibold">الدور</label>
              <select v-model="form.role" required class="w-full border rounded px-3 py-2">
                <option value="">اختر الدور</option>
                <option value="مدير">مدير</option>
                <option value="محرر">محرر</option>
                <option value="مشاهد">مشاهد</option>
              </select>
            </div>
            <div>
              <label class="block mb-1 font-semibold">صورة المستخدم</label>
              <input type="file" accept="image/*" @change="handleFileUpload" />
              <div v-if="form.avatarPreview" class="mt-2">
                <img :src="form.avatarPreview" alt="صورة المستخدم" class="h-20 w-20 rounded-full object-cover" />
              </div>
            </div>
          </div>

          <div class="mt-6 flex justify-between">
            <button
              type="button"
              class="px-4 py-2 border rounded hover:bg-gray-100"
              @click="closeDialog"
            >
              إلغاء
            </button>
            <button
              type="submit"
              class="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            >
              {{ isEditing ? 'تحديث' : 'إضافة' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
const users = ref([])
const form = reactive({
  fullName: '',
  username: '',
  email: '',
  role: '',
  avatar: '',
  avatarPreview: '',
})
const showDialog = ref(false)
const isEditing = ref(false)
const editingIndex = ref(null)
onMounted(() => {
  const saved = localStorage.getItem('users')
  users.value = saved ? JSON.parse(saved) : []
})
watch(users, (val) => {
  localStorage.setItem('users', JSON.stringify(val))
}, { deep: true })

function openAdd() {
  resetForm()
  isEditing.value = false
  showDialog.value = true
}

function openEdit(index) {
  const user = users.value[index]
  form.fullName = user.fullName
  form.username = user.username
  form.email = user.email
  form.role = user.role
  form.avatar = user.avatar || ''
  form.avatarPreview = user.avatar || ''
  editingIndex.value = index
  isEditing.value = true
  showDialog.value = true
}

function closeDialog() {
  showDialog.value = false
  resetForm()
}

function resetForm() {
  form.fullName = ''
  form.username = ''
  form.email = ''
  form.role = ''
  form.avatar = ''
  form.avatarPreview = ''
  editingIndex.value = null
}

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    form.avatar = e.target.result
    form.avatarPreview = e.target.result
  }
  reader.readAsDataURL(file)
}

function handleAdd() {
  const newUser = {
    id: Date.now(),
    fullName: form.fullName.trim(),
    username: form.username.trim(),
    email: form.email.trim(),
    role: form.role,
    avatar: form.avatar || '',
    selected: false,
  }
  users.value.push(newUser)
  closeDialog()
}

function handleEdit() {
  if (editingIndex.value === null) return
  users.value[editingIndex.value] = {
    ...users.value[editingIndex.value],
    fullName: form.fullName.trim(),
    username: form.username.trim(),
    email: form.email.trim(),
    role: form.role,
    avatar: form.avatar || users.value[editingIndex.value].avatar || '',
  }
  closeDialog()
}

function confirmDelete(index) {
  if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
    users.value.splice(index, 1)
  }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
}
</style>
