"use client";

import { motion } from "motion/react";
import { Experience } from "@/lib/dbMock";
import { Briefcase, Calendar } from "@phosphor-icons/react";

interface ExperienceListProps {
  experience: Experience[];
}

export default function ExperienceList({ experience }: ExperienceListProps) {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-16 max-w-7xl mx-auto w-full">
      <div className="mb-12">
        <h2 className="text-2xl font-serif italic text-accent">Career Progression</h2>
        <p className="text-sm text-foreground/50 uppercase tracking-[0.15em] mt-1 font-mono">
          Chronological tenure & scope
        </p>
      </div>

      <div className="relative border-l border-card-border pl-6 md:pl-10 ml-4 md:ml-6 space-y-12 py-4">
        {experience.map((exp, i) => (
          <motion.div
            key={`${exp.company}-${exp.role}`}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative space-y-4"
          >
            {/* Timeline pulsing node */}
            <span className="absolute -left-[31px] md:-left-[47px] top-1.5 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-background border-2 border-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            </span>

            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg md:text-xl font-bold font-sans tracking-tight flex items-center gap-2">
                  <Briefcase size={18} className="text-accent" />
                  {exp.role}
                </h3>
                <h4 className="text-sm md:text-base font-serif italic text-accent/80 font-medium">
                  {exp.company}
                </h4>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-card-bg border border-card-border text-foreground/60 w-fit">
                <Calendar size={13} className="text-accent" />
                {exp.period}
              </div>
            </div>

            {/* Bullets with high impact */}
            <ul className="space-y-2.5 pl-2">
              {exp.bullets.map((bullet, idx) => (
                <li
                  key={idx}
                  className="text-sm md:text-base text-foreground/75 leading-relaxed relative before:content-['—'] before:absolute before:-left-5 before:text-accent pl-2"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
