import { Branch } from "./types";
import { SITE_URL } from "./constants";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "BPKB Multi Finance - Agen Resmi Adira Finance",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo-agen-axi-adira.png`,
    },
    description:
      "Agen resmi Adira Finance untuk pinjaman dana dengan jaminan gadai BPKB mobil dan motor di seluruh Indonesia.",
    contactPoint: { "@type": "ContactPoint", contactType: "customer service", availableLanguage: "Indonesian" },
    sameAs: [
      "https://www.adira.co.id",
      "https://id.wikipedia.org/wiki/Adira_Dinamika_Multi_Finance",
    ],
    parentOrganization: {
      "@type": "Organization",
      name: "Adira Dinamika Multi Finance Tbk",
      url: "https://www.adira.co.id",
      legalName: "PT Adira Dinamika Multi Finance Tbk",
      tickerSymbol: "ADMF",
      sameAs: [
        "https://www.adira.co.id",
        "https://id.wikipedia.org/wiki/Adira_Dinamika_Multi_Finance",
        "https://www.idx.co.id/id/perusahaan-tercatat/profil-perusahaan-tercatat/?kodeEmiten=ADMF",
      ],
      knowsAbout: [
        "Pembiayaan Kendaraan Bermotor",
        "Kredit Multiguna",
        "Gadai BPKB Mobil",
        "Gadai BPKB Motor",
        "Pinjaman Dana Tunai",
      ],
      parentOrganization: {
        "@type": "Organization",
        name: "Bank Danamon Indonesia",
        url: "https://www.danamon.co.id",
        sameAs: "https://id.wikipedia.org/wiki/Bank_Danamon",
      },
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "BPKB Multi Finance",
    description:
      "Layanan pinjaman dana gadai BPKB mobil dan motor melalui Adira Finance",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/cabang?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function financialProductMobilSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: "Pinjaman Dana Gadai BPKB Mobil - Adira Finance",
    url: `${SITE_URL}/#produk`,
    provider: {
      "@type": "Organization",
      name: "Adira Dinamika Multi Finance Tbk",
      url: "https://www.adira.co.id",
    },
    description:
      "Pinjaman dana tunai dengan jaminan BPKB mobil melalui Adira Finance. Plafon hingga Rp 400 juta, tenor 12-48 bulan, proses 1-2 hari kerja.",
    category: "Kredit Multiguna",
    feesAndCommissionsSpecification: "Bunga mulai 0,8% per bulan (flat)",
    amount: {
      "@type": "MonetaryAmount",
      currency: "IDR",
      minValue: 5000000,
      maxValue: 400000000,
    },
  };
}

export function financialProductMotorSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: "Pinjaman Dana Gadai BPKB Motor - Adira Finance",
    url: `${SITE_URL}/#produk`,
    provider: {
      "@type": "Organization",
      name: "Adira Dinamika Multi Finance Tbk",
      url: "https://www.adira.co.id",
    },
    description:
      "Pinjaman dana tunai dengan jaminan BPKB motor melalui Adira Finance. Plafon hingga Rp 50 juta, tenor 6-36 bulan, proses 1-2 hari kerja.",
    category: "Kredit Multiguna",
    feesAndCommissionsSpecification: "Bunga mulai 0,8% per bulan (flat)",
    amount: {
      "@type": "MonetaryAmount",
      currency: "IDR",
      minValue: 2000000,
      maxValue: 50000000,
    },
  };
}

export function faqSchema(
  items: Array<{ q: string; a: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function localBusinessSchema(branch: Branch) {
  const phones = [branch.telp1, branch.telp2, branch.telp3].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": `${SITE_URL}/cabang/${branch.slug}#localbusiness`,
    name: branch.name,
    alternateName: `Adira Finance ${branch.region.district.district}`,
    description: branch.description,
    image: branch.image
      ? `https://backend.adiracabang.id/uploads/${branch.image}`
      : undefined,
    url: `${SITE_URL}/cabang/${branch.slug}`,
    telephone: phones[0] || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.address,
      addressLocality: branch.region.district.district,
      addressRegion: branch.region.province.province,
      postalCode: branch.postalCode || undefined,
      addressCountry: "ID",
    },
    geo:
      branch.latitude && branch.longitude
        ? {
            "@type": "GeoCoordinates",
            latitude: parseFloat(branch.latitude),
            longitude: parseFloat(branch.longitude),
          }
        : undefined,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "15:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "12:00",
      },
    ],
    parentOrganization: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Adira Dinamika Multi Finance Tbk",
      legalName: "PT Adira Dinamika Multi Finance Tbk",
      url: "https://www.adira.co.id",
      sameAs: [
        "https://www.adira.co.id",
        "https://id.wikipedia.org/wiki/Adira_Dinamika_Multi_Finance",
        "https://www.idx.co.id/id/perusahaan-tercatat/profil-perusahaan-tercatat/?kodeEmiten=ADMF",
      ],
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: branch.region.district.district,
      },
      {
        "@type": "AdministrativeArea",
        name: branch.region.province.province,
      },
    ],
    knowsAbout: [
      "Gadai BPKB Mobil",
      "Gadai BPKB Motor",
      "Pinjaman Dana Tunai",
      "Kredit Multiguna",
      "Pembiayaan Kendaraan Bermotor",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Layanan Gadai BPKB Adira Finance",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "FinancialProduct",
            name: "Gadai BPKB Mobil",
            description:
              "Pinjaman dana tunai dengan jaminan BPKB mobil. Plafon hingga Rp 400 juta, tenor 12–48 bulan, bunga mulai 0,8% per bulan.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "FinancialProduct",
            name: "Gadai BPKB Motor",
            description:
              "Pinjaman dana tunai dengan jaminan BPKB motor. Plafon hingga Rp 50 juta, tenor 6–36 bulan, bunga mulai 0,8% per bulan.",
          },
        },
      ],
    },
    priceRange: "$$",
  };
}
