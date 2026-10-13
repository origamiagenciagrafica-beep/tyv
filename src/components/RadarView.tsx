import React, { useState } from 'react';
import { RadarChart } from './RadarChart';
import { AprendizSena } from '../data/senaData';
import { Award, CheckCircle2, AlertTriangle, Sparkles, Wand2 } from 'lucide-react';
import { MASCOTS_90S } from '../assets/mascots';

interface RadarViewProps {
  aprendiz: AprendizSena;
  aprendices: AprendizSena[];
  onSelectAprendiz: (aprendiz: AprendizSena) => void;
  onEvaluarRap: () => void;
}

export const RadarView: React.FC<RadarViewProps> = ({
  aprendiz,
  aprendices,
  onSelectAprendiz,
  onEvaluarRap,
}) => {
  // Simulador interactivo local de competencias
  const [competenciasSimuladas, setCompetenciasSimuladas] = useState({
    ...aprendiz.radarCompetencias,
  });

  const handleSliderChange = (eje: keyof typeof competenciasSimuladas, val: number) => {
    setCompetenciasSimuladas((prev) => ({
      ...prev,
      [eje]: val,
    }));
  };

  const ejesInfo: {
    key: keyof typeof competenciasSimuladas;
    label: string;
    herramienta: string;
    descripcion: string;
  }[] = [
    {
      key: 'trazadoBezier',
      label: 'Trazado Bézier & Curvatura',
      herramienta: 'Pluma / Nodos Vectoriales (.AI / .SVG)',
      descripcion: 'Nodos mínimos optimizados, tangentes alineadas sin esquinas involuntarias y siluetas cerradas.',
    },
    {
      key: 'volumenLuces',
      label: 'Luces, Sombras & Volumen',
      herramienta: 'Mallas de Degradado / Claroscuro',
      descripcion: 'Modelado tonal con claroscuro, sombras de oclusión y sensación de volumen tridimensional.',
    },
    {
      key: 'composicionRetoque',
      label: 'Máscaras & Fotomontaje',
      herramienta: 'Máscaras de Capa No Destructivas (.PSD)',
      descripcion: 'Integración natural de elementos rasterizados, calado suave y retoque sin halos de selección.',
    },
    {
      key: 'colorGestion',
      label: 'Color CMYK / RGB & Perfiles',
      herramienta: 'Fogra39 / sRGB / Cobertura TIC',
      descripcion: 'Gestión cromática para salida gráfica, verificación de suma de tintas (<300%) y fidelidad de tonos.',
    },
    {
      key: 'resolucionExport',
      label: 'Resolución & Salida Técnica',
      herramienta: '300 PPI Nativo / 144 PPI Web',
      descripcion: 'Ausencia de pixelación o reescalados destructivos, nitidez de líneas y exportación en formatos maestros.',
    },
    {
      key: 'ordenCapas',
      label: 'Jerarquía de Capas & Empaque',
      herramienta: 'Subcapas / Grupos / Nomenclatura',
      descripcion: 'Organización profesional de capas, enlaces incrustados/empaquetados y orden de lectura.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner with 90s Cartoon Styling */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white/90 backdrop-blur-md border-3 border-slate-900 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-sky-900 mb-1">
            <span className="bg-sky-200 text-sky-950 px-2.5 py-0.5 rounded-full border border-slate-900 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
              Perfil Holístico de Ilustración Gráfica
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Radar Poligonal: Ilustración Vectorial y Mapa de Bits
          </h2>
          <p className="text-xs text-slate-600 mt-0.5 font-medium">
            Mapeo multidimensional del aprendiz frente al estándar mínimo de aprobación del SENA (70%).
          </p>
        </div>

        {/* Apprentice Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-black text-slate-700">Aprendiz:</label>
          <select
            value={aprendiz.id}
            onChange={(e) => {
              const found = aprendices.find((a) => a.id === e.target.value);
              if (found) {
                onSelectAprendiz(found);
                setCompetenciasSimuladas({ ...found.radarCompetencias });
              }
            }}
            className="px-3 py-1.5 rounded-xl bg-white border-2 border-slate-900 text-xs font-black text-slate-900 focus:outline-none focus:border-emerald-500 cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
          >
            {aprendices.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Radar on the left, Axis sliders on the right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Chart Display (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white/95 backdrop-blur-md border-3 border-slate-900 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] flex flex-col items-center justify-center">
          <RadarChart
            data={competenciasSimuladas}
            target={70}
            size={340}
            title={`Perfil de ${aprendiz.nombre}`}
          />

          <div className="mt-4 pt-4 border-t-2 border-slate-200 w-full text-center">
            <button
              onClick={onEvaluarRap}
              className="py-2.5 px-4 rounded-2xl bg-emerald-400 hover:bg-emerald-500 text-slate-950 text-xs font-black uppercase tracking-wider transition-all shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] border-2 border-slate-900 active:scale-95 cursor-pointer"
            >
              Evaluar Rúbrica en Tiempo Real
            </button>
          </div>
        </div>

        {/* Ejes Sliders & Associated RAPs (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-800 px-1">
            <span>Dimensiones Técnicas de la Ilustración</span>
            <span className="text-[11px] font-bold text-slate-600 bg-yellow-200 px-2 py-0.5 rounded-full border border-slate-900">
              Desliza para simular impacto visual
            </span>
          </div>

          <div className="space-y-3">
            {ejesInfo.map((eje) => {
              const val = competenciasSimuladas[eje.key];
              const isApproved = val >= 70;

              return (
                <div
                  key={eje.key}
                  className={`p-4 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all ${
                    isApproved
                      ? 'bg-emerald-50/80'
                      : 'bg-amber-50/80'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-slate-900">{eje.label}</span>
                      <span className="text-[10px] font-mono font-bold text-slate-800 bg-white border border-slate-900 px-2 py-0.5 rounded-full">
                        {eje.herramienta}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-black font-mono ${
                          isApproved ? 'text-emerald-800' : 'text-amber-800'
                        }`}
                      >
                        {val}%
                      </span>
                      {isApproved ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-700" />
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 mb-2 leading-relaxed font-medium">
                    {eje.descripcion}
                  </p>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={val}
                    onChange={(e) => handleSliderChange(eje.key, Number(e.target.value))}
                    className="w-full h-2 bg-white border-2 border-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              );
            })}
          </div>

          {/* 90s Cartoon Mentor Tips Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-yellow-100 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white border-2 border-slate-900 p-0.5 shrink-0 overflow-hidden">
                <img
                  src={MASCOTS_90S.bezierPen.src}
                  alt="Pen-Tooly"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="text-xs">
                <strong className="block text-slate-950 font-black">Tip de Pen-Tooly:</strong>
                <span className="text-slate-700 font-medium text-[11px]">
                  Evita exceso de puntos de ancla. ¡Menos nodos = curvas más fluidas!
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-sky-100 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white border-2 border-slate-900 p-0.5 shrink-0 overflow-hidden">
                <img
                  src={MASCOTS_90S.pixelBrush.src}
                  alt="Pixel & Brush"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="text-xs">
                <strong className="block text-slate-950 font-black">Tip de Pixel & Brush:</strong>
                <span className="text-slate-700 font-medium text-[11px]">
                  Siempre usa máscaras de capa no destructivas a 300 ppi para imprenta.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
