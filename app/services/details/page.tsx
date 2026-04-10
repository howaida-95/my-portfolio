import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function ServiceDetailsPage() {
  return (
    <div className="container py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-2xl">
        <Button variant="ghost" asChild className="mb-6 sm:mb-8">
          <Link href="/#services">← Back to services</Link>
        </Button>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Service details</h1>
        <p className="mt-4 text-muted-foreground">
          Placeholder page for individual services. Replace with your own detail layout and CMS
          content.
        </p>
      </div>
    </div>
  );
}