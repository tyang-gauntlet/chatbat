"use client";

import { Button } from "./ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";

export function UserMenu() {
    const { signOut } = useAuthActions();

    const handleSignOut = () => {
        signOut();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-primary/10"
                    aria-label="User menu"
                >
                    <span className="text-sm font-medium">US</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
} 