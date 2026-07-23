"use client";

import Image from "next/image";

export default function FooterCredit() {
  return (
    <div className="fixed bottom-6 right-6 z-40 hidden select-none md:block">
      <div className="flex items-center gap-2 rounded-lg border border-border bg-surface/80 px-3 py-1.5 shadow-sm backdrop-blur-sm">
        <Image
          src="/logo-purple.svg"
          alt="Husk'd Labl"
          width={18}
          height={18}
          className="h-[18px] w-[18px]"
        />
        <span className="text-[11px] font-medium tracking-wide text-text-muted">
          Husk`d Labl Manuals by DJIBUR WORKTEAM
        </span>
      </div>
    </div>
  );
}
