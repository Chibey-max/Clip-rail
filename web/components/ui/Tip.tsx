"use client";

import * as Tooltip from "@radix-ui/react-tooltip";

export function Tip({ content, children }: { content: React.ReactNode; children: React.ReactNode }) {
  return (
    <Tooltip.Provider delayDuration={150}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content sideOffset={6} className="z-50 max-w-xs rounded-md border border-line bg-surface-2 px-3 py-2 text-xs text-fg shadow-lg">
            {content}
            <Tooltip.Arrow className="fill-surface-2" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
