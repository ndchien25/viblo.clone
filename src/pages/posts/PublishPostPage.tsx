import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronDown, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { PostCreate, postCreateSchema } from "@/schemas/PostSchema";
import { createPostService } from "@/services/PostService";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Combobox from "@/components/Combobox";
import { Tag } from "@/schemas/TagSchema";

export default function PublishPostPage() {
  const { toast } = useToast();
  const delay = 1000; // Delay for autosave in milliseconds
  const [errors, setErrors] = useState<boolean>(true);
  const form = useForm<PostCreate>({
    resolver: zodResolver(postCreateSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      tags: [],
      content: '',
    },
  });

  useEffect(() => {
    const savedTitle = localStorage.getItem('post_title') || "";
    const savedTags = JSON.parse(localStorage.getItem('post_tags') || '[]');
    const savedContent = localStorage.getItem('post_content') || "";

    form.reset({
      title: savedTitle,
      tags: savedTags,
      content: savedContent,
    });
  }, [form]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (errors) return;

      // Save values to localStorage with delay
      const timeout = setTimeout(() => {
        localStorage.setItem('post_title', values.title || '');
        localStorage.setItem('post_tags', JSON.stringify(values.tags));
        localStorage.setItem('post_content', values.content || '');
      }, delay);

      return () => clearTimeout(timeout);
    });

    return () => subscription.unsubscribe();
  }, [form, delay, errors]);

  useEffect(() => {
    const { title, tags, content } = form.getValues();

    if (title && tags.length > 0 && content) {
      setErrors(false);
    } else {
      setErrors(true);
    }
  }, [form.getValues()]);

  const onSubmit = async (data: PostCreate) => {
    const response = await createPostService(data, (err: any) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err.data?.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    });
    if (response) {
      toast({
        variant: 'success',
        title: "Tạo bài thành công!!",
      });
    }
  };

  const autofocusNoSpellcheckerSaveOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      placeholder: `Cú pháp Markdown được hỗ trợ. Nhấp vào ? để xem hướng dẫn.\nĐể xuống dòng, sử dụng thẻ <br> hoặc Enter hai lần.\nNhấp vào 👁 hoặc nhấn "Ctrl + P" để bật/tắt chế độ xem trước.\nNhấp vào ▯▯ hoặc nhấn "F9" để bật/tắt chế độ xem trước song song với soạn thảo.\nNhấp vào 🕂 hoặc nhấn "F11" để bật/tắt chế độ toàn màn hình.\nĐể highlight các đoạn code, hãy viết thêm tên viết thường của ngôn ngữ sau ba dấu gạch ngược (ví dụ: \`\`\`ruby)`,
    };
  }, []);

  return (
    <div className="bg-[#f6f6f7] p-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col overflow-hidden">
          <div className="relative">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="focus-visible:rounded-r focus-visible:ring-1 focus-visible:ring-offset-0" placeholder="Title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="absolute rounded-l-none top-0 right-0 rounded-r bg-[#f5f7fa] hover:bg-slate-50 border">
              <ExternalLink className="text-blue-500" size={16} strokeWidth={1.25} />
            </Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex flex-col flex-auto">
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Combobox
                        value={field.value}
                        onChange={(tags: Tag[]) => field.onChange(tags)} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-3 font-normal">
              <Button className={cn("bg-white text-black hover:text-blue-500 hover:bg-slate-100", 'hidden')}>
                <Link target="_blank" to="/">Cài đặt SEO</Link>
              </Button>
              <Button className={cn("bg-white text-black hover:text-blue-500 hover:bg-slate-100")} disabled={errors}>
                <Link target="_blank" to="/">Thay đổi ảnh thu nhỏ</Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    className={cn(
                      "bg-white text-black hover:text-blue-500 hover:bg-slate-100")}>
                    <ChevronDown className="mr-2 h-4 w-4" /> Xuất bản bài viết
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60">
                  <DropdownMenuLabel>Xuất bản bài viết của bạn</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {errors ?
                      <DropdownMenuItem>
                        <span>Thêm tiêu đề, chọn ít nhất một thẻ và bắt đầu viết một cái gì đó để xuất bản.</span>
                      </DropdownMenuItem>
                      :
                      <DropdownMenuItem>
                        Giấy phép: <span title="This work is licensed under All Rights Reserved.">All rights reserved</span>
                      </DropdownMenuItem>
                    }
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <SimpleMdeReact
                    id="viblo"
                    value={form.getValues("content")}
                    onChange={(value, changeObject) => {
                      field.onChange(value);
                      console.log('Change object:', changeObject);
                    }}
                    options={autofocusNoSpellcheckerSaveOptions}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
