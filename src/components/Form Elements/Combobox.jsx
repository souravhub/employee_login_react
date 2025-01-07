"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export default function Combobox({
    options = [],
    placeholder = "Select",
    selected,
    labelKey,
    valueKey,
    onSelectOption,
}) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    const getSelectedClass = function (option) {
        if (valueKey) {
            return option[valueKey] === selected ? "opacity-100" : "opacity-0";
        } else {
            return option === selected ? "opacity-100" : "opacity-0";
        }
    };

    const getSelectedLabel = function () {
        if (selected) {
            let obj = options.find((option) => {
                return valueKey
                    ? option[valueKey] === selected
                    : option === selected;
            });

            return labelKey ? obj[labelKey] : obj;
        } else return null;
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {getSelectedLabel() || placeholder}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search" className="h-9" />
                    <CommandList>
                        <CommandEmpty>No Item found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={valueKey ? option[valueKey] : option}
                                    value={
                                        labelKey ? option[labelKey] : labelKey
                                    }
                                    onSelect={(currentValue) => {
                                        onSelectOption(
                                            valueKey
                                                ? option[valueKey]
                                                : option,
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    {labelKey ? option[labelKey] : labelKey}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            getSelectedClass(option),
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
