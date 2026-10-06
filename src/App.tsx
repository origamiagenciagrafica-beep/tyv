import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroVisual } from './components/HeroVisual';
import { MatrizRaps } from './components/MatrizRaps';
import { RadarView } from './components/RadarView';
import { DirectorioAprendices } from './components/DirectorioAprendices';
import { ReportesView } from './components/ReportesView';
import { EvaluadorRapModal } from './components/EvaluadorRapModal';
import { ActaEvaluacionModal } from './components/ActaEvaluacionModal';
import { DetalleRapModal } from './components/DetalleRapModal';
import {
  APRENDICES_INICIALES,
  AprendizSena,
  RAP_ILUSTRACION_MAPA_BITS,
  EvaluacionRegistro,
  RapItem,
} from './data/senaData';
import classroomBgImg from './assets/images/sena_aula_ilustracion_pastel_1791304597303.jpg';

export default function App() {
  const [aprendices, setAprendices] = useState<AprendizSena[]>(APRENDICES_INICIALES);
  const [aprendizSeleccionadoId, setAprendizSeleccionadoId] = useState<string>('apr-01');
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

  const aprendizActual =
    aprendices.find((a) => a.id === aprendizSeleccionadoId) || aprendices[0];

  // Métricas de la cohorte para este RAP específico
  const totalAprendices = aprendices.length;
  let aprobadosCount = 0;
  let noAprobadosCount = 0;

  aprendices.forEach((ap) => {
    if (ap.evaluacionRap.juicio === 'A') aprobadosCount++;
    else if (ap.evaluacionRap.juicio === 'D') noAprobadosCount++;
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

  const handleAbrirEvaluador = (rap?: RapItem, aprendiz?: AprendizSena) => {
    setRapParaEvaluar(RAP_ILUSTRACION_MAPA_BITS);
    if (aprendiz) setAprendizSeleccionadoId(aprendiz.id);
    setIsEvaluadorModalOpen(true);
  };

  const handleAbrirActa = (
    evaluacion: EvaluacionRegistro,
    rap: RapItem,
    aprendiz: AprendizSena
  ) => {
    setActaData({ evaluacion, rap, aprendiz });
    setIsActaModalOpen(true);
  };

  const handleVerDetallesRap = (rap: RapItem) => {
    setRapParaDetalle(rap);
    setIsDetalleRapModalOpen(true);
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
        <div className="absolute inset-0 bg-gradient-to-b from-stone-100/95 via-stone-100/85 to-emerald-50/90"></div>
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
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Hero Visual Section */}
          <HeroVisual
            totalRaps={totalAprendices}
            aprobadosCount={aprobadosCount}
            noAprobadosCount={noAprobadosCount}
            pendientesCount={0}
            onOpenEvaluadorModal={() => handleAbrirEvaluador()}
            onSelectPhase={() => {
              setCurrentView('matriz');
            }}
          />

          {/* View Content Switching */}
          {currentView === 'matriz' && (
            <MatrizRaps
              aprendiz={aprendizActual}
              onEvaluarRap={() => handleAbrirEvaluador(RAP_ILUSTRACION_MAPA_BITS, aprendizActual)}
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
            />
          )}

          {currentView === 'reportes' && (
            <ReportesView
              aprendiz={aprendizActual}
              aprendices={aprendices}
              onAbrirActa={handleAbrirActa}
              onEvaluarRap={() => handleAbrirEvaluador(RAP_ILUSTRACION_MAPA_BITS)}
            />
          )}
        </main>

        {/* Modal Evaluador Automático */}
        {isEvaluadorModalOpen && (
          <EvaluadorRapModal
            isOpen={isEvaluadorModalOpen}
            onClose={() => setIsEvaluadorModalOpen(false)}
            rapInicial={RAP_ILUSTRACION_MAPA_BITS}
            aprendizInicial={aprendizActual}
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

        {/* Footer */}
        <footer className="mt-auto border-t border-stone-200/90 bg-white/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-6 text-xs text-slate-600">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">SENA</span>
              <span aria-hidden="true">·</span>
              <span>RAP_EJE_01: Ilustración Vectorial y Composición de Mapa de Bits</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-emerald-800 font-semibold bg-emerald-100 px-1.5 py-0.2 rounded">
                Ficha 2834591
              </span>
            </div>

            <div className="flex items-center gap-4 text-slate-600">
              <span>Tecnólogo en Desarrollo de Medios Gráficos Visuales</span>
              <span aria-hidden="true">·</span>
              <span>CENIGRAF</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
