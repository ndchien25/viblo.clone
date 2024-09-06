import { useEffect, useState } from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "./ui/input"
import { searchTagService } from "@/services/TagService"
import { Tag } from "@/schemas/TagSchema"
interface ComboboxProps {
  value: Tag[];
  onChange: (tags: Tag[]) => void;
}
export default function Combobox({ value, onChange }: ComboboxProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    const fetchTags = async () => {
      if (query.length > 2) {
        const response = await searchTagService(query, (err: any) => {
          console.log(err);
        });
        if (response) {
          setTags(response.data);
        }
      }
    };

    fetchTags();

  }, [query]);


  const handleSetValue = (tag: Tag) => {
    const updatedTags = value.some((selectedTag: Tag) => selectedTag.id === tag.id)
      ? value.filter((item: Tag) => item.id !== tag.id)
      : [...value, tag];
    onChange(updatedTags);
  }

  const handleRemoveTag = (tagId: number) => {
    const updatedTags = value.filter((tag: Tag) => tag.id !== tagId);
    onChange(updatedTags);
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex gap-2 justify-start font-extralight">
            {value.length > 0
              ? value.map((tag: Tag) => (
                <div key={tag.id} className="flex items-center px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium">
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
              : "Gắn thẻ vào bài viết của bạn. Tối đa 5 thẻ. ít nhất 1 thẻ"}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[1401px]">
        <Command>
          <Input className="focus-visible:ring-0" placeholder="Search Tag..." onChange={(e: any) => setQuery(e.target.value)} />
          <CommandEmpty>No Tag found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {tags.length > 0 && tags.map(tag => (
                <CommandItem
                  key={tag.id}
                  value={tag.name}
                  onSelect={() => {
                    handleSetValue(tag)
                    setTags([]);
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
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
