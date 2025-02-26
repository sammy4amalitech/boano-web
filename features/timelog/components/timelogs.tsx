import { TimelogEntry } from "../types";

type TimelogsProps = {
    timelogs: TimelogEntry[];
};

export default function Timelogs({ timelogs }: TimelogsProps) {
    return (
        <div className={'flex flex-col gap-4'}>
            {timelogs.map((log, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-[15px]">{log.title}</p>
                    <p className="text-sm text-muted-foreground">
                        {log.date} ({log.start_time} - {log.end_time})
                    </p>
                </div>
            ))}
        </div>
    );
}