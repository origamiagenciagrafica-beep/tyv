import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  Sliders,
  Layers,
} from 'lucide-react';
import {
  AprendizSena,
  RAP_ILUSTRACION_MAPA_BITS,
} from '../data/senaData';

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
      {/* Top Banner: Single RAP Focus */}
      <div className="p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-stone-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <span className="font-mono bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded text-emerald-900 font-bold">
              {rap.codigo}
            </span>
            <span aria-hidden="true">·</span>
            <span>{rap.faseTitulo}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500 font-medium">72 Horas Curriculares</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            {rap.titulo}
          </h2>

          <p className="text-xs sm:text-sm text-slate-700 mt-2 max-w-3xl leading-relaxed">
            {rap.descripcion}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col items-end gap-2 shrink-0">
          <div
            className={`px-4 py-2.5 rounded-xl border flex items-center gap-2.5 ${
              isA
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}
          >
            {isA ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            )}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider block">
                {isA ? 'JUICIO: APROBADO' : 'JUICIO: NO APROBADO'}
              </span>
              <span className="text-sm font-mono font-black">
                {evaluacion.porcentaje}% / 100%
              </span>
            </div>
          </div>

          <button
            onClick={onEvaluarRap}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-emerald-600/30 active:scale-95"
          >
            <Sparkles className="w-4 h-4 fill-white" />
            <span>Evaluar Entrega</span>
          </button>
        </div>
      </div>

      {/* Grid: 5 Criteria Breakdown & Active Apprentice Evidence Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 5 Criteria Details (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Rúbrica Oficial de Calificación (5 Criterios Ponderados)
            </h3>
            <span className="text-xs font-mono text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
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
                  className={`p-4 rounded-xl border transition-all ${
                    isApproved
                      ? 'bg-emerald-50/60 border-emerald-200/90'
                      : isCritico
                      ? 'bg-rose-50/70 border-rose-300'
                      : 'bg-amber-50/70 border-amber-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-500">
                          0{index + 1}.
                        </span>
                        <strong className="text-sm font-bold text-slate-900">
                          {c.nombre}
                        </strong>
                        {isCritico && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-100 border border-rose-300 px-1.5 py-0.2 rounded">
                            Crítico
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {c.descripcion}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`text-base font-extrabold font-mono block ${
                          puntaje >= 80
                            ? 'text-emerald-700'
                            : puntaje >= 70
                            ? 'text-sky-700'
                            : 'text-amber-700'
                        }`}
                      >
                        {puntaje}%
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        Peso {c.peso}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden mt-2">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        puntaje >= 70 ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${puntaje}%` }}
                    ></div>
                  </div>

                  {/* Instructor Feedback note */}
                  {obs && (
                    <div className="mt-2.5 pt-2 border-t border-stone-200/80 text-xs text-slate-700 italic flex items-center justify-between">
                      <span>"{obs}"</span>
                      <span className="text-[10px] font-mono uppercase text-slate-500 not-italic bg-white/70 px-1.5 py-0.5 rounded border border-stone-200">
                        {c.categoria}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Apprentice Deliverable Evidence & Status (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Evidencia Entregada por el Aprendiz
            </h3>
            <span className="text-xs text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
              {aprendiz.nombre}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white/85 backdrop-blur-md border border-stone-200/90 shadow-sm space-y-4">
            {aprendiz.evaluacionRap.evidenciaAdjunta ? (
              <>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Proyecto / Entrega Registrada:
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">
                    {aprendiz.evaluacionRap.evidenciaAdjunta.titulo}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
                    <span>{aprendiz.evaluacionRap.evidenciaAdjunta.tipo}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{aprendiz.evaluacionRap.evidenciaAdjunta.tamanoMb} MB</span>
                  </div>
                </div>

                {/* Technical Specs Inspection Box */}
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Formatos Entregados:</span>
                    <span className="font-mono text-slate-900 font-semibold">
                      {aprendiz.evaluacionRap.evidenciaAdjunta.formato}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Resolución Verificada:</span>
                    <span className="font-mono text-emerald-800 font-bold bg-emerald-100 px-1.5 py-0.2 rounded">
                      {aprendiz.evaluacionRap.evidenciaAdjunta.resolucionReportada}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Espacio de Color:</span>
                    <span className="font-mono text-sky-800 font-bold bg-sky-100 px-1.5 py-0.2 rounded">
                      {aprendiz.evaluacionRap.evidenciaAdjunta.espacioColor}
                    </span>
                  </div>
                </div>

                {aprendiz.evaluacionRap.evidenciaAdjunta.linkUrl && (
                  <a
                    href={aprendiz.evaluacionRap.evidenciaAdjunta.linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-sky-700 hover:text-sky-900 font-semibold transition-colors"
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
            <div className="pt-3 border-t border-stone-200 text-xs text-slate-700 leading-relaxed bg-stone-50/80 p-3 rounded-xl border border-stone-200">
              <strong className="text-slate-600 uppercase text-[10px] block mb-1">
                Dictamen Oficial del Evaluador:
              </strong>
              {evaluacion.dictamenGeneral}
            </div>

            {/* Plan de Mejoramiento Alert if D */}
            {evaluacion.planMejoramiento && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs">
                <div className="flex items-center gap-1.5 text-amber-900 font-bold uppercase tracking-wider text-[11px] mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Plan de Mejoramiento Formativo Activo</span>
                </div>
                <p className="text-slate-700 mb-2">
                  Fecha límite de entrega concertada:{' '}
                  <strong className="text-slate-900 font-mono">
                    {evaluacion.planMejoramiento.fechaEntrega}
                  </strong>
                </p>
                <ul className="space-y-1 text-amber-950 list-disc list-inside text-[11px]">
                  {evaluacion.planMejoramiento.acciones.map((acc, i) => (
                    <li key={i}>{acc}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={onEvaluarRap}
              className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-stone-300"
            >
              <Sliders className="w-3.5 h-3.5 text-emerald-700" />
              <span>Abrir Rúbrica y Re-evaluar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
