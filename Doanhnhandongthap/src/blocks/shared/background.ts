import type { CSSProperties } from "react";

export type SectionBackground = {
  type: "color" | "gradient" | "image" | "gif";
  color?: string;
  gradientFrom?: string;
  gradientVia?: string;
  gradientVia2?: string;
  gradientTo?: string;
  gradientDirection?: string;
  // Gradient phụ, chồng NGAY DƯỚI gradient chính (vd nền values-section: 1 gradient dọc + 1 gradient ngang).
  gradient2From?: string;
  gradient2Via?: string;
  gradient2To?: string;
  gradient2Direction?: string;
  imageUrl?: string;
  gifUrl?: string;
  opacity?: number;
  // Ảnh/GIF phủ TRÊN CÙNG nền chính, trộn màu qua blend mode
  // (vd hero-section: ảnh + gradient, background-blend-mode: screen).
  overlayUrl?: string;
  overlayBlendMode?: string;
  // Ảnh nằm DƯỚI CÙNG, dưới mọi lớp gradient, chồng theo alpha thường (không blend mode) —
  // vd values-section/contact-cta-section: gradient(s) phủ lên 1 ảnh nền.
  baseImageUrl?: string;
  baseImagePosition?: string;
};

function gradientLayer(from?: string, via?: string, via2?: string, to?: string, direction = "to bottom") {
  const stops = [from, via, via2, to].filter(Boolean).join(", ");
  return stops ? `linear-gradient(${direction}, ${stops})` : "";
}

export function getBackgroundStyle(bg: SectionBackground): CSSProperties {
  const style: CSSProperties = {};

  if (bg.type === "color") style.backgroundColor = bg.color;

  const layers: string[] = [];

  if (bg.overlayUrl) layers.push(`url('${bg.overlayUrl}')`);

  if (bg.type === "gradient") {
    const g1 = gradientLayer(bg.gradientFrom, bg.gradientVia, bg.gradientVia2, bg.gradientTo, bg.gradientDirection);
    if (g1) layers.push(g1);
    const g2 = gradientLayer(bg.gradient2From, bg.gradient2Via, undefined, bg.gradient2To, bg.gradient2Direction);
    if (g2) layers.push(g2);
  }

  if (bg.type === "image" && bg.imageUrl) layers.push(`url('${bg.imageUrl}')`);
  if (bg.type === "gif" && bg.gifUrl) layers.push(`url('${bg.gifUrl}')`);
  if (bg.baseImageUrl) layers.push(`url('${bg.baseImageUrl}')`);

  if (layers.length) {
    style.backgroundImage = layers.join(", ");
    style.backgroundSize = "cover";
    style.backgroundPosition = bg.baseImagePosition || "center";
    style.backgroundRepeat = "no-repeat";
    if (bg.overlayUrl) {
      style.backgroundBlendMode = (bg.overlayBlendMode || "screen") as CSSProperties["backgroundBlendMode"];
    }
  }

  if (bg.opacity !== undefined) style.opacity = bg.opacity;

  return style;
}
