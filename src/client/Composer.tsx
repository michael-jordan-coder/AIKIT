"use client";

import { useState } from "react";
import { Icon } from "./Icon";

interface IconButtonProps {
  icon: Parameters<typeof Icon>[0]["name"];
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
}

function IconButton({ icon, onClick, className = "", iconClassName = "" }: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center rounded-full size-9 p-1 transition-colors hover:bg-bg ${className}`}
      aria-label={icon}
    >
      <Icon name={icon} size={20} className={iconClassName} />
    </button>
  );
}

export function Composer() {
  const [inputValue, setInputValue] = useState("");

  const hasText = inputValue.trim().length > 0;

  return (
    <div className="relative bg-surface rounded-[28px] w-full">
      {/* Border */}
      <div
        aria-hidden="true"
        className="absolute border border-border inset-[-0.5px] pointer-events-none rounded-[28.5px]"
      />

      {/* Content */}
      <div className="flex flex-col gap-2.5 p-2.5 w-full">
        <div className="flex items-center gap-12 w-full">
          {/* Left side: Plus button and input */}
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <IconButton
              icon="Plus"
              iconClassName="text-muted"
            />
            <input
              type="text"
              placeholder="Type a prompt..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 min-w-0 bg-transparent border-0 outline-none font-sans font-normal text-base leading-6 text-text placeholder:text-muted tracking-[-0.32px]"
            />
          </div>

          {/* Right side: Mic and Voice/Send buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <IconButton
              icon="Microphone01"
              iconClassName="text-text"
            />
            {hasText ? (
              <button
                type="button"
                className="flex items-center justify-center rounded-full size-9 p-1 bg-primary border-0 transition-opacity hover:opacity-90"
                aria-label="Send"
              >
                <Icon name="ArrowNarrowUp" size={20} className="text-bg" strokeWidth={2.5} />
              </button>
            ) : (
              <div className="flex items-center justify-center rounded-full size-9 p-1 bg-bg">
                <Icon name="Recording01" size={20} className="text-text" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

