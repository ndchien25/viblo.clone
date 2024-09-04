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
import { Check, Loader2 } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import logo from "@/assets/img/logo_viblo.svg"
import { useEffect, useState } from "react"
import { z } from "zod"
import { resendVerificationEmailService } from "@/services/AuthService"

const formSchema = z.object({
  email: z.string().min(1, {
    message: "Email là bắt buộc",
  }).email({
    message: "Vui lòng nhập địa chỉ email chính xác",
  }),
})

type CardProps = React.ComponentProps<typeof Card>

export default function VerifyEmail({ className, ...props }: CardProps) {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});
  const [alertMessage, setAlertMessage] = useState<React.ReactNode>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
    },
  })

  useEffect(() => {
    // Clear error message whenever the email field changes
    setErrorMessage({});
  }, [form.watch('email')]);
  
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)
    const result = await resendVerificationEmailService(data, (err: any) => {
      setLoading(false)
      setErrorMessage(err.data?.errors)
    })

    if (result) {
      setAlertMessage(
        <>
          Chúng tôi <span className="font-bold">đã gửi một email</span> với một liên kết xác nhận đến địa chỉ email của bạn. Có thể mất từ 1 đến 2 phút để hoàn thành. Hãy kiểm tra hộp thư đến của bạn <span className="font-bold">{data.email}</span>.
        </>
      )
    }
  }

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
            {alertMessage && !errorMessage?.email && (
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
                      {errorMessage?.email && (
                        <span className="text-xs text-red-500">
                          {errorMessage?.email}
                        </span>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className={cn("float-end", {
                  "bg-gray-500 cursor-not-allowed": loading || !form.formState.isValid,
                  "bg-blue-500 hover:bg-blue-600": form.formState.isValid && !loading,
                })}
                disabled={loading || !form.formState.isValid}
              >
                {loading ? (
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
  )
}
