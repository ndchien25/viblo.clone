import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChevronDown, ExternalLink } from "lucide-react";
import { SimpleMdeReact } from "react-simplemde-editor";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from '@tanstack/react-query';
import "easymde/dist/easymde.min.css";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PostCreate, postCreateSchema } from "@/schemas/PostSchema";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import Combobox from "@/components/Combobox";
import { Tag } from "@/schemas/TagSchema";
import { createPostService } from "@/services/PostService";
import { Editor } from "codemirror";
import { getObjectService, uploadService } from "@/services/FileService";
import { handleFileUpload } from "@/helpers/handleFileUpload";
import { searchTagService } from "@/services/TagService";

export default function PublishPostPage() {
  const { toast } = useToast();
  const delay = 1000; // Delay for autosave in milliseconds
  const [errors, setErrors] = useState<boolean>(true);
  const [preview, setPreview] = useState<string>('');
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const editorRef = useRef<Editor | null>(null);
  const form = useForm<PostCreate>({
    resolver: zodResolver(postCreateSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      tags: [],
      content: '',
    },
  });

  const autofocusNoSpellcheckerSaveOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      placeholder: `Cú pháp Markdown được hỗ trợ. Nhấp vào ? để xem hướng dẫn.\nĐể xuống dòng, sử dụng thẻ <br> hoặc Enter hai lần.\nNhấp vào 👁 hoặc nhấn "Ctrl + P" để bật/tắt chế độ xem trước.\nNhấp vào ▯▯ hoặc nhấn "F9" để bật/tắt chế độ xem trước song song với soạn thảo.\nNhấp vào 🕂 hoặc nhấn "F11" để bật/tắt chế độ toàn màn hình.\nĐể highlight các đoạn code, hãy viết thêm tên viết thường của ngôn ngữ sau ba dấu gạch ngược (ví dụ: \`\`\`ruby)`,
    };
  }, []);

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

  const mutation = useMutation({
    mutationFn: createPostService,
    onError: (err: any) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err.data?.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    },
    onSuccess: (data: any) => {
      setPreview(data?.slug || '')
      toast({
        variant: 'success',
        title: data?.message || "success",
      });
      localStorage.removeItem('post_title');
      localStorage.removeItem('post_tags');
      localStorage.removeItem('post_content');
    },
  });

  const onSubmit = (data: PostCreate) => {
    mutation.mutate(data);
  };

  const mutationUpload = useMutation({
    mutationFn: async (file_name: string) => {
      return uploadService(file_name)
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: "Upload failed!",
        description: error.message || "An error occurred while uploading the file.",
      });
    },
    onSuccess: (async (data) => {
      if (fileToUpload) {
        try {
          await handleFileUpload(fileToUpload, data.pre_signed);
          const filePath = data.file_path;
          const { url } = await getObjectService(filePath);

          if (!url) {
            throw new Error("Failed to fetch file URL");
          }

          if (editorRef.current) {
            const doc = editorRef.current.getDoc();
            const cursor = doc.getCursor();
            doc.replaceRange(`![${fileToUpload.name}](${url})`, cursor);
          }
          toast({
            variant: 'success',
            title: "Upload successful!",
            description: `File uploaded successfully.`,
          });
        } catch (error: any) {
          toast({
            variant: 'destructive',
            title: "Upload failed!",
            description: error.message || "An error occurred while uploading the file.",
          });
        } finally {
          setFileToUpload(null);
        }
      }
    })
  });

  const handleDrop = async (instance: Editor, event: DragEvent) => {
    event.preventDefault();

    const file = event.dataTransfer?.files[0];
    if (file) {
      setFileToUpload(file);
      const fileExtension = file.name.split('.').pop();
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        if (!fileExtension) {
          throw new Error("File extension not available");
        }
        editorRef.current = instance;
        await mutationUpload.mutateAsync(fileExtension)
      }
    }
  };

  const [param, setParam] = useState<string>("");
  const { data, isLoading, error } = useQuery<Tag[] | null, Error>({
    queryKey: ['searchTag', param],
    queryFn: () => searchTagService(param), // Wrap searchTagService in a function
    enabled: param.length > 2,
  });
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
                    <Input className="bg-white focus-visible:ring-0" placeholder="Title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            {preview !== '' && (
              <Button className="absolute rounded-l-none top-0 right-0 rounded-r bg-[#f5f7fa] hover:bg-slate-50 border">
                <Link to={`/p/${preview}`}>
                  <ExternalLink className="text-blue-500" size={16} strokeWidth={1.25} />
                </Link>
              </Button>
            )}
          </div>
          <div className="flex flex-nowrap gap-3">
            <div className="flex flex-col flex-auto">
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Combobox
                        data={data || []}
                        value={field.value}
                        onChange={(tags: Tag[]) => field.onChange(tags)}
                        setParam={setParam}
                        isLoading={isLoading}
                        error={error}
                      />
                    </FormControl>
                    <FormMessage />
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
              <Button
                className={cn("bg-white text-black hover:text-blue-500 hover:bg-slate-100")}
                disabled={errors}
                type="submit"
              >
                Lưu lại
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
                  {errors ?
                    <DropdownMenuItem>
                      <span>Thêm tiêu đề, chọn ít nhất một thẻ và bắt đầu viết một cái gì đó để xuất bản.</span>
                    </DropdownMenuItem>
                    :
                    <>
                      <DropdownMenuItem>
                        Giấy phép: <span title="This work is licensed under All Rights Reserved.">All rights reserved</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  }

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
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                    options={autofocusNoSpellcheckerSaveOptions}
                    events={{
                      drop: handleDrop, // Thêm sự kiện xử lý kéo thả ảnh
                    }}
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
