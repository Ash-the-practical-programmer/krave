<template>
  <div class="min-h-screen bg-base-100 flex flex-col font-sans transition-colors duration-300">
    <Header />
    <HeroSection @submit-food="handleFoodSubmit" ref="heroRef" :isLoading="isLoading" />
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from './components/Header.vue';
import HeroSection from './components/HeroSection.vue';
import Footer from './components/Footer.vue';

const heroRef = ref(null);
const isLoading = ref(false);
const isDark = ref(document.documentElement.classList.contains('dark'));

const handleFoodSubmit = async ({ description, images }) => {
  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = `Thanks for sharing! I see ${description || 'some food'}${images.length ? ` with ${images.length} image(s).` : '.'
    }`;
  heroRef.value.addAiMessage(response);
  isLoading.value = false;
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  }
};
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>