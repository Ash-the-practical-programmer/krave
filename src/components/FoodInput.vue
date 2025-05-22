<template>
    <div class="card bg-base-100 shadow-lg">
        <div class="card-body p-6 sm:p-8">
            <h2 class="card-title text-xl sm:text-2xl mb-1 !text-base-content/90">
                What food are you curious about?
            </h2>
            <p class="text-sm text-base-content/60 mb-5">
                Describe the food, or upload a photo of its packaging. Details help Krave AI assist you better!
            </p>

            <textarea v-model="foodDescription"
                class="textarea textarea-bordered textarea-primary w-full h-32 text-base leading-relaxed"
                placeholder="e.g., 'Homemade lentil soup', 'BrandX Cereal', or describe what's in the photo..."
                aria-label="Food description input"></textarea>

            <!-- Image Preview (if an image is selected) - Placed above the action buttons -->
            <div v-if="imagePreviewUrl" class="my-4 text-center">
                <img :src="imagePreviewUrl" alt="Food preview"
                    class="max-h-40 w-auto inline-block rounded-md shadow-md border border-base-300" />
                <button @click="clearImage" class="btn btn-xs btn-ghost text-error mt-1">Clear Image</button>
            </div>

            <!-- Actions Row: Upload Button and Submit Button -->
            <div class="flex flex-col sm:flex-row items-center sm:justify-between gap-4 mt-6">
                <!-- Image Upload Button -->
                <div class="w-full sm:w-auto">
                    <label for="food-image-upload" class="btn btn-outline btn-primary w-full sm:w-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {{ imageFile ? 'Change Photo' : 'Upload Photo' }}
                    </label>
                    <input type="file" id="food-image-upload" @change="handleImageUpload"
                        accept="image/png, image/jpeg, image/webp" class="hidden" ref="fileInputRef" />
                    <p v-if="imageFile && !imagePreviewUrl" class="text-xs text-base-content/70 mt-1 sm:hidden">
                        {{ imageFile.name.substring(0, 25) }}{{ imageFile.name.length > 25 ? '...' : '' }}
                    </p>
                </div>

                <!-- Submit Button -->
                <button @click="handleSubmit" :disabled="isLoading || (!foodDescription.trim() && !imageFile)"
                    class="btn btn-primary btn-wide text-base-100 text-lg w-full sm:w-auto"
                    :class="{ 'btn-disabled': isLoading || (!foodDescription.trim() && !imageFile) }">
                    <span v-if="isLoading" class="loading loading-spinner loading-sm mr-2"></span>
                    {{ isLoading ? 'Kraving...' : 'Get Insights' }}
                </button>
            </div>
            <p v-if="imageFile && imagePreviewUrl"
                class="text-xs text-center text-base-content/70 mt-1 hidden sm:block">
                Selected: {{ imageFile.name.substring(0, 30) }}{{ imageFile.name.length > 30 ? '...' : '' }}
            </p>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['submit-food']);
defineProps({
    isLoading: Boolean
});

const foodDescription = ref('');
const imageFile = ref(null);
const imagePreviewUrl = ref(null);
const fileInputRef = ref(null);

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024) { // Limit to 5MB
            alert("File is too large! Please upload an image under 5MB.");
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
        // If no file is selected (e.g., user cancels dialog), don't clear existing preview
        // unless imageFile was already null. If a file was previously selected,
        // clearing here would remove it if they just opened and closed the dialog.
        if (!imageFile.value) {
            clearImage();
        }
    }
};

const clearImageInputOnly = () => {
    // Only clears the file input value, doesn't affect imageFile or imagePreviewUrl immediately
    // This is useful if validation fails before setting imageFile
    if (fileInputRef.value) {
        fileInputRef.value.value = '';
    }
}

const clearImage = () => {
    imageFile.value = null;
    imagePreviewUrl.value = null;
    if (fileInputRef.value) {
        fileInputRef.value.value = '';
    }
};

const handleSubmit = () => {
    if (foodDescription.value.trim() || imageFile.value) {
        emit('submit-food', {
            description: foodDescription.value,
            image: imageFile.value
        });
    }
};
</script>