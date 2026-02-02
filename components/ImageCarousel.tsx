"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export default function ImageCarousel({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const safe = useMemo(
    () => (images || []).filter((s) => typeof s === "string" && s.trim().length > 0),
    [images]
  );

  const [idx, setIdx] = useState(0);

  if (safe.length === 0) {
    return (
      <div className="aspect-[4/3] rounded-3xl border bg-neutral-100" />
    );
  }

  const current = safe[Math.min(idx, safe.length - 1)];

  function prev() {
    setIdx((i) => (i - 1 + safe.length) % safe.length);
  }
  function next() {
    setIdx((i) => (i + 1) % safe.length);
  }

  return (
    <div className="grid gap-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border bg-neutral-100">
        <Image
          src={current}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 600px"
          priority
        />

        {safe.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur px-3 py-2 text-sm hover:bg-white"
            >
              ←
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur px-3 py-2 text-sm hover:bg-white"
            >
              →
            </button>
          </>
        )}

        {/* Dots */}
        {safe.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {safe.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={() => setIdx(i)}
                className={`h-2 w-2 rounded-full transition ${
                  i === idx ? "bg-white" : "bg-white/45"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {safe.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {safe.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setIdx(i)}
              className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-2xl border ${
                i === idx ? "ring-2 ring-neutral-900" : ""
              }`}
            >
              <Image src={src} alt={alt} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}