import { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
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
import { searchTagService } from "@/services/TagService";
import { Tag } from "@/schemas/TagSchema";
import { useQuery } from "@tanstack/react-query"; // Import useQuery

interface ComboboxProps {
  value: Tag[];
  onChange: (tags: Tag[]) => void;
}

export default function Combobox({ value, onChange }: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [param, setParam] = useState<string>("");

  // React Query to fetch tags
  const { data, isLoading, error } = useQuery<Tag[] | null, Error>({
    queryKey: ['searchTag', param],
    queryFn: () => searchTagService(param), // Wrap searchTagService in a function
    enabled: param.length > 2,
  });

  // Log the error if it exists
  if (error) {
    console.error("Error fetching tags:", error.message);
  }

  // Function to update selected tags
  const handleSetValue = (tag: Tag) => {
    const updatedTags = value.some((selectedTag: Tag) => selectedTag.id === tag.id)
      ? value.filter((item: Tag) => item.id !== tag.id)
      : [...value, tag];
    onChange(updatedTags);
  };

  // Function to remove selected tag
  const handleRemoveTag = (tagId: number) => {
    const updatedTags = value.filter((tag: Tag) => tag.id !== tagId);
    onChange(updatedTags);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full" asChild>
        <Button
          variant="outline"
          role="combobox"
          className="justify-between flex focus-visible:ring-0"
        >
          <div className="flex gap-2 justify-start font-extralight">
            {value.length > 0
              ? value.map((tag: Tag) => (
                <div
                  key={tag.id}
                  className="flex items-center px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium"
                >
                  {tag.name}
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer hover:bg-slate-400 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveTag(tag.id);
                    }}
                  />
                </div>
              ))
              : <span className="font-light">Gắn thẻ vào bài viết của bạn. Tối đa 5 thẻ. ít nhất 1 thẻ</span>}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <Input
            className="focus-visible:ring-0"
            placeholder="Search Tag..."
            onChange={(e: any) => setParam(e.target.value)} // Update the search param
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
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
