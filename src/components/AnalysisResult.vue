<template>
    <Transition enter-active-class="transition ease-out duration-500" enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-300"
        leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        <div v-if="analysis" class="card bg-base-100 shadow-xl mt-6 sm:mt-8">
            <div class="card-body p-5 sm:p-7">
                <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                    <div>
                        <h2 class="card-title text-xl sm:text-2xl !text-primary mb-1">
                            Krave AI Insights
                        </h2>
                        <p class="text-base-content/80">For: <span class="font-semibold">{{ analysis.foodName }}</span>
                        </p>
                    </div>

                    <div v-if="analysis.kraveScoreValue !== undefined"
                        class="flex items-center gap-3 mt-3 sm:mt-0 self-center sm:self-auto">
                        <div class="radial-progress text-sm font-semibold" :class="{
                            'text-success': analysis.kraveScoreValue >= 70,
                            'text-warning': analysis.kraveScoreValue >= 40 && analysis.kraveScoreValue < 70,
                            'text-error': analysis.kraveScoreValue < 40,
                        }" :style="{ '--value': analysis.kraveScoreValue, '--size': '4.5rem', '--thickness': '5px' }"
                            role="progressbar" :aria-label="`Krave Score: ${analysis.kraveScoreValue} out of 100`">
                            {{ analysis.kraveScoreValue }}%
                        </div>
                        <span class="font-semibold text-md text-base-content/90">{{ analysis.kraveScoreText }}</span>
                    </div>
                </div>

                <!-- Summary Section -->
                <div class="mb-5 p-4 rounded-lg bg-neutral/30">
                    <h3 class="font-semibold text-lg mb-2 text-base-content">Key Summary:</h3>
                    <p class="text-base-content/80 text-sm leading-relaxed">{{ analysis.summary }}</p>
                </div>

                <!-- Pros and Cons Section -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div v-if="analysis.pros && analysis.pros.length" class="bg-base-200/50 p-4 rounded-lg">
                        <strong class="text-success flex items-center gap-2 text-md">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                class="w-5 h-5">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                    clip-rule="evenodd" />
                            </svg>
                            Potential Positives
                        </strong>
                        <ul class="list-disc list-inside ml-2 mt-2 text-sm text-base-content/75 space-y-1">
                            <li v-for="pro in analysis.pros" :key="pro">{{ pro }}</li>
                        </ul>
                    </div>
                    <div v-if="analysis.cons && analysis.cons.length" class="bg-base-200/50 p-4 rounded-lg">
                        <strong class="text-warning flex items-center gap-2 text-md">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                class="w-5 h-5">
                                <path fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                                    clip-rule="evenodd" />
                            </svg>
                            Points to Consider
                        </strong>
                        <ul class="list-disc list-inside ml-2 mt-2 text-sm text-base-content/75 space-y-1">
                            <li v-for="con in analysis.cons" :key="con">{{ con }}</li>
                        </ul>
                    </div>
                </div>

                <!-- Collapsible Sections for Details -->
                <div class="space-y-3">
                    <div v-if="analysis.healthImpacts"
                        class="collapse collapse-arrow bg-base-200/60 rounded-lg shadow-sm">
                        <input type="checkbox" id="health-impacts-toggle" class="peer" />
                        <label for="health-impacts-toggle"
                            class="collapse-title text-md font-medium text-base-content/95 cursor-pointer">
                            Health Implications
                        </label>
                        <div class="collapse-content text-sm text-base-content/75 peer-checked:pb-4">
                            <p class="leading-relaxed pt-2">{{ analysis.healthImpacts }}</p>
                        </div>
                    </div>

                    <div v-if="analysis.alternatives && analysis.alternatives.length"
                        class="collapse collapse-arrow bg-base-200/60 rounded-lg shadow-sm">
                        <input type="checkbox" id="alternatives-toggle" class="peer" />
                        <label for="alternatives-toggle"
                            class="collapse-title text-md font-medium text-base-content/95 cursor-pointer">
                            Healthier Alternatives
                        </label>
                        <div class="collapse-content text-sm text-base-content/75 peer-checked:pb-4">
                            <ul class="list-disc list-inside space-y-1 pt-2">
                                <li v-for="alt in analysis.alternatives" :key="alt">{{ alt }}</li>
                            </ul>
                        </div>
                    </div>

                    <div class="collapse collapse-arrow bg-base-200/60 rounded-lg shadow-sm">
                        <input type="checkbox" id="community-insights-toggle" class="peer" />
                        <label for="community-insights-toggle"
                            class="collapse-title text-md font-medium text-base-content/95 cursor-pointer">
                            Community Insights <span class="badge badge-sm badge-secondary">Beta</span>
                        </label>
                        <div class="collapse-content text-sm text-base-content/75 peer-checked:pb-4">
                            <p class="leading-relaxed pt-2">Real user experiences and tips related to this food will
                                appear here in a future update. This feature is currently under development and aims to
                                incorporate diverse consumer feedback.</p>
                        </div>
                    </div>
                </div>

                <!-- Disclaimer -->
                <div class="alert alert-warning mt-8 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                        <h3 class="font-bold">Important: Informational Use Only!</h3>
                        <div class="text-xs leading-normal">Krave AI provides insights based on general nutritional
                            principles and available data. It is NOT a substitute for professional medical or
                            nutritional advice. Always consult a qualified healthcare provider or registered dietitian
                            for personalized guidance regarding your health and dietary choices.</div>
                    </div>
                </div>

            </div>
        </div>
    </Transition>
</template>

<script setup>
defineProps({
    analysis: Object // Expected: { foodName, kraveScoreValue, kraveScoreText, summary, pros, cons, healthImpacts, alternatives }
});
</script>