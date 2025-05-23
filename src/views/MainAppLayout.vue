// src/views/MainAppLayout.vue
<template>
    <div class="w-full max-w-3xl py-6 sm:py-10 px-4">
        <Header @navigate-home="navigateToHomeHandler" />
        <main class="mt-6 sm:mt-8">
            <FoodInput @submit-food="handleFoodSubmission" :is-loading="isLoading" />
            <AnalysisResult :analysis="aiAnalysis" />
        </main>
        <footer class="text-center mt-12 py-8 border-t border-base-300 text-base sm:text-sm text-base-content/70">
            <p>© {{ new Date().getFullYear() }} Krave AI. Beyond the label.</p>
        </footer>
    </div>
    <!-- Global LoadingSpinner for this layout -->
    <LoadingSpinner :is-loading="isLoading && !aiAnalysis" />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter
import Header from '../components/Header.vue';
import FoodInput from '../components/FoodInput.vue'; // Ensure this path is correct
import AnalysisResult from '../components/AnalysisResult.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const router = useRouter(); // Get router instance

const isLoading = ref(false);
const aiAnalysis = ref(null);

const navigateToHomeHandler = () => {
    router.push('/'); // Navigate to Landing page using router
    aiAnalysis.value = null;
};

// Mock AI and submission handler (copied from your App.vue - ensure it's complete)
const getMockKraveAiResponse = (submission) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const foodDescription = submission.description || "";
            // Assuming 'images' is now an array of File objects
            const hasImages = submission.images && submission.images.length > 0;
            let foodNameForDisplay = foodDescription;

            if (hasImages && !foodDescription) {
                foodNameForDisplay = `Uploaded Image(s) (${submission.images[0].name.substring(0, 20)}${submission.images.length > 1 ? '...' : ''})`;
            } else if (hasImages && foodDescription) {
                foodNameForDisplay = `${foodDescription} (with image${submission.images.length > 1 ? 's' : ''})`;
            }
            foodNameForDisplay = foodNameForDisplay.length > 50 ? foodNameForDisplay.substring(0, 47) + "..." : foodNameForDisplay;

            let response = { foodName: foodNameForDisplay, kraveScoreValue: 65, kraveScoreText: "Fair Choice", summary: "Analysis based on provided info.", pros: [], cons: [], healthImpacts: "Varies.", alternatives: [] };
            if (foodDescription.toLowerCase().includes("salad")) { response.kraveScoreValue = 85; response.kraveScoreText = "Great Choice"; response.summary = "Salads are generally a healthy option, rich in vitamins and fiber."; response.pros = ["Rich in nutrients", "Low calorie"]; response.cons = ["Dressing can add calories", "May not be filling alone"]; }
            else if (foodDescription.toLowerCase().includes("pizza")) { response.kraveScoreValue = 40; response.kraveScoreText = "Eat Sparingly"; response.summary = "Pizza can be high in calories, sodium, and saturated fat."; response.pros = ["Quick meal", "Can include vegetables"]; response.cons = ["High in calories", "Often high in sodium"]; }

            if ((!foodDescription.trim() && !hasImages)) {
                // This case should ideally be prevented by FoodInput's submit button logic
                response = null;
            } else if (response) {
                if (response.kraveScoreValue >= 70) response.kraveScoreText = "Good Choice";
                else if (response.kraveScoreValue >= 40) response.kraveScoreText = "Fair Choice";
                else response.kraveScoreText = "Consider Alternatives";
            }
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
        if (!result) { // If submission was empty and somehow got through
            console.warn("Empty submission processed.");
        }
    } catch (error) {
        console.error("Error getting Krave AI response:", error);
        let errorFoodName = submission.description || (submission.images && submission.images.length > 0 ? `Uploaded Image(s)` : "Input");
        aiAnalysis.value = { foodName: errorFoodName, summary: "Sorry, an error occurred while analyzing your food. Please try again.", kraveScoreValue: 0, kraveScoreText: "Error", pros: [], cons: [], healthImpacts: "", alternatives: [] };
    } finally {
        isLoading.value = false;
    }
};
</script>