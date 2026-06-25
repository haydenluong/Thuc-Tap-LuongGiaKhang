import type { CSSProperties } from "react";

// Mượn lại biến CSS theme của Puck (--puck-color-*, --puck-font-size-*) để input/select
// tự chế trong các custom field nhìn giống input có sẵn của Puck, không cần đoán màu/size riêng.
export const fieldInputStyle: CSSProperties = {
  background: "var(--puck-color-white)",
  border: "1px solid var(--puck-color-grey-09)",
  borderRadius: 4,
  boxSizing: "border-box",
  fontFamily: "inherit",
  fontSize: 14,
  padding: "12px 15px",
  width: "100%",
};

export const fieldSelectStyle: CSSProperties = {
  ...fieldInputStyle,
  appearance: "none",
  cursor: "pointer",
};

export const fieldMiniLabelStyle: CSSProperties = {
  display: "block",
  color: "var(--puck-color-grey-04)",
  fontSize: "var(--puck-font-size-xxs)",
  fontWeight: 600,
  paddingBottom: 6,
};

export function LabeledNumberInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <label style={{ display: "block" }}>
      <span style={fieldMiniLabelStyle}>{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={fieldInputStyle}
      />
    </label>
  );
}

export function LabeledTextInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label style={{ display: "block" }}>
      <span style={fieldMiniLabelStyle}>{label}</span>
      <input
        type="text"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={fieldInputStyle}
      />
    </label>
  );
}
