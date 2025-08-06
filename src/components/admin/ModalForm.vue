<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded shadow max-w-md w-full">
      <h2 class="text-xl font-semibold mb-4">{{ isEditing ? 'تعديل مستخدم' : 'إضافة مستخدم' }}</h2>
      <form @submit.prevent="onSubmit">
        <div class="mb-4">
          <label class="block mb-1 font-medium">الاسم</label>
          <input v-model="form.name" type="text" class="w-full border px-3 py-2 rounded" required />
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-medium">البريد الإلكتروني</label>
          <input v-model="form.email" type="email" class="w-full border px-3 py-2 rounded" required />
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-medium">الدور</label>
          <select v-model="form.role" class="w-full border px-3 py-2 rounded" required>
            <option value="مدير">مدير</option>
            <option value="محرر">محرر</option>
            <option value="مشاهد">مشاهد</option>
          </select>
        </div>
        <div class="flex justify-end space-x-2">
          <button type="button" @click="$emit('close')" class="px-4 py-2 border rounded">إلغاء</button>
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {{ isEditing ? 'تحديث' : 'إضافة' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { reactive, watch, toRefs } from 'vue'
const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({ name: '', email: '', role: '' }),
  },
  isEditing: {
    type: Boolean,
    default: false,
  }
})
const emits = defineEmits(['close', 'submit'])
const form = reactive({ name: '', email: '', role: '' })
watch(() => props.initialData, (newVal) => {
  Object.assign(form, newVal)
}, { immediate: true })
function onSubmit() {
  emits('submit', { ...form })
  emits('close')
}
</script>
