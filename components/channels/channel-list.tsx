import { useGetChannels } from "@/hooks/useApi";
import { Button } from "@/components/ui/button";
import { Hash, ChevronRight } from "lucide-react";
import { CreateChannelDialog } from "./create-channel-dialog";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const ChannelList = () => {
    const { data: channels, isLoading } = useGetChannels();
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
                        Channels
                    </h2>
                </CollapsibleTrigger>
                <div className="flex-none">
                    <CreateChannelDialog />
                </div>
            </div>
            <CollapsibleContent>
                <div className="space-y-[2px] p-2 max-h-[50vh] overflow-y-auto">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-4">
                            <span className="text-sm text-muted-foreground">Loading...</span>
                        </div>
                    ) : channels?.length === 0 ? (
                        <div className="flex items-center justify-center py-4">
                            <span className="text-sm text-muted-foreground">No channels yet</span>
                        </div>
                    ) : (
                        channels?.map((channel) => (
                            <Button
                                key={channel._id}
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start font-normal"
                            >
                                <Hash className="mr-2 h-4 w-4" />
                                {channel.name}
                            </Button>
                        ))
                    )}
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}; 