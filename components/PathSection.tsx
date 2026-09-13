"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { buildWindingPath } from "@/lib/windingPath";

const SEGMENT_HEIGHT = 600;
const SVG_WIDTH = 400;

export function PathSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const totalHeight = projects.length * SEGMENT_HEIGHT;
  const d = buildWindingPath(projects.length, SEGMENT_HEIGHT, SVG_WIDTH);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: totalHeight }}
    >
      {/* Desktop/tablet: curved SVG path */}
      <svg
        className="pointer-events-none absolute left-1/2 top-0 hidden -translate-x-1/2 md:block"
        width={SVG_WIDTH}
        height={totalHeight}
        viewBox={`0 0 ${SVG_WIDTH} ${totalHeight}`}
        fill="none"
        aria-hidden="true"
      >
        <path
          d={d}
          stroke="#22D3EE33"
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray="0.1 16"
          fill="none"
        />
        <motion.path
          d={d}
          stroke="#22D3EE"
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray="0.1 16"
          fill="none"
          style={{ pathLength }}
        />
      </svg>

      {/* Mobile: straight vertical line */}
      <div
        className="pointer-events-none absolute left-6 top-0 w-0.5 border-l-2 border-dotted border-accent/30 md:hidden"
        style={{ height: totalHeight }}
        aria-hidden="true"
      />

      {/* Waypoints */}
      <ul>
        {projects.map((project, i) => (
          <li
            key={project.slug}
            className="flex items-center px-6 md:px-0"
            style={{
              height: SEGMENT_HEIGHT,
              justifyContent: i % 2 === 0 ? "flex-start" : "flex-end",
            }}
          >
            <div className="md:w-[45%]">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
