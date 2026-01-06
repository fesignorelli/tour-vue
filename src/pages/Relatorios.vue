<template>
  <div class="p-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-slate-800">Relatórios de Vendas</h1>
      <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
        Exportar PDF
      </button>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead class="bg-slate-50 border-b border-slate-200">
          <tr>
            <th class="px-6 py-4 text-sm font-semibold text-slate-600">ID</th>
            <th class="px-6 py-4 text-sm font-semibold text-slate-600">Cliente</th>
            <th class="px-6 py-4 text-sm font-semibold text-slate-600">Data</th>
            <th class="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
            <th class="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Valor</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="item in reports" :key="item.id" class="hover:bg-slate-50 transition-colors">
            <td class="px-6 py-4 text-sm text-slate-500">#{{ item.id }}</td>
            <td class="px-6 py-4 text-sm font-medium text-slate-800">{{ item.client }}</td>
            <td class="px-6 py-4 text-sm text-slate-500">{{ item.date }}</td>
            <td class="px-6 py-4 text-sm">
              <span :class="statusClasses(item.status)">
                {{ item.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-right font-semibold text-slate-700">
              {{ item.amount }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Report {
  id: number;
  client: string;
  date: string;
  status: 'Concluído' | 'Pendente' | 'Cancelado';
  amount: string;
}

const reports = ref<Report[]>([
  { id: 1024, client: 'Empresa Alfa', date: '2023-11-01', status: 'Concluído', amount: 'R$ 1.200,00' },
  { id: 1025, client: 'Mercado Central', date: '2023-11-02', status: 'Pendente', amount: 'R$ 450,00' },
  { id: 1026, client: 'Tech Solutions', date: '2023-11-02', status: 'Concluído', amount: 'R$ 3.800,00' },
  { id: 1027, client: 'Padaria Real', date: '2023-11-03', status: 'Cancelado', amount: 'R$ 120,00' },
]);

const statusClasses = (status: string) => {
  const base = 'px-2 py-1 rounded-full text-xs font-bold ';
  if (status === 'Concluído') return base + 'bg-emerald-100 text-emerald-700';
  if (status === 'Pendente') return base + 'bg-amber-100 text-amber-700';
  return base + 'bg-rose-100 text-rose-700';
};
</script>