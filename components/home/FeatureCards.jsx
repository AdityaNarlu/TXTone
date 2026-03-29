import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, MessageCircle } from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Spot the subtext',
    desc: 'We catch the stuff people say without actually saying it. The hedging, the "lol" shields, all of it.',
    color: 'bg-sky_blue/10 text-sky_blue',
  },
  {
    icon: Heart,
    title: 'Read the vibe',
    desc: 'Every text has an emotional tone. We tell you what it is so you stop overthinking at 2am.',
    color: 'bg-solar/20 text-ink',
  },
  {
    icon: MessageCircle,
    title: 'Know what to say back',
    desc: 'Not sure how to reply? We give you a nudge in the right direction. No weird scripts.',
    color: 'bg-sky_blue/10 text-sky_blue',
  },
];

export default function FeatureCards() {
  return (
    <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
      {features.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-lg hover:shadow-sky_blue/5 transition-all duration-300"
        >
          <div className={`w-11 h-11 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
            <f.icon className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
