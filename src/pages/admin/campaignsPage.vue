<template>
<div class="max-w-6xl mx-auto p-5">
<h2 class="text-3xl font-bold mb-8 text-center">حملات التبرع</h2>
<button @click="showAddModal = true" class="mb-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">إضافة حملة تبرع جديدة</button>
<div v-if="campaigns.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
<div v-for="(campaign, index) in campaigns" :key="index" 
class="bg-white rounded shadow p-4 flex flex-col">
<img :src="campaign.image" alt="صورة الحملة" class="h-40 w-full object-cover rounded mb-4" />
        <h3 class="text-xl font-semibold mb-2">{{ campaign.name }}</h3>
        <p class="text-gray-700 flex-grow">{{ campaign.description.slice(0, 100) }}...</p>
        
       
        <div class="mt-4 flex gap-2">
          <button @click="editCampaign(index)"
                  class="flex-grow bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded">
            تعديل
          </button>
          <button @click="confirmDelete(index)"
                  class="flex-grow bg-red-600 hover:bg-red-700 text-white py-2 rounded">
            حذف
          </button>
        </div>

        <button @click="openDonateModal(index)" 
                class="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded">
          تبرع الآن
        </button>
      </div>
    </div>

    <p v-else class="text-center text-gray-500">  </p>
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow max-w-md w-full">
        <h3 class="text-xl font-bold mb-4">{{ showEditModal ? 'تعديل حملة' : 'إضافة حملة تبرع' }}</h3>

        <form @submit.prevent="showEditModal ? saveEdit() : addCampaign()">
          <div class="mb-4">
            <label class="block mb-1">اسم الحملة</label>
            <input v-model="campaignForm.name" type="text" required
              class="w-full border rounded p-2" placeholder="اسم الحملة" />
          </div>

          <div class="mb-4">
            <label class="block mb-1">وصف الحملة</label>
            <textarea v-model="campaignForm.description" required
              class="w-full border rounded p-2" placeholder="وصف الحملة"></textarea>
          </div>

         

          <div class="mb-4">
            <label class="block mb-1">صورة الحملة</label>
            <input type="file" accept="image/*" @change="handleImageUpload" />
            <div v-if="campaignForm.image" class="mt-2">
              <img :src="campaignForm.image" alt="صورة الحملة" class="w-full h-40 object-cover rounded" />
            </div>
          </div>

          <div class="flex justify-end gap-2">
            <button type="button" @click="closeAddEditModal"
                    class="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">إلغاء</button>
            <button type="submit"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              {{ showEditModal ? 'حفظ التعديلات' : 'إضافة' }}
            </button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="showDonateModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow max-w-md w-full">
        <h3 class="text-xl font-bold mb-4">تبرع لحملة: {{ campaigns[selectedCampaign].name }}</h3>

        <form @submit.prevent="submitDonation">
          <div class="mb-4">
            <label class="block mb-1">اسم المتبرع</label>
            <input v-model="donation.name" type="text" required
              class="w-full border rounded p-2" placeholder="اسمك" />
          </div>

          <div class="mb-4">
            <label class="block mb-1">المبلغ (ريال)</label>
            <input v-model.number="donation.amount" type="number" min="1" required
              class="w-full border rounded p-2" placeholder="المبلغ" />
          </div>

          <div class="flex justify-end gap-2">
            <button type="button" @click="closeDonateModal"
                    class="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">إلغاء</button>
            <button type="submit"
                    class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">تبرع</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const campaigns = ref([])

const showAddModal = ref(false)
const showEditModal = ref(false)
const showDonateModal = ref(false)

const selectedCampaign = ref(null)

const campaignForm = ref({
  name: '',
  description: '',
  goal: 0,
  image: '',
  raised: 0,
})

const donation = ref({
  name: '',
  amount: 0,
})

onMounted(() => {
  const saved = localStorage.getItem('donationCampaigns')
  if (saved) {
    campaigns.value = JSON.parse(saved)
  }
})

function handleImageUpload(e) {
  const file = e.target.files[0]
  if (file) {
    campaignForm.value.image = URL.createObjectURL(file)
  }
}

function addCampaign() {
  campaigns.value.push({ ...campaignForm.value, raised: 0 })
  saveCampaigns()
  closeAddEditModal()
}

function editCampaign(index) {
  showEditModal.value = true
  Object.assign(campaignForm.value, campaigns.value[index])
  selectedCampaign.value = index
}

function saveEdit() {
  if (selectedCampaign.value !== null) {
    campaigns.value[selectedCampaign.value] = { ...campaignForm.value }
    saveCampaigns()
    closeAddEditModal()
  }
}

function closeAddEditModal() {
  showAddModal.value = false
  showEditModal.value = false
  resetForm()
}

function resetForm() {
  campaignForm.value = {
    name: '',
    description: '',
    goal: 0,
    image: '',
    raised: 0,
  }
  selectedCampaign.value = null
}

function confirmDelete(index) {
  if (confirm('هل أنت متأكد من حذف هذه الحملة؟')) {
    campaigns.value.splice(index, 1)
    saveCampaigns()
  }
}

function openDonateModal(index) {
  selectedCampaign.value = index
  donation.value = { name: '', amount: 0 }
  showDonateModal.value = true
}

function closeDonateModal() {
  showDonateModal.value = false
}

function submitDonation() {
  if (!donation.value.name || donation.value.amount <= 0) {
    alert('يرجى إدخال اسم المتبرع والمبلغ بشكل صحيح.')
    return
  }

  const campaign = campaigns.value[selectedCampaign.value]
  if (!campaign) {
    alert('الحملة غير موجودة.')
    return
  }

  campaign.raised = (campaign.raised || 0) + donation.value.amount
  saveCampaigns()
  alert(`شكراً لتبرعك بمبلغ ${donation.value.amount} ريال!`)
  closeDonateModal()
}

function saveCampaigns() {
  localStorage.setItem('donationCampaigns', JSON.stringify(campaigns.value))
}
</script>
