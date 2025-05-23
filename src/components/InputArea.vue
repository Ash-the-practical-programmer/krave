<template>
    <div class="input-area mt-4 font-sans">
        <div v-if="selectedImages.length" class="image-previews flex flex-wrap gap-2 sm:gap-3 mb-4">
            <div v-for="image in selectedImages" :key="image.name" class="relative">
                <img :src="getPreviewUrl(image)" :alt="`Preview: ${image.name}`" loading="lazy"
                    class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shadow-softer" />
                <button @click="removeImage(image)"
                    class="absolute -top-1 -right-1 bg-error/90 text-base-content rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-error hover:scale-110 transition-all duration-200 animate-pulse"
                    aria-label="Remove image">
                    X
                </button>
            </div>
        </div>
        <div v-if="errorMessage" class="text-sm text-error/80 mb-3 text-center" role="alert">
            {{ errorMessage }}
        </div>
        <div class="flex items-center gap-2 sm:gap-3">
            <input type="text" v-model="message" placeholder="Describe the food..."
                class="input input-bordered flex-1 text-base bg-base-100 border-base-200 focus:ring-2 focus:ring-primary focus:border-primary-dark transition-all duration-200 rounded-lg shadow-softer"
                aria-label="Food description input" @keyup.enter="sendMessage" />
            <label for="image-upload"
                class="btn btn-outline btn-primary flex items-center gap-2 hover:bg-secondary/20 hover:shadow-soft focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-all duration-200 animate-pulse"
                aria-label="Upload images">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="hidden sm:inline">Upload</span>
            </label>
            <input type="file" id="image-upload" multiple accept="image/png,image/jpeg,image/webp"
                @change="handleImageUpload" class="hidden" />
            <button @click="sendMessage" :disabled="isLoading || (!message.trim() && !selectedImages.length)"
                class="btn btn-primary flex items-center gap-2 hover:bg-primary-dark hover:shadow-soft focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-all duration-200 animate-pulse"
                :class="{ 'btn-disabled': isLoading || (!message.trim() && !selectedImages.length) }"
                aria-label="Send message">
                <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span class="hidden sm:inline">Send</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['submit']);
defineProps({
    isLoading: Boolean,
});

const message = ref('');
const selectedImages = ref([]);
const previewUrls = ref({});
const errorMessage = ref('');

const handleImageUpload = (event) => {
    errorMessage.value = '';
    const files = Array.from(event.target.files);
    const maxSize = 5 * 1024 * 1024;
    const validFiles = files.filter((file) => {
        if (file.size > maxSize) {
            errorMessage.value = `File "${file.name}" is too large! Please upload images under 5MB.`;
            return false;
        }
        return true;
    });

    if (validFiles.length < files.length && !errorMessage.value) {
        errorMessage.value = 'Some files were too large and were not added.';
    }

    selectedImages.value.push(...validFiles);
    validFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewUrls.value[file.name] = e.target.result;
        };
        reader.readAsDataURL(file);
    });
};

const getPreviewUrl = (file) => previewUrls.value[file.name];

const removeImage = (file) => {
    selectedImages.value = selectedImages.value.filter((img) => img !== file);
    delete previewUrls.value[file.name];
    if (!selectedImages.value.length) {
        errorMessage.value = '';
    }
};

const sendMessage = () => {
    if (message.value.trim() || selectedImages.value.length) {
        emit('submit', {
            description: message.value,
            images: selectedImages.value,
        });
        message.value = '';
        selectedImages.value = [];
        previewUrls.value = {};
        errorMessage.value = '';
    }
};
</script>