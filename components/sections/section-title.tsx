import { cn } from "@/lib/utils";

/** Block heading + intro paragraph; parent should wrap with {@link SectionContainer}. */
export function SectionTitle({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 lg:mb-12", className)}>
      <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-foreground">
        {title}
      </h2>
      <p className="mt-3 max-w-3xl text-muted-foreground">{description}</p>
    </div>
  );
}
