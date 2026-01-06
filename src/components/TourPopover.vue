<template>
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="isActive" class="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[2px]"></div>
        </Transition>

        <Transition name="pop">
            <div v-if="isActive && stepData" :style="position"
                class="fixed z-50 bg-white shadow-[0_20px_50px_rgba(124,58,237,0.15)] rounded-2xl p-6 border border-violet-100 w-[320px] pointer-events-auto">

                <slot name="header" :index="index" :total="total">
                    <div class="flex justify-between items-center mb-4">
                        <span
                            class="text-[10px] font-black text-violet-600 uppercase tracking-[0.15em] bg-violet-50 px-2.5 py-1 rounded-lg">
                            Dica {{ index + 1 }} / {{ total }}
                        </span>
                        <button @click="$emit('close')" class="text-slate-400 hover:text-violet-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </slot>

                <slot :step="stepData">
                    <h3 class="text-xl font-bold text-slate-900 tracking-tight">{{ stepData.title }}</h3>
                    <p class="text-slate-500 text-sm mt-2 leading-relaxed">{{ stepData.description }}</p>
                </slot>

                <slot name="actions" :isFirst="index === 0" :isLast="index === total - 1">
                    <div class="mt-8 flex justify-end items-center gap-3">
                        <button v-if="index > 0" @click="$emit('prev')"
                            class="text-sm font-bold text-slate-400 hover:text-slate-700 transition-colors px-2">
                            Anterior
                        </button>
                        <button @click="$emit('next')"
                            class="px-5 py-2.5 text-sm font-bold bg-violet-600 text-white rounded-xl hover:bg-violet-700 shadow-lg shadow-violet-200 transition-all active:scale-95">
                            {{ index === total - 1 ? 'Finalizar' : 'Próximo' }}
                        </button>
                    </div>
                </slot>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
defineProps<{
    isActive: boolean;
    stepData: any;
    position: any;
    index: number;
    total: number;
}>();

defineEmits(['next', 'prev', 'close']);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.pop-enter-active {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.pop-leave-active {
    transition: all 0.25s ease-in;
}

.pop-enter-from,
.pop-leave-to {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
}
</style>