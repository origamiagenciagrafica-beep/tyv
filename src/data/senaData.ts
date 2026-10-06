export interface CriterioEvaluacion {
  id: string;
  nombre: string;
  descripcion: string;
  peso: number; // Porcentaje relativo (suma 100%)
  categoria: 'tecnica' | 'conceptual' | 'estetica' | 'procedimental';
  esCritico: boolean; // Si este criterio no se cumple, el RAP queda No Aprobado (D)
}

export type JuicioSena = 'A' | 'D' | 'PENDIENTE';

export interface RadarIlustracion {
  trazadoBezier: number;      // Trazado Bézier & Precisión Vectorial
  volumenLuces: number;       // Luces, Sombras & Gradaciones
  composicionRetoque: number; // Fotomontaje, Máscaras & Retoque
  colorGestion: number;       // Gestión Cromática (CMYK/RGB)
  resolucionExport: number;   // Resolución (300/72 PPI) & Salida
  ordenCapas: number;         // Jerarquía de Capas & Empaque
}

export interface RapItem {
  id: string;
  codigo: string;
  fase: 'ejecucion';
  faseTitulo: string;
  competencia: string;
  titulo: string;
  descripcion: string;
  horasEstimadas: number;
  criterios: CriterioEvaluacion[];
  evidenciaTipo: 'Ilustración Vectorial & Fotomontaje';
  entregableSugerido: string;
  ejesRadar: RadarIlustracion;
}

export interface EvaluacionRegistro {
  id: string;
  rapId: string;
  aprendizId: string;
  fecha: string;
  calificador: string;
  juicio: JuicioSena;
  porcentaje: number;
  puntuacionCriterios: Record<string, number>; // criterioId -> valor 0 a 100
  observacionesCriterios: Record<string, string>;
  dictamenGeneral: string;
  fortalezas: string[];
  oportunidadesMejora: string[];
  planMejoramiento?: {
    requerido: boolean;
    acciones: string[];
    fechaConcertacion: string;
    fechaEntrega: string;
    estado: 'Asignado' | 'En Corrección' | 'Superado' | 'No Superado';
  };
  evidenciaAdjunta?: {
    titulo: string;
    tipo: string;
    linkUrl?: string;
    archivoSimulado?: string;
    formato: string;
    resolucionReportada: string;
    espacioColor: string;
    tamanoMb: number;
  };
}

export interface AprendizSena {
  id: string;
  nombre: string;
  documento: string;
  email: string;
  ficha: string;
  avatar: string;
  especialidadInteres: string;
  estadoFicha: 'En Formación' | 'Condicionado' | 'Por Certificar';
  radarCompetencias: RadarIlustracion;
  evaluacionRap: EvaluacionRegistro;
}

/**
 * El ÚNICO y central Resultado de Aprendizaje solicitado:
 * RAP_EJE_01: Ilustración Vectorial y Composición de Mapa de Bits
 */
