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
import { getAllOfficesExceptPrincipalOffice } from "../features/offices/services/office-service";
import OfficeDialog from "../features/offices/components/office-dialog";
import type { Office } from "@/types/office-types";
import useFetch from "@/hooks/use-fetch";

interface OfficeSelectProps {
  onSelect: (value: string) => void;
}

export default function OfficeSelect({ onSelect }: OfficeSelectProps) {
  const [open, setOpen] = useState(false);
  const [openOfficeDialog, setOpenOfficeDialog] = useState(false);
  const [selected, setSelected] = useState("");
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [buttonWidth, setButtonWidth] = useState(0);
  const [onOfficeCreate, setOnOfficeCreate] = useState(0);
  const { data: offices, loading } = useFetch<Office[]>(getAllOfficesExceptPrincipalOffice, { auto: true, dependencies: [onOfficeCreate] });

  const measureWidth = () => {
    if (!buttonRef.current) return;
    // Ensure layout is stable before measuring
    requestAnimationFrame(() => {
      const width = buttonRef.current?.offsetWidth || 0;
      if (width > 1) setButtonWidth(width);
    });
  };

  const handleOfficeCreate = () => {
    setOnOfficeCreate(onOfficeCreate + 1);
  }

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
              ? offices?.find((o) => o.id === selected)?.name
              : "Select office..."}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="p-0"
          style={{ width: buttonWidth ? `${buttonWidth}px` : "auto" }}
        >
          <Command>
            <CommandInput placeholder="Search office..." className="h-9" />
            <CommandList>
              <CommandEmpty>
                No office found.
                <Button onClick={() => setOpenOfficeDialog(true)} size="sm" className="ml-3">Create new office</Button>
              </CommandEmpty>
              <CommandGroup>
                {
                  loading ?
                    <CommandItem>
                      <Loader2 className="animate-spin" />
                      <span>Loading...</span>
                    </CommandItem>
                    : offices?.map((office) => (
                      <CommandItem
                        key={office.id}
                        value={office.id}
                        onSelect={() => handleSelect(office.id)}
                      >
                        {`${office.code ? office.code + " - " : ""} ${office.name}`}
                        <Check
                          className={cn(
                            "ml-auto",
                            selected === office.id
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
      <OfficeDialog open={openOfficeDialog} setOpen={setOpenOfficeDialog} onCreate={handleOfficeCreate} />
    </>
  );
}
