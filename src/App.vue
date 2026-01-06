<template>
  <div class="flex h-screen bg-slate-50 overflow-hidden">
    <aside class="w-64 bg-slate-900 flex flex-col shrink-0">
      <div class="p-6">
        <h2 class="text-white text-2xl font-bold tracking-tight">AdminDash</h2>
      </div>

      <nav class="flex-1 px-4 space-y-2">
        <router-link 
          to="/" 
          class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
          active-class="bg-blue-600 !text-white"
        >
          <span class="text-xl">📊</span>
          <span class="font-medium">Dashboard</span>
        </router-link>

        <router-link 
          to="/relatorios" 
          class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
          active-class="bg-blue-600 !text-white"
        >
          <span class="text-xl">📋</span>
          <span class="font-medium">Relatórios</span>
        </router-link>
      </nav>

      <div class="p-4 border-t border-slate-800">
        <div class="flex items-center gap-3 px-4 py-3 text-slate-400">
          <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
            GU
          </div>
          <span class="text-sm font-medium text-slate-300">Seu Usuário</span>
        </div>
      </div>
    </aside>

    <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <header class="h-16 bg-white border-b border-slate-200 flex items-center px-8 shrink-0">
        <div class="flex-1">
          <span class="text-slate-500 text-sm">Sistema de Gestão v1.0</span>
        </div>
      </header>

      <div class="flex-1 overflow-y-auto bg-slate-50">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
.router-link-active {
  transition: all 0.2s ease;
}
</style>