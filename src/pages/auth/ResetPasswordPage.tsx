import { useMutation } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import logo from "@/assets/img/logo_viblo.svg";
import { resetPasswordService } from "@/services/AuthService";
import { ResetPasswordSchema } from "@/schemas/AuthSchema";
import { useToast } from "@/hooks/use-toast";

type CardProps = React.ComponentProps<typeof Card>;

export default function ResetPassword({ className, ...props }: CardProps) {
  const query = new URLSearchParams(useLocation().search);
  const navigate = useNavigate()
  const email = query.get('email')
  const token = query.get('token')
  const { toast } = useToast()

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onTouched",
    defaultValues: {
      password: "",
      c_password: ""
    },
  });
  
  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof ResetPasswordSchema>) => resetPasswordService({
      ...data,
      email: email ?? "",
      token: token ?? ""
    }),
    onSuccess: () => {
      toast({
        title: "Đổi mật khẩu thành công",
        variant: 'success'
      })
      navigate("/login")
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: "Có lỗi khi gửi vui lòng gửi lại sau"
      })
    },
  });

  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="mb-6">
        <img className="w-[120px]" src={logo} alt="Viblo Logo" />
      </div>
      <Card className={cn("w-4/12", className)} {...props}>
        <CardHeader>
          <CardTitle className="text-xl text-slate-700">Đặt lại mật khẩu</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">
                        <span className="text-red-700">*</span> Mật khẩu mới
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Nhập mật khẩu"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="c_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">
                        <span className="text-red-700">*</span> Nhập lại mật khẩu mới
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Nhập mật khẩu"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className={cn("float-end")}
                disabled={mutation.isPending} // Disable button while loading
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Đổi mật khẩu
                  </>
                )}
              </Button>
              <Button className={cn("float-end bg-white mr-2 text-black border-black hover:text-white")}>
                <Link to="/login">Hủy bỏ</Link>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
