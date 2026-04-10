import { SITE } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t bg-secondary/40 py-10 sm:py-12">
      <div className="container text-center text-xs text-muted-foreground sm:text-sm">
        <p className="font-medium text-foreground text-base">{SITE.siteTitle}</p>
        <p className="mt-2 max-w-xl mx-auto leading-relaxed italic">
        Open to work · Open to learning · Open to collaboration.
        </p>
      </div>
    </footer>
  );
}