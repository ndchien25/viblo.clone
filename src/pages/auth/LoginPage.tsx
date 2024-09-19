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
  CardFooter,
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
import { cn } from "@/lib/utils"
import logo from "@/assets/img/logo_viblo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import ButtonFB from "@/components/social/ButtonFB"
import ButtonGG from "@/components/social/ButtonGG"
import ButtonGithub from "@/components/social/ButtonGithub"

import { LoginSchema } from "@/schemas/AuthSchema"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import { useAtom } from "jotai"
import { authAtom, userAtom } from '@/atoms/authAtoms';

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { loginService } from "@/services/AuthService"

type CardProps = React.ComponentProps<typeof Card>

// Ensure loginService returns a Promise that resolves to AxiosResponse
type LoginData = z.infer<typeof LoginSchema>;

export default function LoginPage({ className, ...props }: CardProps) {
  const [errorMessage, setErrorMessage] = useState<React.ReactNode>(null); // Thêm state để lưu thông báo lỗi
  const navigate = useNavigate()
  const [, setAuth] = useAtom(authAtom);
  const [, setUser] = useAtom(userAtom);
  const queryClient = useQueryClient();

  const form = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    mode: "onTouched",
    defaultValues: {
      email_or_username: "",
      password: ""
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginData) => loginService(data), // First argument is the mutation function
    onError: (err: any) => {
      if (err.response?.data?.verified === false) {
        setErrorMessage(
          <div className="w-full p-3 bg-red-100 rounded">
            <span className="text-red-500">
              {err.response?.data?.message} <Link className="text-blue-600 hover:underline" to="/send-activation">Gửi lại</Link>
            </span>
          </div>
        );
      } else {
        setErrorMessage(
          <div className="w-full p-3 bg-red-100 rounded">
            <span className="text-red-500">{err.response?.data?.message}</span>
          </div>
        );
      }
    },
    onSuccess: (data) => {
      console.log(data)
      setAuth(true);
      if (data.user) {
        setUser(data.user)
      }
      if (data.user.role_id === 1) {
        navigate('/admin')
      } else {
        queryClient.invalidateQueries({ queryKey: ['auth'] });
        navigate('/newest');
      }
    }
  });

  const onSubmit = (data: LoginData) => {
    setErrorMessage(null); // Reset error message on submit
    loginMutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className={cn("w-3/12", className)} {...props}>
        <CardHeader className={cn("items-center text-center")}>
          <img className="w-[120px] " src={logo} />
          <CardTitle className={cn("text-xl text-slate-700", className)}>Đăng nhập với Viblo</CardTitle>
          {errorMessage && errorMessage} {/* Hiển thị thông báo lỗi nếu có */}
        </CardHeader>
        <CardContent className="grid gap-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email_or_username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn("text-slate-700", className)}>Email hoặc tên người dùng</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Tên người dùng hoặc email"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn("text-slate-700", className)}>Mật khẩu</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="Mật khẩu" />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Đăng nhập
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="flex justify-between my-2">
            <Link className="hover:underline" to="/forgot-password">Quên mật khẩu</Link>
            <Link className="hover:underline" to="/register">Tạo tài khoản</Link>
          </div>
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
    </div>
  );
}
