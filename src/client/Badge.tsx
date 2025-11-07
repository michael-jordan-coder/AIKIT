"use client";

import { Icon } from "@/client/Icon";

interface BadgeProps {
  icon: Parameters<typeof Icon>[0]["name"];
  label: string;
  color: string;
  onRemove?: () => void;
}

export function Badge({ icon, label, color, onRemove }: BadgeProps) {
  return (
    <span
      className="action-badge"
      style={{
        backgroundColor: `${color}20`,
        color: color,
        borderColor: `${color}40`,
      }}
    >
      <Icon 
        name={icon} 
        size={14} 
        className="action-badge-icon"
        style={{ color: color }}
      />
      <span className="action-badge-label">{label}</span>
      {onRemove && (
        <button
          type="button"
          className="action-badge-remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label="Remove badge"
          style={{ color: color }}
        >
          <Icon name="X" size={12} />
        </button>
      )}
    </span>
  );
}

