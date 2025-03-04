"use client";
import React, {Suspense} from 'react';
import {Timelogs, useTimelogs} from "@/features/timelog";

function TimeLogContainer() {

    const { data = [] } = useTimelogs();

    // Transform the API response to match the expected format
    const transformedData = data.map(item => ({
        ...item,
        start_date: item.start_time,
        end_date: item.end_time
    }));

    return (
        <div>
           <Suspense fallback={<div>Loading...</div>}>
               {
                   transformedData.length > 0 ? (
                          <Timelogs timelogs={transformedData}/>
                     ) : (
                          <div className="text-center text-gray-400">No timelogs found</div>
                     )
               }
           </Suspense>
        </div>
    );
}

export default TimeLogContainer;