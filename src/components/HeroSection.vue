<template>
    <main
        class="flex-1 flex flex-col items-center justify-center py-12 sm:py-20 bg-gradient-to-b from-base-100 to-base-200 animate-fade-in">
        <div class="text-center max-w-4xl mx-auto px-4 sm:px-6">
            <h2
                class="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-base-content mb-4 leading-tight tracking-tight">
                Discover Your Food with Krave AI
            </h2>
            <p
                class="text-base sm:text-lg md:text-xl text-base-content/80 mb-10 leading-relaxed font-sans max-w-3xl mx-auto">
                Curious about a dish or ingredient? Describe it or upload photos, and Krave AI will provide insights in
                a snap!
            </p>
            <div id="chat" class="mt-10">
                <FoodChat @submit-food="handleSubmit" :isLoading="isLoading" />
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import FoodChat from './FoodChat.vue';

const emit = defineEmits(['submit-food']);
defineProps({
    isLoading: Boolean,
});

const chatRef = ref(null);

const handleSubmit = ({ description, images }) => {
    emit('submit-food', { description, images });
};

const addAiMessage = (text) => {
    chatRef.value.addAiMessage(text);
};

defineExpose({ addAiMessage });
</script>