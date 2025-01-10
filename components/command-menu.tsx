"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CommandMenu() {
    return (
        <Button
            variant="outline"
            className="w-full justify-start text-muted-foreground"
            onClick={() => { }} // Will implement command menu later
        >
            <Search className="h-4 w-4 mr-2" />
            Search...
        </Button>
    );
} 