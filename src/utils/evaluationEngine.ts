import { CriterioEvaluacion, EvaluacionRegistro, JuicioSena, RapItem } from '../data/senaData';

export interface EvaluacionResultadoCalculado {
  juicio: JuicioSena;
  porcentaje: number;
  nivelDesempeno: 'Excelente' | 'Sobresaliente' | 'Aceptable' | 'Deficiente';
  cumpleCriteriosCriticos: boolean;
  criteriosEvaluados: {
    id: string;
    nombre: string;
    peso: number;
    puntaje: number;
    esCritico: boolean;
    cumplimiento: 'Cumple' | 'Parcial' | 'No Cumple';
    observacion: string;
  }[];
  fortalezas: string[];
  oportunidadesMejora: string[];
  dictamenGeneral: string;
  planMejoramientoSugerido?: {
    requerido: boolean;
    acciones: string[];
    fechaLimiteRecomendada: string;
  };
}

/**
 * Motor de evaluación ponderada automática con normas SENA:
 * - Aprobado (A): Puntaje global >= 70% Y todos los criterios críticos >= 60%
 * - No Aprobado (D): Puntaje global < 70% O algún criterio crítico no alcanzado
 */
export function calcularEvaluacionAutomatica(
  rap: RapItem,
  puntuaciones: Record<string, number>,
  observacionesPersonalizadas: Record<string, string> = {},
  aprendizNombre: string = 'Aprendiz'
): EvaluacionResultadoCalculado {
  let acumuladoPonderado = 0;
  let sumaPesos = 0;
  let cumpleCriticos = true;

  const criteriosEvaluados = rap.criterios.map((c) => {
    const puntaje = Math.max(0, Math.min(100, puntuaciones[c.id] ?? 70));
    acumuladoPonderado += puntaje * (c.peso / 100);
    sumaPesos += c.peso;

    let cumplimiento: 'Cumple' | 'Parcial' | 'No Cumple' = 'Cumple';
    if (puntaje < 60) {
      cumplimiento = 'No Cumple';
      if (c.esCritico) cumpleCriticos = false;
    } else if (puntaje < 75) {
      cumplimiento = 'Parcial';
    }

    // Observación automática basada en nivel
    let observacion = observacionesPersonalizadas[c.id];
    if (!observacion) {
      if (puntaje >= 90) {
        observacion = `Desempeño destacado en ${c.nombre}. Evidencia rigurosidad y calidad profesional.`;
      } else if (puntaje >= 75) {
        observacion = `Cumple satisfactoriamente con los requerimientos técnicos y conceptuales de ${c.nombre}.`;
      } else if (puntaje >= 60) {
        observacion = `Nivel básico aceptable en ${c.nombre}, pero con aspectos de pulimiento requeridos.`;
      } else {
        observacion = `No alcanza el estándar mínimo de desempeño en ${c.nombre}. Se requiere corrección técnica obligatoria.`;
      }
    }

    return {
      id: c.id,
      nombre: c.nombre,
      peso: c.peso,
      puntaje,
      esCritico: c.esCritico,
      cumplimiento,
      observacion,
    };
  });

  const porcentaje = Math.round(acumuladoPonderado);

  // Determinación estricta de Juicio de Evaluación SENA (A / D)
  let juicio: JuicioSena = 'D';
  let nivelDesempeno: 'Excelente' | 'Sobresaliente' | 'Aceptable' | 'Deficiente' = 'Deficiente';

  if (porcentaje >= 70 && cumpleCriticos) {
    juicio = 'A';
    if (porcentaje >= 90) nivelDesempeno = 'Excelente';
    else if (porcentaje >= 80) nivelDesempeno = 'Sobresaliente';
    else nivelDesempeno = 'Aceptable';
  } else {
    juicio = 'D';
    nivelDesempeno = 'Deficiente';
  }

  // Identificación de fortalezas y oportunidades
  const fortalezas: string[] = [];
  const oportunidadesMejora: string[] = [];

  criteriosEvaluados.forEach((c) => {
    if (c.puntaje >= 85) {
      fortalezas.push(`Dominio solvente de ${c.nombre} (${c.puntaje}%).`);
    } else if (c.puntaje < 70) {
      oportunidadesMejora.push(`Reforzar y corregir parámetros en ${c.nombre} (${c.puntaje}%).`);
    }
  });

  if (fortalezas.length === 0) {
    fortalezas.push('Cumplimiento en la entrega oportuna de la evidencia.');
  }
  if (oportunidadesMejora.length === 0) {
    oportunidadesMejora.push('Continuar manteniendo la consistencia visual en las entregas de la siguiente fase.');
  }

  // Dictamen pedagógico general
  let dictamenGeneral = '';
  if (juicio === 'A') {
    dictamenGeneral = `JUICIO: APROBADO (A). El aprendiz ${aprendizNombre} alcanza el ${porcentaje}% de competencia integral en el ${rap.codigo} ("${rap.titulo}"). Las evidencias presentadas demuestran suficiencia técnica en medios gráficos visuales acorde con las directrices formativas del SENA.`;
  } else {
    dictamenGeneral = `JUICIO: NO APROBADO (D). El aprendiz ${aprendizNombre} obtiene ${porcentaje}% de competencia. ${
      !cumpleCriticos
        ? 'No se alcanzan los estándares esenciales en uno o más criterios críticos determinantes.'
        : 'El puntaje global es inferior al umbral mínimo del 70% requerido por el SENA.'
    } Se activa de forma inmediata el Plan de Mejoramiento Formativo.`;
  }

  // Plan de Mejoramiento Formativo (si D)
  let planMejoramientoSugerido = undefined;
  if (juicio === 'D') {
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() + 14); // 2 semanas estándar SENA

    const acciones = criteriosEvaluados
      .filter((c) => c.puntaje < 70)
      .map((c) => `Corregir y reentregar la evidencia subsanando las observaciones técnicas de: ${c.nombre}.`);

    if (acciones.length === 0) {
      acciones.push('Revisar y complementar el soporte técnico de la evidencia entregada según el formato SENA.');
    }

    planMejoramientoSugerido = {
      requerido: true,
      acciones,
      fechaLimiteRecomendada: fechaLimite.toISOString().split('T')[0],
    };
  }

  return {
    juicio,
    porcentaje,
    nivelDesempeno,
    cumpleCriteriosCriticos: cumpleCriticos,
    criteriosEvaluados,
    fortalezas,
    oportunidadesMejora,
    dictamenGeneral,
    planMejoramientoSugerido,
  };
}

/**
 * Llamada al evaluador con IA (servidor Node/Express con Gemini 3.8 Flash)
 */
export async function evaluarConGeminiServidor(params: {
  rapTitle: string;
  phase: string;
  criteria: CriterioEvaluacion[];
  evidenceDetails: {
    titulo: string;
    descripcion: string;
    enlaceSoporte?: string;
    especificacionesTecnicas?: string;
  };
  apprenticeName: string;
}): Promise<any> {
  const response = await fetch('/api/evaluate-ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error(`Error en servidor de evaluación: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
