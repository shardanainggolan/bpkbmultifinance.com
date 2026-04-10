"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "../lib/constants";
import { faqSchema } from "../lib/schema";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-20 lg:py-28 bg-muted-light"
      aria-labelledby="faq-heading"
    >
      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(FAQ_ITEMS)),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-primary-light text-secondary font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            FAQ
          </span>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl font-bold text-secondary mb-4"
          >
            Pertanyaan Umum tentang{" "}
            <span className="text-primary" style={{ WebkitTextFillColor: "unset" }}>
              Gadai BPKB Adira Finance
            </span>
          </h2>
          <p className="text-lg text-muted">
            Jawaban atas pertanyaan yang sering diajukan seputar pinjaman dana
            gadai BPKB melalui Adira Finance.
          </p>
        </div>

        <div className="space-y-3" role="list">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-shadow hover:shadow-sm"
              role="listitem"
            >
              {/* Question — H2 format per Koray's Framework */}
              <button
                className="w-full text-left px-6 py-5 flex items-start justify-between gap-4"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
              >
                <h3 className="text-base font-semibold text-secondary leading-relaxed flex-1">
                  {item.q}
                </h3>
                <ChevronDown
                  size={20}
                  className={`text-secondary shrink-0 mt-0.5 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                id={`faq-answer-${i}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-96" : "max-h-0"
                }`}
                aria-hidden={openIndex !== i}
              >
                <div className="px-6 pb-6 border-t border-gray-50">
                  <p className="text-muted text-sm leading-relaxed pt-4">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center bg-white rounded-3xl border border-gray-100 p-8">
          <h3 className="text-xl font-bold text-secondary mb-2">
            Masih ada pertanyaan?
          </h3>
          <p className="text-muted mb-6">
            Tim agen kami siap membantu menjawab pertanyaan Anda seputar pinjaman
            dana gadai BPKB Adira Finance.
          </p>
          <a
            href={`https://wa.me/6285122682981?text=${encodeURIComponent("Halo saya ingin mengajukan gadai BPKB")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Tanya via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
