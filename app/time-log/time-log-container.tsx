"use client";
import React from 'react';
import {Timelogs, useTimelogs} from "@/features/timelog";

function TimeLogContainer(props) {

    const { data } = useTimelogs();

    console.log(data);

    const formattedTimelogs = data?.map(log => ({
        title: `${log.task} - ${log.description}`,
        date: new Date(log.created_at).toLocaleDateString(),
        start_time: new Date(log.start_time).toLocaleTimeString(),
        end_time: log.end_time ? new Date(log.end_time).toLocaleTimeString() : '',
        source: log.source
    })) || [];
    return (
        <div>
            <Timelogs timelogs={formattedTimelogs}/>
        </div>
    );
}

export default TimeLogContainer;