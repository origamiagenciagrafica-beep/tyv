import React from 'react';
import { CheckCircle2, AlertTriangle, Clock, Layers, Sparkles } from 'lucide-react';
import classroomBgImg from '../assets/images/sena_aula_ilustracion_pastel_1791304597303.jpg';

interface HeroVisualProps {
  totalRaps: number;
  aprobadosCount: number;
  noAprobadosCount: number;
  pendientesCount: number;
  onOpenEvaluadorModal: () => void;
  onSelectPhase: (phase: string) => void;
}

export const HeroVisual: React.FC<HeroVisualProps> = ({
  totalRaps,
  aprobadosCount,
  noAprobadosCount,
  onOpenEvaluadorModal,
  onSelectPhase,
}) => {
  const completionRate = Math.round((aprobadosCount / totalRaps) * 100);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-stone-200/90 bg-white/80 backdrop-blur-md shadow-sm mb-8">
      {/* Background Graphic Classroom with Soft Pastel Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={classroomBgImg}
          alt="Aula de Ilustración Gráfica SENA"
          className="w-full h-full object-cover object-center opacity-30 filter saturate-90"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-50/95 via-stone-50/85 to-emerald-50/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-50/90 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        {/* Left Column: Educational Context & Mission */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">
            <span>Servicio Nacional de Aprendizaje SENA</span>
            <span aria-hidden="true">·</span>
            <span>Fase 3: Ejecución</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono bg-emerald-100/90 text-emerald-800 px-2 py-0.5 rounded font-bold">
              RAP_EJE_01
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
            Ilustración Vectorial y Composición de Mapa de Bits
          </h1>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
            Evaluador formativo automatizado para calificar con rigor pedagógico el dominio del{' '}
            <strong className="text-slate-900 font-semibold">trazado vectorial (.AI/.SVG)</strong>,{' '}
            <strong className="text-slate-900 font-semibold">fotomontaje no destructivo (.PSD)</strong>,{' '}
            resolución certificada a 300 ppi y gestión cromática CMYK/RGB en el Tecnólogo en Desarrollo de Medios Gráficos Visuales.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenEvaluadorModal}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-600/20 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              <span>Evaluar Entrega Gráfica</span>
            </button>

            <button
              onClick={() => onSelectPhase('rubrica')}
              className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200/80 text-slate-800 border border-stone-300 text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              <span>Rúbrica de 5 Criterios Técnicos</span>
            </button>
          </div>
        </div>

        {/* Right Column: Visual Summary Metric Island (Pastel Boxes) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 lg:w-80 shrink-0">
          <div className="p-4 rounded-xl bg-emerald-50/90 border border-emerald-200/80 shadow-xs">
            <div className="flex items-center justify-between text-xs text-emerald-800 font-medium mb-1">
              <span>Tasa Aprobación</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-950 font-mono">{completionRate}%</div>
            <div className="text-[11px] text-emerald-700 mt-1">
              {aprobadosCount} de {totalRaps} Aprobados
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200/80 shadow-xs">
            <div className="flex items-center justify-between text-xs text-amber-800 font-medium mb-1">
              <span>Plan Mejoramiento</span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-amber-950 font-mono">{noAprobadosCount}</div>
            <div className="text-[11px] text-amber-700 mt-1">Juicio 'D' Requiere Corrección</div>
          </div>

          <div className="p-4 rounded-xl bg-sky-50/90 border border-sky-200/80 shadow-xs">
            <div className="flex items-center justify-between text-xs text-sky-800 font-medium mb-1">
              <span>Horas Asignadas</span>
              <Clock className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-2xl font-black text-sky-950 font-mono">72h</div>
            <div className="text-[11px] text-sky-700 mt-1">Créditos de Ejecución</div>
          </div>

          <div className="p-4 rounded-xl bg-purple-50/90 border border-purple-200/80 shadow-xs">
            <div className="flex items-center justify-between text-xs text-purple-800 font-medium mb-1">
              <span>Ficha Técnica</span>
              <span className="text-purple-700 font-bold text-xs font-mono">SENA</span>
            </div>
            <div className="text-2xl font-black text-purple-950 font-mono">2834591</div>
            <div className="text-[11px] text-purple-700 mt-1">CENIGRAF / Regional D.C.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
