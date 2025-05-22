<template>
    <div :class="[
        'message',
        sender === 'user'
            ? 'ml-auto bg-primary text-base-content'
            : 'mr-auto bg-base-200 text-base-content',
    ]"
        class="max-w-[85%] p-3 sm:p-4 rounded-xl shadow-softer transition-all duration-300 animate-slide-up font-sans">
        <div v-if="text" class="text-sm sm:text-base leading-relaxed">{{ text }}</div>
        <div v-if="images && images.length" class="mt-3 flex flex-wrap gap-2">
            <img v-for="image in images" :key="image.name" :src="getImageUrl(image)" :alt="`Food image: ${image.name}`"
                loading="lazy"
                class="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg shadow-softer hover:scale-105 transition-transform duration-200" />
        </div>
    </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';

defineProps({
    sender: { type: String, required: true },
    text: { type: String, default: '' },
    images: { type: Array, default: () => [] },
});

const imageUrls = ref({});

const getImageUrl = (file) => {
    if (!imageUrls.value[file.name]) {
        imageUrls.value[file.name] = URL.createObjectURL(file);
    }
    return imageUrls.value[file.name];
};

onUnmounted(() => {
    Object.values(imageUrls.value).forEach((url) => URL.revokeObjectURL(url));
});
</script>

<style scoped>
.animate-slide-up {
    animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>