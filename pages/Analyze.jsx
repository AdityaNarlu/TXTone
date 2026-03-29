import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import AnalysisResults from "../components/AnalysisResults";

export default function Analyze() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);

    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `You are TXTone. You read between the lines in conversations and texts. You know exactly how teenagers and young people communicate today.

You know:
- "lol" is usually not about laughing, it's filler or deflection
- "k." with a period means they're mad or done with the conversation
- "haha" at the end is usually nervous energy or trying to soften something
- "it's fine" almost never means it's fine
- "whatever" usually means they care a lot
- !! or !!! = overcompensating or fake excitement
- no punctuation = comfortable, sudden punctuation = something changed
- "..." means they're hesitating, disappointed, or trailing off on purpose
- short replies after long ones = they're pulling back
- emoji stacking can cover up real feelings
- "nah you're good" can mean they're actually hurt but not saying it
- dry humor and sarcasm are everywhere and should be flagged when you see them
- "idc" usually means they definitely care
- "wdym" can be passive aggressive depending on context
- going quiet mid-convo is its own message
- leaving someone on read when they always reply fast is intentional

Analyze the conversation below. Write like a normal person. Keep sentences short. Do not use em dashes. Do not say things like "it's worth noting" or "this suggests that" or "it's important to consider." Just say what you think in plain, direct words like you're texting a friend.

Here's the conversation:
"""
${text}
"""

Return your analysis as JSON.`,
      response_json_schema: {
        type: "object",
        properties: {
          overall_tone: {
            type: "string",
            description: "2 to 4 words describing the overall vibe"
          },
          confidence: {
            type: "number",
            description: "How sure you are, 0 to 100"
          },
          hidden_meanings: {
            type: "array",
            items: {
              type: "object",
              properties: {
                phrase: { type: "string", description: "The exact phrase from the text" },
                meaning: { type: "string", description: "What it probably actually means. Say it plainly." },
                confidence: { type: "number", description: "0 to 100" }
              }
            }
          },
          emotional_undertones: {
            type: "array",
            items: {
              type: "object",
              properties: {
                emotion: { type: "string" },
                intensity: { type: "number", description: "1 to 10" },
                evidence: { type: "string", description: "Why you think this. Be specific and casual." }
              }
            }
          },
          things_left_unsaid: {
            type: "array",
            items: { type: "string" },
            description: "Things they probably wanted to say but didn't. Write each one like a normal person."
          },
          summary: {
            type: "string",
            description: "2 to 4 sentences. Be direct. Sound like a person, not a robot. No em dashes."
          }
        }
      }
    });

    const title = text.slice(0, 50) + (text.length > 50 ? "..." : "");
    await base44.entities.Analysis.create({
      title,
      input_text: text,
      overall_tone: response.overall_tone,
      confidence: response.confidence,
      hidden_meanings: response.hidden_meanings,
      emotional_undertones: response.emotional_undertones,
      things_left_unsaid: response.things_left_unsaid,
      summary: response.summary,
    });

    setResult(response);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="mb-8">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">analyze a convo</h1>
        <p className="text-muted-foreground mt-2">paste texts, DMs, emails, whatever. we'll tell you what's actually going on.</p>
      </div>

      <div className="space-y-4">
        <Textarea
          placeholder={"Paste the conversation here...\n\nExample:\n\"yeah sure whatever lol\"\n\"it's fine don't worry about it\"\n\"k.\""}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[180px] rounded-xl border-border bg-card text-sm leading-relaxed resize-none focus:ring-2 focus:ring-primary/20"
        />

        <Button
          onClick={handleAnalyze}
          disabled={!text.trim() || loading}
          className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Reading between the lines...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Analyze
            </>
          )}
        </Button>
      </div>

      <div className="mt-10">
        <AnalysisResults analysis={result} />
      </div>
    </div>
  );
}
