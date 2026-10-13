import React from 'react';
import { CheckCircle2, AlertTriangle, Sparkles, Wand2 } from 'lucide-react';
import { AprendizSena } from '../data/senaData';
import { MASCOTS_90S } from '../assets/mascots';

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
      {/* 90s Cartoon Themed Top Banner */}
      <div className="p-5 rounded-3xl bg-white/90 backdrop-blur-md border-3 border-slate-900 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-200 border-2 border-slate-900 p-0.5 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] shrink-0 overflow-hidden">
            <img
              src={MASCOTS_90S.bezierPen.src}
              alt="Pen-Tooly Mascota 90s"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-black uppercase tracking-wider bg-yellow-300 text-slate-950 px-2 py-0.5 rounded-full border border-slate-900">
                Ficha 2834591 · CENIGRAF
              </span>
            </div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              Directorio de Aprendices · RAP Ilustración Vectorial
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              Seguimiento cualitativo individualizado, portafolios técnicos y planes de mejoramiento.
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="text-xs font-mono font-black text-slate-900 bg-emerald-100 border-2 border-slate-900 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] inline-block">
            {aprendices.length} Aprendices Matriculados
          </span>
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
              className={`p-5 rounded-3xl border-3 border-slate-900 transition-all ${
                isCurrent
                  ? 'bg-white shadow-[5px_5px_0px_0px_rgba(16,185,129,1)]'
                  : 'bg-white/90 backdrop-blur-md shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-x-0.5 hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img
                      src={ap.avatar}
                      alt={ap.nombre}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                      referrerPolicy="no-referrer"
                    />
                    {/* 90s mini mascot stamp on avatar */}
                    <img
                      src={isA ? MASCOTS_90S.approved.src : MASCOTS_90S.planMejora.src}
                      alt="90s Badge"
                      className="w-6 h-6 rounded-full border-2 border-slate-900 absolute -bottom-1 -right-1 shadow-xs"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <span>{ap.nombre}</span>
                      {isCurrent && (
                        <span className="text-[10px] font-black text-emerald-950 bg-emerald-200 border border-slate-900 px-1.5 py-0.5 rounded-full">
                          Seleccionado
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5 font-medium">
                      <span>Doc: {ap.documento}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-900 font-bold bg-stone-100 px-1.5 py-0.2 rounded border border-slate-300">
                        {ap.especialidadInteres}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-black font-mono px-2.5 py-1 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] ${
                      isA
                        ? 'bg-emerald-200 text-emerald-950'
                        : 'bg-amber-200 text-amber-950'
                    }`}
                  >
                    {isA ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-800" />
                    )}
                    Juicio {ev.juicio} ({ev.porcentaje}%)
                  </span>
                </div>
              </div>

              {/* Delivery info */}
              <div className="mt-4 pt-3 border-t-2 border-slate-200 text-xs">
                <span className="text-slate-500 block text-[10px] uppercase font-black">
                  Entrega Registrada:
                </span>
                <span className="text-slate-900 font-bold line-clamp-1 mt-0.5">
                  {ev.evidenciaAdjunta?.titulo || 'Evidencia de Trazado Vectorial & Mapa de Bits'}
                </span>
                <div className="flex items-center gap-2 text-[11px] text-slate-600 mt-1 font-mono font-medium">
                  <span>Resolución: {ev.evidenciaAdjunta?.resolucionReportada || '300 ppi'}</span>
                  <span aria-hidden="true">·</span>
                  <span>Color: {ev.evidenciaAdjunta?.espacioColor || 'CMYK'}</span>
                </div>
              </div>

              {/* Plan de mejoramiento alert if D */}
              {ev.planMejoramiento && (
                <div className="mt-3 p-2.5 rounded-xl bg-amber-100 border-2 border-slate-900 text-xs text-amber-950 flex items-center justify-between">
                  <span className="font-black flex items-center gap-1">
                    <span>⚠️ Plan de Mejoramiento Activo</span>
                  </span>
                  <span className="font-mono text-[11px] font-bold bg-white px-2 py-0.5 rounded-lg border border-slate-900">
                    Plazo: {ev.planMejoramiento.fechaEntrega}
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-4 pt-3 border-t-2 border-slate-200">
                <button
                  onClick={() => onSelectAprendiz(ap)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer border-2 border-slate-900 ${
                    isCurrent
                      ? 'bg-stone-200 text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                      : 'bg-white hover:bg-stone-100 text-slate-700 shadow-xs'
                  }`}
                >
                  {isCurrent ? 'Ficha Activa' : 'Cargar en Evaluador'}
                </button>

                <button
                  onClick={() => {
                    onSelectAprendiz(ap);
                    onEvaluarRapAprendiz(ap);
                  }}
                  className="py-2 px-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-500 text-slate-950 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] border-2 border-slate-900"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
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
