import Avatar from "boring-avatars";

const defaultColors = [
  "var(--ion-color-primary)",
  "var(--ion-color-primary-shade)",
  "var(--ion-color-primary-tint)",
  "#fff",
  "var(--ion-color-primary-contrast)",
];

export default function UserAvatar({
  name,
  variant,
  size,
  square,
  colors,
}: {
  name: string | undefined;
  variant?:
    | "beam"
    | "marble"
    | "pixel"
    | "sunset"
    | "ring"
    | "bauhaus"
    | undefined;
  size?: string | number | undefined;
  square?: boolean;
  colors?: string[] | undefined | null;
}) {
  return (
    <Avatar
      variant={variant}
      name={name}
      size={size}
      square={square}
      colors={colors !== null ? colors : defaultColors}
    />
  );
}

// --ion-color-primary-shade:
// --ion-color-primary-tint:
