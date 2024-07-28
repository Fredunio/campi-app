import Avatar from "boring-avatars";
import React from "react";

export default function UserAvatar({
  name,
  size,
  square,
}: {
  name: string;
  size?: number;
  square?: boolean;
}) {
  return <Avatar variant="beam" name={name} size={size} square={square} />;
}
