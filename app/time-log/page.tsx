import React from 'react';
import {useQueries} from "@tanstack/react-query";
import TimeLogContainer from "@/app/time-log/time-log-container";

function Page(props) {
    return (
        <div><TimeLogContainer/></div>
    );
}

export default Page;