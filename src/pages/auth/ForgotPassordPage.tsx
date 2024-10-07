import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { Check, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import logo from "@/assets/img/logo_viblo.svg";
import { ForgotSchema } from "@/schemas/AuthSchema"
import { forgotPasswordService } from "@/services/AuthService"

type CardProps = React.ComponentProps<typeof Card>

export default function ForgotPasswordPage({ className, ...props }: CardProps) {
  const [alertMessage, setAlertMessage] = useState<React.ReactNode>("");
  const form = useForm<z.infer<typeof ForgotSchema>>({  
    resolver: zodResolver(ForgotSchema),
    mode: "onTouched",
    defaultValues: {
      email: ""
    }
  })

  // Define mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: (data: z.infer<typeof ForgotSchema>) => forgotPasswordService(data),
    onSuccess: () => {
      setAlertMessage(
        <>
          Chúng tôi <span className="font-bold">đã gửi một email</span> có lên kết để đặt lại mật khẩu của bạn. Có thể mất từ 1 đến 2 phút để hoàn thành. Hãy kiểm tra hộp thư đến của bạn <span className="font-bold">{form.getValues('email')}</span>.
        </>
      );
    },
    onError: (error: any) => {
      form.setError("email", {
        type: "manual",
        message: error?.response?.data?.errors?.email || "Có lỗi xảy ra, vui lòng thử lại sau ít phút."
      });
    },
  });

  const onSubmit = (data: z.infer<typeof ForgotSchema>) => {
    forgotPasswordMutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className={cn("w-5/12", className)} {...props}>
        <CardHeader>
          <div className="flex justify-center mb-7">
            <img className="w-[120px]" src={logo} alt="Viblo logo" />
          </div>
          <CardTitle className={cn("text-xl text-slate-700", className)}>Quên mật khẩu</CardTitle>
          <CardDescription>Bạn quên mật khẩu của mình? Đừng lo lắng! Hãy cung cấp cho chúng tôi email bạn sử dụng để đăng ký tài khoản Viblo. Chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu của bạn qua email đó.</CardDescription>
          {alertMessage && !form.formState.errors.email && (
            <div className="bg-emerald-50 p-2 mt-4">
              <span className="text-green-800 text-xs">{alertMessage}</span>
            </div>
          )}
        </CardHeader>
        <CardContent className="grid gap-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn("text-slate-700", className)}><span className="text-red-700">*</span> Địa chỉ email của bạn</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="w-auto mr-2" disabled={forgotPasswordMutation.isPending}>
                  {forgotPasswordMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Gửi email cho tôi
                    </>
                  )}
                </Button>
                <Button className={cn("bg-white mr-2 text-black border-2 hover:text-white")}>
                  <Link to="/login">Hủy bỏ</Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
