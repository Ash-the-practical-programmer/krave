<template>
    <div
        class="w-full flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-200 p-4 text-center">
        <main class="w-full max-w-4xl mx-auto">
            <!-- Hero Section -->
            <section class="py-16 sm:py-24">
                <div class="max-w-3xl mx-auto">
                    <KraveLogo class="inline-flex justify-center mb-6 sm:mb-8" />
                    <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary">
                        Unlock True Food Intelligence.
                    </h1>
                    <p
                        class="mt-6 text-lg sm:text-xl leading-relaxed text-base-content/80 max-w-2xl mx-auto hero-subtext">
                        Krave AI goes beyond confusing labels to reveal the real nutritional quality and health
                        implications of your food. Make informed choices, effortlessly.
                    </p>
                    <div class="mt-10 sm:mt-12">
                        <button @click="$emit('get-started')" class="btn btn-primary btn-lg px-10 text-lg">
                            Analyze Your Food
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            <!-- Features Section (Example) -->
            <section class="py-16 sm:py-20 bg-base-100 rounded-xl shadow-lg -mt-10 sm:-mt-12 relative z-10">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl font-bold text-center text-base-content/90 mb-12 sm:mb-16">
                        Why Krave AI?
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
                        <div class="feature-card text-center p-6 bg-base-200/70 rounded-lg">
                            <div
                                class="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/20 text-primary mb-5">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="1.5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" />
                                </svg>
                            </div>
                            <h3 class="text-xl font-semibold text-base-content/90 mb-2">Deep Analysis</h3>
                            <p class="text-sm text-base-content/70 leading-relaxed">
                                Understand nutrients, ingredients, and their impact beyond the surface.
                            </p>
                        </div>
                        <div class="feature-card text-center p-6 bg-base-200/70 rounded-lg">
                            <div
                                class="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/20 text-primary mb-5">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="1.5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 class="text-xl font-semibold text-base-content/90 mb-2">Health Implications</h3>
                            <p class="text-sm text-base-content/70 leading-relaxed">
                                Gain clarity on short-term and long-term effects on your wellbeing.
                            </p>
                        </div>
                        <div class="feature-card text-center p-6 bg-base-200/70 rounded-lg">
                            <div
                                class="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/20 text-primary mb-5">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="1.5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <h3 class="text-xl font-semibold text-base-content/90 mb-2">Smarter Swaps</h3>
                            <p class="text-sm text-base-content/70 leading-relaxed">
                                Discover suitable and healthier alternatives tailored to your needs.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="py-16 sm:py-24">
                <div class="max-w-3xl mx-auto">
                    <h2 class="text-3xl font-bold text-center text-base-content/90 mb-3">
                        Simple. Insightful. Empowering.
                    </h2>
                    <p class="text-center text-base-content/70 mb-12 sm:mb-16 max-w-xl mx-auto">
                        Krave AI is designed to demystify food nutrition, helping you navigate choices for a healthier
                        lifestyle, especially with regional and non-packaged foods.
                    </p>
                    <div class="text-center">
                        <button @click="$emit('get-started')" class="btn btn-accent btn-lg px-10 text-lg">
                            Start Your Food Journey
                        </button>
                    </div>
                </div>
            </section>

            <footer class="py-10 text-center">
                <p class="text-sm text-base-content/60">
                    © {{ new Date().getFullYear() }} Krave AI. All Rights Reserved.
                </p>
            </footer>
        </main>
    </div>
</template>

<script setup>
import KraveLogo from './KraveLogo.vue';
defineEmits(['get-started']);
</script>

<style scoped>
.feature-card {
    transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
}

.feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px -5px hsl(var(--p)/0.1), 0 4px 6px -2px hsl(var(--p)/0.05);
}

h1,
.hero-subtext {
    /* Ensured .hero-subtext class is applied in template */
    animation: fadeInSmooth 1s ease-out forwards;
    opacity: 0;
}

h1 {
    animation-delay: 0.2s;
}

.hero-subtext {
    animation-delay: 0.4s;
}

@keyframes fadeInSmooth {
    to {
        opacity: 1;
        transform: translateY(0);
    }

    from {
        opacity: 0;
        transform: translateY(10px);
    }
}
</style>