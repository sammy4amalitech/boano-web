"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {RemixiconComponentType} from "@remixicon/react";
import Link from "next/link";

export function NavMain({
                            items,
                        }: {
    items: {
        title: string
        url: string
        icon?: RemixiconComponentType
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
}) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    // <Collapsible
                    //     key={item.title}
                    //     asChild
                    //     defaultOpen={item.isActive}
                    //     className="group/collapsible"
                    // >
                        <SidebarMenuItem key={item.title}>
                               <Link href={item.url}>
                                   <SidebarMenuButton tooltip={item.title}>
                                       {item.icon && <item.icon />}
                                       <span>{item.title}</span>
                                       {/*<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />*/}
                                   </SidebarMenuButton>
                               </Link>
                        </SidebarMenuItem>
                    // </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
