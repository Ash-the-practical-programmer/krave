<template>
  <div class="min-h-screen bg-base-200 flex flex-col items-center font-sans">
    <template v-if="showLandingPage">
      <LandingPage @get-started="enterApp" />
    </template>
    <template v-else>
      <div class="w-full max-w-3xl py-6 sm:py-10 px-4">
        <Header @navigate-home="navigateToHome" />
        <main class="mt-6 sm:mt-8">
          <FoodInput @submit-food="handleFoodSubmission" :is-loading="isLoading" />
          <AnalysisResult :analysis="aiAnalysis" />
        </main>
        <footer class="text-center mt-12 py-8 border-t border-base-300 text-sm text-base-content/70">
          <p>© {{ new Date().getFullYear() }} Krave AI. Beyond the label.</p>

          <!-- Theme Selector -->
          <div class="mt-6 p-4 bg-base-300/50 rounded-md max-w-md mx-auto">
            <h4 class="text-sm font-semibold mb-3">Select Theme:</h4>
            <div class="flex flex-wrap justify-center gap-2">
              <button
                v-for="theme in availableThemes"
                :key="theme"
                @click="setTheme(theme)"
                class="btn btn-xs capitalize"
                :class="{ 'btn-primary btn-active': currentTheme === theme, 'btn-ghost': currentTheme !== theme }"
              >
                {{ theme }}
              </button>
            </div>
          </div>
        </footer>
      </div>
    </template>
    <LoadingSpinner :is-loading="isLoading && !aiAnalysis && !showLandingPage" />

    <!-- ChatBot FAB and Window -->
    <div v-if="showChat" class="fixed bottom-20 right-4 left-4 sm:left-auto z-50 bg-base-100 shadow-xl rounded-lg w-full max-w-xs sm:max-w-sm">
      <ChatBot />
    </div>
    <button @click="toggleChat" class="btn btn-primary btn-circle fixed bottom-4 right-4 z-50 shadow-lg">
      <svg v-if="!showChat" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import LandingPage from './components/LandingPage.vue';
import Header from './components/Header.vue';
import FoodInput from './components/FoodInput.vue';
import AnalysisResult from './components/AnalysisResult.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';
import ChatBot from './components/ChatBot.vue';

const showLandingPage = ref(true);
const isLoading = ref(false);
const aiAnalysis = ref(null);
const showChat = ref(false);

const currentTheme = ref('emerald'); // Default theme
const availableThemes = ['emerald', 'light', 'dark', 'cupcake', 'synthwave', 'nord'];

const setTheme = (themeName) => {
  currentTheme.value = themeName;
};

onMounted(() => {
  document.documentElement.setAttribute('data-theme', currentTheme.value);
});

watch(currentTheme, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme);
  // Optionally, save theme preference to localStorage
  // localStorage.setItem('theme', newTheme);
});

// If you want to load a saved theme from localStorage on initial load:
// onMounted(() => {
//   const savedTheme = localStorage.getItem('theme');
//   if (savedTheme && availableThemes.includes(savedTheme)) {
//     currentTheme.value = savedTheme;
//   }
//   document.documentElement.setAttribute('data-theme', currentTheme.value);
// });


const toggleChat = () => {
  showChat.value = !showChat.value;
};

const enterApp = () => {
  showLandingPage.value = false;
  aiAnalysis.value = null; // Clear previous analysis when entering app
};

const navigateToHome = () => {
  showLandingPage.value = true;
  aiAnalysis.value = null; // Clear any existing analysis when going back to landing
};

// Mock AI and submission handler (same as before - abbreviated for brevity)
const getMockKraveAiResponse = (submission) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const foodDescription = submission.description || "";
      const hasImage = !!submission.image;
      const lcFood = foodDescription.toLowerCase();
      let foodNameForDisplay = foodDescription;
      if (hasImage && !foodDescription) foodNameForDisplay = `Uploaded Image (${submission.image.name.substring(0, 20)}...)`;
      else if (hasImage && foodDescription) foodNameForDisplay = `${foodDescription} (with image)`;
      foodNameForDisplay = foodNameForDisplay.length > 50 ? foodNameForDisplay.substring(0, 47) + "..." : foodNameForDisplay;

      let response = { foodName: foodNameForDisplay, kraveScoreValue: 65, kraveScoreText: "Fair Choice", summary: "Analysis based on provided info.", pros: [], cons: [], healthImpacts: "Varies.", alternatives: [] };
      if (lcFood.includes("salad")) { /* ... more specific mock ... */ response.kraveScoreValue = 85; }
      else if (lcFood.includes("pizza")) { /* ... */ response.kraveScoreValue = 40; }
      if ((!foodDescription.trim() && !hasImage)) response = null;
      if (response) { /* set kraveScoreText based on value ... */ }
      resolve(response);
    }, 1200);
  });
};

const handleFoodSubmission = async (submission) => {
  isLoading.value = true;
  aiAnalysis.value = null;
  try {
    const result = await getMockKraveAiResponse(submission);
    aiAnalysis.value = result;
  } catch (error) {
    console.error("Error getting Krave AI response:", error);
    let errorFoodName = submission.description || (submission.image ? `Uploaded Image (${submission.image.name.substring(0, 20)}...)` : "Input");
    aiAnalysis.value = { foodName: errorFoodName, summary: "Sorry, an error occurred.", kraveScoreValue: 0, kraveScoreText: "Error", pros: [], cons: [], healthImpacts: "", alternatives: [] };
  } finally {
    isLoading.value = false;
  }
};
</script>

<style>
/* Global styles ... */
.collapse input[type="checkbox"]:checked~.collapse-title:after,
.collapse input[type="radio"]:checked~.collapse-title:after {
  --tw-rotate: 225deg;
}

.collapse-title:after {
  color: hsl(var(--bc) / 0.5);
}
</style>