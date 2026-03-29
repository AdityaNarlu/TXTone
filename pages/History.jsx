import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Clock, ChevronRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import moment from "moment";
import AnalysisResults from "../components/AnalysisResults";

export default function History() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await base44.entities.Analysis.list("-created_date", 50);
    setAnalyses(data);
    setLoading(false);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    await base44.entities.Analysis.delete(id);
    setAnalyses((prev) => prev.filter((a) => a.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (selected) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to history
        </button>

        <div className="mb-6">
          <h2 className="font-heading text-xl font-semibold">{selected.title}</h2>
          <p className="text-xs text-muted-foreground mt-1">{moment(selected.created_date).format("MMM D, YYYY [at] h:mm a")}</p>
        </div>

        <div className="bg-muted/50 rounded-xl p-4 mb-8">
          <p className="text-sm whitespace-pre-wrap leading-relaxed">{selected.input_text}</p>
        </div>

        <AnalysisResults analysis={selected} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="mb-8">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">history</h1>
        <p className="text-muted-foreground mt-2">your past reads, most recent first.</p>
      </div>

      {analyses.length === 0 ? (
        <div className="text-center py-20">
          <Clock className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-muted-foreground">nothing here yet. go analyze something!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {analyses.map((analysis, i) => (
            <motion.div
              key={analysis.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(analysis)}
              className="bg-card rounded-xl border border-border p-4 cursor-pointer hover:shadow-md hover:shadow-primary/5 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-sm truncate">{analysis.title}</h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-muted-foreground">{moment(analysis.created_date).fromNow()}</span>
                    {analysis.overall_tone && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{analysis.overall_tone}</span>
                    )}
                    {analysis.confidence && (
                      <span className="text-xs text-muted-foreground">{analysis.confidence}% confidence</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                    onClick={(e) => handleDelete(analysis.id, e)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
