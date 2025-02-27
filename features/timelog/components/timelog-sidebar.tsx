import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar"
import {useTimelogStore} from "@/lib/store";
import {Timelogs, useBatchCreateTimelog} from "@/features/timelog";
import { Button } from "@/components/ui/button";
import { DateTime } from "luxon";

export function TimelogSidebar() {
  const {timelogs} = useTimelogStore();

  const batchCreateTimeLog = useBatchCreateTimelog();

  const handleSave = async () => {
    if (timelogs.length === 0) return;
    
    try {
      // Transform timelogs to match TimelogCreateInput format
      const batchLogs = timelogs.map(timelog => ({
        task: timelog.title,
        description: "",
        start_time: DateTime.fromFormat(timelog.start_time, 'hh:mm').toUTC().toISO() || '',
        end_time: DateTime.fromFormat(timelog.end_time, 'hh:mm').toUTC().toISO() || '',
        source: timelog.source
      }));
        await batchCreateTimeLog.mutateAsync(batchLogs);
    } catch (error) {
      console.error('Error saving timelogs:', error);
    } 
  };

  return (
    <Sidebar side="right" >
      <SidebarContent>
        {timelogs.length > 0 && (
          <div className="px-4 py-2">
            <Button
              className="w-full"
              onClick={handleSave}
              disabled={batchCreateTimeLog.isPending}
            >
              {batchCreateTimeLog.isPending ? 'Saving...' : 'Save Timelogs'}
            </Button>
          </div>
        )}
        <Timelogs timelogs={timelogs}/>
      </SidebarContent>
    </Sidebar>
  )
}