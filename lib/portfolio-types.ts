export type PortfolioCategory =
  | "Web Applications"
  | "E-Commerce Solutions"
  | "Mobile Applications";

export type PortfolioItem = {
  title: string;
  excerpt: string;
  category: PortfolioCategory;
  coverImage: string;
  images: readonly string[];
};
