import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'

interface TourStep {
  targetId: string
  title: string
  description: string
}

export function useDashboardTour(metrics: any) {
  const currentStep = ref<number>(-1)
  const popoverPosition = ref({ top: '0px', left: '0px', transform: 'none' })

  const isActive = computed(() => currentStep.value >= 0)

  const steps = computed<TourStep[]>(() => {
    const baseSteps = [
      { targetId: 'step-header', title: 'Bem-vindo!', description: 'Este é o resumo geral do seu dashboard.' }
    ]

    const cardSteps = metrics.value.map((m: any, i: number) => ({
      targetId: `step-card-${i}`,
      title: m.title,
      description: `Acompanhe aqui os detalhes de ${m.title.toLowerCase()} em tempo real.`
    }))

    const finalSteps = [
      { targetId: 'step-chart', title: 'Análise Gráfica', description: 'Veja tendências e históricos nesta seção visual.' }
    ]

    return [...baseSteps, ...cardSteps, ...finalSteps]
  })

  const currentStepData = computed(() => steps.value[currentStep.value] || null)

  const updatePopoverPosition = async () => {
    if (currentStep.value === -1) return

    await nextTick()
    const target = document.getElementById(steps.value[currentStep.value].targetId)

    if (target) {
      const rect = target.getBoundingClientRect()
      const isMobile = window.innerWidth < 768

      popoverPosition.value = {
        top: `${rect.bottom + window.scrollY + 20}px`,
        left: isMobile ? '50%' : `${rect.left}px`,
        transform: isMobile ? 'translateX(-50%)' : 'none'
      }
    }
  }

  const startTour = () => {
    currentStep.value = 0
    updatePopoverPosition()
  }
  
  const stopTour = () => (currentStep.value = -1)

  const nextStep = () => {
    if (currentStep.value < steps.value.length - 1) {
      currentStep.value++
      updatePopoverPosition()
    } else {
      stopTour()
    }
  }

  const prevStep = () => {
    if (currentStep.value > 0) {
      currentStep.value--
      updatePopoverPosition()
    }
  }

  onMounted(() => {
    window.addEventListener('resize', updatePopoverPosition)
    window.addEventListener('scroll', updatePopoverPosition)
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', updatePopoverPosition)
    window.removeEventListener('scroll', updatePopoverPosition)
  })

  return {
    currentStep,
    isActive,
    steps,
    currentStepData,
    popoverPosition,
    startTour,
    stopTour,
    nextStep,
    prevStep
  }
}