import Image from "next/image";

export function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Image
        src="/profile-photo.png"
        alt="Ahmed Tarek"
        width={200}
        height={200}
        className="h-[200px] w-[200px] rounded-full border-2 border-accent/40 object-cover"
        priority
      />
      <h1 className="text-4xl font-bold text-white sm:text-5xl">
        Ahmed Tarek
      </h1>
      <p className="max-w-xl text-lg text-gray-300">
        Full-Stack JavaScript &amp; AI Developer — SaaS, ERP/CRM, POS, and
        AI-integrated products.
      </p>
      <div className="mt-8 animate-bounce text-accent" aria-hidden="true">
        ↓ scroll
      </div>
    </section>
  );
}
