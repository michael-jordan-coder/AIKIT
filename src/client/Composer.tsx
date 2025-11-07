"use client";

import { useState, useRef, useEffect } from "react";
import { Icon } from "./Icon";
import { AIActionMenu, type Action } from "@/components/AIActionMenu";
import { Badge } from "./Badge";

interface BadgeData {
  id: string;
  icon: Parameters<typeof Icon>[0]["name"];
  label: string;
  color: string;
}

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
      className={`icon-btn-base ${className}`}
      aria-label={icon}
    >
      <Icon name={icon} size={20} className={iconClassName} />
    </button>
  );
}

export function Composer() {
  const [inputValue, setInputValue] = useState("");
  const [badges, setBadges] = useState<BadgeData[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const plusButtonRef = useRef<HTMLButtonElement>(null);
  const badgesContainerRef = useRef<HTMLDivElement>(null);

  const hasText = inputValue.trim().length > 0 || badges.length > 0;
  const hasMultipleLines = inputValue.split("\n").length > 1;

  // Example actions - can be customized
  const actions: Action[] = [
    {
      id: "image",
      label: "Image",
      icon: "Image01",
      color: "#3B82F6", // Blue
      hint: "Create an image from text",
      onSelect: () => {
        setBadges((prev) => [
          ...prev,
          { id: `image-${Date.now()}`, icon: "Image01", label: "Image", color: "#3B82F6" },
        ]);
        textareaRef.current?.focus();
      },
    },
    {
      id: "summarize",
      label: "Summarize",
      icon: "TextInput",
      color: "#10B981", // Green
      hint: "Summarize long text",
      onSelect: () => {
        setBadges((prev) => [
          ...prev,
          { id: `summarize-${Date.now()}`, icon: "TextInput", label: "Summarize", color: "#10B981" },
        ]);
        textareaRef.current?.focus();
      },
    },
    {
      id: "idea",
      label: "Idea",
      icon: "MagicWand01",
      color: "#8B5CF6", // Purple
      hint: "Generate creative ideas",
      onSelect: () => {
        setBadges((prev) => [
          ...prev,
          { id: `idea-${Date.now()}`, icon: "MagicWand01", label: "Idea", color: "#8B5CF6" },
        ]);
        textareaRef.current?.focus();
      },
    },
    {
      id: "code",
      label: "Code",
      icon: "Code01",
      color: "#F59E0B", // Amber
      hint: "Write code snippets",
      onSelect: () => {
        setBadges((prev) => [
          ...prev,
          { id: `code-${Date.now()}`, icon: "Code01", label: "Code", color: "#F59E0B" },
        ]);
        textareaRef.current?.focus();
      },
    },
    {
      id: "translate",
      label: "Translate",
      icon: "Globe01",
      color: "#06B6D4", // Cyan
      hint: "Translate to another language",
      onSelect: () => {
        setBadges((prev) => [
          ...prev,
          { id: `translate-${Date.now()}`, icon: "Globe01", label: "Translate", color: "#06B6D4" },
        ]);
        textareaRef.current?.focus();
      },
    },
    {
      id: "explain",
      label: "Explain",
      icon: "FileQuestion01",
      color: "#EC4899", // Pink
      hint: "Get detailed explanations",
      onSelect: () => {
        setBadges((prev) => [
          ...prev,
          { id: `explain-${Date.now()}`, icon: "FileQuestion01", label: "Explain", color: "#EC4899" },
        ]);
        textareaRef.current?.focus();
      },
    },
    {
      id: "rewrite",
      label: "Rewrite",
      icon: "Edit01",
      color: "#6366F1", // Indigo
      hint: "Rephrase and improve text",
      onSelect: () => {
        setBadges((prev) => [
          ...prev,
          { id: `rewrite-${Date.now()}`, icon: "Edit01", label: "Rewrite", color: "#6366F1" },
        ]);
        textareaRef.current?.focus();
      },
    },
    {
      id: "brainstorm",
      label: "Brainstorm",
      icon: "Lightbulb01",
      color: "#F97316", // Orange
      hint: "Generate multiple ideas",
      onSelect: () => {
        setBadges((prev) => [
          ...prev,
          { id: `brainstorm-${Date.now()}`, icon: "Lightbulb01", label: "Brainstorm", color: "#F97316" },
        ]);
        textareaRef.current?.focus();
      },
    },
    {
      id: "analyze",
      label: "Analyze",
      icon: "BarChart01",
      color: "#14B8A6", // Teal
      hint: "Analyze and interpret data",
      onSelect: () => {
        setBadges((prev) => [
          ...prev,
          { id: `analyze-${Date.now()}`, icon: "BarChart01", label: "Analyze", color: "#14B8A6" },
        ]);
        textareaRef.current?.focus();
      },
    },
    {
      id: "write",
      label: "Write",
      icon: "Edit01",
      color: "#EF4444", // Red
      hint: "Create long-form content",
      onSelect: () => {
        setBadges((prev) => [
          ...prev,
          { id: `write-${Date.now()}`, icon: "Edit01", label: "Write", color: "#EF4444" },
        ]);
        textareaRef.current?.focus();
      },
    },
  ];

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to get accurate scrollHeight
    textarea.style.height = "0px";
    const scrollHeight = textarea.scrollHeight;
    
    // Icon button height: 36px (--sp-9)
    const iconHeight = 36;
    // Line height: 16px (fontSize) * 1.5 = 24px per line
    const lineHeight = 24;
    // Padding: 4px top + 4px bottom = 8px total
    const padding = 8;
    
    // Calculate number of lines based on content height
    const contentHeight = scrollHeight - padding;
    const lines = Math.max(1, Math.ceil(contentHeight / lineHeight));
    
    let newHeight: number;
    if (lines === 1) {
      // Single line: match icon height exactly (36px)
      newHeight = iconHeight;
    } else {
      // Multiple lines: calculate total height needed
      // Total height = lines * lineHeight + padding
      newHeight = lines * lineHeight + padding;
      newHeight = Math.min(newHeight, 200); // Max height
    }
    
    textarea.style.height = `${newHeight}px`;
  }, [inputValue]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle "/" key - will be handled by AIActionMenu global listener
    // Allow Enter to create new lines (default behavior)
    // Shift+Enter also creates new line
    if (e.key === "Enter" && e.shiftKey === false && hasText) {
      // Optional: You can add submit on Enter behavior here if needed
      // For now, Enter creates a new line
    }
  };

  return (
    <div className="surface-container">
      {/* Content */}
      <div
        className="flex flex-col w-full"
        style={{
          gap: "var(--sp-2)",
          padding: "var(--sp-2)",
        }}
      >
        <div
          className="flex items-end w-full"
          style={{
            gap: hasMultipleLines ? "var(--sp-2)" : "var(--sp-12)",
          }}
        >
          {/* Left side: Plus button and textarea */}
          <div
            className="flex items-end flex-1 min-w-0 flex-col"
            style={{
              gap: "var(--sp-2)",
            }}
          >
            {/* Badges container */}
            {badges.length > 0 && (
              <div
                ref={badgesContainerRef}
                className="flex flex-wrap items-center"
                style={{
                  gap: "var(--sp-1)",
                  width: "100%",
                }}
              >
                {badges.map((badge) => (
                  <Badge
                    key={badge.id}
                    icon={badge.icon}
                    label={badge.label}
                    color={badge.color}
                    onRemove={() => {
                      setBadges((prev) => prev.filter((b) => b.id !== badge.id));
                    }}
                  />
                ))}
              </div>
            )}
            <div
              className="flex items-end flex-1 min-w-0"
              style={{
                gap: "var(--sp-2)",
                width: "100%",
              }}
            >
              <AIActionMenu
                actions={actions}
                triggerRef={plusButtonRef}
                textareaRef={textareaRef}
              />
              <textarea
                ref={textareaRef}
                placeholder="Type a prompt..."
                value={inputValue}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                className="input-base flex-1 min-w-0 resize-none overflow-hidden"
                style={{
                  fontSize: "var(--fs-base)",
                  lineHeight: "1.5",
                  letterSpacing: "var(--ls-tight)",
                  height: "36px",
                  maxHeight: "200px",
                  paddingTop: "var(--sp-1)",
                  paddingBottom: "var(--sp-1)",
                  overflowY: "auto",
                  alignSelf: hasMultipleLines ? "flex-start" : "flex-end",
                  maxWidth: hasMultipleLines ? "100%" : "none",
                }}
                rows={1}
              />
            </div>
          </div>

          {/* Right side: Mic and Voice/Send buttons */}
          <div
            className="flex items-end shrink-0"
            style={{
              gap: "var(--sp-1)",
            }}
          >
            <IconButton
              icon="Microphone01"
              iconClassName="text-primary"
            />
            {hasText ? (
              <button
                type="button"
                className="flex items-center justify-center border-0"
                style={{
                  borderRadius: "var(--r-full)",
                  width: "var(--sp-9, 2.25rem)",
                  height: "var(--sp-9, 2.25rem)",
                  padding: "var(--sp-1)",
                  backgroundColor: "var(--color-primary)",
                  transition: "opacity var(--transition-base)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
                aria-label="Send"
              >
                <Icon
                  name="ArrowNarrowUp"
                  size={20}
                  className="text-bg"
                  strokeWidth={2.5}
                />
              </button>
            ) : (
              <div
                className="flex items-center justify-center"
                style={{
                  borderRadius: "var(--r-full)",
                  width: "var(--sp-9, 2.25rem)",
                  height: "var(--sp-9, 2.25rem)",
                  padding: "var(--sp-1)",
                  backgroundColor: "var(--color-bg)",
                }}
              >
                <Icon name="Recording01" size={20} className="text-primary" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

