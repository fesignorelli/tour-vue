<template>
  <div class="p-6 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col gap-2">
    <div class="flex justify-between items-start">
      <span class="text-sm font-semibold text-slate-500 uppercase">
        {{ title }}
      </span>
      <span class="text-xl" role="img" aria-label="icon">{{ icon }}</span>
    </div>
    <div class="text-2xl font-bold text-slate-800">
      {{ value }}
    </div>
    <div v-if="trend" class="mt-2 text-sm" :class="trendUp ? 'text-emerald-500' : 'text-rose-500'">
      <span v-if="trendUp">↑</span>
      <span v-else>↓</span>
      {{ trend }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  value: string | number;
  icon?: string;
  trend?: string;
  trendUp?: boolean;
}

defineProps<Props>();
</script>