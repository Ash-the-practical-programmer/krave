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
  try {
    const formData = new FormData();
    formData.append('description', description || ''); // Ensure description is at least an empty string

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    // When using FormData with fetch, the browser automatically sets
    // the 'Content-Type' header to 'multipart/form-data'.
    // Do not set it manually.
    const response = await fetch('http://localhost:3000/api/analyze-food', {
      method: 'POST',
      body: formData, // Send formData directly
    });

    if (response.ok) {
      const parsedResponse = await response.json();
      heroRef.value.addAiMessage(parsedResponse.analysis);
    } else {
      console.error('API request failed:', response.status, await response.text());
      heroRef.value.addAiMessage("Sorry, I couldn't analyze that. Please try again.");
    }
  } catch (error) {
    console.error('Error during fetch:', error);
    heroRef.value.addAiMessage("Sorry, I couldn't analyze that. Please try again.");
  } finally {
    isLoading.value = false;
  }
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