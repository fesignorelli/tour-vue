<template>
  <div class="min-h-screen bg-slate-50 p-8 relative font-sans">
    
    <TourPopover 
      :isActive="isActive"
      :stepData="currentStepData"
      :position="popoverPosition"
      :index="currentStep"
      :total="steps.length"
      @next="nextStep"
      @prev="prevStep"
      @close="stopTour"
    />

    <div v-if="isActive" class="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[2px] transition-opacity duration-500"></div>

    <header id="step-header" class="mb-8 flex justify-between items-center relative transition-all duration-500" 
      :class="{'z-50 bg-white/80 backdrop-blur-md p-6 -m-6 rounded-2xl shadow-2xl border border-violet-100': currentStep === 0}">
      <div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight">
          Dashboard <span class="text-violet-600 font-extrabold">Geral</span>
        </h1>
        <p class="text-slate-500 mt-1 font-medium">Bem-vindo à sua central de inteligência.</p>
      </div>
      <button @click="startTour" 
        class="bg-violet-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-violet-200 hover:bg-violet-700 hover:shadow-violet-300 transition-all active:scale-95 flex items-center gap-2">
        <span class="text-lg">✨</span> Iniciar Tour
      </button>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
      <StatsCard 
        v-for="(stat, index) in metrics" 
        :key="stat.title"
        :id="'step-card-' + index"
        :class="{'z-50 bg-white ring-4 ring-violet-500 ring-offset-4 rounded-2xl scale-105 shadow-[0_20px_50px_rgba(124,58,237,0.2)]': currentStep === (index + 1)}"
        class="transition-all duration-500 cursor-default"
        v-bind="stat" 
      />
    </div>

    <section class="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
      <div id="step-chart" 
        class="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 min-h-[350px] flex flex-col items-center justify-center transition-all duration-500 group"
        :class="{'z-50 ring-4 ring-violet-500 ring-offset-4 shadow-2xl': currentStep === (metrics.length + 1)}">
        
        <div class="w-16 h-16 bg-violet-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <span class="text-2xl">📊</span>
        </div>
        <p class="text-slate-400 font-semibold tracking-wide uppercase text-xs">Análise de Performance</p>
        <p class="text-slate-300 text-sm mt-1 italic">Gráfico em processamento...</p>
      </div>

      <div class="bg-violet-600 rounded-3xl p-8 text-white shadow-xl shadow-violet-200 relative overflow-hidden">
        <div class="relative z-10">
          <h3 class="text-xl font-bold mb-2">Dica Pro</h3>
          <p class="text-violet-100 text-sm leading-relaxed">
            Use os filtros avançados para comparar períodos de vendas sazonais.
          </p>
        </div>
        <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        <div class="absolute -left-4 -top-4 w-24 h-24 bg-violet-400/20 rounded-full blur-2xl"></div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import StatsCard from '../components/StatsCard.vue';
import TourPopover from '../components/TourPopover.vue';
import { useDashboardTour } from '../constants/tour';

const metrics = ref([
  { title: 'Receita Total', value: 'R$ 84.250', icon: '💰', trend: '12%', trendUp: true },
  { title: 'Sessões Ativas', value: '1.420', icon: '🌐', trend: '5%', trendUp: true },
  { title: 'Taxa de Rejeição', value: '24.8%', icon: '📉', trend: '2%', trendUp: false },
  { title: 'Suporte Aberto', value: '12', icon: '🎧', trend: 'Estável', trendUp: true },
]);

const { 
  currentStep, isActive, steps, currentStepData, 
  popoverPosition, startTour, stopTour, nextStep, prevStep 
} = useDashboardTour(metrics);
</script>