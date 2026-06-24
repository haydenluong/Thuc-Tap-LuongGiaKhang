import type { CSSProperties } from "react";

export type ButtonStyle = {
  label: string;
  bgColor: string;
  textColor: string;
  borderRadius: string;
  fontSize: string;
};

export const buttonStyleField = {
  type: "object" as const,
  label: "Nút",
  objectFields: {
    label: { type: "text" as const, label: "Chữ trong nút" },
    bgColor: { type: "text" as const, label: "Màu nút" },
    textColor: { type: "text" as const, label: "Màu chữ nút" },
    borderRadius: { type: "text" as const, label: "Bo góc nút" },
    fontSize: { type: "text" as const, label: "Cỡ chữ nút" },
  },
};

export function getButtonStyle(button: Pick<ButtonStyle, "bgColor" | "textColor" | "borderRadius" | "fontSize">): CSSProperties {
  return {
    backgroundColor: button.bgColor,
    color: button.textColor,
    borderRadius: button.borderRadius,
    fontSize: button.fontSize,
  };
}
