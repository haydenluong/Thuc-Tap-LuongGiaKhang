import { fieldSelectStyle, LabeledNumberInput } from "./fieldStyles";

export type CornerRadius = {
  mode: "each" | "all" | "round";
  all: number;
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
};

export function cornerRadiusToCss(r: CornerRadius): string {
  if (r.mode === "round") return "9999px";
  if (r.mode === "all") return `${r.all}px`;
  return `${r.topLeft}px ${r.topRight}px ${r.bottomRight}px ${r.bottomLeft}px`;
}

export const cornerRadiusField = {
  type: "custom" as const,
  label: "Bo góc",
  render: ({ value, onChange }: { value: CornerRadius; onChange: (v: CornerRadius) => void }) => {
    const setMode = (mode: CornerRadius["mode"]) => onChange({ ...value, mode });
    const setAll = (all: number) => onChange({ ...value, all });
    const setCorner = (key: "topLeft" | "topRight" | "bottomRight" | "bottomLeft", n: number) =>
      onChange({ ...value, [key]: n });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <select
          value={value.mode}
          onChange={(e) => setMode(e.target.value as CornerRadius["mode"])}
          style={fieldSelectStyle}
        >
          <option value="each">Bo từng góc</option>
          <option value="all">Bo 4 góc</option>
          <option value="round">Bo tròn</option>
        </select>

        {value.mode === "all" && (
          <LabeledNumberInput label="Bo góc (px)" value={value.all} onChange={setAll} />
        )}

        {value.mode === "each" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <LabeledNumberInput label="Trên-trái (px)" value={value.topLeft} onChange={(n) => setCorner("topLeft", n)} />
            <LabeledNumberInput label="Trên-phải (px)" value={value.topRight} onChange={(n) => setCorner("topRight", n)} />
            <LabeledNumberInput label="Dưới-trái (px)" value={value.bottomLeft} onChange={(n) => setCorner("bottomLeft", n)} />
            <LabeledNumberInput label="Dưới-phải (px)" value={value.bottomRight} onChange={(n) => setCorner("bottomRight", n)} />
          </div>
        )}
      </div>
    );
  },
};
