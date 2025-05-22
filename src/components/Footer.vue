<template>
    <footer class="bg-base-200 py-10 font-sans">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-base-content">
            <div class="mb-6">
                <AppLogo :center="true" :usePrimaryColor="false" />
            </div>
            <p class="text-sm opacity-80">© 2025 Krave AI. All rights reserved.</p>
            <div class="mt-4 flex justify-center gap-6 sm:gap-8 text-sm">
                <a href="#" class="hover:text-secondary hover:underline transition-all duration-200"
                    aria-label="Privacy Policy">
                    Privacy Policy
                </a>
                <a href="#" class="hover:text-secondary hover:underline transition-all duration-200"
                    aria-label="Terms of Service">
                    Terms of Service
                </a>
                <a href="#" class="hover:text-secondary hover:underline transition-all duration-200"
                    aria-label="Contact Us">
                    Contact Us
                </a>
            </div>
        </div>
    </footer>
</template>

<script setup>
import AppLogo from './AppLogo.vue';
</script>