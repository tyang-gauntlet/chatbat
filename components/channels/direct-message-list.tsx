import { Button } from "@/components/ui/button";
import { ChevronRight, User } from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { cn } from "@/lib/utils";

// TODO: Replace with actual DM data and hook
const mockUsers = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
];

export const DirectMessageList = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="py-2"
        >
            <div className="flex items-center px-2">
                <CollapsibleTrigger className="flex flex-1 items-center gap-1 hover:text-foreground/80">
                    <ChevronRight
                        className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            isOpen && "transform rotate-90"
                        )}
                    />
                    <h2 className="text-sm font-semibold">
                        Direct Messages
                    </h2>
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
                <div className="space-y-[2px] p-2 max-h-[50vh] overflow-y-auto">
                    {mockUsers.map((user) => (
                        <Button
                            key={user.id}
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start font-normal"
                        >
                            <User className="mr-2 h-4 w-4" />
                            {user.name}
                        </Button>
                    ))}
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}; 