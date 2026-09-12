import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="w-full max-w-md rounded-xl border border-white/10 bg-ink-soft/80 p-6 backdrop-blur">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">{project.name}</h3>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-mono ${
            project.status === "Production"
              ? "bg-accent/20 text-accent"
              : "bg-white/10 text-gray-300"
          }`}
        >
          {project.status}
        </span>
      </div>
      <p className="mb-2 text-sm italic text-gray-400">{project.category}</p>
      <p className="mb-4 text-sm text-gray-300">{project.description}</p>
      <ul className="mb-4 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <li
            key={t}
            className="rounded bg-white/5 px-2 py-0.5 font-mono text-xs text-accent"
          >
            {t}
          </li>
        ))}
      </ul>
      <p className="mb-4 text-xs text-gray-500">{project.contribution}</p>
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-md bg-accent px-4 py-1.5 text-sm font-medium text-ink hover:bg-accent/80"
        >
          Visit →
        </a>
      )}
    </div>
  );
}
