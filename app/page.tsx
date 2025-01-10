"use client";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { ModeToggle } from "@/components/mode-toggle";
import { CommandMenu } from "@/components/command-menu";
import { UserMenu } from "@/components/user-menu";
import { ChannelList } from "@/components/channels/channel-list";
import { DirectMessageList } from "@/components/channels/direct-message-list";

export default function Home() {
    const { signOut } = useAuthActions();
    return (
        <>
            <AuthLoading>
                <div className="flex justify-center items-center min-h-screen">
                    <svg
                        className="animate-spin h-6 w-6 text-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                </div>
            </AuthLoading>

            <Authenticated>
                <div className="h-screen flex flex-col">
                    {/* Header */}
                    <header className="h-14 border-b flex items-center px-4 justify-between">
                        <h1 className="text-xl font-bold">ChatBat</h1>
                        <div className="flex-1 max-w-2xl mx-4">
                            <CommandMenu />
                        </div>
                        <div className="flex items-center gap-2">
                            <ModeToggle />
                            <UserMenu />
                        </div>
                    </header>

                    <div className="flex-1 flex overflow-hidden">
                        {/* Sidebar */}
                        <aside className="w-60 border-r flex flex-col">
                            <div className="p-4 space-y-4">
                                <ChannelList />
                                <DirectMessageList />
                            </div>
                        </aside>

                        {/* Main Content */}
                        <main className="flex-1 flex flex-col overflow-hidden">
                            <div className="h-14 border-b flex items-center px-4">
                                {/* Channel/User header will go here */}
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                {/* Messages will go here */}
                            </div>
                            <div className="border-t p-4">
                                {/* Message input will go here */}
                            </div>
                        </main>

                        {/* Thread Sidebar - Hidden by default */}
                        <aside className="w-80 border-l hidden">
                            {/* Thread content will go here */}
                        </aside>
                    </div>
                </div>
            </Authenticated>

            <Unauthenticated>
                <div className="flex justify-center items-center min-h-screen">
                    <p>Please sign in to continue</p>
                </div>
            </Unauthenticated>
        </>
    );
}