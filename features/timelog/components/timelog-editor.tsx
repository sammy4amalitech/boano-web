import { Textarea } from "@/components/ui/textarea";

export default function TimelogEditor() {
    return (
        <div className="relative">
            <Textarea
                className="flex sm:min-h-[20px] w-full bg-transparent px-4 py-3 text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground/70 [resize:none]"
                placeholder="Edit your time log..."
                aria-label="Enter your prompt"
                value={"Refactored report from 8pm to 9:45pm,"}
            />
        </div>
    );
}