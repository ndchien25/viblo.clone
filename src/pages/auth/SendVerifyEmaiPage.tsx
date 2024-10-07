import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/img/logo_viblo.svg";
import { resendVerificationEmailService } from "@/services/AuthService";

const formSchema = z.object({
  email: z.string().min(1, {
    message: "Email là bắt buộc",
  }).email({
    message: "Vui lòng nhập địa chỉ email chính xác",
  }),
});

type CardProps = React.ComponentProps<typeof Card>;

export default function VerifyEmail({ className, ...props }: CardProps) {
  const [alertMessage, setAlertMessage] = useState<React.ReactNode>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => resendVerificationEmailService(data),
    onSuccess: () => {
      setAlertMessage(
        <>
          Chúng tôi <span className="font-bold">đã gửi một email</span> với một liên kết xác nhận đến địa chỉ email của bạn. Có thể mất từ 1 đến 2 phút để hoàn thành. Hãy kiểm tra hộp thư đến của bạn <span className="font-bold">{form.getValues('email')}</span>.
        </>
      );
    },
    onError: (error: any) => {
      const errors = error.data?.errors || {};
      form.setError('email', {
        type: 'manual',
        message: errors.email || 'Có lỗi xảy ra. Vui lòng thử lại.',
      });
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="mb-6">
        <img className="w-[120px]" src={logo} alt="Viblo Logo" />
      </div>
      <Card className={cn("w-4/12", className)} {...props}>
        <CardHeader>
          <CardTitle className="text-xl text-slate-700">Gửi email kích hoạt tài khoản</CardTitle>
          <CardDescription>
            Email kích hoạt tài khoản được gửi khi đăng ký tài khoản Viblo. Nếu bạn không nhận được nó, vui lòng cung cấp cho chúng tôi địa chỉ email của bạn đã đăng ký Viblo. Chúng tôi sẽ gửi lại cho bạn email kích hoạt tài khoản.
            {alertMessage && !mutation.isError && (
              <div className="bg-emerald-50 p-2 mt-4">
                <span className="text-green-800 text-xs">{alertMessage}</span>
              </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">
                        <span className="text-red-700">*</span> Địa chỉ email của bạn
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Nhập địa chỉ email"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                      {form.formState.errors.email && (
                        <span className="text-xs text-red-500">
                          {form.formState.errors.email.message}
                        </span>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className={cn("float-end", {
                  "bg-gray-500 cursor-not-allowed": mutation.isPending || !form.formState.isValid,
                  "bg-blue-500 hover:bg-blue-600": form.formState.isValid && !mutation.isPending,
                })}
                disabled={mutation.isPending || !form.formState.isValid}
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Gửi email kích hoạt cho tôi
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
