import Link from "next/link";
import { notFound } from "next/navigation";

import { PortfolioImageCarousel } from "@/components/portfolio-image-carousel";
import { Button } from "@/components/ui/button";
import { getPortfolioItems } from "@/lib/load-portfolio";

type Props = { params: { category: string; title: string } };

export default function PortfolioDetailPage({ params }: Props) {
  const category = decodeURIComponent(params.category);
  const title = decodeURIComponent(params.title);
  const item = getPortfolioItems().find(
    (p) => p.category === category && p.title === title
  );
  if (!item) {
    notFound();
  }

  return (
    <div className="container py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <Button variant="ghost" asChild className="mb-6 sm:mb-8">
          <Link href="/#portfolio">← Back to portfolio</Link>
        </Button>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">{item.title}</h1>
        <p className="mt-2 text-muted-foreground">{item.excerpt}</p>
        <div className="mt-8 overflow-hidden rounded-lg border bg-card p-3 shadow-sm sm:p-4">
          <PortfolioImageCarousel
            images={item.images}
            active
            enableKeyboard
            theme="light"
            priority
          />
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Replace this placeholder route with your case study content (stack, problem, outcome).
        </p>
      </div>
    </div>
  );
}
