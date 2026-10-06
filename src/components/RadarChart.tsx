import React from 'react';
import { RadarIlustracion } from '../data/senaData';

interface RadarChartProps {
  data: RadarIlustracion;
  target?: number; // Umbral de aprobación SENA (por defecto 70)
  size?: number;
  interactive?: boolean;
  onAxisClick?: (axis: string) => void;
  title?: string;
}

const AXES: { key: keyof RadarIlustracion; label: string; icon: string }[] = [
  { key: 'trazadoBezier', label: 'Trazado Bézier & Nodos', icon: '✒️' },
  { key: 'volumenLuces', label: 'Luces & Claroscuro', icon: '💡' },
  { key: 'composicionRetoque', label: 'Máscaras & Fotomontaje', icon: '🖼️' },
  { key: 'colorGestion', label: 'Color CMYK / RGB', icon: '🎨' },
  { key: 'resolucionExport', label: 'Resolución (300 PPI)', icon: '📐' },
  { key: 'ordenCapas', label: 'Jerarquía .AI / .PSD', icon: '📂' },
];

export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  target = 70,
  size = 360,
  title,
}) => {
  const center = size / 2;
  const radius = size * 0.38;
  const numAxes = AXES.length;
  const angleStep = (Math.PI * 2) / numAxes;

  // Polar to cartesian
  const getCoordinates = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Puntos del polígono del aprendiz
  const apprenticePoints = AXES.map((axis, i) => {
    const val = data[axis.key] || 0;
    const { x, y } = getCoordinates(val, i);
    return `${x},${y}`;
  }).join(' ');

  // Puntos del polígono del umbral SENA (70%)
  const targetPoints = AXES.map((_, i) => {
    const { x, y } = getCoordinates(target, i);
    return `${x},${y}`;
  }).join(' ');

  // Anillos concéntricos
  const rings = [25, 50, 75, 100];

  return (
    <div className="flex flex-col items-center select-none">
      {title && (
        <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          {title}
        </div>
      )}

      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="overflow-visible">
          {/* Anillos concéntricos de referencia en tonos suaves */}
          {rings.map((ringVal) => {
            const ringPoints = AXES.map((_, i) => {
              const { x, y } = getCoordinates(ringVal, i);
              return `${x},${y}`;
            }).join(' ');
            return (
              <polygon
                key={ringVal}
                points={ringPoints}
                fill="none"
                stroke={ringVal === 75 ? 'rgba(22, 163, 74, 0.4)' : 'rgba(0, 0, 0, 0.1)'}
                strokeWidth={ringVal === 75 ? '1.5' : '1'}
                strokeDasharray={ringVal === 75 ? '3 3' : 'none'}
              />
            );
          })}

          {/* Ejes radiales */}
          {AXES.map((axis, i) => {
            const { x, y } = getCoordinates(100, i);
            return (
              <line
                key={axis.key}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="rgba(0, 0, 0, 0.15)"
                strokeWidth="1"
              />
            );
          })}

          {/* Polígono del Umbral de Aprobación SENA (70% - Pastel Verde) */}
          <polygon
            points={targetPoints}
            fill="rgba(34, 197, 94, 0.12)"
            stroke="#16a34a"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="opacity-80"
          />

          {/* Polígono de competencias del Aprendiz (Pastel Sky) */}
          <polygon
            points={apprenticePoints}
            fill="rgba(56, 189, 248, 0.35)"
            stroke="#0284c7"
            strokeWidth="2.5"
            className="transition-all duration-300"
          />

          {/* Puntos y valores en cada vértice */}
          {AXES.map((axis, i) => {
            const val = data[axis.key] || 0;
            const { x, y } = getCoordinates(val, i);
            const isApproved = val >= target;

            return (
              <g key={`point-${axis.key}`} className="cursor-pointer group">
                <circle
                  cx={x}
                  cy={y}
                  r="5"
                  fill={isApproved ? '#16a34a' : '#d97706'}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-transform hover:scale-125"
                />
              </g>
            );
          })}

          {/* Etiquetas exteriores de los ejes */}
          {AXES.map((axis, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const labelRadius = radius + 28;
            const x = center + labelRadius * Math.cos(angle);
            const y = center + labelRadius * Math.sin(angle);
            const val = data[axis.key] || 0;
            const isApproved = val >= target;

            return (
              <g key={`label-${axis.key}`}>
                <text
                  x={x}
                  y={y - 6}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-[11px] font-semibold fill-slate-800 font-sans"
                >
                  {axis.label}
                </text>
                <text
                  x={x}
                  y={y + 8}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`text-[11px] font-extrabold font-mono ${
                    isApproved ? 'fill-emerald-700' : 'fill-amber-700'
                  }`}
                >
                  {val}% {isApproved ? '✓' : '!'}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Leyenda comparativa en tonos pasteles */}
      <div className="flex items-center gap-6 mt-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-sky-200 border border-sky-400"></span>
          <span>Desempeño del Aprendiz</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 border-t-2 border-dashed border-emerald-600"></span>
          <span>Umbral SENA (70% - Aprobado)</span>
        </div>
      </div>
    </div>
  );
};
