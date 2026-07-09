import { Helmet } from 'react-helmet-async';

export const SEO = ({
  title = 'Aetheris AI | Architecting the Intelligence of Tomorrow',
  description = 'Aetheris AI provides the neural infrastructure for the next generation of enterprise automation. Built for precision, engineered for scale.',
  image = 'https://aetheris-ai.vercel.app/og-image.png',
  url = 'https://aetheris-ai.vercel.app',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};