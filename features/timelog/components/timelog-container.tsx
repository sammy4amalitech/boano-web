"use client";

import Chat from "@/components/chat";
import {useTimelogStore} from "@/lib/store";
import {TimelogSidebar} from "./timelog-sidebar";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";

export default function TimelogContainer() {
  const { timelogs, sidebarOpen, setSidebarOpen } = useTimelogStore();

  return (
    <SidebarProvider defaultOpen={sidebarOpen} open={sidebarOpen} onOpenChange={setSidebarOpen}
                     style={{
                         "--sidebar-width": "25rem",
                         "--sidebar-width-mobile": "20rem",
                     }}
    >
        <div className="w-full flex relative">
          <div className={"w-full h-full mx-4"}>
              <Chat/>
          </div>
            <SidebarTrigger
                className={`fixed z-60 transition-all duration-300  ${
                    sidebarOpen ? 'right-[25rem]' : 'right-4'
                }`}
            />
            <TimelogSidebar />
        </div>
    </SidebarProvider>
  );
}