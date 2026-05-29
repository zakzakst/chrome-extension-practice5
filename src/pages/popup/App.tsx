import { useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const App = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState<string | undefined>("");
  const [endTime, setEndTime] = useState<string | undefined>("");

  const dateText = useMemo<string>(() => {
    if (!date) return "";
    return date.toDateString();
  }, [date]);

  const timeText = useMemo<string>(() => {
    if (!startTime && !endTime) {
      return "";
    } else {
      return `${startTime} ～ ${endTime}`;
    }
  }, [startTime, endTime]);

  const dateTimeText = useMemo<string>(() => {
    return timeText ? `${dateText}：${timeText}` : dateText;
  }, [dateText, timeText]);

  const handleClick = useCallback(() => {
    navigator.clipboard.writeText(dateTimeText).then(() => {
      toast("コピーしました", { duration: 1000 });
    });
  }, [dateTimeText]);

  const handleClear = useCallback(() => {
    setStartTime("");
    setEndTime("");
  }, [setStartTime, setEndTime]);

  return (
    <div className="grid w-md grid-cols-[max-content_1fr] gap-4 p-4">
      <div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border"
        />
      </div>
      <div>
        <div className="grid grid-cols-1 gap-2">
          <div className="grid grid-cols-[40px_1fr] items-center gap-2">
            <div>開始</div>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-[40px_1fr] items-center gap-2">
            <div>終了</div>
            <Input
              type="time"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-[40px_1fr] items-center gap-2">
            <div>書式</div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-6">{dateTimeText}</div>
        <div className="mt-6">
          <Button className="w-full" onClick={handleClick}>
            コピー
          </Button>
        </div>
        <div className="mt-2">
          <Button
            className="w-full"
            variant="outline"
            onClick={handleClear}
            disabled={!startTime && !endTime}
          >
            時間をクリア
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
