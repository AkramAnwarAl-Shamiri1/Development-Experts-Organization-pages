<template>
  <button
    @click="$emit('click')"
    class="w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200 hover:bg-gray-100"
    :class="active 
      ? [activeBg, activeText] 
      : 'text-gray-400'"
    :title="label">
    <component :is="icon" class="w-6 h-6" />
  </button>
</template>
<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  icon: { type: [Object, Function], required: true },
  label: { type: String, default: '' },
  active: { type: Boolean, default: false },
  activeBg: { type: String, default: 'bg-blue-100' },
  activeText: { type: String, default: 'text-blue-500' },
})
</script>
