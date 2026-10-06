import React, { useState } from 'react';
import { RadarChart } from './RadarChart';
import { AprendizSena } from '../data/senaData';
import { Award, CheckCircle2, AlertTriangle } from 'lucide-react';

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
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/85 backdrop-blur-md border border-stone-200/90 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-800 mb-1">
            <Award className="w-4 h-4 text-sky-600" />
            <span>Perfil Holístico de Ilustración Gráfica</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Radar Poligonal: Ilustración Vectorial y Mapa de Bits
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Mapeo multidimensional del aprendiz frente al estándar mínimo de aprobación del SENA (70%).
          </p>
        </div>

        {/* Apprentice Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-slate-600">Aprendiz:</label>
          <select
            value={aprendiz.id}
            onChange={(e) => {
              const found = aprendices.find((a) => a.id === e.target.value);
              if (found) {
                onSelectAprendiz(found);
                setCompetenciasSimuladas({ ...found.radarCompetencias });
              }
            }}
            className="px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 cursor-pointer"
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
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-stone-200/90 shadow-sm flex flex-col items-center justify-center">
          <RadarChart
            data={competenciasSimuladas}
            target={70}
            size={340}
            title={`Perfil de ${aprendiz.nombre}`}
          />

          <div className="mt-4 pt-4 border-t border-stone-200/80 w-full text-center">
            <button
              onClick={onEvaluarRap}
              className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm shadow-emerald-600/30 active:scale-95 cursor-pointer"
            >
              Evaluar Rúbrica en Tiempo Real
            </button>
          </div>
        </div>

        {/* Ejes Sliders & Associated RAPs (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700 px-1">
            <span>Dimensiones Técnicas de la Ilustración</span>
            <span className="text-[11px] font-normal text-slate-500">
              Desliza para simular impacto visual en tiempo real
            </span>
          </div>

          <div className="space-y-3">
            {ejesInfo.map((eje) => {
              const val = competenciasSimuladas[eje.key];
              const isApproved = val >= 70;

              return (
                <div
                  key={eje.key}
                  className={`p-4 rounded-xl border transition-all ${
                    isApproved
                      ? 'bg-emerald-50/60 border-emerald-200/90'
                      : 'bg-amber-50/70 border-amber-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{eje.label}</span>
                      <span className="text-[10px] font-mono text-slate-700 bg-white/80 border border-stone-200 px-2 py-0.5 rounded">
                        {eje.herramienta}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-extrabold font-mono ${
                          isApproved ? 'text-emerald-700' : 'text-amber-700'
                        }`}
                      >
                        {val}%
                      </span>
                      {isApproved ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                    {eje.descripcion}
                  </p>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={val}
                    onChange={(e) => handleSliderChange(eje.key, Number(e.target.value))}
                    className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
