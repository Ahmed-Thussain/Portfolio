const LINKS = [
  {
    label: "Email",
    href: "mailto:ahmedtarekk.2220@gmail.com",
    display: "ahmedtarekk.2220@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ahmedd-tarekk/",
    display: "linkedin.com/in/ahmedd-tarekk",
  },
  {
    label: "GitHub",
    href: "https://github.com/Ahmed-Thussain",
    display: "github.com/Ahmed-Thussain",
  },
];

export function Contact() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <h2 className="text-2xl font-semibold text-white">
        End of the path — let&apos;s talk
      </h2>
      <ul className="flex flex-col gap-3 sm:flex-row sm:gap-8">
        {LINKS.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={l.label}
              className="font-mono text-sm text-accent hover:underline"
            >
              {l.display}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
