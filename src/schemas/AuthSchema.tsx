import { z } from "zod"

const LoginSchema = z.object({
  email_or_username: z.string().min(1, {
    message: "Tên người dùng/Email bắt buộc",
  }),
  password: z.string().min(8, {
    message: "Mật khẩu ít nhất 8 ký tự"
  }),
})

const RegisterSchema = z.object({
  display_name: z.string().min(1, {
    message: "Tên là bắt buộc",
  }).max(50,{
    message: "Phải ít hơn 50 ký tự"
  }),
  username: z.string().min(1, {
    message: "Tên tài khoản là bắt buộc",
  }).max(20,{
    message: "Phải it hơn 50 ký tự"
  }),
  email: z.string().min(1, {
    message: "Email là bắt buộc"
  }).email({
    message: "Phải là một email hợp lệ"
  }),
  password: z.string().min(1, {
    message: "Mật khẩu là bắt buộc"
  }).min(8, {
    message: "Mật khẩu phải có ít nhất 8 ký tự"
  }).max(50 ,{
    message: "Phải ít hơn 50 ký tự"
  }),
  c_password: z.string().min(1, {
    message: "Nhập lại mật khẩu là bắt buộc"
  }),
  term: z.boolean({
    required_error: "Vui lòng đồng ý với Điều khoản dịch vụ của chúng tôi",
  }).refine(value => value === true, {
    message: "Vui lòng đồng ý với Điều khoản dịch vụ của chúng tôi",
  }),
}).superRefine(({ c_password, password }, ctx) => {
  if (c_password !== password) {
    ctx.addIssue({
      code: "custom",
      message: "Mật khẩu không khớp",
      path: ['c_password']
    });
  }
});

const ForgotSchema = z.object({
  email: z.string().min(1, {
    message: "Email là bắt buộc",
  }).email({
    message: "Vui lòng nhập địa chỉ email chính xác."
  })
})

const ResetPasswordSchema = z.object({
  password: z.string().min(1, {
    message: "Mật khẩu là bắt buộc"
  }).min(8, {
    message: "Mật khẩu phải có ít nhất 8 ký tự"
  }).max(50, {
    message: "Phải ít hơn 50 ký tự"
  }),
  c_password: z.string().min(1, {
    message: "Nhập lại mật khẩu là bắt buộc"
  }),
}).superRefine(({ c_password, password }, ctx) => {
  if (c_password !== password) {
    ctx.addIssue({
      code: "custom",
      message: "Mật khẩu không khớp",
      path: ['c_password']
    });
  }
});

export { LoginSchema, RegisterSchema, ForgotSchema, ResetPasswordSchema }