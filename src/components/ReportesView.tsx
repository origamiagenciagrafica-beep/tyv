import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  CheckCircle2,
  AlertTriangle,
  Search,
} from 'lucide-react';
import {
  AprendizSena,
  RAP_ILUSTRACION_MAPA_BITS,
  EvaluacionRegistro,
  RapItem,
} from '../data/senaData';

interface ReportesViewProps {
  aprendiz: AprendizSena;
  aprendices: AprendizSena[];
  onAbrirActa: (evaluacion: EvaluacionRegistro, rap: RapItem, aprendiz: AprendizSena) => void;
  onEvaluarRap: (rap: RapItem) => void;
}

export const ReportesView: React.FC<ReportesViewProps> = ({
  aprendices,
  onAbrirActa,
  onEvaluarRap,
}) => {
  const [filtroJuicio, setFiltroJuicio] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState<string>('');

  const rap = RAP_ILUSTRACION_MAPA_BITS;

  // Lista de evaluaciones de todos los aprendices para este RAP
  const registros = aprendices.map((ap) => ({
    aprendiz: ap,
    evaluacion: ap.evaluacionRap,
  }));

  const registrosFiltrados = registros.filter((item) => {
    if (filtroJuicio === 'A' && item.evaluacion.juicio !== 'A') return false;
    if (filtroJuicio === 'D' && item.evaluacion.juicio !== 'D') return false;

    if (busqueda.trim() !== '') {
      const q = busqueda.toLowerCase();
      const matchNombre = item.aprendiz.nombre.toLowerCase().includes(q);
      const matchDoc = item.aprendiz.documento.includes(q);
      const matchDictamen = item.evaluacion.dictamenGeneral.toLowerCase().includes(q);
      if (!matchNombre && !matchDoc && !matchDictamen) return false;
    }

    return true;
  });

  const exportarCSV = () => {
    const headers = [
      'Ficha',
      'Aprendiz',
      'Documento',
      'Codigo RAP',
      'Titulo RAP',
      'Fecha',
      'Juicio SENA',
      'Puntaje',
      'Calificador',
      'Plan Mejoramiento',
    ];
    const rows = registros.map((item) => {
      const plan = item.evaluacion.planMejoramiento ? `Si (Plazo ${item.evaluacion.planMejoramiento.fechaEntrega})` : 'No';
      return [
        item.aprendiz.ficha,
        `"${item.aprendiz.nombre}"`,
        item.aprendiz.documento,
        rap.codigo,
        `"${rap.titulo}"`,
        item.evaluacion.fecha,
        item.evaluacion.juicio,
        `${item.evaluacion.porcentaje}%`,
        `"${item.evaluacion.calificador}"`,
        `"${plan}"`,
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SENA_Actas_RAP_Ilustracion_Vectorial_Ficha_2834591.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/85 backdrop-blur-md border border-stone-200/90 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>Sistema Integrado de Evaluación SENA</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Actas Oficiales — {rap.titulo}
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Registro oficial y emisión de actas individuales F-08 para la Ficha 2834591 ({rap.codigo}).
          </p>
        </div>

        <button
          onClick={exportarCSV}
          className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-800 text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer border border-stone-300 whitespace-nowrap"
        >
          <Download className="w-4 h-4 text-emerald-700" />
          <span>Exportar Matriz CSV</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl bg-white/80 backdrop-blur-md border border-stone-200/90">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por aprendiz, documento o concepto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-slate-600">Filtrar por Juicio:</label>
          <select
            value={filtroJuicio}
            onChange={(e) => setFiltroJuicio(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="todos">Todos los Aprendices ({registros.length})</option>
            <option value="A">Solo Aprobados (A)</option>
            <option value="D">Solo No Aprobados (D)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-stone-200/90 bg-white/90 backdrop-blur-md shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-100/90 border-b border-stone-200 text-[11px] font-bold uppercase tracking-wider text-slate-700">
              <th className="p-3.5">Aprendiz</th>
              <th className="p-3.5">Documento</th>
              <th className="p-3.5">Fecha</th>
              <th className="p-3.5 text-center">Puntaje</th>
              <th className="p-3.5 text-center">Juicio SENA</th>
              <th className="p-3.5">Plan Mejoramiento</th>
              <th className="p-3.5 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200/80 text-xs">
            {registrosFiltrados.map(({ aprendiz: ap, evaluacion: ev }) => {
              const isA = ev.juicio === 'A';

              return (
                <tr key={ap.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="p-3.5">
                    <strong className="text-slate-900 block">{ap.nombre}</strong>
                    <span className="text-[11px] text-slate-500 line-clamp-1">
                      {ev.evidenciaAdjunta?.titulo || 'Ilustración Vectorial & Mapa de Bits'}
                    </span>
                  </td>

                  <td className="p-3.5 font-mono text-slate-600">
                    {ap.documento}
                  </td>

                  <td className="p-3.5 text-slate-600 font-mono whitespace-nowrap">
                    {ev.fecha}
                  </td>

                  <td className="p-3.5 text-center font-mono font-bold text-slate-900">
                    {ev.porcentaje}%
                  </td>

                  <td className="p-3.5 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold font-mono ${
                        isA
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}
                    >
                      {isA ? <CheckCircle2 className="w-3 h-3 text-emerald-700" /> : <AlertTriangle className="w-3 h-3 text-amber-700" />}
                      Juicio {ev.juicio}
                    </span>
                  </td>

                  <td className="p-3.5 text-slate-600">
                    {ev.planMejoramiento ? (
                      <div className="text-[11px] text-amber-900 font-mono bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                        Activo (Plazo: {ev.planMejoramiento.fechaEntrega})
                      </div>
                    ) : (
                      <span className="text-slate-400 italic text-[11px]">No requerido</span>
                    )}
                  </td>

                  <td className="p-3.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onAbrirActa(ev, rap, ap)}
                        className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-slate-800 border border-stone-200 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                        title="Ver e imprimir acta formal F-08"
                      >
                        <Printer className="w-3.5 h-3.5 text-slate-500" />
                        <span>Acta SENA</span>
                      </button>
                      <button
                        onClick={() => onEvaluarRap(rap)}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Evaluar
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
