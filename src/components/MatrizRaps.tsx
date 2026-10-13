import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  Sliders,
  Layers,
  Wand2,
} from 'lucide-react';
import {
  AprendizSena,
  RAP_ILUSTRACION_MAPA_BITS,
} from '../data/senaData';
import { MASCOTS_90S } from '../assets/mascots';

interface MatrizRapsProps {
  aprendiz: AprendizSena;
  onEvaluarRap: () => void;
  onVerDetallesRap?: () => void;
}

export const MatrizRaps: React.FC<MatrizRapsProps> = ({
  aprendiz,
  onEvaluarRap,
}) => {
  const rap = RAP_ILUSTRACION_MAPA_BITS;
  const evaluacion = aprendiz.evaluacionRap;
  const isA = evaluacion.juicio === 'A';

  return (
    <div className="space-y-6">
      {/* Top Banner: Single RAP Focus with 90s Cartoon Badge */}
      <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border-3 border-slate-900 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-800 mb-1">
            <span className="font-mono bg-emerald-200 border-2 border-slate-900 px-2.5 py-0.5 rounded-full text-slate-950 font-black shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
              {rap.codigo}
            </span>
            <span aria-hidden="true">·</span>
            <span className="bg-amber-100 border border-slate-700 px-2 py-0.5 rounded-full text-slate-800 font-bold">
              {rap.faseTitulo}
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-600 font-bold">72 Horas Curriculares</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight mt-1">
            {rap.titulo}
          </h2>

          <p className="text-xs sm:text-sm text-slate-700 mt-2 max-w-3xl leading-relaxed font-medium">
            {rap.descripcion}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col items-end gap-3 shrink-0">
          <div
            className={`px-4 py-2.5 rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] flex items-center gap-3 ${
              isA ? 'bg-emerald-100 text-emerald-950' : 'bg-amber-100 text-amber-950'
            }`}
          >
            {isA ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-amber-700 shrink-0" />
            )}
            <div>
              <span className="text-xs font-black uppercase tracking-wider block">
                {isA ? 'JUICIO: APROBADO (A)' : 'JUICIO: NO APROBADO (D)'}
              </span>
              <span className="text-sm font-mono font-black">
                {evaluacion.porcentaje}% / 100%
              </span>
            </div>
          </div>

          <button
            onClick={onEvaluarRap}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-emerald-400 hover:bg-emerald-500 text-slate-950 text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] border-2 border-slate-900 active:scale-95"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>Evaluar Entrega</span>
          </button>
        </div>
      </div>

      {/* Grid: 5 Criteria Breakdown & Active Apprentice Evidence Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 5 Criteria Details (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <span>Rúbrica Oficial de Calificación (5 Criterios Ponderados)</span>
            </h3>
            <span className="text-xs font-mono font-black text-slate-900 bg-yellow-200 px-2.5 py-0.5 rounded-full border-2 border-slate-900 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
              Umbral Mínimo: 70%
            </span>
          </div>

          <div className="space-y-3">
            {rap.criterios.map((c, index) => {
              const puntaje = evaluacion.puntuacionCriterios[c.id] ?? 70;
              const obs = evaluacion.observacionesCriterios[c.id];
              const isCritico = c.esCritico;
              const isApproved = puntaje >= 70;

              return (
                <div
                  key={c.id}
                  className={`p-4 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all ${
                    isApproved
                      ? 'bg-emerald-50/90'
                      : isCritico
                      ? 'bg-rose-50/95 border-rose-900'
                      : 'bg-amber-50/95 border-amber-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-black text-slate-500">
                          0{index + 1}.
                        </span>
                        <strong className="text-sm font-black text-slate-900">
                          {c.nombre}
                        </strong>
                        {isCritico && (
                          <span className="text-[10px] font-black uppercase tracking-wider text-rose-900 bg-rose-200 border border-slate-900 px-1.5 py-0.2 rounded-full">
                            Crítico
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">
                        {c.descripcion}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`text-base font-black font-mono block ${
                          puntaje >= 80
                            ? 'text-emerald-800'
                            : puntaje >= 70
                            ? 'text-sky-800'
                            : 'text-amber-800'
                        }`}
                      >
                        {puntaje}%
                      </span>
                      <span className="text-[10px] text-slate-600 font-bold font-mono">
                        Peso {c.peso}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div className="w-full h-2.5 bg-white border-2 border-slate-900 rounded-full overflow-hidden mt-2 p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        puntaje >= 70 ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}
                      style={{ width: `${puntaje}%` }}
                    ></div>
                  </div>

                  {/* Instructor Feedback note */}
                  {obs && (
                    <div className="mt-2.5 pt-2 border-t border-slate-300 text-xs text-slate-800 italic flex items-center justify-between">
                      <span>"{obs}"</span>
                      <span className="text-[10px] font-mono uppercase text-slate-700 not-italic bg-white px-2 py-0.5 rounded-full border border-slate-900 font-bold">
                        {c.categoria}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Apprentice Deliverable Evidence & 90s Cartoon Mascot Companion (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
              Evidencia Entregada por el Aprendiz
            </h3>
            <span className="text-xs text-emerald-950 font-black bg-emerald-200 border-2 border-slate-900 px-2.5 py-0.5 rounded-full shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
              {aprendiz.nombre}
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-white/95 backdrop-blur-md border-3 border-slate-900 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] space-y-4">
            {aprendiz.evaluacionRap.evidenciaAdjunta ? (
              <>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                    Proyecto / Entrega Registrada:
                  </span>
                  <h4 className="text-sm font-black text-slate-900">
                    {aprendiz.evaluacionRap.evidenciaAdjunta.titulo}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-600 mt-1 font-medium">
                    <span>{aprendiz.evaluacionRap.evidenciaAdjunta.tipo}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{aprendiz.evaluacionRap.evidenciaAdjunta.tamanoMb} MB</span>
                  </div>
                </div>

                {/* Technical Specs Inspection Box with 90s Cartoon Pixel Brush Companion */}
                <div className="p-4 rounded-2xl bg-sky-50 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-start gap-3">
                  <div className="w-16 h-16 rounded-xl bg-white border-2 border-slate-900 p-0.5 shrink-0 overflow-hidden shadow-xs">
                    <img
                      src={MASCOTS_90S.pixelBrush.src}
                      alt="Pixel & Brush Mascota 90s"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-1.5 text-xs flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-bold">Formatos:</span>
                      <span className="font-mono text-slate-900 font-black">
                        {aprendiz.evaluacionRap.evidenciaAdjunta.formato}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-bold">Resolución:</span>
                      <span className="font-mono text-emerald-950 font-black bg-emerald-200 border border-slate-900 px-1.5 py-0.2 rounded-md">
                        {aprendiz.evaluacionRap.evidenciaAdjunta.resolucionReportada}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-bold">Color:</span>
                      <span className="font-mono text-sky-950 font-black bg-sky-200 border border-slate-900 px-1.5 py-0.2 rounded-md">
                        {aprendiz.evaluacionRap.evidenciaAdjunta.espacioColor}
                      </span>
                    </div>
                  </div>
                </div>

                {aprendiz.evaluacionRap.evidenciaAdjunta.linkUrl && (
                  <a
                    href={aprendiz.evaluacionRap.evidenciaAdjunta.linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-sky-800 hover:text-sky-950 font-black underline decoration-sky-400 decoration-2 transition-colors"
                  >
                    <span>Ver portafolio de evidencia en Behance</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </>
            ) : (
              <p className="text-xs text-slate-500">No hay evidencia adjunta registrada.</p>
            )}

            {/* Dictamen General Quote */}
            <div className="pt-3 border-t-2 border-slate-200 text-xs text-slate-800 leading-relaxed bg-stone-50 p-3.5 rounded-2xl border-2 border-slate-900">
              <strong className="text-slate-700 uppercase text-[10px] font-black block mb-1">
                Dictamen Oficial del Evaluador SENA:
              </strong>
              {evaluacion.dictamenGeneral}
            </div>

            {/* Mascot Status Alert: Approved Mascot vs Improvement Mascot */}
            {isA ? (
              <div className="p-3.5 rounded-2xl bg-emerald-100 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-white border-2 border-slate-900 p-0.5 shrink-0 overflow-hidden rotate-2">
                  <img
                    src={MASCOTS_90S.approved.src}
                    alt="Juicio Aprobado"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-emerald-950 font-black uppercase text-xs">
                    <Sparkles className="w-3.5 h-3.5 fill-emerald-700 text-emerald-700" />
                    <span>¡Competencia Lograda con Éxito!</span>
                  </div>
                  <p className="text-[11px] text-emerald-900 font-medium mt-0.5">
                    El aprendiz demuestra solidez en trazados bézier limpios y mapa de bits optimizado.
                  </p>
                </div>
              </div>
            ) : evaluacion.planMejoramiento ? (
              <div className="p-3.5 rounded-2xl bg-amber-100 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] flex items-start gap-3">
                <div className="w-16 h-16 rounded-xl bg-white border-2 border-slate-900 p-0.5 shrink-0 overflow-hidden -rotate-2">
                  <img
                    src={MASCOTS_90S.planMejora.src}
                    alt="Floppy Mejoras"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="text-xs">
                  <div className="flex items-center gap-1.5 text-amber-950 font-black uppercase tracking-wider text-[11px] mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-800" />
                    <span>Plan de Mejoramiento Formativo Activo</span>
                  </div>
                  <p className="text-slate-800 mb-1.5">
                    Plazo concertado:{' '}
                    <strong className="text-slate-950 font-mono font-black">
                      {evaluacion.planMejoramiento.fechaEntrega}
                    </strong>
                  </p>
                  <ul className="space-y-1 text-amber-950 list-disc list-inside text-[11px] font-medium">
                    {evaluacion.planMejoramiento.acciones.map((acc, i) => (
                      <li key={i}>{acc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}

            <button
              onClick={onEvaluarRap}
              className="w-full py-2.5 rounded-2xl bg-yellow-200 hover:bg-yellow-300 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-950" />
              <span>Abrir Rúbrica y Re-evaluar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
