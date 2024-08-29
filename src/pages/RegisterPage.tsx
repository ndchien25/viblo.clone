import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
import ButtonFB from "@/components/social/ButtonFB"
import ButtonGG from "@/components/social/ButtonGG"
import ButtonGithub from "@/components/social/ButtonGithub"
import { RegisterSchema } from "@/schemas/AuthSchema"

type CardProps = React.ComponentProps<typeof Card>
export default function RegisterPage({ className, ...props }: CardProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    mode: "onTouched",
    defaultValues: {
      display_name: "",
      username: "",
      email: "",
      password: "",
      c_password: ""
    },
  })

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className={cn("w-4/12", className)} {...props}>
        <CardHeader>
          <div className="flex justify-center mb-7">
            <img className="w-[120px]" src={logo} alt="Viblo logo" />
          </div>
          <CardTitle className={cn("text-xl")}>Đăng ký tài khoản cho Viblo</CardTitle>
          <CardDescription>Chào mừng bạn đến <span className="font-bold">Nền tảng Viblo!</span> Tham gia cùng chúng tôi để tìm kiếm thông tin hữu ích cần thiết để cải thiện kỹ năng IT của bạn. Vui lòng điền thông tin của bạn vào biểu mẫu bên dưới để tiếp tục.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="display_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Tên người dùng"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Tên tài khoản"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Địa chỉ email của bạn"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} type="password" placeholder="Mật khẩu" />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="c_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} type="password" placeholder="Xác nhận mật khẩu của bạn" />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Đăng ký
                  </>
                )}
              </Button>
            </form>
          </Form>

        </CardContent>
        <CardFooter className={cn("justify-between", className)}>
          <hr className="flex-auto basis-auto" />
          <span className="mx-3">Đăng nhập với</span>
          <hr className="flex-auto m-0" />
        </CardFooter>
        <CardFooter className={cn("justify-between gap-2 mb-0", className)}>
          <ButtonFB />
          <ButtonGG />
          <ButtonGithub />
        </CardFooter>
      </Card>
    </div >
  )
}
