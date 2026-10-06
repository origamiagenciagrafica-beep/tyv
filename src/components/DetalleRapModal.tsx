import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { RapItem } from '../data/senaData';

interface DetalleRapModalProps {
  isOpen: boolean;
  onClose: () => void;
  rap: RapItem | null;
  onEvaluarRap: (rap: RapItem) => void;
}

export const DetalleRapModal: React.FC<DetalleRapModalProps> = ({
  isOpen,
  onClose,
  rap,
  onEvaluarRap,
}) => {
  if (!isOpen || !rap) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-stone-50 border border-stone-300 rounded-2xl shadow-2xl overflow-hidden my-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-sm font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
              {rap.codigo}
            </span>
            <span className="text-xs text-slate-600 font-semibold">
              {rap.faseTitulo}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
              {rap.titulo}
            </h2>
            <p className="text-xs text-slate-700 mt-2 leading-relaxed">
              {rap.descripcion}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-stone-200 space-y-1.5 text-xs shadow-2xs">
            <div className="text-slate-700">
              <strong>Competencia Curricular:</strong> {rap.competencia}
            </div>
            <div className="text-slate-600 flex items-center justify-between pt-1 border-t border-stone-200">
              <span>Tipo de Evidencia: <strong className="text-slate-900">{rap.evidenciaTipo}</strong></span>
              <span className="font-mono font-semibold">Horas Estimadas: {rap.horasEstimadas}h</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
              Criterios de Evaluación y Rúbrica Formativa ({rap.criterios.length})
            </h3>

            <div className="space-y-2.5">
              {rap.criterios.map((c) => (
                <div
                  key={c.id}
                  className="p-3.5 rounded-xl bg-white border border-stone-200 flex items-start justify-between gap-3 shadow-2xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-xs text-slate-900">{c.nombre}</strong>
                      {c.esCritico && (
                        <span className="text-[10px] font-bold text-rose-800 bg-rose-100 border border-rose-300 px-1.5 py-0.2 rounded uppercase">
                          Crítico
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">{c.descripcion}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold font-mono text-emerald-800">
                      Peso {c.peso}%
                    </span>
                    <span className="block text-[10px] text-slate-500 uppercase mt-0.5">
                      {c.categoria}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
                onEvaluarRap(rap);
              }}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-emerald-600/30"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              <span>Evaluar este RAP en el Simulador</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
