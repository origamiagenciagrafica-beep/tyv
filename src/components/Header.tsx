import React from 'react';
import { Award, Layers, Users, Zap, FileSpreadsheet, Sparkles } from 'lucide-react';
import { MASCOTS_90S } from '../assets/mascots';

interface HeaderProps {
  currentView: 'matriz' | 'evaluador' | 'radar' | 'aprendices' | 'reportes';
  onSelectView: (view: 'matriz' | 'evaluador' | 'radar' | 'aprendices' | 'reportes') => void;
  onOpenEvaluadorModal: () => void;
  aprendizSeleccionadoNombre: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  onOpenEvaluadorModal,
  aprendizSeleccionadoNombre,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-2 border-stone-300 px-4 lg:px-8 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Brand Title (90s retro sticker aesthetic) */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer" onClick={() => onSelectView('matriz')}>
            <div className="w-10 h-10 rounded-2xl bg-amber-200 border-2 border-slate-900 p-0.5 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] group-hover:rotate-6 transition-transform overflow-hidden">
              <img
                src={MASCOTS_90S.designer.src}
                alt="Mascota SENA 90s"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 text-[9px] font-black bg-pink-300 text-slate-900 border border-slate-900 rounded-full px-1">
              '90s
            </span>
          </div>

          <button
            onClick={() => onSelectView('matriz')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <span className="text-base font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors whitespace-nowrap">
                SENA · Ilustración & Mapa de Bits
              </span>
              <span className="hidden sm:inline-block text-[10px] text-emerald-900 bg-emerald-200 border-2 border-slate-900 px-2 py-0.5 rounded-full font-mono font-extrabold shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
                RAP_EJE_01
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
              Tecnólogo en Desarrollo de Medios Gráficos Visuales
            </p>
          </button>
        </div>

        {/* Zone 2: 4-6 Nav Links (Single line) */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          <button
            onClick={() => onSelectView('matriz')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              currentView === 'matriz'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300/80 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>Rúbrica & Criterios</span>
          </button>

          <button
            onClick={() => onSelectView('evaluador')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              currentView === 'evaluador'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300/80 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Evaluador Interactivo</span>
          </button>

          <button
            onClick={() => onSelectView('radar')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              currentView === 'radar'
                ? 'bg-sky-100 text-sky-900 border border-sky-300/80 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-sky-600" />
            <span>Radar de Dominio</span>
          </button>

          <button
            onClick={() => onSelectView('aprendices')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              currentView === 'aprendices'
                ? 'bg-purple-100 text-purple-900 border border-purple-300/80 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-purple-600" />
            <span>Aprendices</span>
          </button>

          <button
            onClick={() => onSelectView('reportes')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              currentView === 'reportes'
                ? 'bg-amber-100 text-amber-900 border border-amber-300/80 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-amber-700" />
            <span>Actas Oficiales</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-2.5">
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-200 text-xs text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="truncate max-w-[130px] font-medium">{aprendizSeleccionadoNombre}</span>
          </div>

          <button
            onClick={onOpenEvaluadorModal}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all rounded-lg shadow-sm shadow-emerald-600/30 whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>Evaluar RAP</span>
          </button>
        </div>
      </div>
    </header>
  );
};
