import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  UserPlus,
  Search,
  Award,
  ExternalLink,
  ChevronRight,
  Sliders,
  Check,
  AlertOctagon,
} from 'lucide-react';
import { AprendizSena } from '../data/senaData';
import { MASCOTS_90S } from '../assets/mascots';

interface BarraAprendicesEvaluacionProps {
  aprendices: AprendizSena[];
  aprendizSeleccionadoId: string;
  onSelectAprendiz: (aprendiz: AprendizSena) => void;
  onEvaluarRapAprendiz: (aprendiz: AprendizSena) => void;
  onAbrirActa?: (aprendiz: AprendizSena) => void;
  onAbrirModalNuevoAprendiz: () => void;
  onQuickCalificar?: (aprendizId: string, juicio: 'A' | 'D') => void;
  onVerRadarAprendiz?: (aprendiz: AprendizSena) => void;
}

export const BarraAprendicesEvaluacion: React.FC<BarraAprendicesEvaluacionProps> = ({
  aprendices,
  aprendizSeleccionadoId,
  onSelectAprendiz,
  onEvaluarRapAprendiz,
  onAbrirActa,
  onAbrirModalNuevoAprendiz,
  onQuickCalificar,
  onVerRadarAprendiz,
}) => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroJuicio, setFiltroJuicio] = useState<'todos' | 'A' | 'D'>('todos');
  const [toastMensaje, setToastMensaje] = useState<string | null>(null);

  const mostrarToast = (msj: string) => {
    setToastMensaje(msj);
    setTimeout(() => {
      setToastMensaje(null);
    }, 2800);
  };

  const aprendicesFiltrados = aprendices.filter((ap) => {
    const coincideTexto =
      ap.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      ap.documento.includes(busqueda) ||
      ap.especialidadInteres.toLowerCase().includes(busqueda.toLowerCase());

    const coincideJuicio =
      filtroJuicio === 'todos' || ap.evaluacionRap?.juicio === filtroJuicio;

    return coincideTexto && coincideJuicio;
  });

  return (
    <div className="space-y-4">
      {/* Floating feedback toast for button actions */}
      {toastMensaje && (
        <div className="fixed top-20 right-6 z-50 animate-bounce">
          <div className="px-4 py-2.5 rounded-2xl bg-yellow-300 text-slate-950 font-black text-xs border-3 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex items-center gap-2">
            <Sparkles className="w-4 h-4 fill-slate-950 text-slate-950 shrink-0" />
            <span>{toastMensaje}</span>
          </div>
        </div>
      )}

      {/* 90s Cartoon Themed Header Ribbon */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white/95 backdrop-blur-md border-3 border-slate-900 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-amber-200 border-2 border-slate-900 p-0.5 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] shrink-0 overflow-hidden">
              <img
                src={MASCOTS_90S.approved.src}
                alt="Mascota 90s Aprobado"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-200 text-emerald-950 px-2 py-0.5 rounded-full border border-slate-900">
                  ⚡ Botones 100% Activos
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider bg-yellow-300 text-slate-900 px-2 py-0.5 rounded-full border border-slate-900">
                  Ficha 2834591 · CENIGRAF
                </span>
                <span className="text-[10px] font-mono font-bold bg-purple-100 text-purple-900 px-2 py-0.5 rounded-full border border-slate-900">
                  {aprendices.length} Aprendices
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-950 tracking-tight">
                Panel de Evaluación Personalizada para Cada Aprendiz
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                Haz clic en el botón de cualquier aprendiz para cargar su rúbrica técnica, calificar 1 a 1, aprobar directo, o emitir el acta formal.
              </p>
            </div>
          </div>

          {/* Quick Filters and Add Apprentice Button */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar aprendiz..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-stone-100 border-2 border-slate-900 text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white shadow-xs"
              />
            </div>

            <div className="flex items-center p-1 bg-stone-100 rounded-xl border-2 border-slate-900 text-xs font-black">
              <button
                type="button"
                onClick={() => {
                  setFiltroJuicio('todos');
                  mostrarToast('Mostrando todos los aprendices');
                }}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  filtroJuicio === 'todos'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-300'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Todos ({aprendices.length})
              </button>
              <button
                type="button"
                onClick={() => {
                  setFiltroJuicio('A');
                  mostrarToast('Filtrando solo aprobados (A)');
                }}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  filtroJuicio === 'A'
                    ? 'bg-emerald-300 text-emerald-950 shadow-xs border border-slate-900'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Aprobados
              </button>
              <button
                type="button"
                onClick={() => {
                  setFiltroJuicio('D');
                  mostrarToast('Filtrando plan de mejoramiento (D)');
                }}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  filtroJuicio === 'D'
                    ? 'bg-amber-300 text-amber-950 shadow-xs border border-slate-900'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Plan Mejora
              </button>
            </div>

            <button
              type="button"
              onClick={onAbrirModalNuevoAprendiz}
              className="px-3.5 py-1.5 rounded-xl bg-yellow-300 hover:bg-yellow-400 active:scale-95 text-slate-950 text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Añadir Aprendiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Individual Apprentice Evaluation Buttons & Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {aprendicesFiltrados.map((ap) => {
          const isCurrent = ap.id === aprendizSeleccionadoId;
          const ev = ap.evaluacionRap;
          const isA = ev?.juicio === 'A';
          const primerNombre =
            ap.nombre.split(' ')[0] +
            (ap.nombre.split(' ')[1] ? ` ${ap.nombre.split(' ')[1]}` : '');

          return (
            <div
              key={ap.id}
              onClick={() => {
                onSelectAprendiz(ap);
                mostrarToast(`Aprendiz activo: ${ap.nombre}`);
              }}
              className={`p-4 rounded-3xl border-3 border-slate-900 transition-all flex flex-col justify-between cursor-pointer ${
                isCurrent
                  ? 'bg-white shadow-[6px_6px_0px_0px_rgba(16,185,129,1)] ring-3 ring-emerald-400 -translate-y-1'
                  : 'bg-white/90 backdrop-blur-md shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-x-0.5 hover:-translate-y-0.5'
              }`}
            >
              {/* Header Info */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={ap.avatar}
                        alt={ap.nombre}
                        className="w-13 h-13 rounded-2xl object-cover border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                        referrerPolicy="no-referrer"
                      />
                      {/* 90s Cartoon Badge stamp */}
                      <img
                        src={isA ? MASCOTS_90S.approved.src : MASCOTS_90S.planMejora.src}
                        alt="90s Badge"
                        className="w-5 h-5 rounded-full border-1.5 border-slate-900 absolute -bottom-1 -right-1 shadow-xs"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-black text-slate-900 truncate">
                          {ap.nombre}
                        </h3>
                      </div>
                      <p className="text-[11px] text-slate-600 font-mono font-medium truncate">
                        Doc: {ap.documento}
                      </p>
                      <span className="inline-block text-[10px] text-slate-700 bg-stone-100 border border-slate-300 px-1.5 py-0.2 rounded font-semibold truncate max-w-[190px]">
                        {ap.especialidadInteres}
                      </span>
                    </div>
                  </div>

                  {/* Juicio Chip */}
                  <div className="shrink-0 text-right">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-black font-mono px-2 py-0.5 rounded-xl border-2 border-slate-900 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] ${
                        isA
                          ? 'bg-emerald-200 text-emerald-950'
                          : 'bg-amber-200 text-amber-950'
                      }`}
                    >
                      {isA ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-800" />
                      )}
                      <span>
                        {ev?.juicio} ({ev?.porcentaje}%)
                      </span>
                    </span>
                  </div>
                </div>

                {/* Evidence snippet */}
                <div className="mt-3 pt-2.5 border-t border-slate-200 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-black uppercase text-[9px]">
                      Evidencia Técnica:
                    </span>
                    <span className="text-[10px] font-mono text-slate-700 font-bold bg-purple-100 border border-purple-300 px-1.5 rounded">
                      {ev?.evidenciaAdjunta?.resolucionReportada || '300 ppi'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 font-bold line-clamp-1 mt-0.5">
                    {ev?.evidenciaAdjunta?.titulo || 'Pieza Gráfica Vectorial & Bitmap'}
                  </p>
                </div>

                {isCurrent && (
                  <div className="mt-2.5 px-2.5 py-1 bg-emerald-100 border border-emerald-400 rounded-xl flex items-center justify-between text-[10px] text-emerald-950 font-black">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                      <span>Seleccionado para Evaluación</span>
                    </span>
                    <span className="font-mono">Fase 3</span>
                  </div>
                )}
              </div>

              {/* Action Buttons: DEDICATED EVALUATION BUTTONS FOR EACH APPRENTICE */}
              <div
                className="mt-4 pt-3 border-t-2 border-slate-200 space-y-2"
                onClick={(e) => e.stopPropagation()}
              >
                {/* 1. Main Personalized Evaluation Button (Opens full criteria modal) */}
                <button
                  type="button"
                  onClick={() => {
                    onSelectAprendiz(ap);
                    onEvaluarRapAprendiz(ap);
                    mostrarToast(`⚡ Evaluando a ${ap.nombre}`);
                  }}
                  className="w-full py-2.5 px-3 rounded-2xl bg-emerald-400 hover:bg-emerald-300 active:scale-95 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] border-2 border-slate-900"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>⚡ Evaluar a {primerNombre}</span>
                </button>

                {/* 2. Direct 1-Click Evaluation Presets (Quick Approve or Improvement) */}
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      if (onQuickCalificar) {
                        onQuickCalificar(ap.id, 'A');
                      }
                      onSelectAprendiz(ap);
                      mostrarToast(`✅ ¡${primerNombre} APROBADO (A - 88%)!`);
                    }}
                    title="Calificar como Aprobado (A - 88%) de inmediato"
                    className={`py-1.5 px-2 rounded-xl text-[11px] font-black border-2 border-slate-900 transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] ${
                      isA
                        ? 'bg-emerald-300 text-emerald-950 font-black'
                        : 'bg-emerald-50 hover:bg-emerald-200 text-emerald-900'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-950" />
                    <span>Aprobar (A)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (onQuickCalificar) {
                        onQuickCalificar(ap.id, 'D');
                      }
                      onSelectAprendiz(ap);
                      mostrarToast(`⚠️ Plan de Mejoramiento asignado a ${primerNombre}`);
                    }}
                    title="Asignar Plan de Mejoramiento (D - 58%)"
                    className={`py-1.5 px-2 rounded-xl text-[11px] font-black border-2 border-slate-900 transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] ${
                      !isA
                        ? 'bg-amber-300 text-amber-950 font-black'
                        : 'bg-amber-50 hover:bg-amber-200 text-amber-900'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-950" />
                    <span>Mejora (D)</span>
                  </button>
                </div>

                {/* 3. Secondary Actions (Ficha Activa, Radar, Acta F-08) */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectAprendiz(ap);
                      mostrarToast(`Ficha de ${primerNombre} cargada`);
                    }}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer border-1.5 border-slate-900 active:scale-95 ${
                      isCurrent
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white hover:bg-stone-100 text-slate-700 shadow-xs'
                    }`}
                  >
                    {isCurrent ? '✓ Activo' : 'Cargar'}
                  </button>

                  {onVerRadarAprendiz && (
                    <button
                      type="button"
                      onClick={() => {
                        onSelectAprendiz(ap);
                        onVerRadarAprendiz(ap);
                        mostrarToast(`Radar de competencias: ${primerNombre}`);
                      }}
                      title="Ver Radar Poligonal de Competencias"
                      className="py-1.5 px-2 rounded-xl bg-sky-200 hover:bg-sky-300 text-sky-950 text-[11px] font-black transition-all flex items-center gap-1 cursor-pointer border-1.5 border-slate-900 shadow-xs active:scale-95"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Radar</span>
                    </button>
                  )}

                  {onAbrirActa && (
                    <button
                      type="button"
                      onClick={() => {
                        onSelectAprendiz(ap);
                        onAbrirActa(ap);
                        mostrarToast(`Abriendo Acta F-08 de ${primerNombre}`);
                      }}
                      title="Generar Acta Oficial SENA F-08"
                      className="py-1.5 px-2 rounded-xl bg-amber-200 hover:bg-amber-300 text-slate-900 text-[11px] font-black transition-all flex items-center gap-1 cursor-pointer border-1.5 border-slate-900 shadow-xs active:scale-95"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      <span>Acta F-08</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
