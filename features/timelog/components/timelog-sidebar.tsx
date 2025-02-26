import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar"
import {useTimelogStore} from "@/lib/store";
import {Timelogs, useTimelogs} from "@/features/timelog";
import {TimelogEntry} from "@/types";

export function TimelogSidebar() {
    const { data: response } = useTimelogs();
    console.log(response?.data)
    const formattedTimelogs: TimelogEntry[] = response?.data?.data?.map(log => ({
        title: `${log.task} - ${log.description}`,
        date: new Date(log.created_at).toLocaleDateString(),
        start_time: new Date(log.start_time).toLocaleTimeString(),
        end_time: log.end_time ? new Date(log.end_time).toLocaleTimeString() : '',
        source: log.source
    })) || [];

    return (
        <Sidebar side="right" >
            <SidebarContent>
                <Timelogs timelogs={formattedTimelogs}/>
            </SidebarContent>
        </Sidebar>
    )
}