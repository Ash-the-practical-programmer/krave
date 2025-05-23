<template>
    <header
        class="sticky top-0 z-50 bg-gradient-to-r from-primary to-primary-dark text-base-content backdrop-blur-md py-4 shadow-glass">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <AppLogo :usePrimaryColor="true" />
            <nav class="flex items-center gap-4 sm:gap-6">
                <a href="#chat"
                    class="btn btn-ghost font-sans text-base hover:bg-secondary/30 hover:text-base-content focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary-dark transition-all duration-200 animate-pulse"
                    aria-label="Get Started">
                    Get Started
                </a>
                <button @click="$emit('toggle-theme')"
                    class="btn btn-ghost p-2 hover:bg-secondary/30 focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-all duration-200 animate-pulse"
                    aria-label="Toggle theme">
                    <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                </button>
            </nav>
        </div>
    </header>
</template>

<script setup>
defineProps({ isDark: Boolean });
defineEmits(['toggle-theme']);
import AppLogo from './AppLogo.vue';
</script>