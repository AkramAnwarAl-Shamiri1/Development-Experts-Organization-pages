<template>
<div>
<header class="flex items-center justify-between px-5 py-3 border-b border-gray-200 sticky top-0 bg-white z-50">
<div class="logo-section flex items-center">
<img :src="logo" alt="شعار المؤسسة" class="h-14" />
</div>
<nav>
<div id="nav-menu" class="hidden md:flex space-x-6 font-semibold text-[#242856]">
<a href="/" class="hover:text-[#002244] transition">الرئيسية</a>
<a href="/About" class="hover:text-[#002244] transition">من نحن</a>
<a href="/Programs" class="hover:text-[#002244] transition">البرامج</a>
<a href="/News" class="hover:text-[#002244] transition">الأخبار</a>
<a href="/Contact" class="hover:text-[#002244] transition">اتصل بنا</a>
</div>
<div class="md:hidden text-3xl cursor-pointer" onclick="toggleMenu()">☰</div>
</nav>
<a href="Donation" class="bg-[#242856] hover:bg-yellow-400 text-white px-8 py-2 rounded-full font-bold shadow-md transition-colors duration-300">تبرع الآن
</a>
</header>
</div>
</template>
<script>
import logo from '../imag/logo.webp'
export default {
name: 'Homeheader',
data() {
return {
showMobileMenu: false,
logo
}
}
}
</script>