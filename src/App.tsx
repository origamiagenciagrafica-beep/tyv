import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroVisual } from './components/HeroVisual';
import { MatrizRaps } from './components/MatrizRaps';
import { RadarView } from './components/RadarView';
import { DirectorioAprendices } from './components/DirectorioAprendices';
import { ReportesView } from './components/ReportesView';
import { EvaluadorRapModal } from './components/EvaluadorRapModal';
import { ActaEvaluacionModal } from './components/ActaEvaluacionModal';
import { DetalleRapModal } from './components/DetalleRapModal';
import { BarraAprendicesEvaluacion } from './components/BarraAprendicesEvaluacion';
import { ModalNuevoAprendiz } from './components/ModalNuevoAprendiz';
import {
  APRENDICES_INICIALES,
  AprendizSena,
  RAP_ILUSTRACION_MAPA_BITS,
  EvaluacionRegistro,
  RapItem,
} from './data/senaData';
import classroomBgImg from './assets/images/sena_aula_ilustracion_pastel_1791304597303.jpg';
import { MASCOTS_90S } from './assets/mascots';

export default function App() {
  const [aprendices, setAprendices] = useState<AprendizSena[]>(() => {
    try {
      const guardado = localStorage.getItem('sena_aprendices_evaluacion_v2');
      if (guardado) {
        const parsed = JSON.parse(guardado);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading saved apprentices:', e);
    }
    return APRENDICES_INICIALES;
  });

  const [aprendizSeleccionadoId, setAprendizSeleccionadoId] = useState<string>(() => {
    return 'apr-blanca-isabel';
  });

  const [currentView, setCurrentView] = useState<
    'matriz' | 'evaluador' | 'radar' | 'aprendices' | 'reportes'
  >('matriz');

  // Modals state
  const [isEvaluadorModalOpen, setIsEvaluadorModalOpen] = useState(false);
  const [rapParaEvaluar, setRapParaEvaluar] = useState<RapItem | undefined>(RAP_ILUSTRACION_MAPA_BITS);

  const [isActaModalOpen, setIsActaModalOpen] = useState(false);
  const [actaData, setActaData] = useState<{
    evaluacion: EvaluacionRegistro;
    rap: RapItem;
    aprendiz: AprendizSena;
  } | null>(null);

  const [isDetalleRapModalOpen, setIsDetalleRapModalOpen] = useState(false);
  const [rapParaDetalle, setRapParaDetalle] = useState<RapItem | null>(null);

  const [isNuevoAprendizModalOpen, setIsNuevoAprendizModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sena_aprendices_evaluacion_v2', JSON.stringify(aprendices));
    } catch (e) {
      console.error('Error saving apprentices to localStorage:', e);
    }
  }, [aprendices]);

  const aprendizActual =
    aprendices.find((a) => a.id === aprendizSeleccionadoId) || aprendices[0];

  // Métricas de la cohorte para este RAP específico
  const totalAprendices = aprendices.length;
  let aprobadosCount = 0;
  let noAprobadosCount = 0;

  aprendices.forEach((ap) => {
    if (ap.evaluacionRap?.juicio === 'A') aprobadosCount++;
    else if (ap.evaluacionRap?.juicio === 'D') noAprobadosCount++;
  });

  const handleGuardarEvaluacion = (nuevaEval: EvaluacionRegistro) => {
    setAprendices((prev) =>
      prev.map((ap) => {
        if (ap.id !== nuevaEval.aprendizId) return ap;

        // Sincroniza el radar de competencias según las puntuaciones de la rúbrica
        const pts = nuevaEval.puntuacionCriterios;
        const nuevoRadar = {
          trazadoBezier: pts['crit-trazado'] ?? ap.radarCompetencias.trazadoBezier,
          volumenLuces: pts['crit-luces-volumen'] ?? ap.radarCompetencias.volumenLuces,
          composicionRetoque: pts['crit-fotomontaje'] ?? ap.radarCompetencias.composicionRetoque,
          colorGestion: pts['crit-resolucion-color'] ?? ap.radarCompetencias.colorGestion,
          resolucionExport: pts['crit-resolucion-color'] ?? ap.radarCompetencias.resolucionExport,
          ordenCapas: pts['crit-organizacion-empaque'] ?? ap.radarCompetencias.ordenCapas,
        };

        return {
          ...ap,
          evaluacionRap: nuevaEval,
          radarCompetencias: nuevoRadar,
        };
      })
    );
  };

  const [aprendizParaEvaluar, setAprendizParaEvaluar] = useState<AprendizSena | null>(null);

  const handleAbrirEvaluador = (rap?: RapItem, aprendiz?: AprendizSena) => {
    setRapParaEvaluar(RAP_ILUSTRACION_MAPA_BITS);
    const target = aprendiz || aprendizActual;
    setAprendizParaEvaluar(target);
    setAprendizSeleccionadoId(target.id);
    setIsEvaluadorModalOpen(true);
  };

  const handleVerRadarAprendiz = (ap: AprendizSena) => {
    setAprendizSeleccionadoId(ap.id);
    setCurrentView('radar');
  };

  const handleQuickCalificar = (aprendizId: string, juicio: 'A' | 'D') => {
    setAprendices((prev) =>
      prev.map((ap) => {
        if (ap.id !== aprendizId) return ap;
        const isA = juicio === 'A';
        const pct = isA ? 88 : 58;
        const pts = {
          'crit-trazado': isA ? 90 : 55,
          'crit-luces-volumen': isA ? 85 : 60,
          'crit-fotomontaje': isA ? 88 : 55,
          'crit-resolucion-color': isA ? 92 : 58,
          'crit-organizacion-empaque': isA ? 85 : 62,
        };

        const nuevaEval: EvaluacionRegistro = {
          id: `eval-${Date.now()}-${ap.id}`,
          rapId: RAP_ILUSTRACION_MAPA_BITS.id,
          aprendizId: ap.id,
          fecha: new Date().toISOString().split('T')[0],
          calificador: 'Instructor Diseñador Gráfico SENA - Ficha 2834591',
          juicio,
          porcentaje: pct,
          puntuacionCriterios: pts,
          observacionesCriterios: {
            'crit-trazado': isA
              ? 'Trazado bézier limpio y optimizado con nodos mínimos.'
              : 'Nodos excesivos y curvas quebradas. Requiere pulido.',
            'crit-luces-volumen': isA
              ? 'Volumen y claroscuro bien modelados.'
              : 'Falta modelado de claroscuro y contraste tonal.',
            'crit-fotomontaje': isA
              ? 'Máscaras no destructivas integradas adecuadamente.'
              : 'Recortes duros con halos de selección.',
            'crit-resolucion-color': isA
              ? 'Resolución certificada 300 ppi en CMYK Fogra39.'
              : 'Resolución insuficiente para imprenta (<300 ppi).',
            'crit-organizacion-empaque': isA
              ? 'Capas nombradas y archivos empaquetados profesionalmente.'
              : 'Capas sin nomenclatura estándar y enlaces rotos.',
          },
          dictamenGeneral: isA
            ? `JUICIO: APROBADO (A). El aprendiz ${ap.nombre} alcanza el 88% de competencia técnica en el RAP_EJE_01 ("Ilustración Vectorial y Composición de Mapa de Bits"). Cumple satisfactoriamente con la totalidad de los criterios SENA.`
            : `JUICIO: NO APROBADO (D). El aprendiz ${ap.nombre} obtiene 58%. No se cumplen los estándares mínimos requeridos. Se activa de forma inmediata el Plan de Mejoramiento Formativo.`,
          fortalezas: isA
            ? ['Excelente manejo de pluma y curvas bézier', 'Resolución nativa a 300 ppi', 'Jerarquía de capas ordenada']
            : ['Entrega oportuna de los archivos en plataforma institucional'],
          oportunidadesMejora: isA
            ? ['Continuar con el mismo rigor técnico para la Fase 4 del proyecto']
            : ['Rehacer trazados bézier con nodos mínimos', 'Calibrar máscaras de capa sin halos destructivos'],
          planMejoramiento: !isA
            ? {
                requerido: true,
                acciones: [
                  'Subsanar trazados bézier ajustando puntos de ancla en Adobe Illustrator (.AI)',
                  'Garantizar resolución nativa de 300 ppi en espacio CMYK Fogra39 para salida gráfica',
                  'Organizar capas y subcapas con nomenclatura técnica normalizada',
                ],
                fechaConcertacion: new Date().toISOString().split('T')[0],
                fechaEntrega: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
                estado: 'Asignado',
              }
            : undefined,
          evidenciaAdjunta: ap.evaluacionRap?.evidenciaAdjunta || {
            titulo: 'Pieza Gráfica Vectorial & Bitmap',
            tipo: 'Ilustración Vectorial & Fotomontaje',
            linkUrl: 'https://www.behance.net/gallery/sena-ilustracion-vectorial',
            formato: '.AI + .PSD + .SVG',
            resolucionReportada: isA ? '300 ppi' : '150 ppi',
            espacioColor: isA ? 'CMYK Fogra39' : 'RGB',
            tamanoMb: 45.2,
          },
        };

        return {
          ...ap,
          evaluacionRap: nuevaEval,
          radarCompetencias: {
            trazadoBezier: pts['crit-trazado'],
            volumenLuces: pts['crit-luces-volumen'],
            composicionRetoque: pts['crit-fotomontaje'],
            colorGestion: pts['crit-resolucion-color'],
            resolucionExport: pts['crit-resolucion-color'],
            ordenCapas: pts['crit-organizacion-empaque'],
          },
        };
      })
    );
  };

  const handleAbrirActa = (
    evaluacion: EvaluacionRegistro,
    rap: RapItem,
    aprendiz: AprendizSena
  ) => {
    setActaData({ evaluacion, rap, aprendiz });
    setIsActaModalOpen(true);
  };

  const handleAbrirActaDirecta = (aprendiz: AprendizSena) => {
    if (aprendiz.evaluacionRap) {
      setActaData({
        evaluacion: aprendiz.evaluacionRap,
        rap: RAP_ILUSTRACION_MAPA_BITS,
        aprendiz,
      });
      setIsActaModalOpen(true);
    }
  };

  const handleVerDetallesRap = (rap: RapItem) => {
    setRapParaDetalle(rap);
    setIsDetalleRapModalOpen(true);
  };

  const handleAgregarAprendiz = (nuevo: AprendizSena) => {
    setAprendices((prev) => [nuevo, ...prev]);
    setAprendizSeleccionadoId(nuevo.id);
  };

  return (
    <div className="relative min-h-screen text-slate-800 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* Fixed Background Image of the SENA Illustration Classroom with Soft Pastel Scrim */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={classroomBgImg}
          alt="Aula de Ilustración Gráfica SENA"
          className="w-full h-full object-cover object-center opacity-30 filter saturate-90 blur-[1px] scale-102"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-100/95 via-stone-100/85 to-emerald-50/90" />
      </div>

      {/* Main App Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* 3-Zone Header Contract */}
        <Header
          currentView={currentView}
          onSelectView={(v) => {
            if (v === 'evaluador') {
              handleAbrirEvaluador();
            } else {
              setCurrentView(v);
            }
          }}
          onOpenEvaluadorModal={() => handleAbrirEvaluador()}
          aprendizSeleccionadoNombre={aprendizActual.nombre}
        />

        {/* Main Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
          {/* Hero Visual Section */}
          <HeroVisual
            totalRaps={totalAprendices}
            aprobadosCount={aprobadosCount}
            noAprobadosCount={noAprobadosCount}
            pendientesCount={0}
            onOpenEvaluadorModal={() => handleAbrirEvaluador()}
            onSelectPhase={(phase) => {
              if (phase === 'aprobados' || phase === 'mejora') {
                setCurrentView('aprendices');
              } else if (phase === 'radar') {
                setCurrentView('radar');
              } else if (phase === 'reportes') {
                setCurrentView('reportes');
              } else {
                setCurrentView('matriz');
              }
            }}
          />

          {/* DEDICATED APPRENTICE EVALUATION BUTTONS BAR (Un botón para cada uno - 100% ACTIVO) */}
          <BarraAprendicesEvaluacion
            aprendices={aprendices}
            aprendizSeleccionadoId={aprendizSeleccionadoId}
            onSelectAprendiz={(ap) => setAprendizSeleccionadoId(ap.id)}
            onEvaluarRapAprendiz={(ap) => handleAbrirEvaluador(RAP_ILUSTRACION_MAPA_BITS, ap)}
            onAbrirActa={handleAbrirActaDirecta}
            onAbrirModalNuevoAprendiz={() => setIsNuevoAprendizModalOpen(true)}
            onQuickCalificar={handleQuickCalificar}
            onVerRadarAprendiz={handleVerRadarAprendiz}
          />

          {/* View Content Switching */}
          {currentView === 'matriz' && (
            <MatrizRaps
              aprendiz={aprendizActual}
              aprendices={aprendices}
              onSelectAprendiz={(ap) => setAprendizSeleccionadoId(ap.id)}
              onEvaluarRap={() => handleAbrirEvaluador(RAP_ILUSTRACION_MAPA_BITS, aprendizActual)}
              onEvaluarRapAprendiz={(ap) => handleAbrirEvaluador(RAP_ILUSTRACION_MAPA_BITS, ap)}
              onVerDetallesRap={() => handleVerDetallesRap(RAP_ILUSTRACION_MAPA_BITS)}
            />
          )}

          {currentView === 'radar' && (
            <RadarView
              aprendiz={aprendizActual}
              aprendices={aprendices}
              onSelectAprendiz={(ap) => setAprendizSeleccionadoId(ap.id)}
              onEvaluarRap={() => handleAbrirEvaluador()}
            />
          )}

          {currentView === 'aprendices' && (
            <DirectorioAprendices
              aprendices={aprendices}
              aprendizSeleccionadoId={aprendizSeleccionadoId}
              onSelectAprendiz={(ap) => setAprendizSeleccionadoId(ap.id)}
              onEvaluarRapAprendiz={(ap) => handleAbrirEvaluador(RAP_ILUSTRACION_MAPA_BITS, ap)}
              onAbrirActa={handleAbrirActaDirecta}
              onAbrirModalNuevoAprendiz={() => setIsNuevoAprendizModalOpen(true)}
              onQuickCalificar={handleQuickCalificar}
              onVerRadarAprendiz={handleVerRadarAprendiz}
            />
          )}

          {currentView === 'reportes' && (
            <ReportesView
              aprendiz={aprendizActual}
              aprendices={aprendices}
              onAbrirActa={handleAbrirActa}
              onEvaluarRap={(rap, ap) => handleAbrirEvaluador(rap, ap)}
            />
          )}
        </main>

        {/* Modal Evaluador Automático con Re-render Dinámico por Aprendiz */}
        {isEvaluadorModalOpen && (
          <EvaluadorRapModal
            key={`${aprendizParaEvaluar?.id || aprendizActual.id}-${isEvaluadorModalOpen ? 'open' : 'closed'}`}
            isOpen={isEvaluadorModalOpen}
            onClose={() => setIsEvaluadorModalOpen(false)}
            rapInicial={RAP_ILUSTRACION_MAPA_BITS}
            aprendizInicial={aprendizParaEvaluar || aprendizActual}
            aprendices={aprendices}
            onGuardarEvaluacion={handleGuardarEvaluacion}
            onAbrirActa={handleAbrirActa}
          />
        )}

        {/* Modal Acta Oficial de Juicio Evaluativo */}
        {isActaModalOpen && actaData && (
          <ActaEvaluacionModal
            isOpen={isActaModalOpen}
            onClose={() => setIsActaModalOpen(false)}
            evaluacion={actaData.evaluacion}
            rap={actaData.rap}
            aprendiz={actaData.aprendiz}
          />
        )}

        {/* Modal Detalle RAP */}
        {isDetalleRapModalOpen && rapParaDetalle && (
          <DetalleRapModal
            isOpen={isDetalleRapModalOpen}
            onClose={() => setIsDetalleRapModalOpen(false)}
            rap={rapParaDetalle}
            onEvaluarRap={(rap) => handleAbrirEvaluador(rap)}
          />
        )}

        {/* Modal Registrar Nuevo Aprendiz */}
        <ModalNuevoAprendiz
          isOpen={isNuevoAprendizModalOpen}
          onClose={() => setIsNuevoAprendizModalOpen(false)}
          onAgregarAprendiz={handleAgregarAprendiz}
        />

        {/* Floating 90s Cartoon Quick Helper Button */}
        <div className="fixed bottom-5 right-5 z-40 group">
          <button
            onClick={() => handleAbrirEvaluador()}
            className="flex items-center gap-2.5 p-2 pr-4 bg-yellow-300 hover:bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-full border-3 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:scale-95 transition-all cursor-pointer"
            title="Abrir Evaluador Automático con Rúbrica e IA"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-slate-900 bg-white">
              <img
                src={MASCOTS_90S.approved.src}
                alt="Mascota 90s Flotante"
                className="w-full h-full object-cover"
              />
            </div>
            <span>⚡ Evaluar Aprendiz</span>
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-auto border-t border-stone-200/90 bg-white/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-6 text-xs text-slate-600">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-yellow-200 border border-slate-900 overflow-hidden shrink-0">
                <img
                  src={MASCOTS_90S.pixelBrush.src}
                  alt="Pixel & Brush"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-semibold text-slate-800">
                SENA · Regional Distrito Capital · Centro de Tecnologías para las Artes Visuales CENIGRAF
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="bg-yellow-200 text-slate-950 px-2 py-0.5 rounded-full border border-slate-900 font-black">
                Edición '90s Cartoon
              </span>
              <span>Ficha: 2834591</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 font-bold">RAP_EJE_01 Vigente</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
