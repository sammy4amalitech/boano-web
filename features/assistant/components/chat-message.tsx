import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  RiCodeSSlashLine,
  RiBookLine,
  RiLoopRightFill,
  RiCheckLine,
  RiUser3Fill,
  RiRobot2Fill,
} from "@remixicon/react";
import { cn } from "@/lib/utils";

type ChatMessageProps = {
  isUser?: boolean;
  children: React.ReactNode;
};

export function ChatMessage({ isUser, children }: ChatMessageProps) {
  return (
    <article
      className={cn(
        "flex items-start gap-4 text-[15px] leading-relaxed",
        isUser ? "justify-end ml-16" : "justify-start mr-16"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center p-2 rounded-full",
          isUser
            ? "order-1 bg-primary text-primary-foreground"
            : "bg-muted border border-black/[0.08] shadow-sm text-muted-foreground/70"
        )}
      >
        {isUser ? <RiUser3Fill size={20} /> : <RiRobot2Fill size={20} />}
        <span className="sr-only">{isUser ? "User profile" : "Assistant logo"}</span>
      </div>
      <div
        className={cn(
          isUser ? "bg-muted px-4 py-3 rounded-xl" : "space-y-4"
        )}
      >
        <div className="flex flex-col gap-3">
          <p className="sr-only">{isUser ? "You" : "Assistant"} said:</p>
          {children}
        </div>
      </div>
    </article>
  );
}