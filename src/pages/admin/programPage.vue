<template>
  <section class="py-10 bg-gray-50">
    <div class="max-w-6xl mx-auto px-5">
      <h2 class="text-2xl font-bold mb-8 text-center">البرامج</h2>
      <button  @click="openAdd()" class="mb-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">إضافة برنامج جديد
      </button>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div v-for="program in programs" :key="program.id"class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300 flex flex-col justify-between">
          <component :is="program.icon" class="h-10 w-10 text-yellow-600 mb-4 mx-auto" />
          <h3 class="text-xl font-semibold mb-2 text-center">{{ program.name }}</h3>

          <p class="text-gray-600 mb-4 text-center flex-grow">{{ program.description }}</p>
          <div class="flex justify-center space-x-4 pt-4 border-t">
            <button @click="openEdit(program.id)" 
                    class="text-yellow-500 hover:text-yellow-700" 
                    title="تعديل">
              <PencilIcon class="h-5 w-5" />
            </button>
            <button @click="deleteProgram(program.id)" 
                    class="text-red-500 hover:text-red-700" 
                    title="حذف">
              <TrashIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <div v-if="showDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded shadow max-w-md w-full">
          <h3 class="text-lg font-bold mb-4">{{ isEditing ? 'تعديل برنامج' : 'إضافة برنامج جديد' }}</h3>

          <form @submit.prevent="isEditing ? saveEdit() : addProgram()">
            <input v-model="form.name" type="text" placeholder="اسم البرنامج" class="w-full mb-3 p-2 border rounded" required />
            <textarea v-model="form.description" placeholder="وصف البرنامج" class="w-full mb-3 p-2 border rounded" required></textarea>
            <select v-model="form.iconName" class="w-full mb-4 p-2 border rounded" required>
              <option value="AcademicCapIcon">🎓 تعليم</option>
              <option value="HeartIcon">❤️ صحة</option>
              <option value="BriefcaseIcon">💼 توظيف</option>
              <option value="GlobeAltIcon">🌍 بيئة</option>
              <option value="UserGroupIcon">👥 مجتمع</option>
            </select>

            <div class="flex justify-end space-x-2">
              <button type="button" @click="closeDialog()" class="px-4 py-2 rounded border">إلغاء</button>
              <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                {{ isEditing ? 'حفظ' : 'إضافة' }}
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { AcademicCapIcon, HeartIcon, BriefcaseIcon, GlobeAltIcon, UserGroupIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/solid'

const iconMap = {
  AcademicCapIcon,
  HeartIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  UserGroupIcon
}

const programs = ref([
  { id: 1, name: 'برنامج التعليم', description: 'يدعم التعليم المجاني في المناطق الريفية.', iconName: 'AcademicCapIcon', icon: AcademicCapIcon },
  { id: 2, name: 'برنامج الصحة', description: 'يقدم خدمات صحية أساسية للمجتمعات.', iconName: 'HeartIcon', icon: HeartIcon },
  { id: 3, name: 'برنامج التوظيف', description: 'يوفر فرص تدريب وتوظيف للشباب.', iconName: 'BriefcaseIcon', icon: BriefcaseIcon },
])

const showDialog = ref(false)
const isEditing = ref(false)
const editId = ref(null)

const form = ref({
  name: '',
  description: '',
  iconName: 'AcademicCapIcon',
})

function openAdd() {
  isEditing.value = false
  form.value = { name: '', description: '', iconName: 'AcademicCapIcon' }
  showDialog.value = true
}

function openEdit(id) {
  isEditing.value = true
  editId.value = id
  const program = programs.value.find(p => p.id === id)
  if (program) {
    form.value = {
      name: program.name,
      description: program.description,
      iconName: program.iconName,
    }
    showDialog.value = true
  }
}

function closeDialog() {
  showDialog.value = false
}

function addProgram() {
  const newId = Date.now()
  programs.value.push({
    id: newId,
    name: form.value.name,
    description: form.value.description,
    iconName: form.value.iconName,
    icon: iconMap[form.value.iconName],
  })
  showDialog.value = false
  saveToLocalStorage()
}

function saveEdit() {
  const index = programs.value.findIndex(p => p.id === editId.value)
  if (index !== -1) {
    programs.value[index].name = form.value.name
    programs.value[index].description = form.value.description
    programs.value[index].iconName = form.value.iconName
    programs.value[index].icon = iconMap[form.value.iconName]
  }
  showDialog.value = false
  saveToLocalStorage()
}

function deleteProgram(id) {
  if (confirm('هل أنت متأكد من حذف هذا البرنامج؟')) {
    programs.value = programs.value.filter(p => p.id !== id)
    saveToLocalStorage()
  }
}

function saveToLocalStorage() {
  localStorage.setItem('programs', JSON.stringify(programs.value))
}
if (localStorage.getItem('programs')) {
  const saved = JSON.parse(localStorage.getItem('programs'))
  programs.value = saved.map(p => ({
    ...p,
    icon: iconMap[p.iconName] || AcademicCapIcon
  }))
}
</script>
