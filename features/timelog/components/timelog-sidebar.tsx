import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar"
import {useTimelogStore} from "@/lib/store";
import {Timelogs} from "@/features/timelog";

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