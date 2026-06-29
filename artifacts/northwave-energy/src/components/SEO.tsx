import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  jsonLd?: object;
  robots?: string;
}

const SITE_URL = "https://northwaveenergydrilling.com";
const DEFAULT_IMAGE = "/opengraph.jpg";

export function SEO({ title, description, image, url, jsonLd, robots = "index, follow" }: SEOProps) {
  const canonicalUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const ogImage = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${SITE_URL}${ogImage}`} />
      <meta property="og:site_name" content="NorthWave Energy Drilling" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}${ogImage}`} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NorthWave Energy Drilling",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  description: "Heavyweight offshore energy company delivering precision drilling, well completion, platform maintenance, and deepwater operations worldwide.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1200 Offshore Drive, Suite 400",
    addressLocality: "Houston",
    addressRegion: "TX",
    postalCode: "77002",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-713-555-0182",
    contactType: "customer service",
    email: "support@northwaveenergy.com",
  },
};
