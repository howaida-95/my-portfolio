"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT } from "@/lib/site-content";

import { SectionContainer } from "./section-container";
import { SectionTitle } from "./section-title";

const CONTACT_INTRO =
  "I'd love to hear from you — drop me a message and I'll get back to you shortly.";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Request failed");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Could not send. Try again or email directly."
      );
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 py-14 sm:py-16 lg:scroll-mt-8 lg:py-20"
    >
      <SectionContainer>
        <SectionTitle title="Contact" description={CONTACT_INTRO} />
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-5 lg:col-span-5">
            <div className="flex gap-4 rounded-lg border bg-card p-4 shadow-sm sm:p-5">
              <MapPin className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden />
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="text-sm text-muted-foreground">{CONTACT.address}</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg border bg-card p-4 shadow-sm sm:p-5">
              <Phone className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden />
              <div>
                <h3 className="font-semibold">Call Us</h3>
                <p className="text-sm text-muted-foreground">{CONTACT.phone}</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg border bg-card p-4 shadow-sm sm:p-5">
              <Mail className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden />
              <div>
                <h3 className="font-semibold">Email Us</h3>
                <p className="text-sm text-muted-foreground">{CONTACT.email}</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg border shadow-sm">
              <iframe
                title="Map"
                src={CONTACT.mapSrc}
                className="h-[220px] w-full border-0 sm:h-[270px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              className="space-y-4 rounded-lg border bg-card p-5 shadow-sm sm:p-6"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" name="name" required disabled={status === "loading"} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Your Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={status === "loading"}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" required disabled={status === "loading"} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={8}
                  required
                  disabled={status === "loading"}
                />
              </div>
              {status === "loading" && (
                <p className="text-sm text-muted-foreground">Sending…</p>
              )}
              {status === "success" && (
                <p className="text-sm font-medium text-primary">
                  Your message has been sent. Thank you!
                </p>
              )}
              {status === "error" && error && (
                <p className="text-sm font-medium text-destructive">{error}</p>
              )}
              <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
