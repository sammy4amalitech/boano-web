"use client"

import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Sparkles,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import {SignIn, SignOutButton, useClerk, useUser} from "@clerk/nextjs";

export function NavUser() {
    const { isMobile } = useSidebar()
    const {user } = useUser();
    const { openUserProfile } = useClerk()
    if (!user) return null;
    //open user clerk user profile
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user?.imageUrl} alt={user.fullName || ""} />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user.fullName}</span>
                                <span className="truncate text-xs">{user.primaryEmailAddress?.emailAddress}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.imageUrl} alt={user.fullName || ""} />
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user.fullName}</span>
                                    <span className="truncate text-xs">{user.primaryEmailAddress?.emailAddress}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {/*<DropdownMenuGroup>*/}
                        {/*    <DropdownMenuItem>*/}
                        {/*        <Sparkles />*/}
                        {/*        Upgrade to Pro*/}
                        {/*    </DropdownMenuItem>*/}
                        {/*</DropdownMenuGroup>*/}
                        {/*<DropdownMenuSeparator />*/}
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={()=>openUserProfile()}>
                                <BadgeCheck />
                                Account
                            </DropdownMenuItem>
                            {/*<DropdownMenuItem>*/}
                            {/*    <CreditCard />*/}
                            {/*    Billing*/}
                            {/*</DropdownMenuItem>*/}
                            {/*<DropdownMenuItem>*/}
                            {/*    <Bell />*/}
                            {/*    Notifications*/}
                            {/*</DropdownMenuItem>*/}
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <SignOutButton>
                            <DropdownMenuItem>

                                <LogOut />
                                Log out
                            </DropdownMenuItem>
                        </SignOutButton>

                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
