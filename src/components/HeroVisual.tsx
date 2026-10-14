import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, Clock, Layers, Sparkles, Wand2, Eye } from 'lucide-react';
import { MASCOTS_90S } from '../assets/mascots';

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

  // Permite interactuar con la pandilla de mascotas cartoon de los 90s
  const [mascotaActivaKey, setMascotaActivaKey] = useState<
    'designer' | 'bezierPen' | 'pixelBrush' | 'approved'
  >('designer');

  const mascotaActual = MASCOTS_90S[mascotaActivaKey];

  return (
    <div className="relative overflow-hidden rounded-3xl border-4 border-slate-900 bg-white/90 backdrop-blur-md shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] mb-8">
      {/* Background Graphic Classroom with Soft Pastel Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={MASCOTS_90S.classroomBg.src}
          alt={MASCOTS_90S.classroomBg.alt}
          className="w-full h-full object-cover object-center opacity-25 filter saturate-90"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-50/95 via-stone-50/85 to-emerald-50/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-50/90 via-transparent to-transparent"></div>
      </div>

      {/* Decorative 90s cartoon style floating pastel confetti & doodle elements */}
      <div className="absolute top-3 right-32 text-2xl select-none opacity-80 animate-bounce pointer-events-none">
        🎨
      </div>
      <div className="absolute bottom-4 left-6 text-2xl select-none opacity-80 pointer-events-none">
        ⭐
      </div>
      <div className="absolute top-12 left-1/2 text-xl select-none opacity-50 pointer-events-none rotate-12">
        ✏️
      </div>

      <div className="relative z-10 p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        {/* Left Column: Educational Context, Mission & 90s Cartoon Mascot Lockup */}
        <div className="flex-1 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-950 mb-2">
            <span className="bg-emerald-200 text-emerald-950 px-2.5 py-0.5 rounded-full border-2 border-slate-900 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
              SENA · Tecnólogo
            </span>
            <span aria-hidden="true">·</span>
            <span className="bg-amber-200 text-amber-950 px-2.5 py-0.5 rounded-full border-2 border-slate-900 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
              Fase 3: Ejecución
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono bg-purple-200 text-purple-950 border-2 border-slate-900 px-2.5 py-0.5 rounded-full font-black shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
              RAP_EJE_01
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-3">
            Ilustración Vectorial y Composición de Mapa de Bits
          </h1>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-5">
            Evaluador formativo automatizado con rigor pedagógico SENA y todo el estilo de los{' '}
            <strong className="text-slate-900 font-extrabold underline decoration-pink-400 decoration-2">
              dibujos animados de los años 90
            </strong>
            . Evalúa trazado bézier (.AI/.SVG), fotomontaje no destructivo (.PSD) y resolución certificada a 300 ppi.
          </p>

          {/* Interactive Mascot Selector Pills for 90s Fun */}
          <div className="mb-5 flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-600 mr-1">
              Personajes '90s:
            </span>
            <button
              onClick={() => setMascotaActivaKey('designer')}
              className={`px-2.5 py-1 rounded-xl text-xs font-black border-2 border-slate-900 transition-all cursor-pointer ${
                mascotaActivaKey === 'designer'
                  ? 'bg-yellow-300 text-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] scale-105'
                  : 'bg-white/80 text-slate-700 hover:bg-yellow-100'
              }`}
            >
              👩‍🎨 Vectora
            </button>
            <button
              onClick={() => setMascotaActivaKey('bezierPen')}
              className={`px-2.5 py-1 rounded-xl text-xs font-black border-2 border-slate-900 transition-all cursor-pointer ${
                mascotaActivaKey === 'bezierPen'
                  ? 'bg-emerald-300 text-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] scale-105'
                  : 'bg-white/80 text-slate-700 hover:bg-emerald-100'
              }`}
            >
              ✒️ Pen-Tooly
            </button>
            <button
              onClick={() => setMascotaActivaKey('pixelBrush')}
              className={`px-2.5 py-1 rounded-xl text-xs font-black border-2 border-slate-900 transition-all cursor-pointer ${
                mascotaActivaKey === 'pixelBrush'
                  ? 'bg-sky-300 text-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] scale-105'
                  : 'bg-white/80 text-slate-700 hover:bg-sky-100'
              }`}
            >
              🖌️ Pixel & Brush
            </button>
            <button
              onClick={() => setMascotaActivaKey('approved')}
              className={`px-2.5 py-1 rounded-xl text-xs font-black border-2 border-slate-900 transition-all cursor-pointer ${
                mascotaActivaKey === 'approved'
                  ? 'bg-pink-300 text-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] scale-105'
                  : 'bg-white/80 text-slate-700 hover:bg-pink-100'
              }`}
            >
              🎉 ¡Aprobado!
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenEvaluadorModal}
              className="px-5 py-2.5 rounded-2xl bg-emerald-400 hover:bg-emerald-500 active:scale-95 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] flex items-center gap-2 cursor-pointer border-2 border-slate-900"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>Evaluar Entrega Gráfica</span>
            </button>

            <button
              onClick={() => onSelectPhase('rubrica')}
              className="px-4 py-2.5 rounded-2xl bg-amber-200 hover:bg-amber-300 text-slate-950 border-2 border-slate-900 text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]"
            >
              <Layers className="w-3.5 h-3.5 text-slate-950" />
              <span>Rúbrica de 5 Criterios</span>
            </button>
          </div>
        </div>

        {/* Mascot Center Stage: 90s Retro Cartoon Character with comic effects */}
        <div className="flex items-center justify-center lg:justify-end gap-6 shrink-0">
          <div className="relative group">
            {/* 90s retro sticker frame with playful tilt */}
            <div className="relative w-40 sm:w-48 h-40 sm:h-48 rounded-3xl bg-white p-2 border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] -rotate-2 group-hover:rotate-0 transition-all duration-300">
              <img
                src={mascotaActual.src}
                alt={mascotaActual.name}
                className="w-full h-full object-cover rounded-2xl"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -top-3 -right-3 bg-yellow-300 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-full border-2 border-slate-900 uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] animate-pulse">
                {mascotaActual.tag}
              </span>
            </div>

            {/* Retro 90s comic speech bubble */}
            <div className="absolute -bottom-5 -left-6 sm:-left-10 bg-purple-100 text-purple-950 font-extrabold text-[11px] px-3.5 py-1.5 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] whitespace-nowrap hidden sm:flex items-center gap-1.5 rotate-2">
              <Wand2 className="w-3 h-3 text-purple-700" />
              <span>{mascotaActual.dialogue}</span>
            </div>
          </div>

          {/* Right Column: Visual Summary Metric Island (Interactive 90s Pastel Pill Action Buttons) */}
          <div className="grid grid-cols-2 gap-2.5 w-48 shrink-0">
            <button
              onClick={() => onSelectPhase('aprobados')}
              className="p-3 rounded-2xl bg-emerald-100 hover:bg-emerald-200 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:scale-95 transition-all text-left cursor-pointer group"
              title="Filtrar cohorte de aprendices aprobados (A)"
            >
              <div className="flex items-center justify-between text-[11px] text-emerald-950 font-black mb-0.5">
                <span>Aprobados</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-xl font-black text-emerald-950 font-mono">{completionRate}%</div>
              <div className="text-[10px] text-emerald-800 font-bold">
                {aprobadosCount}/{totalRaps} Aprendices
              </div>
            </button>

            <button
              onClick={() => onSelectPhase('mejora')}
              className="p-3 rounded-2xl bg-amber-100 hover:bg-amber-200 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:scale-95 transition-all text-left cursor-pointer group"
              title="Filtrar aprendices con plan de mejoramiento (D)"
            >
              <div className="flex items-center justify-between text-[11px] text-amber-950 font-black mb-0.5">
                <span>Mejora</span>
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-xl font-black text-amber-950 font-mono">{noAprobadosCount}</div>
              <div className="text-[10px] text-amber-800 font-bold">Juicio 'D'</div>
            </button>

            <button
              onClick={() => onSelectPhase('radar')}
              className="p-3 rounded-2xl bg-sky-100 hover:bg-sky-200 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:scale-95 transition-all text-left cursor-pointer group"
              title="Ver radar curricular y competencias"
            >
              <div className="flex items-center justify-between text-[11px] text-sky-950 font-black mb-0.5">
                <span>Horas</span>
                <Clock className="w-3.5 h-3.5 text-sky-700 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-xl font-black text-sky-950 font-mono">72h</div>
              <div className="text-[10px] text-sky-800 font-bold">Ver Radar</div>
            </button>

            <button
              onClick={() => onSelectPhase('reportes')}
              className="p-3 rounded-2xl bg-rose-100 hover:bg-rose-200 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:scale-95 transition-all text-left cursor-pointer group"
              title="Ver actas de la Ficha 2834591"
            >
              <div className="flex items-center justify-between text-[11px] text-rose-950 font-black mb-0.5">
                <span>Ficha</span>
                <span className="text-[10px] font-black text-rose-900">SENA</span>
              </div>
              <div className="text-sm font-black text-rose-950 font-mono">2834591</div>
              <div className="text-[10px] text-rose-800 font-bold">Ver Actas</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
