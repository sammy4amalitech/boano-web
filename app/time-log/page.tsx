import React from 'react';
import {useQueries} from "@tanstack/react-query";
import TimeLogContainer from "@/components/time-log-container";

function Page(props) {
    return (
        <div className={'py-12 px-12'}><TimeLogContainer/></div>
    );
}

export default Page;