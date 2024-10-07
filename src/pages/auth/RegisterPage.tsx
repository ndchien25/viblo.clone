import { z } from "zod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Check, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import logo from "@/assets/img/logo_viblo.svg";

import ButtonFB from "@/components/social/ButtonFB";
import ButtonGG from "@/components/social/ButtonGG";
import ButtonGithub from "@/components/social/ButtonGithub";
import { RegisterSchema } from "@/schemas/AuthSchema";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { registerService } from "@/services/AuthService";

type CardProps = React.ComponentProps<typeof Card>;

export default function RegisterPage({ className, ...props }: CardProps) {
  const [isRegistered, setIsRegistered] = useState(false); // Track registration status

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    mode: "onTouched",
    defaultValues: {
      display_name: "",
      username: "",
      email: "",
      password: "",
      c_password: "",
      term: false,
    },
  });

  const { clearErrors, handleSubmit, control } = form;

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof RegisterSchema>) => registerService(data),
    onError: (err: any) => {
      if (err.response?.data?.errors) {
        setErrorMessage(err.response.data.errors);
      }
    },
    onSuccess: () => {
      setIsRegistered(true);
    },
  });

  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    setErrorMessage({});
    mutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className={cn("w-4/12", className)} {...props}>
        <CardHeader>
          <div className="flex justify-center mb-7">
            <img className="w-[100px]" src={logo} alt="Viblo logo" />
          </div>
          <CardTitle className={cn("text-xl")}>
            Đăng ký tài khoản cho Viblo
          </CardTitle>
          <CardDescription>
            Chào mừng bạn đến <span className="font-bold">Nền tảng Viblo!</span> Tham gia cùng chúng tôi để tìm kiếm thông tin hữu ích cần thiết để cải thiện kỹ năng IT của bạn. Vui lòng điền thông tin của bạn vào biểu mẫu bên dưới để tiếp tục.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {!isRegistered ? (
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <FormField
                    control={control}
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
                      control={control}
                      name="username"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              placeholder="Tên tài khoản"
                              onChange={(e) => {
                                field.onChange(e);
                                clearErrors("username");
                              }}
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500" />
                          {errorMessage.username && (
                            <span className="text-xs text-red-500">
                              {errorMessage.username}
                            </span>
                          )}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="Địa chỉ email của bạn"
                              onChange={(e) => {
                                field.onChange(e);
                                clearErrors("email");
                              }}
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500" />
                          {errorMessage.email && (
                            <span className="text-xs text-red-500">
                              {errorMessage.email}
                            </span>
                          )}
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={control}
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
                    control={control}
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
                  <FormField
                    control={control}
                    name="term"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <Label className="ml-2">
                              Tôi đồng ý{" "}
                              <Link
                                to="/terms"
                                target="_blank"
                                className="hover:underline text-cyan-600"
                              >
                                Điều khoảng dịch vụ của Viblo
                              </Link>
                            </Label>
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="float-end" disabled={mutation.isPending}>
                  {mutation.isPending ? (
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
                <Button className={cn("bg-white mr-2 text-black border-2 hover:text-white")}><Link to="/login">Hủy bỏ</Link></Button>
              </form>
            </Form>
          ) : (
            <>
              <div className="bg-green-200 p-4">
                <p className="text-green-700">Chào mừng username, tài khoản của bạn đã được đăng ký thành công, Chúng tôi đã gửi cho bạn một email kích hoạt tại địa chỉ email. Vui lòng kiểm tra hộp thư đến của bạn để hoàn thành</p>
                <br />
                <p className="text-green-700">Nếu bạn không nhận được email kích hoạt từ chúng tôi, vui lòng ấn <Button className="p-0 text-blue-600" variant="link" asChild ><Link to="/resend-activation">gửi lại</Link></Button> email kích hoạt</p>
              </div>
            </>
          )}
        </CardContent>

        {isRegistered && (
          <>
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
          </>
        )}
      </Card>
    </div>
  );
}
