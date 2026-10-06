import React from 'react';
import { Award, Layers, Users, Zap, FileSpreadsheet } from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-stone-200/90 px-4 lg:px-8 py-3.5 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Brand Title (One line wordmark) */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-sm shadow-emerald-500/30">
            S
          </div>
          <button
            onClick={() => onSelectView('matriz')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="text-base font-bold tracking-tight text-slate-800 group-hover:text-emerald-700 transition-colors whitespace-nowrap">
              SENA · Ilustración Vectorial & Mapa de Bits
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md font-mono font-semibold">
              RAP_EJE_01
            </span>
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
