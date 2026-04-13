import { MetadataRoute } from "next";

const BASE_URL = "https://calculadortrabalhista.com.br"; // ← troque pela sua URL

export default function sitemap(): MetadataRoute.Sitemap {
  const calculadoras = [
    "rescisao",
    "decimo-terceiro",
    "ferias",
    "hora-extra",
    "fgts",
    "aviso-previo",
    "salario-liquido",
  ];

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...calculadoras.map((slug) => ({
      url: `${BASE_URL}/calculadoras/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${BASE_URL}/privacidade`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
