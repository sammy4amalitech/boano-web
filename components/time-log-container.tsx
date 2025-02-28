"use client";
import React, {Suspense} from 'react';
import {Timelogs, useTimelogs} from "@/features/timelog";

function TimeLogContainer() {

    const { data } = useTimelogs();


    const formattedTimelogs = data?.map(log => ({
        title: log.task,
        date: new Date(log.created_at).toLocaleDateString(),
        start_time: log.start_time ,
        end_time:  log.end_time ,
        source: log.source
    })) || [];
    return (
        <div>
           <Suspense fallback={<div>Loading...</div>}>
               {
                     formattedTimelogs.length > 0 ? (
                          <Timelogs timelogs={formattedTimelogs}/>
                     ) : (
                          <div className="text-center text-gray-400">No timelogs found</div>
                     )
               }
           </Suspense>
        </div>
    );
}

export default TimeLogContainer;