export type PortfolioCategory =
  | "Web Applications"
  | "E-Commerce Solutions"
  | "Mobile Applications";

export type PortfolioItem = {
  title: string;
  excerpt: string;
  category: PortfolioCategory;
  /** Thumbnail-size WebP (≤800px) used in the portfolio grid — fast to load. */
  coverImage: string;
  /** Tiny base64-encoded blurred placeholder shown instantly while coverImage loads. */
  blurDataURL: string;
  /** Full-resolution WebP images (≤1920px) used in the carousel / fullscreen viewer. */
  images: readonly string[];
};
