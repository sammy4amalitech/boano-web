"use client";

import { TimelogEntry } from "@/types";
import Chat from "@/components/chat";
import Timelogs from "@/components/ui/timelogs";
import { useTimelogStore } from "@/lib/store";

export default function TimelogContainer() {
  const { timelogs } = useTimelogStore();

  return (
    <div className="m-auto flex flex-col gap-8 w-2/3">
      <Chat />
      <Timelogs timelogs={timelogs} />
    </div>
  );
}