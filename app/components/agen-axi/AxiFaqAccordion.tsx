"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

export default function AxiFaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="border border-gray-200 rounded-2xl overflow-hidden bg-white"
        >
          <button
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-secondary hover:bg-primary-light transition-colors text-sm sm:text-base"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span>{item.q}</span>
            <ChevronDown
              size={18}
              className={`shrink-0 transition-transform duration-200 ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-200 ${
              openIndex === i ? "max-h-96" : "max-h-0"
            }`}
          >
            <p className="px-6 pb-5 pt-4 text-muted text-sm leading-relaxed border-t border-gray-100">
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
