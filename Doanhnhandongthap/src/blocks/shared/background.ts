import type { CSSProperties } from "react";

export type SectionBackground = {
  type: "color" | "gradient" | "image" | "gif";
  color?: string;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  gradientDirection?: string;
  imageUrl?: string;
  gifUrl?: string;
  opacity?: number;
  // Lớp GIF/ảnh phủ lên trên nền chính (màu/gradient/ảnh), trộn màu qua blend mode —
  // tái tạo đúng cách hero-section gốc kết hợp ảnh + gradient (background-blend-mode: screen).
  overlayUrl?: string;
  overlayBlendMode?: string;
};

export function getBackgroundStyle(bg: SectionBackground): CSSProperties {
  const style: CSSProperties = {};
  let baseLayer = "";

  if (bg.type === "color") style.backgroundColor = bg.color;
  if (bg.type === "image" && bg.imageUrl) {
    baseLayer = `url('${bg.imageUrl}')`;
    style.backgroundSize = "cover";
    style.backgroundPosition = "center";
  }
  if (bg.type === "gif" && bg.gifUrl) {
    baseLayer = `url('${bg.gifUrl}')`;
    style.backgroundSize = "cover";
    style.backgroundPosition = "center";
  }
  if (bg.type === "gradient") {
    const stops = [bg.gradientFrom, bg.gradientVia, bg.gradientTo].filter(Boolean).join(", ");
    baseLayer = `linear-gradient(${bg.gradientDirection || "to bottom"}, ${stops})`;
  }

  if (bg.overlayUrl) {
    style.backgroundImage = baseLayer ? `url('${bg.overlayUrl}'), ${baseLayer}` : `url('${bg.overlayUrl}')`;
    style.backgroundBlendMode = (bg.overlayBlendMode || "screen") as CSSProperties["backgroundBlendMode"];
    style.backgroundSize = "cover";
    style.backgroundPosition = "center";
  } else if (baseLayer) {
    if (bg.type === "gradient") style.background = baseLayer;
    else style.backgroundImage = baseLayer;
  }

  if (bg.opacity !== undefined) style.opacity = bg.opacity;

  return style;
}