export const RAP_ILUSTRACION_MAPA_BITS: RapItem = {
  id: 'rap-eje-01',
  codigo: 'RAP_EJE_01',
  fase: 'ejecucion',
  faseTitulo: 'Fase 3: Ejecución',
  competencia: 'Producir piezas y medios gráficos visuales con herramientas digitales según requerimientos técnicos.',
  titulo: 'Ilustración Vectorial y Composición de Mapa de Bits',
  descripcion: 'Crear activos gráficos digitales en formato vectorial (nodos, trazados bézier limpios) y composición avanzada de mapas de bits aplicando máscaras no destructivas, fotomontaje, perfiles cromáticos y resolución técnica estandarizada.',
  horasEstimadas: 72,
  evidenciaTipo: 'Ilustración Vectorial & Fotomontaje',
  entregableSugerido: 'Pieza gráfica compuesta integrada: Ilustración vectorial en formato nativo (.AI / .SVG) + Composición editorial/publicitaria en mapa de bits (.PSD con máscaras) exportada a 300 ppi para offset y 144 ppi para medios digitales.',
  ejesRadar: {
    trazadoBezier: 85,
    volumenLuces: 80,
    composicionRetoque: 85,
    colorGestion: 80,
    resolucionExport: 85,
    ordenCapas: 75,
  },
  criterios: [
    {
      id: 'crit-trazado',
      nombre: 'Calidad del Trazado Vectorial y Curvas Bézier',
      descripcion: 'Nodos mínimos optimizados, tangentes alineadas sin esquinas involuntarias, trazados cerrados y limpieza en las siluetas vectoriales.',
      peso: 25,
      categoria: 'tecnica',
      esCritico: true,
    },
    {
      id: 'crit-luces-volumen',
      nombre: 'Tratamiento de Luces, Sombras y Volumen Tridimensional',
      descripcion: 'Aplicación coherente de claroscuro, gradaciones tonales, sombras proyectadas y sensación de profundidad sin bandas de posterización.',
      peso: 20,
      categoria: 'estetica',
      esCritico: false,
    },
    {
      id: 'crit-fotomontaje',
      nombre: 'Composición de Mapa de Bits y Fotomontaje No Destructivo',
      descripcion: 'Integración natural de elementos rasterizados mediante máscaras de capa, recorte perfecto sin halos de selección y retoque tonal armónico.',
      peso: 20,
      categoria: 'tecnica',
      esCritico: true,
    },
    {
      id: 'crit-resolucion-color',
      nombre: 'Resolución Técnica y Gestión de Color (CMYK / RGB / ICC)',
      descripcion: 'Resolución de 300 ppi para piezas impresas o 72/144 ppi para pantallas, sin reescalados destructivos ni sobrecobertura de tintas superior al 300%.',
      peso: 20,
      categoria: 'tecnica',
      esCritico: true,
    },
    {
      id: 'crit-organizacion-empaque',
      nombre: 'Estructuración de Capas, Nomenclatura y Formatos de Salida',
      descripcion: 'Capas y grupos organizados con nomenclatura profesional, empaque de enlaces y exportación en formatos abiertos estándar (SVG, PNG, TIFF, PDF/X).',
      peso: 15,
      categoria: 'procedimental',
      esCritico: false,
    },
  ],
};

// Export para mantener compatibilidad si algún componente busca el catálogo
export const CATALOGO_RAPS: RapItem[] = [RAP_ILUSTRACION_MAPA_BITS];

