"use client";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";

export default function Home() {
    const { signOut } = useAuthActions();
    return (
        <>
            <AuthLoading><div>Loading...</div>{/* consider showing a loading indicator */}</AuthLoading>
            <Unauthenticated>
                <div>Unauthenticated</div>
            </Unauthenticated>
            <Authenticated>
                <div>Authenticated</div>
                <Button onClick={() => signOut()}>Sign Out</Button>
            </Authenticated>
        </>
    );
}