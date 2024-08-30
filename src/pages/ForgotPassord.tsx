import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import {
  Check,
  Loader2,
} from "lucide-react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import logo from "@/assets/img/logo_viblo.svg";
import { useState } from "react";

import { ForgotSchema } from "@/schemas/AuthSchema"
type CardProps = React.ComponentProps<typeof Card>
export default function ForgotPasswordPage({ className, ...props }: CardProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof ForgotSchema>>({
    resolver: zodResolver(ForgotSchema),
    mode: "onTouched",
    defaultValues: {
      email: ""
    }
  })

  const onSubmit = (data: z.infer<typeof ForgotSchema>) => {
    setLoading(true);
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center h-screen" >
      <Card className={cn("w-5/12", className)} {...props}>
        <CardHeader>
          <div className="flex justify-center mb-7">
            <img className="w-[120px]" src={logo} alt="Viblo logo" />
          </div>
          <CardTitle className={cn("text-xl text-slate-700", className)}>Quên mật khẩu</CardTitle>
          <CardDescription>Bạn quên mật khẩu của mình? Đừng lo lắng! Hãy cung cấp cho chúng tôi email bạn sử dụng để đăng ký tài khoản Viblo. Chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu của bạn qua email đó.</CardDescription>
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
                <Button type="submit" className="w-auto" disabled={loading}>
                  {loading ? (
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
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div >
  )
}
