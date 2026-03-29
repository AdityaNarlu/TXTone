import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ChevronRight, Trash2 } from 'lucide-react';

const vibeGlows = {
  chill: 'border-l-sky_blue',
  tense: 'border-l-red-400',
  flirty: 'border-l-pink-400',
  awkward: 'border-l-solar',
  excited: 'border-l-solar',
  sad: 'border-l-blue-400',
  neutral: 'border-l-muted-foreground',
  frustrated: 'border-l-orange-400',
  happy: 'border-l-green-400',
};

function getGlow(vibe) {
  const key = vibe?.toLowerCase() || 'neutral';
  return vibeGlows[key] || vibeGlows.neutral;
}

export default function HistoryCard({ analysis, index, onDelete }) {
  const [confirming, setConfirming] = useState(false);
  const preview = analysis.original_text?.slice(0, 100) + (analysis.original_text?.length > 100 ? '...' : '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <div className="relative group">
        <Link
          to={`/analyze?id=${analysis.id}`}
          className={`block bg-card rounded-2xl border border-border border-l-4 ${getGlow(analysis.vibe)} p-5 hover:shadow-md hover:shadow-sky_blue/5 transition-all duration-300`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {analysis.vibe || 'unknown'}
                </span>
                <span className="text-xs text-muted-foreground">
                  {analysis.confidence}% sure
                </span>
              </div>
              <p className="text-sm text-foreground mb-1.5 line-clamp-2">{preview}</p>
              <p className="text-xs text-muted-foreground">
                {analysis.created_date ? format(new Date(analysis.created_date), 'MMM d, yyyy') : ''}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground mt-1 group-hover:text-sky_blue transition-colors" />
          </div>
        </Link>

        {/* Delete button */}
        {confirming ? (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-card border border-border rounded-full px-3 py-1 shadow-sm">
            <span className="text-xs text-muted-foreground">Delete?</span>
            <button
              onClick={() => onDelete(analysis.id)}
              className="text-xs font-semibold text-red-500 hover:text-red-600"
            >
              Yes
            </button>
            <span className="text-muted-foreground/40 text-xs">·</span>
            <button
              onClick={() => setConfirming(false)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              No
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => { e.preventDefault(); setConfirming(true); }}
            className="absolute top-3 right-10 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full hover:bg-red-50 text-muted-foreground hover:text-red-500"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
