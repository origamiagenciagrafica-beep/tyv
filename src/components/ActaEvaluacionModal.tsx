import React from 'react';
import { X, Printer, CheckCircle2, AlertOctagon, Download, ShieldCheck } from 'lucide-react';
import { AprendizSena, EvaluacionRegistro, RapItem } from '../data/senaData';

interface ActaEvaluacionModalProps {
  isOpen: boolean;
  onClose: () => void;
  evaluacion: EvaluacionRegistro;
  rap: RapItem;
  aprendiz: AprendizSena;
}

export const ActaEvaluacionModal: React.FC<ActaEvaluacionModalProps> = ({
  isOpen,
  onClose,
  evaluacion,
  rap,
  aprendiz,
}) => {
  if (!isOpen) return null;

  const isAprobado = evaluacion.juicio === 'A';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden my-auto print:m-0 print:p-0 print:shadow-none print:w-full">
        {/* Top Action Bar (Hidden on print) */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-slate-900 text-white print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Documento Oficial · Juicio Evaluativo SENA
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-400 text-slate-950 text-xs font-bold hover:bg-emerald-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Exportar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Printable SENA Document Content */}
        <div className="p-8 sm:p-12 space-y-6 text-xs text-slate-800 max-h-[75vh] overflow-y-auto print:max-h-none print:overflow-visible">
          {/* Header Institutional SENA */}
          <div className="border-b-2 border-slate-900 pb-4 flex items-start justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                SERVICIO NACIONAL DE APRENDIZAJE — SENA
              </div>
              <h1 className="text-lg font-black text-slate-950 uppercase tracking-tight">
                ACTA INDIVIDUAL DE EVALUACIÓN Y JUICIO DE APRENDIZAJE
              </h1>
              <div className="text-xs text-slate-600">
                Sistema Integrado de Gestión y Autoevaluación Institucional · Formato F-08
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="text-xl font-black text-[#39A900] tracking-tighter">SENA</div>
              <div className="text-[10px] text-slate-500 font-mono">Ficha: {aprendiz.ficha}</div>
              <div className="text-[10px] text-slate-500">Fecha: {evaluacion.fecha}</div>
            </div>
          </div>

          {/* Program and Apprentice Info Grid */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Programa de Formación:
              </span>
              <strong className="text-xs text-slate-900 block">
                Tecnólogo en Desarrollo de Medios Gráficos Visuales (Cód. 524143)
              </strong>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Centro de Formación:
              </span>
              <span className="text-xs text-slate-800 block">
                CENIGRAF — Centro para la Industria de la Comunicación Gráfica
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Aprendiz Evaluado:
              </span>
              <strong className="text-xs text-slate-900 block">
                {aprendiz.nombre}
              </strong>
              <span className="text-[11px] text-slate-600 font-mono">
                Documento: {aprendiz.documento}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Instructor / Evaluador Responsable:
              </span>
              <span className="text-xs text-slate-800 block">{evaluacion.calificador}</span>
            </div>
          </div>

          {/* Learning Outcome Details */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Resultado de Aprendizaje (RAP):
              </span>
              <span className="font-mono font-bold text-slate-900">{rap.codigo}</span>
            </div>
            <div className="text-sm font-bold text-slate-950">
              {rap.titulo}
            </div>
            <div className="text-xs text-slate-600 leading-relaxed">
              <strong>Competencia:</strong> {rap.competencia}
            </div>
          </div>

          {/* Evaluated Criteria Table */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
              Desglose de Criterios de Evaluación y Ponderaciones
            </h3>
            <table className="w-full text-left border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-700">
                  <th className="p-2 border border-slate-300">Criterio</th>
                  <th className="p-2 border border-slate-300 w-16 text-center">Peso</th>
                  <th className="p-2 border border-slate-300 w-20 text-center">Puntaje</th>
                  <th className="p-2 border border-slate-300">Observación Pedagógica</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {rap.criterios.map((c) => {
                  const pt = evaluacion.puntuacionCriterios[c.id] ?? 70;
                  const obs = evaluacion.observacionesCriterios?.[c.id] || 'Cumple con los requerimientos técnicos.';

                  return (
                    <tr key={c.id}>
                      <td className="p-2 border border-slate-300">
                        <strong>{c.nombre}</strong>
                        {c.esCritico && (
                          <span className="ml-1 text-[9px] text-red-600 font-bold uppercase">
                            [Crítico]
                          </span>
                        )}
                      </td>
                      <td className="p-2 border border-slate-300 text-center font-mono">
                        {c.peso}%
                      </td>
                      <td className="p-2 border border-slate-300 text-center font-mono font-bold">
                        {pt}%
                      </td>
                      <td className="p-2 border border-slate-300 text-slate-600 text-[11px]">
                        {obs}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Official Verdict / Juicio SENA */}
          <div
            className={`p-4 rounded-xl border-2 flex items-center justify-between gap-4 ${
              isAprobado
                ? 'border-[#39A900] bg-emerald-50/50'
                : 'border-amber-600 bg-amber-50/50'
            }`}
          >
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                JUICIO EVALUATIVO DEFINITIVO (NORMATIVA SENA):
              </div>
              <div
                className={`text-2xl font-black tracking-tight ${
                  isAprobado ? 'text-[#39A900]' : 'text-amber-700'
                }`}
              >
                {isAprobado ? 'APROBADO (A)' : 'NO APROBADO (D)'}
              </div>
              <div className="text-xs text-slate-700 mt-1">
                Puntaje Ponderado Obtenido:{' '}
                <strong className="font-mono">{evaluacion.porcentaje}%</strong> / 100% (Mínimo aprobatorio: 70%)
              </div>
            </div>

            <div className="text-right">
              {isAprobado ? (
                <div className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs uppercase">
                  Competencia Alcanzada
                </div>
              ) : (
                <div className="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-bold text-xs uppercase">
                  Plan de Mejoramiento Requerido
                </div>
              )}
            </div>
          </div>

          {/* Plan de Mejoramiento Section if D */}
          {evaluacion.planMejoramiento && (
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-300 text-xs text-amber-950 space-y-2">
              <div className="font-bold uppercase tracking-wider text-[11px] text-amber-900">
                Plan de Mejoramiento Formativo Concertado:
              </div>
              <p>
                Fecha límite para reentrega y sustentación de evidencias corregidas:{' '}
                <strong>{evaluacion.planMejoramiento.fechaEntrega}</strong>.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-800">
                {evaluacion.planMejoramiento.acciones.map((acc, i) => (
                  <li key={i}>{acc}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Signatures */}
          <div className="pt-10 grid grid-cols-2 gap-12 text-center text-xs text-slate-700">
            <div className="border-t border-slate-900 pt-2">
              <div className="font-bold text-slate-950">{evaluacion.calificador}</div>
              <div className="text-[10px] text-slate-500">Instructor Técnico Evaluador SENA</div>
            </div>

            <div className="border-t border-slate-900 pt-2">
              <div className="font-bold text-slate-950">{aprendiz.nombre}</div>
              <div className="text-[10px] text-slate-500">Aprendiz en Formación (Doc: {aprendiz.documento})</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
