import { useState } from "react";
import { Check, ChevronDown, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";
import { Tag } from "@/schemas/TagSchema";
import { Badge } from "./ui/badge";

interface ComboboxProps {
  data: Tag[];
  value: Tag[];
  onChange: (tags: Tag[]) => void;
  setParam: (param: string) => void;
  isLoading: boolean
  error: any
}

export default function Combobox({ data, value, onChange, setParam, isLoading, error }: ComboboxProps) {
  const [open, setOpen] = useState(false);

  const handleSetValue = (tag: Tag) => {
    const updatedTags = value.some((selectedTag: Tag) => selectedTag.id === tag.id)
      ? value.filter((item: Tag) => item.id !== tag.id)
      : [...value, tag];
    onChange(updatedTags);
  };

  const handleRemoveTag = (tagId: number) => {
    const updatedTags = value.filter((tag: Tag) => tag.id !== tagId);
    onChange(updatedTags);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          className="flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit focus-visible:ring-0"
        >
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-wrap items-center w-full">
              {value.length > 0 ? (
                value.map((tag: Tag) => (
                  <Badge
                    key={tag.id}
                    className={cn(
                      "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
                    )}
                  >
                    {tag.name}
                    <XCircle
                      className="ml-2 h-4 w-4 cursor-pointer rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveTag(tag.id);
                      }}
                    />
                  </Badge>
                ))
              ) : (
                <div className="flex items-center justify-between w-full mx-auto py-1 border rounded-md bg-slate-200 text-sm text-muted-foreground">
                  <span className="mx-3">
                    Gắn thẻ vào bài viết của bạn. Tối đa 5 thẻ. ít nhất 1 thẻ
                  </span>
                  <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
                </div>
              )}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[1000px] p-0"
        align="start"
        onEscapeKeyDown={() => setOpen(false)}
      >
        <Command>
          <Input
            className="focus-visible:ring-0"
            placeholder="Search Tag..."
            onChange={(e: any) => setParam(e.target.value)}
          />
          <CommandEmpty>No Tag found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {isLoading ? (
                <CommandItem>Loading...</CommandItem>
              ) : (
                data &&
                data.map((tag: Tag) => (
                  <CommandItem
                    key={tag.id}
                    value={tag.name}
                    onSelect={() => {
                      handleSetValue(tag);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.some((selectedTag: Tag) => selectedTag.id === tag.id)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {tag.name}
                  </CommandItem>
                ))
              )}
              {error && (
                <span>{error.message}</span>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
