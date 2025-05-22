<template>
    <div
        class="chat-container relative bg-base-100 rounded-2xl shadow-glass p-4 sm:p-6 max-w-2xl mx-auto h-[380px] sm:h-[480px] md:h-[520px] flex flex-col transition-all duration-300">
        <div v-if="isLoading"
            class="absolute inset-0 flex items-center justify-center bg-base-100/80 backdrop-blur-sm rounded-2xl"
            aria-live="polite">
            <span class="loading loading-spinner loading-lg text-primary"></span>
        </div>
        <div class="messages flex-1 overflow-y-auto pr-2 space-y-4" role="log" aria-live="polite">
            <Message v-for="msg in messages" :key="msg.id" :sender="msg.sender" :text="msg.text" :images="msg.images" />
            <div ref="messagesEndRef"></div>
        </div>
        <InputArea @submit="handleSubmit" :isLoading="isLoading" />
    </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import Message from './Message.vue';
import InputArea from './InputArea.vue';

const emit = defineEmits(['submit-food']);
defineProps({
    isLoading: Boolean,
});

const messages = ref([
    {
        id: 0,
        sender: 'ai',
        text: 'Hi! What food are you curious about today? You can describe it or upload photos.',
        images: [],
    },
]);
const messagesEndRef = ref(null);

const handleSubmit = ({ description, images }) => {
    if (description.trim() || images.length) {
        messages.value.push({
            id: Date.now(),
            sender: 'user',
            text: description,
            images: images,
        });
        emit('submit-food', { description, images });
    }
};

const addAiMessage = (text) => {
    messages.value.push({
        id: Date.now(),
        sender: 'ai',
        text: text,
        images: [],
    });
};

watch(
    messages,
    () => {
        nextTick(() => {
            messagesEndRef.value?.scrollIntoView({ behavior: 'smooth' });
        });
    },
    { deep: true }
);

defineExpose({ addAiMessage });
</script>

<style scoped>
.chat-container {
    background: var(--base-100);
    border: 1px solid rgba(0, 0, 0, 0.05);
}

.messages::-webkit-scrollbar {
    width: 6px;
}

.messages::-webkit-scrollbar-thumb {
    background: var(--base-200);
    border-radius: 3px;
}

.messages::-webkit-scrollbar-track {
    background: transparent;
}
</style>