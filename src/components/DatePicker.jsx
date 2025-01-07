"use client";

import * as React from "react";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export default function DatePicker({ selectedDate, onSelectDate }) {
    // const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const onDateSelect = (date) => {
        onSelectDate(date);
        setOpen(false);
    };

    return (
        <Popover open={open}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[190px] justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground",
                    )}
                    onClick={() => setOpen(!open)}
                >
                    <CalendarIcon />
                    {selectedDate ? (
                        format(selectedDate, "PPP")
                    ) : (
                        <span>Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(value) => onDateSelect(value.toISOString())}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
