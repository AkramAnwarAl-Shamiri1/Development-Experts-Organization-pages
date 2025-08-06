<template>
<div>
<section class="relative h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">
<div id="hero-slider" class="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000"></div>
<div class="relative z-10 bg-black/60 p-8 rounded-lg max-w-3xl">
<h1 class="text-4xl md:text-5xl font-extrabold mb-4">التعليم للجميع</h1>
<p class="text-lg md:text-xl text-gray-200 mb-6">نؤمن بأنه حق أساسي لكل طفل </p>
</div>
</section>
</div>
</template>
<script setup>
import { onMounted } from 'vue'
import slide1 from '../imag/slide1.webp'
import slide2 from '../imag/slide.webp'
import slide3 from '../imag/slide12.webp'
const heroImages = [slide1, slide2, slide3]
let heroIndex = 0
function changeHeroBackground(heroSlider) {
  heroSlider.style.backgroundImage = `url('${heroImages[heroIndex]}')`
  heroIndex = (heroIndex + 1) % heroImages.length
}
onMounted(() => {
  const heroSlider = document.getElementById('hero-slider')
  if (heroSlider) {
    changeHeroBackground(heroSlider)
    setInterval(() => changeHeroBackground(heroSlider), 4000)
  }
})
</script>
