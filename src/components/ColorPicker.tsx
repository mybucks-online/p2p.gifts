import styled from "styled-components";

const ColorPalette = styled.div`
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.sizes.x3s};
`;

const ColorSwatch = styled.button<{
  $active: boolean;
  $color: string;
  $auto: boolean;
}>`
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  border: 2px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.primary : theme.colors.border};
  border-radius: 50%;
  background: ${({ $auto, $color }) =>
    $auto
      ? "linear-gradient(135deg, transparent 45%, #dc2626 46%, #dc2626 54%, transparent 55%), #ffffff"
      : $color};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const COLORS = [
  ["auto", "Auto"],
  ["#0f172a", "Slate"],
  ["#dc2626", "Red"],
  ["#ea580c", "Orange"],
  ["#d97706", "Amber"],
  ["#eab308", "Yellow"],
  ["#16a34a", "Green"],
  ["#2563eb", "Blue"],
  ["#9333ea", "Purple"],
  ["#db2777", "Pink"],
  ["#ffffff", "White"],
];

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  labelledBy: string;
  allowWhite?: boolean;
}

export default function ColorPicker({
  value,
  onChange,
  labelledBy,
  allowWhite = true,
}: ColorPickerProps) {
  return (
    <ColorPalette role="group" aria-labelledby={labelledBy}>
      {COLORS.filter(([color]) => allowWhite || color !== "#ffffff").map(
        ([color, label]) => (
          <ColorSwatch
            key={color}
            type="button"
            $active={value === color}
            $color={color === "auto" ? "transparent" : color}
            $auto={color === "auto"}
            aria-label={label}
            aria-pressed={value === color}
            title={label}
            onClick={() => onChange(color)}
          />
        ),
      )}
    </ColorPalette>
  );
}