export const APRENDICES_INICIALES: AprendizSena[] = [
  {
    id: 'apr-01',
    nombre: 'Valentina Restrepo Gil',
    documento: '1.036.789.412',
    email: 'vrestrepo@soy.sena.edu.co',
    ficha: '2834591',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    especialidadInteres: 'Ilustración Digital & UI',
    estadoFicha: 'En Formación',
    radarCompetencias: {
      trazadoBezier: 94,
      volumenLuces: 90,
      composicionRetoque: 88,
      colorGestion: 92,
      resolucionExport: 95,
      ordenCapas: 90,
    },
    evaluacionRap: {
      id: 'eval-apr-01',
      rapId: 'rap-eje-01',
      aprendizId: 'apr-01',
      fecha: '2026-04-14',
      calificador: 'Instructor Diseñador Gráfico Carlos Mendoza',
      juicio: 'A',
      porcentaje: 92,
      puntuacionCriterios: {
        'crit-trazado': 95,
        'crit-luces-volumen': 90,
        'crit-fotomontaje': 92,
        'crit-resolucion-color': 94,
        'crit-organizacion-empaque': 88,
      },
      observacionesCriterios: {
        'crit-trazado': 'Trazado vectorial impecable. Manejo pulcro de la pluma y número óptimo de nodos bézier.',
        'crit-luces-volumen': 'Excelente uso de gradaciones y luces especulares para generar volumen visual.',
        'crit-fotomontaje': 'Recorte fino con máscaras de capa sin restos ni halos blancos en la integración.',
        'crit-resolucion-color': '300 ppi nativos certificados en perfil Fogra39 para salida a imprenta.',
        'crit-organizacion-empaque': 'Capas agrupadas y rotuladas claramente.',
      },
      dictamenGeneral: 'JUICIO: APROBADO (A). Desempeño sobresaliente (92%). Demuestra dominio riguroso en ilustración vectorial y fotomontaje según las normas técnicas de artes gráficas SENA.',
      fortalezas: [
        'Curvas bézier orgánicas sin picos accidentales',
        'Impecable gestión de color en CMYK con separación de canales',
        'Fotomontaje integrado con iluminación coherente',
      ],
      oportunidadesMejora: [
        'Documentar paleta de muestras globales en el archivo .AI',
      ],
      evidenciaAdjunta: {
        titulo: 'Set de Ilustración Vectorial Editorial y Fotomontaje de Portada',
        tipo: 'Ilustración Vectorial & Mapa de Bits',
        linkUrl: 'https://www.behance.net/gallery/sena-ilustracion-vectorial',
        formato: 'Adobe Illustrator (.ai) + Photoshop (.psd) + SVG',
        resolucionReportada: '300 ppi (CMYK)',
        espacioColor: 'ISO Coated v2 (ECI)',
        tamanoMb: 68.4,
      },
    },
  },
  {
    id: 'apr-02',
    nombre: 'Santiago Morales Pineda',
    documento: '1.020.854.190',
    email: 'smorales@soy.sena.edu.co',
    ficha: '2834591',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    especialidadInteres: 'Modelado 3D & Concept Art',
    estadoFicha: 'En Formación',
    radarCompetencias: {
      trazadoBezier: 82,
      volumenLuces: 88,
      composicionRetoque: 84,
      colorGestion: 80,
      resolucionExport: 85,
      ordenCapas: 82,
    },
    evaluacionRap: {
      id: 'eval-apr-02',
      rapId: 'rap-eje-01',
      aprendizId: 'apr-02',
      fecha: '2026-04-18',
      calificador: 'Instructor Diseñador Gráfico Carlos Mendoza',
      juicio: 'A',
      porcentaje: 84,
      puntuacionCriterios: {
        'crit-trazado': 82,
        'crit-luces-volumen': 88,
        'crit-fotomontaje': 85,
        'crit-resolucion-color': 82,
        'crit-organizacion-empaque': 84,
      },
      observacionesCriterios: {
        'crit-trazado': 'Trazado correcto en piezas isométricas, aunque algunos nodos presentan superposición menor.',
        'crit-luces-volumen': 'Muy buen sentido tridimensional de luces directas y sombras de contacto.',
        'crit-fotomontaje': 'Composición de mapa de bits atractiva con texturas de grano y papel.',
        'crit-resolucion-color': 'Configurado a 300 ppi con espacio sRGB para visualización digital.',
        'crit-organizacion-empaque': 'Estructura de capas jerárquica.',
      },
      dictamenGeneral: 'JUICIO: APROBADO (A). Alcanza el 84% de competencia. Cumple satisfactoriamente con la construcción gráfica y el acabado estético requerido.',
      fortalezas: [
        'Excelente comprensión volumétrica de la perspectiva isométrica',
        'Tratamiento de texturas y sombras bien balanceado',
      ],
      oportunidadesMejora: [
        'Optimizar la cantidad de vértices en curvas cerradas complejas',
      ],
      evidenciaAdjunta: {
        titulo: 'Infografía Isométrica Vectorial con Texturas de Mapa de Bits',
        tipo: 'Ilustración Vectorial & Mapa de Bits',
        linkUrl: 'https://drive.google.com/drive/folders/sena-isometria-morales',
        formato: 'Illustrator (.ai) + SVG + PNG 300 ppi',
        resolucionReportada: '300 ppi',
        espacioColor: 'sRGB IEC61966-2.1',
        tamanoMb: 42.1,
      },
    },
  },
  {
    id: 'apr-03',
    nombre: 'Laura Camila Henao',
    documento: '1.017.933.201',
    email: 'lchenao@soy.sena.edu.co',
    ficha: '2834591',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    especialidadInteres: 'Branding & Ilustración Vectorial',
    estadoFicha: 'En Formación',
    radarCompetencias: {
      trazadoBezier: 98,
      volumenLuces: 92,
      composicionRetoque: 94,
      colorGestion: 96,
      resolucionExport: 96,
      ordenCapas: 95,
    },
    evaluacionRap: {
      id: 'eval-apr-03',
      rapId: 'rap-eje-01',
      aprendizId: 'apr-03',
      fecha: '2026-04-20',
      calificador: 'Instructora Ilustradora Laura Gómez',
      juicio: 'A',
      porcentaje: 95,
      puntuacionCriterios: {
        'crit-trazado': 98,
        'crit-luces-volumen': 92,
        'crit-fotomontaje': 95,
        'crit-resolucion-color': 96,
        'crit-organizacion-empaque': 95,
      },
      observacionesCriterios: {
        'crit-trazado': 'Maestría en el uso de la pluma y bezier handles. Ilustración botánica de calidad internacional.',
        'crit-luces-volumen': 'Degradados de malla (gradient mesh) suaves y naturales.',
        'crit-fotomontaje': 'Fusión hiperrealista entre elementos fotográficos y pintura digital vectorial.',
        'crit-resolucion-color': 'Perfiles de color estandarizados y separación perfecta.',
        'crit-organizacion-empaque': 'Archivo maestro organizado en subcapas con guías y anotaciones.',
      },
      dictamenGeneral: 'JUICIO: APROBADO SOBRESALIENTE (A - 95%). Evidencia ejemplar que supera las expectativas del programa de formación SENA.',
      fortalezas: [
        'Precisión matemática en los puntos de ancla vectoriales',
        'Composición estética de nivel profesional para agencia',
        'Empaque de producción pulcro y ordenado',
      ],
      oportunidadesMejora: [
        'Explorar variaciones tonales en clave baja (low key)',
      ],
      evidenciaAdjunta: {
        titulo: 'Ilustración Botánica Vectorial Compleja y Fotomontaje Publicitario',
        tipo: 'Ilustración Vectorial & Mapa de Bits',
        linkUrl: 'https://www.artstation.com/artwork/sena-laura-henao',
        formato: 'Illustrator (.ai) + Photoshop (.psd) + PDF/X-1a',
        resolucionReportada: '300 ppi (CMYK Fogra39)',
        espacioColor: 'CMYK Fogra39',
        tamanoMb: 94.6,
      },
    },
  },
  {
    id: 'apr-04',
    nombre: 'Mateo Alejandro Benítez',
    documento: '1.045.671.302',
    email: 'mabenitez@soy.sena.edu.co',
    ficha: '2834591',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    especialidadInteres: 'Producción Gráfica & Pre-prensa',
    estadoFicha: 'Condicionado',
    radarCompetencias: {
      trazadoBezier: 54,
      volumenLuces: 58,
      composicionRetoque: 52,
      colorGestion: 55,
      resolucionExport: 50,
      ordenCapas: 65,
    },
    evaluacionRap: {
      id: 'eval-apr-04',
      rapId: 'rap-eje-01',
      aprendizId: 'apr-04',
      fecha: '2026-04-22',
      calificador: 'Instructor Diseñador Gráfico Carlos Mendoza',
      juicio: 'D',
      porcentaje: 56,
      puntuacionCriterios: {
        'crit-trazado': 52,
        'crit-luces-volumen': 58,
        'crit-fotomontaje': 54,
        'crit-resolucion-color': 50,
        'crit-organizacion-empaque': 66,
      },
      observacionesCriterios: {
        'crit-trazado': 'Exceso de nodos descontrolados producidos por calco interactivo automático sin refinamiento manual.',
        'crit-luces-volumen': 'Sombras duras y quemadas que aplanan la ilustración.',
        'crit-fotomontaje': 'Recorte destructivo con borrador (sin máscara de capa), dejando halos evidentes.',
        'crit-resolucion-color': 'El mapa de bits fue escalado a la fuerza desde 72 ppi resultando en pixelación visible.',
        'crit-organizacion-empaque': 'Todas las capas en un solo grupo sin nombrar.',
      },
      dictamenGeneral: 'JUICIO: NO APROBADO (D - 56%). Criterios críticos esenciales no alcanzados. La evidencia presenta deficiencias técnicas de resolución, recorte y trazado que impiden su uso profesional.',
      fortalezas: [
        'Idea conceptual creativa en la elección de la temática',
      ],
      oportunidadesMejora: [
        'Rehacer el trazado manual con pluma bézier eliminando nodos redundantes',
        'Usar máscaras de capa no destructivas en lugar de borrador directo',
        'Trabajar en archivos fuente nativos a 300 ppi reales desde el inicio',
      ],
      planMejoramiento: {
        requerido: true,
        acciones: [
          'Trazar manualmente con la herramienta Pluma un mínimo de 3 elementos botánicos garantizando curvas suaves.',
          'Realizar un fotomontaje integrando 2 elementos usando máscaras de capa y pinceles de borde suave.',
          'Configurar el lienzo de trabajo en 300 ppi con espacio de color CMYK sin escalados artificiales.',
          'Reentregar los archivos fuente .AI y .PSD con capas nombradas y organizadas.',
        ],
        fechaConcertacion: '2026-04-24',
        fechaEntrega: '2026-05-08',
        estado: 'Asignado',
      },
      evidenciaAdjunta: {
        titulo: 'Composición de Afiche Promocional',
        tipo: 'Ilustración Vectorial & Mapa de Bits',
        linkUrl: 'https://drive.google.com/drive/folders/sena-entrega-benitez',
        formato: 'JPG comprimido (Falta archivo nativo editable)',
        resolucionReportada: '72 ppi reescalado',
        espacioColor: 'RGB no calibrado',
        tamanoMb: 8.3,
      },
    },
  },
];
