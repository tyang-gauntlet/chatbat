"use client";

import { Button } from "./button";

export function UserMenu() {
    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-primary/10"
        >
            <span className="text-sm font-medium">US</span>
        </Button>
    );
} 