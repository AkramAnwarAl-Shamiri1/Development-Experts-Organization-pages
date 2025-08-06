<template>
  <div>
<footer class="site-footer bg-[#242856] text-white py-8 mt-12">
<div class="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between">
<div class="footer-logo mb-4 md:mb-0">
<img :src="logof" alt="شعار المؤسسة" class="h-14" />
</div>
<div class="footer-info text-center md:text-right space-y-2">
<p><i class="fas fa-map-marker-alt ml-2"></i> اليمن - تعز - شارع وادي القاضي - جوار فندق جراند تعز</p>
<p><i class="fas fa-phone ml-2"></i> 00967-775284135</p>
<p><i class="fas fa-envelope ml-2"></i> info@edoyemen.org</p>
</div>
</div>
<div class="footer-bottom border-t border-yellow-400 mt-6 pt-4 text-center text-sm font-semibold"> © جميع الحقوق محفوظة | المطور: akram alshamiri
 </div>
</footer>
</div>
</template>
<script>
import logof from '../imag/logof.png'
export default {
name: 'Homefooter',
data() {
return {
showMobileMenu: false,
logof
}}
}
</script>

