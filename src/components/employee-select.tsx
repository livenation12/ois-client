import { useState, useLayoutEffect, useRef, useCallback } from "react";
import {
     Popover,
     PopoverTrigger,
     PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
     Command,
     CommandInput,
     CommandList,
     CommandEmpty,
     CommandGroup,
     CommandItem,
} from "@/components/ui/command";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import useFetch from "@/hooks/use-fetch";
import { getAllUser } from "@/services/user.service";
import type { User } from "@/types/user.types";

interface EmployeeSelectProps {
     onSelect: (value: string) => void;
}

export default function EmployeeSelect({ onSelect }: EmployeeSelectProps) {
     const [open, setOpen] = useState(false);
     const [selected, setSelected] = useState("");
     const buttonRef = useRef<HTMLButtonElement | null>(null);
     const [buttonWidth, setButtonWidth] = useState(0);
     const { data: employees, loading } = useFetch<User[]>(getAllUser, { auto: true });

     const measureWidth = () => {
          if (!buttonRef.current) return;
          // Ensure layout is stable before measuring
          requestAnimationFrame(() => {
               const width = buttonRef.current?.offsetWidth || 0;
               if (width > 1) setButtonWidth(width);
          });
     };

     const handleSelect = useCallback((value: string) => {
          if (!value) return;
          onSelect(value);
          setSelected(value);
          setOpen(false);
     }, [onSelect, setOpen]);


     useLayoutEffect(() => {
          measureWidth();
          const resizeObserver = new ResizeObserver(measureWidth);
          if (buttonRef.current) resizeObserver.observe(buttonRef.current);

          window.addEventListener("resize", measureWidth);
          return () => {
               resizeObserver.disconnect();
               window.removeEventListener("resize", measureWidth);
          };
     }, []);

     useLayoutEffect(() => {
          if (open) measureWidth();
     }, [open]);

     return (
          <>
               <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>


                         <Button
                              ref={buttonRef}
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="justify-between w-full"
                         >
                              {selected
                                   ? employees?.find((o) => o.id === selected)?.fullName
                                   : "Select employee..."}
                         </Button>


                    </PopoverTrigger>

                    <PopoverContent
                         align="start"
                         className="p-0"
                         style={{ width: buttonWidth ? `${buttonWidth}px` : "auto" }}
                    >
                         <Command>
                              <CommandInput placeholder="Search employee..." className="h-9" />
                              <CommandList>
                                   <CommandEmpty>
                                        No user found.
                                   </CommandEmpty>
                                   <CommandGroup>
                                        {
                                             loading ?
                                                  (
                                                       <CommandItem>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            Loading...
                                                       </CommandItem>
                                                  ) :
                                                  employees?.map((employee) => (
                                                       <CommandItem
                                                            key={employee.id}
                                                            value={employee.id}
                                                            onSelect={() => handleSelect(employee.id)}
                                                       >
                                                            {employee.fullName}
                                                            <Check
                                                                 className={cn(
                                                                      "ml-auto",
                                                                      selected === employee.id
                                                                           ? "opacity-100"
                                                                           : "opacity-0"
                                                                 )}
                                                            />
                                                       </CommandItem>
                                                  ))
                                        }
                                   </CommandGroup>
                              </CommandList>
                         </Command>
                    </PopoverContent>
               </Popover>
          </>
     );
}
