"use client";
import React, {Suspense} from 'react';
import {Timelogs, useTimelogs} from "@/features/timelog";

function TimeLogContainer() {

    const { data = [] } = useTimelogs();



    return (
        <div>
           <Suspense fallback={<div>Loading...</div>}>
               {
                   data.length > 0 ? (
                          <Timelogs timelogs={data}/>
                     ) : (
                          <div className="text-center text-gray-400">No timelogs found</div>
                     )
               }
           </Suspense>
        </div>
    );
}

export default TimeLogContainer;