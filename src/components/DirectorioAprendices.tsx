import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Zap,
  FileSpreadsheet,
  UserPlus,
  Search,
  Award,
  Check,
} from 'lucide-react';
import { AprendizSena } from '../data/senaData';
import { MASCOTS_90S } from '../assets/mascots';

interface DirectorioAprendicesProps {
  aprendices: AprendizSena[];
  aprendizSeleccionadoId: string;
  onSelectAprendiz: (aprendiz: AprendizSena) => void;
  onEvaluarRapAprendiz: (aprendiz: AprendizSena) => void;
  onAbrirActa?: (aprendiz: AprendizSena) => void;
  onAbrirModalNuevoAprendiz?: () => void;
  onQuickCalificar?: (aprendizId: string, juicio: 'A' | 'D') => void;
  onVerRadarAprendiz?: (aprendiz: AprendizSena) => void;
}

export const DirectorioAprendices: React.FC<DirectorioAprendicesProps> = ({
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
  const [filtro, setFiltro] = useState<'todos' | 'A' | 'D'>('todos');
  const [toastMensaje, setToastMensaje] = useState<string | null>(null);

  const mostrarToast = (msj: string) => {
    setToastMensaje(msj);
    setTimeout(() => {
      setToastMensaje(null);
    }, 2800);
  };

  const filtrados = aprendices.filter((ap) => {
    const matchText =
      ap.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      ap.documento.includes(busqueda) ||
      ap.especialidadInteres.toLowerCase().includes(busqueda.toLowerCase());

    const matchJuicio =
      filtro === 'todos' || ap.evaluacionRap?.juicio === filtro;

    return matchText && matchJuicio;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMensaje && (
        <div className="fixed top-20 right-6 z-50 animate-bounce">
          <div className="px-4 py-2.5 rounded-2xl bg-yellow-300 text-slate-950 font-black text-xs border-3 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex items-center gap-2">
            <Sparkles className="w-4 h-4 fill-slate-950 text-slate-950 shrink-0" />
            <span>{toastMensaje}</span>
          </div>
        </div>
      )}

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
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-300 text-emerald-950 px-2 py-0.5 rounded-full border border-slate-900">
                ⚡ Acciones Activas
              </span>
            </div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              Directorio de Aprendices · RAP Ilustración Vectorial
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              Cada aprendiz dispone de su botón de evaluación personalizada, aprobación rápida, portafolio técnico y acta oficial.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <span className="text-xs font-mono font-black text-slate-900 bg-emerald-100 border-2 border-slate-900 px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] inline-block">
            {aprendices.length} Aprendices Registrados
          </span>

          {onAbrirModalNuevoAprendiz && (
            <button
              type="button"
              onClick={onAbrirModalNuevoAprendiz}
              className="px-3.5 py-1.5 rounded-xl bg-yellow-300 hover:bg-yellow-400 active:scale-95 text-slate-950 text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] cursor-pointer flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Añadir Aprendiz</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-white/80 backdrop-blur-md rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre, cédula o área..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-stone-100 border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={() => {
              setFiltro('todos');
              mostrarToast('Mostrando todos los aprendices');
            }}
            className={`px-3 py-1 rounded-xl text-xs font-black border-1.5 border-slate-900 cursor-pointer transition-all active:scale-95 ${
              filtro === 'todos'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-stone-100'
            }`}
          >
            Todos ({aprendices.length})
          </button>
          <button
            type="button"
            onClick={() => {
              setFiltro('A');
              mostrarToast('Filtrando aprobados (A)');
            }}
            className={`px-3 py-1 rounded-xl text-xs font-black border-1.5 border-slate-900 cursor-pointer transition-all active:scale-95 ${
              filtro === 'A'
                ? 'bg-emerald-300 text-emerald-950 shadow-xs'
                : 'bg-white text-slate-700 hover:bg-stone-100'
            }`}
          >
            Aprobados (A)
          </button>
          <button
            type="button"
            onClick={() => {
              setFiltro('D');
              mostrarToast('Filtrando con Plan de Mejora (D)');
            }}
            className={`px-3 py-1 rounded-xl text-xs font-black border-1.5 border-slate-900 cursor-pointer transition-all active:scale-95 ${
              filtro === 'D'
                ? 'bg-amber-300 text-amber-950 shadow-xs'
                : 'bg-white text-slate-700 hover:bg-stone-100'
            }`}
          >
            Plan Mejora (D)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtrados.map((ap) => {
          const isCurrent = ap.id === aprendizSeleccionadoId;
          const ev = ap.evaluacionRap;
          const isA = ev.juicio === 'A';
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
              className={`p-5 rounded-3xl border-3 border-slate-900 transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-white shadow-[6px_6px_0px_0px_rgba(16,185,129,1)] ring-3 ring-emerald-400 -translate-y-0.5'
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

              {/* Action Buttons: INDIVIDUAL EVALUATION BUTTONS (100% ACTIVE) */}
              <div
                className="mt-4 pt-3 border-t-2 border-slate-200 space-y-2"
                onClick={(e) => e.stopPropagation()}
              >
                {/* 1. Main Personalized Evaluation Button */}
                <button
                  type="button"
                  onClick={() => {
                    onSelectAprendiz(ap);
                    onEvaluarRapAprendiz(ap);
                    mostrarToast(`⚡ Evaluando a ${ap.nombre}`);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 active:scale-95 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] border-2 border-slate-900"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>⚡ Evaluar a {primerNombre}</span>
                </button>

                {/* 2. Direct 1-Click Approval/Improvement Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (onQuickCalificar) {
                        onQuickCalificar(ap.id, 'A');
                      }
                      onSelectAprendiz(ap);
                      mostrarToast(`✅ ${primerNombre} APROBADO (A - 88%)`);
                    }}
                    className={`py-1.5 px-2 rounded-xl text-xs font-black border-2 border-slate-900 transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] ${
                      isA
                        ? 'bg-emerald-300 text-emerald-950 font-black'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900'
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
                      mostrarToast(`⚠️ Plan de Mejoramiento para ${primerNombre}`);
                    }}
                    className={`py-1.5 px-2 rounded-xl text-xs font-black border-2 border-slate-900 transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] ${
                      !isA
                        ? 'bg-amber-300 text-amber-950 font-black'
                        : 'bg-amber-50 hover:bg-amber-100 text-amber-900'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-950" />
                    <span>Mejora (D)</span>
                  </button>
                </div>

                {/* 3. Secondary Actions (Cargar, Radar, Acta) */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectAprendiz(ap);
                      mostrarToast(`Ficha activa: ${primerNombre}`);
                    }}
                    className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer border-2 border-slate-900 active:scale-95 ${
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
                        mostrarToast(`Abriendo Radar de ${primerNombre}`);
                      }}
                      className="py-1.5 px-2.5 rounded-xl bg-sky-200 hover:bg-sky-300 text-sky-950 text-xs font-black border-2 border-slate-900 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] cursor-pointer flex items-center gap-1 active:scale-95"
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
                        mostrarToast(`Generando Acta F-08 de ${primerNombre}`);
                      }}
                      className="py-1.5 px-3 rounded-xl bg-amber-200 hover:bg-amber-300 text-slate-900 text-xs font-black border-2 border-slate-900 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] cursor-pointer flex items-center gap-1 active:scale-95"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      <span>Acta</span>
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
