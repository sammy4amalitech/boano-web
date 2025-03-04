"use client"
import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar"
import {useTimelogStore} from "@/lib/store";
import {Timelogs} from "@/features/timelog";
import {TimeLogResponse} from "@/lib/schemas";

export function TimelogSidebar() {
  const {timelogs} = useTimelogStore();

  // Transform timelogs to match the expected format
  const transformedTimelogs: TimeLogResponse[] = timelogs.map(log => ({
    id: 0, // Using created_at as a temporary ID since TimeLogAgentResponse doesn't have an id
    task: log.task,
    start_date: log.start_date,
    end_date: log.end_date,
    source: log.source,
    created_at: log.created_at,
    description: log.description,
    creator_id: "",
  }));

  return (
    <Sidebar side="right" >
      <SidebarContent>
        {timelogs.length > 0 ? (
            <Timelogs timelogs={transformedTimelogs}/>        ) : (
          <div className="p-4 text-center text-gray-400">No timelogs available</div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}