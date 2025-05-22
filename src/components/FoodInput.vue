<template>
    <div class="card bg-base-100 shadow-lg">
        <div class="card-body p-4 sm:p-6 md:p-8">
            <h2 class="card-title text-2xl sm:text-3xl font-bold mb-2 text-base-content">
                What food are you curious about?
            </h2>
            <p class="text-base sm:text-lg text-base-content/70 mb-6 leading-relaxed">
                Describe the food or upload a photo of its packaging. More details help Krave AI provide better
                insights!
            </p>

            <textarea v-model="foodDescription"
                class="textarea textarea-bordered textarea-primary w-full h-32 text-base leading-relaxed transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-base-content/50"
                placeholder="e.g., 'Homemade lentil soup', 'BrandX Cereal', or describe what's in the photo..."
                aria-label="Food description input"></textarea>

            <!-- Image Preview -->
            <div v-if="imagePreviewUrl" class="my-6 text-center animate-fade-in">
                <div class="relative inline-block max-w-full">
                    <img :src="imagePreviewUrl" alt="Food preview"
                        class="max-h-48 w-full sm:max-w-md object-contain rounded-lg shadow-lg border border-base-300 transition-transform hover:scale-105" />
                </div>
                <button @click="clearImage" class="btn btn-sm btn-outline btn-error mt-3"
                    aria-label="Clear uploaded image">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear Image
                </button>
            </div>

            <!-- Actions Row -->
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                <!-- Image Upload Button -->
                <div class="w-full sm:w-auto">
                    <label for="food-image-upload"
                        class="btn btn-outline btn-primary w-full sm:w-auto flex items-center gap-2"
                        aria-label="Upload food photo">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{{ imageFile ? 'Change Photo' : 'Upload Photo' }}</span>
                    </label>
                    <input type="file" id="food-image-upload" @change="handleImageUpload"
                        accept="image/png, image/jpeg, image/webp" class="hidden" ref="fileInputRef" />
                    <p v-if="imageError" class="text-xs text-error mt-2 text-center">
                        {{ imageError }}
                    </p>
                    <p v-if="imageFile && !imagePreviewUrl && !imageError"
                        class="text-xs text-base-content/70 mt-2 sm:hidden text-center">
                        {{ imageFile.name.substring(0, 25) }}{{ imageFile.name.length > 25 ? '...' : '' }}
                    </p>
                </div>

                <!-- Submit Button -->
                <button @click="handleSubmit" :disabled="isLoading || (!foodDescription.trim() && !imageFile)"
                    :aria-disabled="isLoading || (!foodDescription.trim() && !imageFile)" aria-label="Get food insights"
                    class="btn btn-primary btn-wide sm:btn-lg text-base-100 font-semibold w-full sm:w-auto"
                    :class="{ 'btn-disabled': isLoading || (!foodDescription.trim() && !imageFile) }">
                    <span v-if="isLoading" class="loading loading-spinner loading-md mr-2"></span>
                    {{ isLoading ? 'Kraving...' : 'Get Insights' }}
                </button>
            </div>
            <p v-if="imageFile && imagePreviewUrl"
                class="text-xs text-center text-base-content/70 mt-3 hidden sm:block">
                Selected: {{ imageFile.name.substring(0, 30) }}{{ imageFile.name.length > 30 ? '...' : '' }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['submit-food']);
defineProps({
    isLoading: Boolean,
});

const foodDescription = ref('');
const imageFile = ref(null);
const imagePreviewUrl = ref(null);
const fileInputRef = ref(null);
const imageError = ref('');

const handleImageUpload = (event) => {
    imageError.value = '';
    const file = event.target.files[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024) {
            imageError.value = 'File is too large! Please upload an image under 5MB.';
            clearImageInputOnly();
            return;
        }
        imageFile.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreviewUrl.value = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        if (!imageFile.value) {
            clearImage();
        }
    }
};

const clearImageInputOnly = () => {
    if (fileInputRef.value) {
        fileInputRef.value.value = '';
    }
};

const clearImage = () => {
    imageFile.value = null;
    imagePreviewUrl.value = null;
    imageError.value = '';
    if (fileInputRef.value) {
        fileInputRef.value.value = '';
    }
};

const handleSubmit = () => {
    if (foodDescription.value.trim() || imageFile.value) {
        emit('submit-food', {
            description: foodDescription.value,
            image: imageFile.value,
        });
    }
};
</script>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>