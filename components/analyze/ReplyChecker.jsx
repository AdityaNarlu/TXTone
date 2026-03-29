import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Send, RefreshCw, ThumbsUp, ThumbsDown, Meh } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import TypingBubbles from './TypingBubbles';

function ScoreBar({ score }) {
  const color =
    score >= 70 ? 'bg-green-400' : score >= 40 ? 'bg-solar' : 'bg-red-400';
  return (
    <div className="w-full bg-muted rounded-full h-2 mt-1">
      <motion.div
        className={`${color} h-2 rounded-full`}
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    </div>
  );
}

function ScoreIcon({ score }) {
  if (score >= 70) return <ThumbsUp className="w-5 h-5 text-green-500" />;
  if (score >= 40) return <Meh className="w-5 h-5 text-solar" />;
  return <ThumbsDown className="w-5 h-5 text-red-400" />;
}

export default function ReplyChecker({ originalText, analysis }) {
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleCheck() {
    if (!reply.trim()) return;
    setLoading(true);
    setResult(null);

    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a text message expert who helps people communicate better.

Here is the original conversation someone received:
"""
${originalText}
"""

The overall vibe of that conversation was: ${analysis.vibe}
Summary of what was really going on: ${analysis.summary}

Now the user wants to reply with this message:
"""
${reply}
"""

Analyze how well this reply fits the situation. Be honest but kind. Talk like a real person, not a robot. Short sentences. No em dashes. No corporate words.

Give me:
1. match_score: A number from 0 to 100. How well does this reply match the emotional situation and what the other person was really saying?
2. tone_score: A number from 0 to 100. How well does the tone of the reply fit the vibe?
3. how_they_read_it: In 2-3 sentences, how will the other person probably read and feel about this reply? Be specific and honest.
4. what_works: One thing that is good about this reply. Keep it short.
5. what_to_improve: One thing they could tweak to make it land better. Keep it short. If the reply is great, say so.
6. overall: A one-word vibe for the reply itself (like "solid", "awkward", "cold", "sweet", "defensive", "chill", "too much", "perfect")`,
      response_json_schema: {
        type: 'object',
        properties: {
          match_score: { type: 'number' },
          tone_score: { type: 'number' },
          how_they_read_it: { type: 'string' },
          what_works: { type: 'string' },
          what_to_improve: { type: 'string' },
          overall: { type: 'string' },
        },
      },
    });

    setResult(res);
    setLoading(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-8 space-y-4"
    >
      <div className="flex items-center gap-2 border-t border-border pt-6">
        <Send className="w-4 h-4 text-mint" />
        <span className="font-semibold text-foreground">Test your reply</span>
      </div>
      <p className="text-sm text-muted-foreground">
        Type what you want to send back and we'll tell you how it'll land.
      </p>

      <div className="bg-card rounded-2xl border border-border p-4">
        <Textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="What are you thinking of saying back?"
          className="min-h-[100px] bg-transparent border-0 focus-visible:ring-0 resize-none text-foreground placeholder:text-muted-foreground/60 text-base"
        />
      </div>

      {loading ? (
        <TypingBubbles />
      ) : (
        <Button
          onClick={handleCheck}
          disabled={!reply.trim()}
          className="bg-gradient-to-r from-sky_blue to-mint hover:opacity-90 text-white rounded-full px-6 py-5 text-sm font-semibold gap-2 shadow-md shadow-sky_blue/15 disabled:opacity-40"
        >
          <Send className="w-3.5 h-3.5" />
          Check my reply
        </Button>
      )}

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Scores */}
            <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-foreground">Overall vibe of your reply</span>
                <span className="text-sm px-3 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                  {result.overall}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Fits the situation</span>
                    <div className="flex items-center gap-1.5">
                      <ScoreIcon score={result.match_score} />
                      <span className="font-semibold text-foreground">{result.match_score}%</span>
                    </div>
                  </div>
                  <ScoreBar score={result.match_score} />
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Tone match</span>
                    <div className="flex items-center gap-1.5">
                      <ScoreIcon score={result.tone_score} />
                      <span className="font-semibold text-foreground">{result.tone_score}%</span>
                    </div>
                  </div>
                  <ScoreBar score={result.tone_score} />
                </div>
              </div>
            </div>

            {/* How they'll read it */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">How they'll read it</p>
              <p className="text-foreground text-sm leading-relaxed">{result.how_they_read_it}</p>
            </div>

            {/* What works / what to improve */}
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-green-50 dark:bg-green-950/20 rounded-xl border border-green-200/60 dark:border-green-800/40 p-4">
                <p className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider mb-1">What works</p>
                <p className="text-sm text-foreground">{result.what_works}</p>
              </div>
              <div className="bg-solar/10 rounded-xl border border-solar/25 p-4">
                <p className="text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1">Could be better</p>
                <p className="text-sm text-foreground">{result.what_to_improve}</p>
              </div>
            </div>

            <button
              onClick={() => { setResult(null); setReply(''); }}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Try a different reply
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
