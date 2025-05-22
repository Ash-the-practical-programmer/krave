<template>
  <div data-theme="emerald" class="min-h-screen bg-base-200 flex flex-col items-center font-sans">
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
        </footer>
      </div>
    </template>
    <LoadingSpinner :is-loading="isLoading && !aiAnalysis && !showLandingPage" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LandingPage from './components/LandingPage.vue';
import Header from './components/Header.vue';
import FoodInput from './components/FoodInput.vue';
import AnalysisResult from './components/AnalysisResult.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';

const showLandingPage = ref(true);
const isLoading = ref(false);
const aiAnalysis = ref(null);

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