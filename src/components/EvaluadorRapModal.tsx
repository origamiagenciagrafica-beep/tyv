import React, { useState, useEffect } from 'react';
import {
  X,
  Zap,
  Sparkles,
  CheckCircle2,
  AlertOctagon,
  Sliders,
  ExternalLink,
  Printer,
  Info,
} from 'lucide-react';
import {
  AprendizSena,
  CATALOGO_RAPS,
  EvaluacionRegistro,
  RapItem,
} from '../data/senaData';
import {
  calcularEvaluacionAutomatica,
  evaluarConGeminiServidor,
  EvaluacionResultadoCalculado,
} from '../utils/evaluationEngine';

interface EvaluadorRapModalProps {
  isOpen: boolean;
  onClose: () => void;
  rapInicial?: RapItem;
  aprendizInicial?: AprendizSena;
  aprendices: AprendizSena[];
  onGuardarEvaluacion: (evaluacion: EvaluacionRegistro) => void;
  onAbrirActa: (evaluacion: EvaluacionRegistro, rap: RapItem, aprendiz: AprendizSena) => void;
}

export const EvaluadorRapModal: React.FC<EvaluadorRapModalProps> = ({
  isOpen,
  onClose,
  rapInicial,
  aprendizInicial,
  aprendices,
  onGuardarEvaluacion,
  onAbrirActa,
}) => {
  const [rapSeleccionado, setRapSeleccionado] = useState<RapItem>(
    rapInicial || CATALOGO_RAPS[0]
  );
  const [aprendizSeleccionado, setAprendizSeleccionado] = useState<AprendizSena>(
    aprendizInicial || aprendices[0]
  );

  const [modo, setModo] = useState<'rubrica' | 'ia'>('rubrica');

  // Puntuaciones de criterios (0 a 100)
  const [puntuaciones, setPuntuaciones] = useState<Record<string, number>>({});
  const [observaciones, setObservaciones] = useState<Record<string, string>>({});

  // Campos para modo IA
  const [tituloEvidencia, setTituloEvidencia] = useState('Ilustración Vectorial y Fotomontaje');
  const [tipoEvidencia, setTipoEvidencia] = useState('Ilustración Vectorial & Fotomontaje');
  const [enlaceSoporte, setEnlaceSoporte] = useState('https://www.behance.net/gallery/sena-ilustracion-vectorial');
  const [descripcionEvidencia, setDescripcionEvidencia] = useState(
    'Set de ilustración vectorial en curvas bézier con degradados tonales y composición de fotomontaje en mapa de bits con máscaras de capa no destructivas en 300 ppi nativo.'
  );
  const [especificacionesTecnicas, setEspecificacionesTecnicas] = useState(
    'Resolución: 300 ppi (Impreso) / 144 ppi (Web) | Espacio: CMYK Fogra39 | Formato: .AI + .PSD + .SVG'
  );

  const [isLoadingIA, setIsLoadingIA] = useState(false);
  const [resultadoCalculado, setResultadoCalculado] = useState<EvaluacionResultadoCalculado | null>(null);
  const [mensajeExito, setMensajeExito] = useState(false);

  useEffect(() => {
    if (rapInicial) setRapSeleccionado(rapInicial);
  }, [rapInicial]);

  useEffect(() => {
    if (aprendizInicial) setAprendizSeleccionado(aprendizInicial);
  }, [aprendizInicial]);

  useEffect(() => {
    const evalExistente = aprendizSeleccionado.evaluacionRap;
    if (evalExistente) {
      setPuntuaciones(evalExistente.puntuacionCriterios);
      setObservaciones(evalExistente.observacionesCriterios || {});
    } else {
      const initPuntajes: Record<string, number> = {};
      rapSeleccionado.criterios.forEach((c) => {
        initPuntajes[c.id] = 85;
      });
      setPuntuaciones(initPuntajes);
      setObservaciones({});
    }
  }, [rapSeleccionado, aprendizSeleccionado]);

  // Recalcula en tiempo real
  useEffect(() => {
    const res = calcularEvaluacionAutomatica(
      rapSeleccionado,
      puntuaciones,
      observaciones,
      aprendizSeleccionado.nombre
    );
    setResultadoCalculado(res);
  }, [rapSeleccionado, puntuaciones, observaciones, aprendizSeleccionado]);

  if (!isOpen || !resultadoCalculado) return null;

  const handleSliderChange = (criterioId: string, valor: number) => {
    setPuntuaciones((prev) => ({
      ...prev,
      [criterioId]: valor,
    }));
  };

  const aplicarPreset = (tipo: 'sobresaliente' | 'aprobado' | 'deficiente' | 'critico_fallido') => {
    const nuevosPuntajes: Record<string, number> = {};
    rapSeleccionado.criterios.forEach((c) => {
      if (tipo === 'sobresaliente') {
        nuevosPuntajes[c.id] = 95;
      } else if (tipo === 'aprobado') {
        nuevosPuntajes[c.id] = 75;
      } else if (tipo === 'deficiente') {
        nuevosPuntajes[c.id] = 55;
      } else if (tipo === 'critico_fallido') {
        nuevosPuntajes[c.id] = c.esCritico ? 45 : 85;
      }
    });
    setPuntuaciones(nuevosPuntajes);
  };

  const handleEjecutarEvaluacionIA = async () => {
    setIsLoadingIA(true);
    try {
      const resp = await evaluarConGeminiServidor({
        rapTitle: `${rapSeleccionado.codigo} - ${rapSeleccionado.titulo}`,
        phase: rapSeleccionado.faseTitulo,
        criteria: rapSeleccionado.criterios,
        evidenceDetails: {
          titulo: tituloEvidencia || `Evidencia para ${rapSeleccionado.codigo}`,
          descripcion: descripcionEvidencia,
          enlaceSoporte,
          especificacionesTecnicas,
        },
        apprenticeName: aprendizSeleccionado.nombre,
      });

      if (resp.success && resp.evaluation) {
        const evalData = resp.evaluation;

        const nuevosPuntajes: Record<string, number> = {};
        const nuevasObs: Record<string, string> = {};

        rapSeleccionado.criterios.forEach((c) => {
          const matchingCriteria = evalData.criteriosEvaluados?.find(
            (ce: any) => ce.nombre.toLowerCase().includes(c.nombre.toLowerCase()) || c.nombre.toLowerCase().includes(ce.nombre.toLowerCase())
          );

          if (matchingCriteria) {
            if (matchingCriteria.cumplimiento === 'Cumple') {
              nuevosPuntajes[c.id] = Math.max(80, evalData.porcentaje || 85);
            } else if (matchingCriteria.cumplimiento === 'Parcial') {
              nuevosPuntajes[c.id] = 68;
            } else {
              nuevosPuntajes[c.id] = 45;
            }
            nuevasObs[c.id] = matchingCriteria.observacion || '';
          } else {
            nuevosPuntajes[c.id] = evalData.porcentaje || 80;
          }
        });

        setPuntuaciones(nuevosPuntajes);
        setObservaciones(nuevasObs);

        setResultadoCalculado({
          juicio: evalData.juicio as any,
          porcentaje: evalData.porcentaje,
          nivelDesempeno: evalData.nivelDesempeno || (evalData.juicio === 'A' ? 'Sobresaliente' : 'Deficiente'),
          cumpleCriteriosCriticos: evalData.juicio === 'A',
          criteriosEvaluados: rapSeleccionado.criterios.map((c) => ({
            id: c.id,
            nombre: c.nombre,
            peso: c.peso,
            puntaje: nuevosPuntajes[c.id] || 80,
            esCritico: c.esCritico,
            cumplimiento: (nuevosPuntajes[c.id] >= 70 ? 'Cumple' : nuevosPuntajes[c.id] >= 60 ? 'Parcial' : 'No Cumple') as any,
            observacion: nuevasObs[c.id] || 'Evaluado con asistencia del modelo de IA formativa SENA.',
          })),
          fortalezas: evalData.fortalezas || ['Cumplimiento de objetivos técnicos'],
          oportunidadesMejora: evalData.oportunidadesMejora || ['Ajustar detalles de exportación'],
          dictamenGeneral: evalData.dictamenGeneral,
          planMejoramientoSugerido:
            evalData.juicio === 'D'
              ? {
                  requerido: true,
                  acciones: Array.isArray(evalData.planMejoramiento)
                    ? evalData.planMejoramiento
                    : [evalData.planMejoramiento || 'Corregir evidencia según criterios observados'],
                  fechaLimiteRecomendada: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
                }
              : undefined,
        });

        setModo('rubrica');
      }
    } catch (err) {
      console.error('Error evaluando con IA:', err);
    } finally {
      setIsLoadingIA(false);
    }
  };

  const handleGuardar = () => {
    const registro: EvaluacionRegistro = {
      id: `eval-${Date.now()}`,
      rapId: rapSeleccionado.id,
      aprendizId: aprendizSeleccionado.id,
      fecha: new Date().toISOString().split('T')[0],
      calificador: 'Instructor Diseñador Gráfico SENA - Ficha 2834591',
      juicio: resultadoCalculado.juicio,
      porcentaje: resultadoCalculado.porcentaje,
      puntuacionCriterios: puntuaciones,
      observacionesCriterios: observaciones,
      dictamenGeneral: resultadoCalculado.dictamenGeneral,
      fortalezas: resultadoCalculado.fortalezas,
      oportunidadesMejora: resultadoCalculado.oportunidadesMejora,
      planMejoramiento: resultadoCalculado.planMejoramientoSugerido
        ? {
            requerido: true,
            acciones: resultadoCalculado.planMejoramientoSugerido.acciones,
            fechaConcertacion: new Date().toISOString().split('T')[0],
            fechaEntrega: resultadoCalculado.planMejoramientoSugerido.fechaLimiteRecomendada,
            estado: 'Asignado',
          }
        : undefined,
      evidenciaAdjunta: {
        titulo: tituloEvidencia || `Evidencia Técnica ${rapSeleccionado.codigo}`,
        tipo: tipoEvidencia,
        linkUrl: enlaceSoporte,
        formato: 'Adobe Illustrator (.ai) + Photoshop (.psd) + SVG',
        resolucionReportada: '300 ppi',
        espacioColor: 'CMYK Fogra39 / sRGB',
        tamanoMb: 45.2,
      },
    };

    onGuardarEvaluacion(registro);
    setMensajeExito(true);
    setTimeout(() => {
      setMensajeExito(false);
      onClose();
    }, 1200);
  };

  const isAprobado = resultadoCalculado.juicio === 'A';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-stone-50 border border-stone-300 rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Modal Topbar in Pastel Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Evaluador de Ilustración Vectorial y Mapa de Bits
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Tecnólogo en Desarrollo de Medios Gráficos Visuales</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-semibold font-mono">RAP_EJE_01</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls Bar: Selector de Aprendiz y RAP */}
        <div className="p-4 sm:p-6 bg-stone-100/70 border-b border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              1. Seleccionar Aprendiz de la Ficha
            </label>
            <select
              value={aprendizSeleccionado.id}
              onChange={(e) => {
                const found = aprendices.find((a) => a.id === e.target.value);
                if (found) setAprendizSeleccionado(found);
              }}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-sm text-slate-900 focus:outline-none focus:border-emerald-500 cursor-pointer shadow-xs"
            >
              {aprendices.map((ap) => (
                <option key={ap.id} value={ap.id}>
                  {ap.nombre} — Doc: {ap.documento} ({ap.especialidadInteres})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              2. Resultado de Aprendizaje
            </label>
            <div className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-sm text-slate-900 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2 truncate">
                <span className="font-mono text-emerald-800 font-bold bg-emerald-100 px-1.5 py-0.2 rounded text-xs">
                  [{rapSeleccionado.codigo}]
                </span>
                <span className="truncate font-semibold">{rapSeleccionado.titulo}</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500 shrink-0">72 Horas</span>
            </div>
          </div>
        </div>

        {/* RAP Details Banner */}
        <div className="px-6 py-3 bg-white border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              {rapSeleccionado.codigo}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-slate-700 font-medium">{rapSeleccionado.competencia}</span>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg border border-stone-200">
            <button
              onClick={() => setModo('rubrica')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                modo === 'rubrica'
                  ? 'bg-white text-emerald-900 shadow-xs border border-stone-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-emerald-600" />
              <span>Rúbrica Interactiva</span>
            </button>

            <button
              onClick={() => setModo('ia')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                modo === 'ia'
                  ? 'bg-white text-sky-900 shadow-xs border border-stone-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Auditoría con IA</span>
            </button>
          </div>
        </div>

        {/* Modal Main Content: Split into Editor and Live Results */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-h-[64vh] overflow-y-auto">
          {/* Left Column: Criteria Sliders or IA Form (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {modo === 'rubrica' ? (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Criterios Específicos de Evaluación ({rapSeleccionado.criterios.length})
                  </h3>

                  {/* Presets Bar in Pastel */}
                  <div className="flex items-center gap-1 text-[11px]">
                    <span className="text-slate-500 mr-1">Presets:</span>
                    <button
                      onClick={() => aplicarPreset('sobresaliente')}
                      className="px-2 py-0.5 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-medium transition-colors border border-emerald-200"
                      title="Sobresaliente (95%)"
                    >
                      Sobresaliente
                    </button>
                    <button
                      onClick={() => aplicarPreset('aprobado')}
                      className="px-2 py-0.5 rounded bg-sky-100 hover:bg-sky-200 text-sky-900 font-medium transition-colors border border-sky-200"
                      title="Aprobado Mínimo (75%)"
                    >
                      Aprobado
                    </button>
                    <button
                      onClick={() => aplicarPreset('deficiente')}
                      className="px-2 py-0.5 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 font-medium transition-colors border border-amber-200"
                      title="Deficiente (55%)"
                    >
                      Deficiente
                    </button>
                    <button
                      onClick={() => aplicarPreset('critico_fallido')}
                      className="px-2 py-0.5 rounded bg-rose-100 hover:bg-rose-200 text-rose-900 font-medium transition-colors border border-rose-200"
                      title="Fallo en Criterio Crítico"
                    >
                      Crítico ✗
                    </button>
                  </div>
                </div>

                {/* Criteria Sliders List */}
                <div className="space-y-3">
                  {rapSeleccionado.criterios.map((criterio) => {
                    const puntajeActual = puntuaciones[criterio.id] ?? 70;
                    const isCritico = criterio.esCritico;
                    const fallsBelowThreshold = puntajeActual < 60;

                    return (
                      <div
                        key={criterio.id}
                        className={`p-4 rounded-xl border transition-all ${
                          isCritico && fallsBelowThreshold
                            ? 'bg-rose-50/80 border-rose-300'
                            : puntajeActual >= 70
                            ? 'bg-white border-stone-200 shadow-xs'
                            : 'bg-amber-50/70 border-amber-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-1.5">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-900">
                                {criterio.nombre}
                              </span>
                              {isCritico && (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-100 border border-rose-300 px-1.5 py-0.2 rounded">
                                  Crítico
                                </span>
                              )}
                              <span className="text-xs text-slate-500 font-mono">
                                Peso: {criterio.peso}%
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                              {criterio.descripcion}
                            </p>
                          </div>

                          <div className="text-right shrink-0">
                            <span
                              className={`text-base font-black font-mono ${
                                puntajeActual >= 80
                                  ? 'text-emerald-700'
                                  : puntajeActual >= 70
                                  ? 'text-sky-700'
                                  : puntajeActual >= 60
                                  ? 'text-amber-700'
                                  : 'text-rose-700'
                              }`}
                            >
                              {puntajeActual}%
                            </span>
                          </div>
                        </div>

                        {/* Interactive Slider */}
                        <div className="mt-3">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={puntajeActual}
                            onChange={(e) => handleSliderChange(criterio.id, Number(e.target.value))}
                            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                          />
                          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                            <span>0% (Sin evidencia)</span>
                            <span className="text-amber-700 font-bold">60% Mínimo Crítico</span>
                            <span className="text-emerald-700 font-bold">70% Umbral SENA</span>
                            <span>100% (Sobresaliente)</span>
                          </div>
                        </div>

                        {/* Observación breve */}
                        <div className="mt-2.5 pt-2 border-t border-stone-200/80 text-xs text-slate-600 flex items-center justify-between">
                          <span className="italic text-[11px]">
                            {resultadoCalculado.criteriosEvaluados.find((ce) => ce.id === criterio.id)?.observacion}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              /* Modo IA: Formulario de Evidencia */
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-700">
                    <strong className="text-sky-950 block mb-0.5">Auditoría con Modelo Gemini 3.8 Flash</strong>
                    El asistente evalúa la precisión vectorial, resolución nativa (300 ppi), máscaras no destructivas y perfiles de color de acuerdo con las directrices oficiales del SENA.
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Título de la Evidencia Gráfica
                  </label>
                  <input
                    type="text"
                    value={tituloEvidencia}
                    onChange={(e) => setTituloEvidencia(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-sm text-slate-900 focus:outline-none focus:border-sky-500 shadow-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Tipo de Formato Entregado
                    </label>
                    <select
                      value={tipoEvidencia}
                      onChange={(e) => setTipoEvidencia(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs text-slate-900 focus:outline-none shadow-xs"
                    >
                      <option value="Ilustración Vectorial & Fotomontaje">Ilustración Vectorial & Fotomontaje (.AI / .PSD / .SVG)</option>
                      <option value="Pieza Gráfica Vectorial Pura">Pieza Gráfica Vectorial Pura (SVG/AI)</option>
                      <option value="Composición de Mapa de Bits">Composición de Mapa de Bits (PSD con capas)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Enlace de Repositorio o Behance
                    </label>
                    <input
                      type="url"
                      value={enlaceSoporte}
                      onChange={(e) => setEnlaceSoporte(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs text-slate-900 focus:outline-none shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Descripción del Trabajo y Solución Gráfica
                  </label>
                  <textarea
                    rows={3}
                    value={descripcionEvidencia}
                    onChange={(e) => setDescripcionEvidencia(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-xs text-slate-900 focus:outline-none focus:border-sky-500 resize-none shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Especificaciones Técnicas Reportadas (Resolución, Color, Capas)
                  </label>
                  <input
                    type="text"
                    value={especificacionesTecnicas}
                    onChange={(e) => setEspecificacionesTecnicas(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-xs text-slate-900 focus:outline-none shadow-xs"
                  />
                </div>

                <button
                  type="button"
                  disabled={isLoadingIA}
                  onClick={handleEjecutarEvaluacionIA}
                  className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-sky-600/30"
                >
                  {isLoadingIA ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Analizando criterios técnicos de ilustración...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-white" />
                      <span>Ejecutar Auditoría con IA y Generar Juicio</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Live Calculated Result & SENA Verdict (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-stone-300 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Dictamen Automatizado SENA
                </span>
                <span className="text-xs font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Umbral: 70%
                </span>
              </div>

              {/* Big Juicio Card in Pastel Tones */}
              <div
                className={`p-5 rounded-xl border-2 text-center transition-all ${
                  isAprobado
                    ? 'bg-emerald-50/90 border-emerald-300 shadow-xs'
                    : 'bg-amber-50/90 border-amber-300 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  {isAprobado ? (
                    <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                  ) : (
                    <AlertOctagon className="w-7 h-7 text-amber-600" />
                  )}
                  <span
                    className={`text-3xl font-black tracking-tight ${
                      isAprobado ? 'text-emerald-900' : 'text-amber-900'
                    }`}
                  >
                    JUICIO: {resultadoCalculado.juicio}
                  </span>
                </div>

                <div
                  className={`text-sm font-bold uppercase tracking-wider ${
                    isAprobado ? 'text-emerald-800' : 'text-amber-800'
                  }`}
                >
                  {isAprobado ? 'APROBADO' : 'NO APROBADO (DEFICIENTE)'}
                </div>

                <div className="mt-3 flex items-center justify-center gap-4 text-xs font-mono">
                  <div className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 shadow-2xs">
                    <span className="text-slate-500 block text-[10px]">Puntaje Final</span>
                    <span className="text-lg font-black text-slate-900">{resultadoCalculado.porcentaje}%</span>
                  </div>

                  <div className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 shadow-2xs">
                    <span className="text-slate-500 block text-[10px]">Nivel</span>
                    <span className="text-sm font-bold text-slate-900">{resultadoCalculado.nivelDesempeno}</span>
                  </div>
                </div>

                {!resultadoCalculado.cumpleCriteriosCriticos && (
                  <div className="mt-3 text-[11px] font-bold text-rose-900 bg-rose-100 border border-rose-300 py-1.5 px-3 rounded-lg">
                    ⚠️ Incumplimiento en Criterio Crítico Excluyente
                  </div>
                )}
              </div>

              {/* Dictamen General Text */}
              <div className="text-xs text-slate-700 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Observación Cualitativa Oficial:
                </span>
                {resultadoCalculado.dictamenGeneral}
              </div>

              {/* Fortalezas & Oportunidades */}
              <div className="space-y-2 text-xs">
                {resultadoCalculado.fortalezas.length > 0 && (
                  <div>
                    <span className="font-bold text-emerald-800 block mb-1">Fortalezas Identificadas:</span>
                    <ul className="space-y-1 text-slate-700 list-disc list-inside">
                      {resultadoCalculado.fortalezas.slice(0, 2).map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {resultadoCalculado.oportunidadesMejora.length > 0 && (
                  <div>
                    <span className="font-bold text-amber-800 block mb-1">Puntos a Corregir:</span>
                    <ul className="space-y-1 text-slate-700 list-disc list-inside">
                      {resultadoCalculado.oportunidadesMejora.slice(0, 2).map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Plan de Mejoramiento Formativo (Si D) */}
              {resultadoCalculado.planMejoramientoSugerido && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs">
                  <div className="flex items-center gap-1.5 text-amber-900 font-bold uppercase tracking-wider text-[11px] mb-1.5">
                    <Info className="w-3.5 h-3.5 text-amber-700" />
                    <span>Plan de Mejoramiento Formativo Asignado</span>
                  </div>
                  <p className="text-slate-800 mb-2">
                    Plazo de entrega de evidencia corregida:{' '}
                    <strong className="text-slate-900 font-mono">
                      {resultadoCalculado.planMejoramientoSugerido.fechaLimiteRecomendada}
                    </strong>
                  </p>
                  <ul className="space-y-1 text-amber-950 list-disc list-inside text-[11px]">
                    {resultadoCalculado.planMejoramientoSugerido.acciones.map((acc, i) => (
                      <li key={i}>{acc}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleGuardar}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-emerald-600/30"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{mensajeExito ? '¡Guardado con Éxito!' : 'Registrar Juicio Evaluativo'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const regSim: EvaluacionRegistro = {
                    id: 'preview',
                    rapId: rapSeleccionado.id,
                    aprendizId: aprendizSeleccionado.id,
                    fecha: new Date().toISOString().split('T')[0],
                    calificador: 'Instructor Evaluador SENA',
                    juicio: resultadoCalculado.juicio,
                    porcentaje: resultadoCalculado.porcentaje,
                    puntuacionCriterios: puntuaciones,
                    observacionesCriterios: observaciones,
                    dictamenGeneral: resultadoCalculado.dictamenGeneral,
                    fortalezas: resultadoCalculado.fortalezas,
                    oportunidadesMejora: resultadoCalculado.oportunidadesMejora,
                    planMejoramiento: resultadoCalculado.planMejoramientoSugerido
                      ? {
                          requerido: true,
                          acciones: resultadoCalculado.planMejoramientoSugerido.acciones,
                          fechaConcertacion: new Date().toISOString().split('T')[0],
                          fechaEntrega: resultadoCalculado.planMejoramientoSugerido.fechaLimiteRecomendada,
                          estado: 'Asignado',
                        }
                      : undefined,
                  };
                  onAbrirActa(regSim, rapSeleccionado, aprendizSeleccionado);
                }}
                className="px-4 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-800 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer border border-stone-300"
                title="Ver e imprimir acta formal"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                <span>Acta SENA</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
