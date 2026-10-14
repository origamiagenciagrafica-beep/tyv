import React, { useState } from 'react';
import { X, UserPlus, Sparkles, Wand2 } from 'lucide-react';
import { AprendizSena } from '../data/senaData';
import { MASCOTS_90S } from '../assets/mascots';

interface ModalNuevoAprendizProps {
  isOpen: boolean;
  onClose: () => void;
  onAgregarAprendiz: (nuevo: AprendizSena) => void;
}

export const ModalNuevoAprendiz: React.FC<ModalNuevoAprendizProps> = ({
  isOpen,
  onClose,
  onAgregarAprendiz,
}) => {
  const [nombre, setNombre] = useState('');
  const [documento, setDocumento] = useState('');
  const [email, setEmail] = useState('');
  const [especialidad, setEspecialidad] = useState('Ilustración Vectorial & Fotomontaje');
  const [tituloEvidencia, setTituloEvidencia] = useState('Pieza Gráfica Compuesta: Vector & Bitmap');
  const [linkEvidencia, setLinkEvidencia] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !documento.trim()) return;

    const id = `apr-${Date.now()}`;
    const nuevo: AprendizSena = {
      id,
      nombre: nombre.trim(),
      documento: documento.trim(),
      email: email.trim() || `${nombre.toLowerCase().replace(/\s+/g, '.')}@soy.sena.edu.co`,
      ficha: '2834591',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      especialidadInteres: especialidad,
      estadoFicha: 'En Formación',
      radarCompetencias: {
        trazadoBezier: 80,
        volumenLuces: 80,
        composicionRetoque: 80,
        colorGestion: 80,
        resolucionExport: 80,
        ordenCapas: 80,
      },
      evaluacionRap: {
        id: `eval-${id}`,
        rapId: 'rap-eje-01',
        aprendizId: id,
        fecha: new Date().toISOString().split('T')[0],
        calificador: 'Instructor Diseñador Gráfico SENA - Ficha 2834591',
        juicio: 'A',
        porcentaje: 80,
        puntuacionCriterios: {
          'crit-trazado': 80,
          'crit-luces-volumen': 80,
          'crit-fotomontaje': 80,
          'crit-resolucion-color': 80,
          'crit-organizacion-empaque': 80,
        },
        observacionesCriterios: {
          'crit-trazado': 'Pendiente de evaluación personalizada con rúbrica técnica.',
          'crit-luces-volumen': 'Pendiente de evaluación personalizada con rúbrica técnica.',
          'crit-fotomontaje': 'Pendiente de evaluación personalizada con rúbrica técnica.',
          'crit-resolucion-color': 'Pendiente de evaluación personalizada con rúbrica técnica.',
          'crit-organizacion-empaque': 'Pendiente de evaluación personalizada con rúbrica técnica.',
        },
        dictamenGeneral: 'Aprendiz registrado en la cohorte. Listo para evaluación personalizada individual.',
        fortalezas: ['Actitud formativa y entrega inicial de portafolio'],
        oportunidadesMejora: ['Ajustar especificaciones técnicas a 300 ppi y modo CMYK'],
        evidenciaAdjunta: {
          titulo: tituloEvidencia || 'Evidencia Técnica Vectorial & Bitmap',
          tipo: 'Ilustración Vectorial & Mapa de Bits',
          linkUrl: linkEvidencia || 'https://drive.google.com/drive/folders/sena-evidencia',
          formato: '.AI + .PSD + .SVG',
          resolucionReportada: '300 ppi',
          espacioColor: 'CMYK Fogra39',
          tamanoMb: 45.0,
        },
      },
    };

    onAgregarAprendiz(nuevo);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-stone-50 rounded-3xl border-3 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
        {/* Top Header */}
        <div className="p-5 bg-yellow-200 border-b-3 border-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white border-2 border-slate-900 p-0.5 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
              <img
                src={MASCOTS_90S.designer.src}
                alt="Mascota 90s"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white text-slate-900 px-2 py-0.5 rounded-full border border-slate-900">
                Ficha 2834591 · SENA
              </span>
              <h3 className="text-base font-black text-slate-900 tracking-tight">
                Registrar Nuevo Aprendiz
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white hover:bg-stone-100 text-slate-800 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
              Nombre Completo del Aprendiz *
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Blanca Isabel Cortés Bustos"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-slate-900 text-sm font-semibold text-slate-900 focus:outline-none focus:bg-amber-50 shadow-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                Documento de Identidad (CC/TI) *
              </label>
              <input
                type="text"
                required
                placeholder="Ej: 1.026.588.975"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white border-2 border-slate-900 text-sm font-semibold text-slate-900 focus:outline-none focus:bg-amber-50 shadow-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                Correo Institucional
              </label>
              <input
                type="email"
                placeholder="aprendiz@soy.sena.edu.co"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white border-2 border-slate-900 text-sm font-semibold text-slate-900 focus:outline-none focus:bg-amber-50 shadow-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
              Especialidad / Énfasis de Interés
            </label>
            <select
              value={especialidad}
              onChange={(e) => setEspecialidad(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white border-2 border-slate-900 text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer shadow-xs"
            >
              <option value="Ilustración Vectorial & Concept Art">Ilustración Vectorial & Concept Art</option>
              <option value="Composición de Mapa de Bits & Retoque Digital">Composición de Mapa de Bits & Retoque Digital</option>
              <option value="Branding & Empaque Editorial">Branding & Empaque Editorial</option>
              <option value="Modelado 3D & Arte Digital">Modelado 3D & Arte Digital</option>
              <option value="Producción Gráfica & Pre-prensa">Producción Gráfica & Pre-prensa</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
              Título de la Evidencia Entregada
            </label>
            <input
              type="text"
              placeholder="Ej: Portafolio de Personajes Vectoriales y Afiche"
              value={tituloEvidencia}
              onChange={(e) => setTituloEvidencia(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white border-2 border-slate-900 text-sm font-semibold text-slate-900 focus:outline-none focus:bg-amber-50 shadow-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
              Enlace de Soporte (Drive / Behance / ArtStation)
            </label>
            <input
              type="url"
              placeholder="https://drive.google.com/..."
              value={linkEvidencia}
              onChange={(e) => setLinkEvidencia(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white border-2 border-slate-900 text-sm font-semibold text-slate-900 focus:outline-none focus:bg-amber-50 shadow-xs"
            />
          </div>

          <div className="pt-3 border-t-2 border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white hover:bg-stone-200 text-slate-800 text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-black border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] cursor-pointer flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Registrar y Crear Botón</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
