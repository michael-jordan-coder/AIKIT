"use client";

import { type ComponentProps } from "react";
import * as Icons from "@untitledui/icons";

/**
 * Icon component wrapper for Untitled UI Icons
 * 
 * Usage:
 * ```tsx
 * <Icon name="Home01" size={24} />
 * ```
 */
export type IconName = keyof typeof Icons;

export interface IconProps extends Omit<ComponentProps<"svg">, "children"> {
  name: IconName;
  size?: number | string;
}

export function Icon({ name, size = 24, className = "", ...props }: IconProps) {
  const IconComponent = Icons[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in @untitledui/icons`);
    return null;
  }

  return (
    <IconComponent
      width={size}
      height={size}
      className={className}
      strokeWidth={1.5}
      {...props}
    />
  );
}

