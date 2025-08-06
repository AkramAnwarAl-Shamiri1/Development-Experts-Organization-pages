<template>
<div class="flex min-h-screen bg-gray-100">
    <aside class="w-20 bg-white shadow-md flex flex-col items-center py-6 space-y-4">
      <SidebarIcon
        :icon="ChartBarIcon"
        label="الإحصائيات"
        :active="activeTab === 'stats'"
        @click="activeTab = 'stats'"
        activeBg="bg-blue-100"
        activeText="text-blue-500" />
      <SidebarIcon
        :icon="UsersIcon"
        label="المستخدمين"
        :active="activeTab === 'users'"
        @click="activeTab = 'users'"
        activeBg="bg-green-100"
        activeText="text-green-500" />
    <SidebarIcon
      :icon="ClipboardDocumentListIcon"
      label="إدارة الأنشطة"
      :active="activeTab === 'activities'"
      @click="activeTab = 'activities'"
      activeBg="bg-green-100"
      activeText="text-green-500"/>
    <SidebarIcon
      :icon="AcademicCapIcon"
      label="إدارة البرامج"
      :active="activeTab === 'programs'"
      @click="activeTab = 'programs'"
      activeBg="bg-blue-100"
      activeText="text-blue-500"/>
    <SidebarIcon
      :icon="UserGroupIcon "
      label="إدارة الشراكات"
      :active="activeTab === 'partnerships'"
      @click="activeTab = 'partnerships'"
      activeBg="bg-yellow-100"
      activeText="text-yellow-500"/>
    <SidebarIcon
      :icon="GiftIcon"
      label="إدارة حملات التبرّع"
      :active="activeTab === 'campaigns'"
      @click="activeTab = 'campaigns'"
      activeBg="bg-red-100"
      activeText="text-red-500"/>
      <SidebarIcon
        :icon="Cog6ToothIcon"
        label="الإعدادات"
        :active="activeTab === 'settings'"
        @click="activeTab = 'settings'"
        activeBg="bg-orange-100"
        activeText="text-orange-500"/>
    </aside>
    <main class="flex-1 ">
      <Header/>
      <div v-if="activeTab === 'stats'"><statspage/> </div>
      <div v-if="activeTab === 'users'"><UsersPage/>  </div>
      <div v-if="activeTab === 'activities'"><activitypage/></div>
<div v-if="activeTab === 'programs'"><programPage/> </div>
      <div v-if="activeTab === 'partnerships'"><partnershipsPage/></div>
      <div v-if="activeTab === 'campaigns'"><campaignsPage/></div>
      <div v-if="activeTab === 'settings'"><settingspage/></div>
      
    </main>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { ChartBarIcon, UsersIcon, PlusCircleIcon,UserGroupIcon,ClipboardDocumentListIcon, Cog6ToothIcon,GiftIcon,AcademicCapIcon } from '@heroicons/vue/24/outline'
import SidebarIcon from '@/components/admin/SidebarIcon.vue'
import AddPage from '@/pages/admin/AddPage.vue'
import activitypage from './pages/admin/activitypage.vue'
import UsersPage from '@/pages/admin/UsersPage.vue'
import Header from '@/components/admin/header.vue'
import programPage from './pages/admin/programPage.vue'
import partnershipsPage from './pages/admin/partnershipsPage.vue'
import campaignsPage from './pages/admin/campaignsPage.vue'
import settingspage from './pages/admin/settingspage.vue'
import statspage from './pages/admin/statspage .vue'
const activeTab = ref('stats')
</script>
