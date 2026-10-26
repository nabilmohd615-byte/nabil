import React, { useState } from 'react';
import { Cpu, Share2, Layers, Zap, MessageSquare, Database, ArrowRight } from 'lucide-react';

interface NodeData {
  id: string;
  name: string;
  type: string;
  desc: string;
  icon: typeof Cpu;
  color: string;
  x: number;
  y: number;
}

export const SystemVisualization: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string>('ai-core');

  const nodes: NodeData[] = [
    {
      id: 'input-channels',
      name: 'Omnichannel Inbound',
      type: 'Ingestion Layer',
      desc: 'Website forms, Messenger, WhatsApp, Meta Inboxes & Webhooks seamlessly captured.',
      icon: MessageSquare,
      color: '#8B5CF6',
      x: 70,
      y: 90,
    },
    {
      id: 'ai-core',
      name: 'IVQIE AI Decision Core',
      type: 'Intelligent Processing',
      desc: 'Real-time qualification, natural language understanding, intent scoring & intelligent dispatch.',
      icon: Cpu,
      color: '#E11D48',
      x: 210,
      y: 160,
    },
    {
      id: 'crm-sync',
      name: 'Automated CRM & Sync',
      type: 'Data Infrastructure',
      desc: 'Instant lead records in HubSpot/sheets, appointment bookings & automated follow-ups.',
      icon: Database,
      color: '#0F172A',
      x: 350,
      y: 80,
    },
    {
      id: 'growth-engine',
      name: 'Campaign & Audience Engine',
      type: 'Marketing Optimization',
      desc: 'Meta Ads & Google Ads audience alignment, retargeting triggers & performance tracking.',
      icon: Zap,
      color: '#E11D48',
      x: 100,
      y: 250,
    },
    {
      id: 'social-matrix',
      name: 'Social Distribution',
      type: 'Brand Engagement',
      desc: 'Content calendar workflows, scheduled publishing, community inbox prioritization.',
      icon: Share2,
      color: '#8B5CF6',
      x: 320,
      y: 250,
    },
  ];

  const connections = [
    { from: [70, 90], to: [210, 160], active: true },
    { from: [210, 160], to: [350, 80], active: true },
    { from: [210, 160], to: [100, 250], active: true },
    { from: [210, 160], to: [320, 250], active: true },
    { from: [100, 250], to: [320, 250], active: false },
  ];

  const selected = nodes.find((n) => n.id === activeNode) || nodes[1];

  return (
    <div className="relative w-full rounded-2xl bg-white border border-neutral-200/90 shadow-md p-5 overflow-hidden transition-all">
      {/* Ambient background light gradients */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar of visualization */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-rose-600" />
          <span className="text-xs font-semibold tracking-wider uppercase text-neutral-800">
            Intelligent Systems Map
          </span>
        </div>
        <span className="text-[11px] font-mono text-neutral-500 tracking-tight">
          Active Pipeline Flow
        </span>
      </div>

      {/* SVG Interactive Canvas */}
      <div className="relative w-full aspect-[4/3] max-h-[320px] flex items-center justify-center">
        <svg
          viewBox="0 0 420 320"
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle grid pattern */}
          <defs>
            <pattern
              id="sys-grid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="12" cy="12" r="0.75" fill="#E2E8F0" />
            </pattern>
            <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E11D48" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          <rect width="420" height="320" fill="url(#sys-grid)" rx="12" opacity="0.6" />

          {/* Connection lines */}
          {connections.map((c, i) => (
            <g key={i}>
              <line
                x1={c.from[0]}
                y1={c.from[1]}
                x2={c.to[0]}
                y2={c.to[1]}
                stroke={c.active ? '#CBD5E1' : '#E2E8F0'}
                strokeWidth={c.active ? '2' : '1.5'}
                strokeDasharray={c.active ? '4 4' : 'none'}
              />
              {/* Dynamic pulsing packet along active lines */}
              {c.active && (
                <circle r="3" fill="#E11D48">
                  <animateMotion
                    path={`M${c.from[0]},${c.from[1]} L${c.to[0]},${c.to[1]}`}
                    dur={`${2.5 + i * 0.4}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          ))}

          {/* Render interactive nodes */}
          {nodes.map((node) => {
            const isSelected = activeNode === node.id;
            const isCentral = node.id === 'ai-core';

            return (
              <g
                key={node.id}
                className="cursor-pointer transition-transform"
                onClick={() => setActiveNode(node.id)}
              >
                {/* Outer halo when active or central */}
                {isSelected && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isCentral ? 32 : 24}
                    fill={node.color}
                    opacity="0.15"
                  >
                    <animate
                      attributeName="r"
                      values={isCentral ? '28;34;28' : '20;26;20'}
                      dur="2.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}

                {/* Base circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isCentral ? 22 : 16}
                  fill={isSelected ? node.color : '#FFFFFF'}
                  stroke={isSelected ? '#0F172A' : node.color}
                  strokeWidth={isSelected ? '2.5' : '2'}
                  className="transition-all duration-200"
                />

                {/* Node Label in diagram */}
                <text
                  x={node.x}
                  y={node.y + (isCentral ? 34 : 26)}
                  textAnchor="middle"
                  fill="#334155"
                  fontSize="10"
                  fontWeight={isSelected ? '700' : '500'}
                  fontFamily="Plus Jakarta Sans, sans-serif"
                >
                  {node.name.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Node Details Box */}
      <div className="mt-2 p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 transition-all">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: selected.color }}
            />
            <span className="text-xs font-bold text-neutral-900">
              {selected.name}
            </span>
          </div>
          <span className="text-[11px] text-neutral-500 font-medium">
            {selected.type}
          </span>
        </div>
        <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
          {selected.desc}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-400">
        <span>Click any node to inspect data flow</span>
        <span className="flex items-center gap-1 text-rose-600 font-semibold cursor-pointer hover:underline">
          Live automation pipeline
          <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};
