import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Share2, 
  Zap, 
  MessageSquare, 
  Database, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Activity, 
  Sparkles,
  RefreshCw,
  Video
} from 'lucide-react';

export interface SystemNode {
  id: string;
  name: string;
  shortLabel: string;
  category: string;
  description: string;
  metric: string;
  metricLabel: string;
  color: string;
  glowColor: string;
  x: number;
  y: number;
  icon: typeof Cpu;
}

export const SystemVisualization: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('ai-core');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const nodes: SystemNode[] = [
    {
      id: 'omnichannel',
      name: 'Omnichannel Inbound Gateway',
      shortLabel: 'Inbound',
      category: 'Data Ingestion',
      description: 'Unified capture of WhatsApp inquiries, website leads, Meta webhooks, and direct client touchpoints with zero packet loss.',
      metric: '100%',
      metricLabel: 'Capture Rate',
      color: '#A78BFA',
      glowColor: 'rgba(167, 139, 250, 0.4)',
      x: 65,
      y: 90,
      icon: MessageSquare,
    },
    {
      id: 'ai-core',
      name: 'IVQIE Autonomous Decision Core',
      shortLabel: 'AI Core',
      category: 'Neural Orchestration',
      description: 'Proprietary reasoning engine evaluating client intent, business qualification scoring, and dynamic agent task delegation in under 120ms.',
      metric: '<120ms',
      metricLabel: 'Decision Latency',
      color: '#F43F5E',
      glowColor: 'rgba(244, 63, 94, 0.5)',
      x: 210,
      y: 155,
      icon: Cpu,
    },
    {
      id: 'crm-sync',
      name: 'Autonomous CRM & Pipeline Sync',
      shortLabel: 'CRM Sync',
      category: 'Enterprise Data',
      description: 'Zero-latency sync with HubSpot, Google Sheets, automated calendar slot reservations, and instantaneous notification routing.',
      metric: '0-Lag',
      metricLabel: 'Sync Time',
      color: '#38BDF8',
      glowColor: 'rgba(56, 189, 248, 0.4)',
      x: 355,
      y: 85,
      icon: Database,
    },
    {
      id: 'growth-engine',
      name: 'Performance Campaign Optimizer',
      shortLabel: 'Ads Engine',
      category: 'Growth Marketing',
      description: 'Algorithmic Meta and Google Ads audience alignment, real-time bid pacing, dynamic retargeting triggers, and ROAS attribution.',
      metric: '3.8x',
      metricLabel: 'Avg ROAS',
      color: '#FB7185',
      glowColor: 'rgba(251, 113, 133, 0.4)',
      x: 95,
      y: 255,
      icon: Zap,
    },
    {
      id: 'ai-video-matrix',
      name: 'AI Video Studio & Content Matrix',
      shortLabel: 'AI Video',
      category: 'Social Growth',
      description: 'Generative AI short-form video generation, automated captions, multi-format render pipelines, and viral social distribution.',
      metric: '12x',
      metricLabel: 'Output Speed',
      color: '#C084FC',
      glowColor: 'rgba(192, 132, 252, 0.4)',
      x: 325,
      y: 255,
      icon: Video,
    },
  ];

  // Pipeline connections with curved Bézier path coordinates
  const paths = [
    { from: 'omnichannel', to: 'ai-core', d: 'M 65 90 Q 130 110 210 155', active: true },
    { from: 'ai-core', to: 'crm-sync', d: 'M 210 155 Q 290 110 355 85', active: true },
    { from: 'ai-core', to: 'growth-engine', d: 'M 210 155 Q 140 210 95 255', active: true },
    { from: 'ai-core', to: 'ai-video-matrix', d: 'M 210 155 Q 280 210 325 255', active: true },
  ];

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[1];

  // Pipeline simulation sequence
  const handleTriggerSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(1);
    setActiveNodeId('omnichannel');

    setTimeout(() => {
      setSimStep(2);
      setActiveNodeId('ai-core');
    }, 900);

    setTimeout(() => {
      setSimStep(3);
      setActiveNodeId('crm-sync');
    }, 1800);

    setTimeout(() => {
      setSimStep(4);
      setActiveNodeId('ai-video-matrix');
    }, 2600);

    setTimeout(() => {
      setSimStep(5);
      setActiveNodeId('growth-engine');
    }, 3400);

    setTimeout(() => {
      setIsSimulating(false);
      setSimStep(0);
      setActiveNodeId('ai-core');
    }, 4200);
  };

  return (
    <div className="relative w-full rounded-2xl bg-[#0d121c]/95 border border-neutral-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md p-5 sm:p-6 overflow-hidden text-white group">
      
      {/* Ambient background light gradients */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-72 h-72 bg-rose-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle fine corner coordinates */}
      <div className="absolute top-3 left-3 text-[9px] font-mono text-neutral-600 select-none tracking-widest uppercase">
        SYS.NODE.IVQIE // 01
      </div>
      <div className="absolute top-3 right-3 text-[9px] font-mono text-neutral-600 select-none tracking-widest uppercase">
        LAT: 24.7136 // LON: 46.6753
      </div>

      {/* Top Header bar of visualization */}
      <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-neutral-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-neutral-200 font-['Outfit',sans-serif]">
              Intelligent Systems Map
            </h3>
            <p className="text-[10px] text-neutral-400 font-mono">
              Live Neural Architecture &amp; Data Mesh
            </p>
          </div>
        </div>

        {/* Interactive Simulation Trigger */}
        <button
          onClick={handleTriggerSimulation}
          disabled={isSimulating}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-rose-300 bg-rose-950/40 hover:bg-rose-900/40 border border-rose-500/30 hover:border-rose-500/50 transition-all cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
          title="Simulate end-to-end data packet flow"
        >
          {isSimulating ? (
            <>
              <RefreshCw className="w-3 h-3 animate-spin text-rose-400" />
              <span>Simulating...</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 fill-rose-400 text-rose-400" />
              <span>Simulate Pipeline</span>
            </>
          )}
        </button>
      </div>

      {/* SVG Interactive Canvas */}
      <div className="relative w-full aspect-[4/3] max-h-[300px] flex items-center justify-center my-1">
        <svg
          viewBox="0 0 420 320"
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Architectural Grid pattern */}
            <pattern
              id="sys-grid-elevated"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="14" cy="14" r="0.8" fill="#334155" opacity="0.6" />
              <path d="M 14 11 L 14 17 M 11 14 L 17 14" stroke="#1e293b" strokeWidth="0.5" opacity="0.4" />
            </pattern>

            {/* Glowing Linear Gradients for links */}
            <linearGradient id="stream-rose" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="stream-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.8" />
            </linearGradient>

            {/* Radial glow filter for active nodes */}
            <filter id="core-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background grid texture */}
          <rect width="420" height="320" fill="url(#sys-grid-elevated)" rx="14" />

          {/* Central IVQIE Orbital Concentric Rings */}
          <g className="pointer-events-none">
            <circle
              cx="210"
              cy="155"
              r="75"
              fill="none"
              stroke="#334155"
              strokeWidth="0.75"
              strokeDasharray="4 6"
              opacity="0.4"
            />
            <circle
              cx="210"
              cy="155"
              r="120"
              fill="none"
              stroke="#1E293B"
              strokeWidth="0.5"
              strokeDasharray="6 8"
              opacity="0.3"
            />
          </g>

          {/* Connection Bezier Paths */}
          {paths.map((p, i) => (
            <g key={i}>
              <path
                d={p.d}
                fill="none"
                stroke="#1E293B"
                strokeWidth="1.5"
              />
              <path
                d={p.d}
                fill="none"
                stroke="url(#stream-rose)"
                strokeWidth="1.25"
                strokeDasharray="3 5"
                opacity="0.75"
              />
              {/* Animated glowing telemetry packet */}
              <circle r="3.5" fill="#F43F5E" filter="url(#core-glow)">
                <animateMotion
                  path={p.d}
                  dur={`${2.8 + i * 0.5}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}

          {/* Render Interactive Nodes */}
          {nodes.map((node) => {
            const isSelected = activeNodeId === node.id;
            const isCentral = node.id === 'ai-core';

            return (
              <g
                key={node.id}
                className="cursor-pointer group/node"
                onClick={() => setActiveNodeId(node.id)}
              >
                {/* Outer dynamic halo ring when selected or central */}
                {isSelected && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isCentral ? 38 : 28}
                    fill={node.glowColor}
                    opacity="0.35"
                  >
                    <animate
                      attributeName="r"
                      values={isCentral ? '32;40;32' : '22;30;22'}
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}

                {/* Rotating orbital ticks for the central core */}
                {isCentral && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="28"
                    fill="none"
                    stroke="#F43F5E"
                    strokeWidth="1.5"
                    strokeDasharray="5 6"
                    opacity="0.7"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from={`0 ${node.x} ${node.y}`}
                      to={`360 ${node.x} ${node.y}`}
                      dur="14s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}

                {/* Core Node Circle Body */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isCentral ? 22 : 16}
                  fill={isSelected ? node.color : '#0f172a'}
                  stroke={isSelected ? '#FFFFFF' : node.color}
                  strokeWidth={isSelected ? '2.5' : '1.5'}
                  filter={isSelected ? 'url(#core-glow)' : undefined}
                  className="transition-all duration-300"
                />

                {/* Inner center dot for non-central nodes */}
                {!isCentral && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="4"
                    fill={isSelected ? '#FFFFFF' : node.color}
                  />
                )}

                {/* Central IVQIE Monogram Icon representation */}
                {isCentral && (
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="11"
                    fontWeight="800"
                    fontFamily="Outfit, sans-serif"
                    className="select-none pointer-events-none"
                  >
                    IV
                  </text>
                )}

                {/* Node Label Below */}
                <text
                  x={node.x}
                  y={node.y + (isCentral ? 38 : 26)}
                  textAnchor="middle"
                  fill={isSelected ? '#FFFFFF' : '#94A3B8'}
                  fontSize={isCentral ? '11' : '10'}
                  fontWeight={isSelected ? '700' : '600'}
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  className="select-none transition-colors"
                >
                  {node.shortLabel}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Node Real-Time Telemetry Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="mt-2 p-3.5 bg-neutral-900/90 rounded-xl border border-neutral-800/90 relative overflow-hidden"
        >
          {/* Subtle indicator bar on left */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-1 rounded-l" 
            style={{ backgroundColor: activeNode.color }} 
          />

          <div className="flex items-start justify-between gap-3 pl-1.5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white tracking-wide font-['Outfit',sans-serif]">
                  {activeNode.name}
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700/50">
                  {activeNode.category}
                </span>
              </div>
              <p className="mt-1 text-xs text-neutral-300 leading-relaxed font-light">
                {activeNode.description}
              </p>
            </div>

            {/* Live Metric Badge */}
            <div className="shrink-0 text-right pl-3 border-l border-neutral-800">
              <div 
                className="text-base sm:text-lg font-extrabold font-['Outfit',sans-serif] tracking-tight"
                style={{ color: activeNode.color }}
              >
                {activeNode.metric}
              </div>
              <div className="text-[9px] uppercase font-mono text-neutral-400">
                {activeNode.metricLabel}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Live System Console Footer */}
      <div className="mt-3 pt-2.5 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399] animate-pulse" />
          <span className="font-mono text-[10px] text-neutral-300">
            {isSimulating ? `PACKET DISPATCHING: STEP ${simStep}/5` : 'PIPELINE FLOW: AUTONOMOUS'}
          </span>
        </div>
        <span className="text-[10px] text-neutral-400 flex items-center gap-1">
          Interactive Node Map
          <ArrowRight className="w-2.5 h-2.5 text-rose-500" />
        </span>
      </div>

    </div>
  );
};
