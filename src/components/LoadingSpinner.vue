<template>
    <Transition enter-active-class="transition-opacity ease-linear duration-200" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition-opacity ease-linear duration-300"
        leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="isLoading"
            class="fixed inset-0 bg-base-100 bg-opacity-80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
            <span class="loading loading-ball loading-lg text-primary"></span>
            <p class="mt-4 text-lg text-primary font-medium">Kraving insights for you...</p>
        </div>
    </Transition>
</template>

<script setup>
defineProps({
    isLoading: Boolean
});
</script>