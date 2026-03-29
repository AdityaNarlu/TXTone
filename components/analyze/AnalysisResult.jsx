import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Lightbulb, MessageSquare } from 'lucide-react';
import ReplyChecker from './ReplyChecker';

const vibeColors = {
  chill: 'bg-sky_blue/15 text-sky_blue border-sky_blue/20',
  tense: 'bg-red-100 text-red-600 border-red-200',
  flirty: 'bg-pink-100 text-pink-600 border-pink-200',
  awkward: 'bg-solar/20 text-ink border-solar/30',
  excited: 'bg-solar/20 text-ink border-solar/30',
  sad: 'bg-blue-100 text-blue-600 border-blue-200',
  neutral: 'bg-muted text-muted-foreground border-border',
  frustrated: 'bg-orange-100 text-orange-600 border-orange-200',
  happy: 'bg-green-100 text-green-600 border-green-200',
};

function getVibeClass(vibe) {
  const key = vibe?.toLowerCase() || 'neutral';
  return vibeColors[key] || vibeColors.neutral;
}

export default function AnalysisResult({ analysis, originalText }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Vibe + Confidence */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${getVibeClass(analysis.vibe)}`}>
          {analysis.vibe}
        </span>
        <span className="text-sm text-muted-foreground">
          {analysis.confidence}% sure about this
        </span>
      </div>

      {/* Summary */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <p className="text-foreground leading-relaxed text-[1.05rem]">{analysis.summary}</p>
      </div>

      {/* Hidden Meanings */}
      {analysis.hidden_meanings?.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-foreground font-semibold">
            <MessageSquare className="w-4 h-4 text-sky_blue" />
            What they actually meant
          </div>
          <div className="space-y-2">
            {analysis.hidden_meanings.map((hm, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl border border-border p-4"
              >
                <p className="text-sm font-medium text-sky_blue mb-1">"{hm.phrase}"</p>
                <p className="text-foreground text-sm">{hm.meaning}</p>
                <div className="mt-2 w-full bg-muted rounded-full h-1.5">
                  <div
                    className="bg-sky_blue h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${hm.confidence}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Things left unsaid */}
      {analysis.things_left_unsaid?.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-foreground font-semibold">
            <AlertCircle className="w-4 h-4 text-solar" />
            Things they probably wanted to say
          </div>
          <div className="space-y-2">
            {analysis.things_left_unsaid.map((thing, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="bg-solar/10 rounded-xl px-4 py-3 border border-solar/20"
              >
                <p className="text-sm text-foreground">{thing}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Advice */}
      {analysis.advice && (
        <div className="bg-sky_blue/5 rounded-2xl border border-sky_blue/15 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-sky_blue" />
            <span className="font-semibold text-foreground text-sm">How to reply</span>
          </div>
          <p className="text-foreground text-sm leading-relaxed">{analysis.advice}</p>
        </div>
      )}

      <ReplyChecker originalText={originalText} analysis={analysis} />
    </motion.div>
  );
}
