<template>
    <header class="text-center mb-8 sm:mb-10">
        <!-- Make logo clickable to go home/landing -->
        <div @click="$emit('navigate-home')" class="inline-flex justify-center cursor-pointer group" role="button"
            aria-label="Go to homepage">
            <KraveLogo />
        </div>
        <p class="mt-2 text-md sm:text-lg text-base-content/75 group-hover:text-primary transition-colors">
            Beyond the label. Understand your food, deeply.
        </p>
    </header>
</template>

<script setup>
import KraveLogo from './KraveLogo.vue';
defineEmits(['navigate-home']); // Declare the event
</script>