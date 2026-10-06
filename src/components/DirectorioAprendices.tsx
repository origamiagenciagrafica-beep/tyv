import React from 'react';
import { CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { AprendizSena } from '../data/senaData';

interface DirectorioAprendicesProps {
  aprendices: AprendizSena[];
  aprendizSeleccionadoId: string;
  onSelectAprendiz: (aprendiz: AprendizSena) => void;
  onEvaluarRapAprendiz: (aprendiz: AprendizSena) => void;
}

export const DirectorioAprendices: React.FC<DirectorioAprendicesProps> = ({
  aprendices,
  aprendizSeleccionadoId,
  onSelectAprendiz,
  onEvaluarRapAprendiz,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Aprendices Evaluados en Ilustración Vectorial y Mapa de Bits
          </h2>
          <p className="text-xs text-slate-600">
            Ficha 2834591 · Seguimiento cualitativo y cuantitativo del RAP_EJE_01
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aprendices.map((ap) => {
          const isCurrent = ap.id === aprendizSeleccionadoId;
          const ev = ap.evaluacionRap;
          const isA = ev.juicio === 'A';

          return (
            <div
              key={ap.id}
              className={`p-5 rounded-2xl border transition-all ${
                isCurrent
                  ? 'bg-white/95 border-emerald-400 shadow-md shadow-emerald-500/10'
                  : 'bg-white/80 backdrop-blur-md border-stone-200/90 hover:border-stone-300 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={ap.avatar}
                    alt={ap.nombre}
                    className="w-12 h-12 rounded-xl object-cover border border-stone-300"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span>{ap.nombre}</span>
                      {isCurrent && (
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-1.5 py-0.5 rounded">
                          Activo
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
                      <span>Doc: {ap.documento}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-800 font-medium">{ap.especialidadInteres}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold font-mono px-2.5 py-1 rounded-lg border ${
                      isA
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : 'bg-amber-100 text-amber-900 border-amber-300'
                    }`}
                  >
                    {isA ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> : <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />}
                    Juicio {ev.juicio} ({ev.porcentaje}%)
                  </span>
                </div>
              </div>

              {/* Delivery info */}
              <div className="mt-4 pt-3 border-t border-stone-200/80 text-xs">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                  Entrega Registrada:
                </span>
                <span className="text-slate-800 font-semibold line-clamp-1 mt-0.5">
                  {ev.evidenciaAdjunta?.titulo || 'Evidencia de Trazado Vectorial & Mapa de Bits'}
                </span>
                <div className="flex items-center gap-2 text-[11px] text-slate-600 mt-1 font-mono">
                  <span>Resolución: {ev.evidenciaAdjunta?.resolucionReportada || '300 ppi'}</span>
                  <span aria-hidden="true">·</span>
                  <span>Color: {ev.evidenciaAdjunta?.espacioColor || 'CMYK'}</span>
                </div>
              </div>

              {/* Plan de mejoramiento alert if D */}
              {ev.planMejoramiento && (
                <div className="mt-3 p-2.5 rounded-lg bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-center justify-between">
                  <span className="font-semibold">Plan de Mejoramiento Activo</span>
                  <span className="font-mono text-[11px] bg-white/80 px-2 py-0.5 rounded border border-amber-200">
                    Plazo: {ev.planMejoramiento.fechaEntrega}
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-stone-200/60">
                <button
                  onClick={() => onSelectAprendiz(ap)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-stone-200 text-slate-900'
                      : 'bg-stone-100 hover:bg-stone-200 text-slate-700 border border-stone-200'
                  }`}
                >
                  {isCurrent ? 'Ficha Activa' : 'Cargar en Evaluador'}
                </button>

                <button
                  onClick={() => {
                    onSelectAprendiz(ap);
                    onEvaluarRapAprendiz(ap);
                  }}
                  className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs shadow-emerald-600/30"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-white" />
                  <span>Evaluar Rúbrica</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
