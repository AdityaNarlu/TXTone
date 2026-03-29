import { Link } from "react-router-dom";
import { MessageCircle, Search, Shield, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const LOGO_URL = "https://media.base44.com/images/public/69c973da7e91e28a5b13cda2/54679532e_txt.png";

const examples = [
  {
    input: '"yeah sure whatever lol"',
    output: "they're not actually ok with it. 'lol' is just there to avoid a fight. they feel brushed off but don't wanna say it.",
  },
  {
    input: '"k."',
    output: "that period is mad. that's it. that's the whole message.",
  },
  {
    input: '"no worries!! it\'s totally fine haha"',
    output: "the !! and 'haha' are trying too hard. it's not fine.",
  },
];

const features = [
  {
    icon: Search,
    title: "Hidden Meanings",
    description: "Figures out what people mean when they say stuff like 'I'm fine' or 'do whatever'",
  },
  {
    icon: MessageCircle,
    title: "Knows How People Text",
    description: "Gets 'lol', 'k.', dry humor, emoji use, and all the normal ways people text",
  },
  {
    icon: Shield,
    title: "Emotional Vibes",
    description: "Picks up on passive aggression, guilt trips, real excitement, or hurt feelings being covered up",
  },
  {
    icon: Zap,
    title: "What They Didn't Say",
    description: "Shows you what the person probably wanted to say but held back",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/40 to-background" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="mb-8 flex justify-center">
              <img src={LOGO_URL} alt="TXTone" className="h-14 w-auto" />
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              what they <span className="text-primary">actually</span> meant
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
              paste a text, we'll tell you what's really going on.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/analyze">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 rounded-xl h-12">
                try it
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Examples */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-center mb-4">see it in action</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-md mx-auto">
            real examples of what TXTone picks up on
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-3">
          {examples.map((ex, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card rounded-2xl border border-border p-5 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="bg-muted rounded-xl px-4 py-3 mb-4">
                <p className="text-sm font-medium">{ex.input}</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{ex.output}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-center mb-4">what TXTone catches</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-md mx-auto">
              way more than just 'positive' or 'negative'
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-4 p-5 rounded-2xl hover:bg-accent/50 transition-colors duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 sm:p-12 text-center text-white"
        >
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-3">stop guessing</h2>
          <p className="text-white/80 mb-6 max-w-md mx-auto">
            paste any convo and find out in like 5 seconds.
          </p>
          <Link to="/analyze">
            <Button size="lg" variant="secondary" className="font-medium px-8 rounded-xl h-12 bg-white text-foreground hover:bg-white/90">
              analyze a convo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
