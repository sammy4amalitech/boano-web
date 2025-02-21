import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar"
import Timelogs from "@/components/ui/timelogs";
import {useTimelogStore} from "@/lib/store";

export function TimelogSidebar() {
  const {timelogs} = useTimelogStore();
  return (
    <Sidebar side="right" >
      <SidebarContent>
        <Timelogs timelogs={timelogs}/>
      </SidebarContent>
    </Sidebar>
  )
}
