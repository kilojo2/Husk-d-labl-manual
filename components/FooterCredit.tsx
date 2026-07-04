"use client";

export default function FooterCredit() {
  return (
    <div className="fixed bottom-6 right-20 z-40 hidden select-none md:block">
      <div className="flex items-center gap-2 rounded-full apple-glass px-4 py-1.5">
        <img
          src="/logo-purple.svg"
          alt="Husk'd Labl"
          className="h-5 w-5"
          style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}
        />
        <span className="text-[11px] font-medium tracking-wide text-text-secondary/70">
          Husk`d Labl Manuals by DJIBUR WORKTEAM
        </span>
      </div>
    </div>
  );
}
