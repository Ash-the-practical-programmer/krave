<template>
    <div class="flex items-center gap-2 sm:gap-3" :class="{ 'justify-center': center }"
        aria-label="Krave AI logo container">
        <svg class="w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-200 hover:scale-105 focus:scale-105 outline-none transition-colors duration-300"
            :class="{
                'fill-gray-600 stroke-gray-600': usePrimaryColor,
                'fill-zinc-900 stroke-zinc-900': !usePrimaryColor
            }" viewBox="0 0 75.56570321373337 100.07349885061987" aria-label="Krave AI logo" tabindex="0">
            <g transform="translate(-27.57127009149731, -15.317372273054062) scale(2.042316303073875)">
                <g>
                    <path
                        d="M50,17.5H14c-0.276,0-0.5,0.224-0.5,0.5v6c0,8.118,5.263,15.015,12.55,17.5H20c-0.276,0-0.5,0.224-0.5,0.5 s0.224,0.5,0.5,0.5h24c0.276,0,0.5-0.224,0.5-0.5s-0.224-0.5-0.5-0.5h-6.05C45.237,39.015,50.5,32.118,50.5,24v-6 C50.5,17.724,50.276,17.5,50,17.5z M49.5,24c0,9.649-7.851,17.5-17.5,17.5S14.5,33.649,14.5,24v-5.5h35V24z" />
                    <path
                        d="M32,12.5c0.276,0,0.5-0.224,0.5-0.5V8c0-0.276-0.224-0.5-0.5-0.5S31.5,7.724,31.5,8v4C31.5,12.276,31.724,12.5,32,12.5z" />
                    <path
                        d="M22,12.5c0.276,0,0.5-0.224,0.5-0.5v-2c0-0.276-0.224-0.5-0.5-0.5s-0.5,0.224-0.5,0.5v2C21.5,12.276,21.724,12.5,22,12.5z" />
                    <path
                        d="M42,12.5c0.276,0,0.5-0.224,0.5-0.5v-2c0-0.276-0.224-0.5-0.5-0.5s-0.5,0.224-0.5,0.5v2C41.5,12.276,41.724,12.5,42,12.5z" />
                    <path
                        d="M46,51.5H28.486c-0.092-1.847-0.792-4-4.486-4c-3.584,0-6.5,2.019-6.5,4.5s2.916,4.5,6.5,4.5c3.694,0,4.395-2.153,4.486-4 H46c0.276,0,0.5-0.224,0.5-0.5S46.276,51.5,46,51.5z M24,55.5c-3.033,0-5.5-1.57-5.5-3.5s2.467-3.5,5.5-3.5 c2.905,0,3.5,1.399,3.5,3.5S26.905,55.5,24,55.5z" />
                </g>
            </g>
        </svg>
        <span class="text-xl sm:text-2xl md:text-3xl font-heading font-bold transition-colors duration-300" :class="{
            'text-gray-600': usePrimaryColor,
            'text-zinc-900': !usePrimaryColor
        }">
            Krave AI
        </span>
    </div>
</template>

<script setup>
defineProps({
    center: { type: Boolean, default: false },
    usePrimaryColor: { type: Boolean, default: true },
});
</script>