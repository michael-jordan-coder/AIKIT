"use client";

import { useState, useEffect, useRef } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Icon } from "@/client/Icon";

export type Action = {
  id: string;
  label: string;
  icon: Parameters<typeof Icon>[0]["name"];
  hint?: string;
  color?: string;
  onSelect: () => void;
};

interface AIActionMenuProps {
  actions: Action[];
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
  onOpenChange?: (open: boolean) => void;
  textareaRef?: React.RefObject<HTMLTextAreaElement | null>;
}

export function AIActionMenu({
  actions,
  triggerRef,
  onOpenChange,
  textareaRef,
}: AIActionMenuProps) {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  // Handle "/" keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      
      // If typing "/" in our textarea, open menu
      if (
        e.key === "/" &&
        textareaRef?.current &&
        (target === textareaRef.current || textareaRef.current.contains(target))
      ) {
        e.preventDefault();
        setOpen(true);
        return;
      }

      // Global "/" shortcut (only if not in input/textarea)
      if (
        e.key === "/" &&
        target.tagName !== "INPUT" &&
        target.tagName !== "TEXTAREA" &&
        !target.isContentEditable
      ) {
        e.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [textareaRef]);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      setSelectedIndex(0);
    }
    onOpenChange?.(newOpen);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % actions.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + actions.length) % actions.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (actions[selectedIndex]) {
          actions[selectedIndex].onSelect();
          setOpen(false);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, selectedIndex, actions]);

  // Scroll selected item into view
  useEffect(() => {
    if (open && listRef.current) {
      const selectedItem = listRef.current.children[selectedIndex] as HTMLElement;
      if (selectedItem) {
        selectedItem.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex, open]);

  const handleSelect = (action: Action) => {
    action.onSelect();
    handleOpenChange(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger asChild>
        <button
          ref={triggerRef as React.RefObject<HTMLButtonElement>}
          type="button"
          className="ai-plus icon-btn-base"
          aria-label="Open action menu"
        >
          <Icon name="Plus" size={20} className="text-muted" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="ai-action-menu"
          side="top"
          sideOffset={8}
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div ref={listRef} className="ai-action-menu-list" role="listbox">
            {actions.map((action, index) => (
              <button
                key={action.id}
                type="button"
                className={`ai-action-item ${
                  index === selectedIndex ? "ai-action-item-selected" : ""
                }`}
                onClick={() => handleSelect(action)}
                role="option"
                aria-selected={index === selectedIndex}
              >
                <div className="ai-action-item-icon">
                  <Icon name={action.icon} size={20} className="text-primary" />
                </div>
                <div className="ai-action-item-content">
                  <div className="ai-action-item-label">{action.label}</div>
                  {action.hint && (
                    <div className="ai-action-item-hint">{action.hint}</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

