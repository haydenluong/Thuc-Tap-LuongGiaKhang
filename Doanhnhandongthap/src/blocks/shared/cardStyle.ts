import type { CSSProperties } from "react";

export type CardStyle = {
  borderRadius: string;
  textColor: string;
  fontSize: string;
};

export const cardStyleField = {
  type: "object" as const,
  label: "Kiểu thẻ",
  objectFields: {
    borderRadius: { type: "text" as const, label: "Bo góc thẻ" },
    textColor: { type: "text" as const, label: "Màu chữ" },
    fontSize: { type: "text" as const, label: "Cỡ chữ" },
  },
};

export function getCardStyle(card: CardStyle): CSSProperties {
  return {
    borderRadius: card.borderRadius,
    color: card.textColor,
    fontSize: card.fontSize,
  };
}
