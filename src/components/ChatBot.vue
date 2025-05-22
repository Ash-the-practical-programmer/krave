<template>
  <div class="p-4 bg-base-100 shadow-xl rounded-lg flex flex-col h-96">
    <!-- Message Display Area -->
    <div class="flex-grow overflow-y-auto mb-4 space-y-2">
      <div v-for="message in messages" :key="message.id" :class="['chat', message.sender === 'user' ? 'chat-end' : 'chat-start']">
        <div :class="['chat-bubble', message.sender === 'bot' ? (message.isError ? 'chat-bubble-error' : 'chat-bubble-primary') : '']">
          {{ message.text }}
        </div>
      </div>
    </div>

    <!-- Message Input Area -->
    <div class="flex">
      <input
        type="text"
        v-model="userInput"
        @keyup.enter="sendMessage"
        placeholder="Type your message..."
        class="input input-bordered input-primary w-full mr-2"
        :disabled="isLoading"
      />
      <button @click="sendMessage" class="btn btn-primary" :class="{'loading': isLoading}" :disabled="isLoading">
        <span v-if="!isLoading">Send</span>
        <span v-else>Sending...</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const messages = ref([]);
const userInput = ref('');
let messageIdCounter = ref(0); // To ensure unique IDs
const isLoading = ref(false);

const sendMessage = async () => {
  if (userInput.value.trim() === '' || isLoading.value) return;

  const userMessageText = userInput.value;
  // Add user message
  messages.value.push({
    id: messageIdCounter.value++,
    text: userMessageText,
    sender: 'user',
  });

  userInput.value = ''; // Clear input after capturing value
  isLoading.value = true;

  try {
    const response = await fetch('http://127.0.0.1:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessageText }),
    });

    if (response.ok) {
      const data = await response.json();
      messages.value.push({
        id: messageIdCounter.value++,
        text: data.reply,
        sender: 'bot',
      });
    } else {
      let errorText = 'Sorry, something went wrong with the backend.';
      try {
        // Try to get a more specific error message from the backend
        const errorData = await response.json();
        if (errorData && errorData.error) {
          errorText = errorData.error;
        }
      } catch (e) {
        // If parsing error response fails, or no specific message, use the default
        console.error('Failed to parse error response from backend:', e);
      }
      console.error('Error from backend, status:', response.status, response.statusText);
      messages.value.push({
        id: messageIdCounter.value++,
        text: errorText,
        sender: 'bot',
        isError: true,
      });
    }
  } catch (error) {
    console.error('Failed to send message or connect to server:', error);
    messages.value.push({
      id: messageIdCounter.value++,
      text: 'Sorry, an error occurred while connecting to the server.',
      sender: 'bot',
      isError: true,
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Optional: Add any additional scoped styles if needed */
.h-96 {
  height: 24rem; /* Or any other fixed height you prefer */
}
</style>
