"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { loginUser, requestPasswordReset, resetPassword } from "@/api/auth";
import Loader from "@/components/loader/loader";
import { useUser } from "@/contexts/UserContext";

const formSchema = z.object({
  email: z.string().min(5, { message: "должно быть длиннее 5 символов" }),
  password: z
    .string()
    .min(5, { message: "Пароль должен быть длиннее 5 символов" }),
});

const forgotFormSchema = z.object({
  email: z.string().email({ message: "Неверный формат почты" }),
});

const resetFormSchema = z.object({
  email: z.string().email({ message: "Неверный формат почты" }),
  code: z.string().min(1, { message: "Введите код из письма" }),
  newPassword: z
    .string()
    .min(8, { message: "Пароль должен быть длиннее 8 символов" }),
});

export function SignInModal() {
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isForgotLoading, setIsForgotLoading] = useState(false);
  const [isForgotSuccess, setIsForgotSuccess] = useState(false);
  const [forgotError, setForgotError] = useState<string | null>(null);
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const forgotForm = useForm<z.infer<typeof forgotFormSchema>>({
    resolver: zodResolver(forgotFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const resetForm = useForm<z.infer<typeof resetFormSchema>>({
    resolver: zodResolver(resetFormSchema),
    defaultValues: {
      email: "",
      code: "",
      newPassword: "",
    },
  });

  const { login } = useUser();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setIsSuccess(false);
    try {
      const response = await loginUser({
        username: values.email,
        password: values.password,
      });
      if (response.token) {
        login(response.token);
        setIsSuccess(true);
        closeDialog();
      }
    } catch (error) {
      console.error("Ошибка входа:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmitForgot(values: z.infer<typeof forgotFormSchema>) {
    setIsForgotLoading(true);
    setIsForgotSuccess(false);
    setForgotError(null);
    try {
      await requestPasswordReset(values.email);
      setIsForgotSuccess(true);
      resetForm.reset({
        email: values.email,
        code: "",
        newPassword: "",
      });
      setStep(3);
    } catch (error) {
      console.error("Ошибка отправки запроса на восстановление пароля:", error);
      setForgotError("Не удалось отправить письмо. Попробуйте позже.");
    } finally {
      setIsForgotLoading(false);
    }
  }

  async function onSubmitReset(values: z.infer<typeof resetFormSchema>) {
    setIsResetLoading(true);
    setIsResetSuccess(false);
    setResetError(null);
    try {
      await resetPassword({
        email: values.email,
        code: values.code,
        newPassword: values.newPassword,
      });
      setIsResetSuccess(true);
      setTimeout(() => {
        setStep(1);
        form.reset();
        forgotForm.reset();
        resetForm.reset();
        setIsResetSuccess(false);
        closeDialog();
      }, 1500);
    } catch (error) {
      console.error("Ошибка при сбросе пароля:", error);
      setResetError(
        "Не удалось обновить пароль. Проверьте данные и попробуйте снова.",
      );
    } finally {
      setIsResetLoading(false);
    }
  }

  const onClose = (open: boolean) => {
    setIsOpen(open);
    setTimeout(() => {
      setStep(1);
      form.reset();
      forgotForm.reset();
      setIsForgotLoading(false);
      setIsForgotSuccess(false);
      setForgotError(null);
      resetForm.reset();
      setIsResetLoading(false);
      setIsResetSuccess(false);
      setResetError(null);
    }, 500);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onClose(open);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-[40px]"
          onClick={openDialog}
          data-signin-trigger
        >
          Войти
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">
                Войти
              </DialogTitle>
              <DialogDescription>
                Нет аккаунта?{" "}
                <Link
                  className="text-blue-500"
                  href="/signUp"
                  onClick={closeDialog}
                >
                  Зарегистрироваться
                </Link>
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-normal">
                        Почта
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="email@example.com"
                          className="pr-10 h-12 bg-[#F3F1F1]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-normal">
                        Пароль
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            className="pr-10 h-12 bg-[#F3F1F1]"
                            placeholder="пароль"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full  hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="rounded-[40px] w-full"
                  disabled={isLoading || isSuccess}
                >
                  {isLoading ? (
                    <Loader isFullHeight={false} imageSize={24} />
                  ) : isSuccess ? (
                    "Успешно!"
                  ) : (
                    "Войти"
                  )}
                </Button>
              </form>
            </Form>
            <Button
              variant="link"
              className="text-sm font-normal text-gray-500 text-center"
              onClick={() => setStep(2)}
            >
              Забыл пароль?
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">
                Восстановление пароля
              </DialogTitle>
            </DialogHeader>
            <Form {...forgotForm}>
              <form
                onSubmit={forgotForm.handleSubmit(onSubmitForgot)}
                className="space-y-4"
              >
                <FormField
                  control={forgotForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-normal">
                        Почта
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="email@example.com"
                          className="pr-10 h-12 bg-[#F3F1F1]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="rounded-[40px] w-full"
                  disabled={isForgotLoading}
                >
                  {isForgotLoading ? (
                    <Loader isFullHeight={false} imageSize={24} />
                  ) : isForgotSuccess ? (
                    "Отправлено"
                  ) : (
                    "Отправить"
                  )}
                </Button>
                {isForgotSuccess && (
                  <p className="text-sm text-green-600 text-center">
                    Мы отправили письмо с инструкциями на указанную почту.
                  </p>
                )}
                {forgotError && (
                  <p className="text-sm text-red-500 text-center">
                    {forgotError}
                  </p>
                )}
              </form>
            </Form>
          </>
        )}
        {step === 3 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">
                Обновление пароля
              </DialogTitle>
            </DialogHeader>
            <Form {...resetForm}>
              <form
                onSubmit={resetForm.handleSubmit(onSubmitReset)}
                className="space-y-4"
              >
                <FormField
                  control={resetForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-normal">
                        Почта
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="email@example.com"
                          className="pr-10 h-12 bg-[#F3F1F1]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={resetForm.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-normal">
                        Код из письма
                      </FormLabel>
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          value={field.value}
                          onChange={field.onChange}
                          className="w-full justify-start"
                        >
                          <InputOTPGroup className="gap-2">
                            {Array.from({ length: 6 }).map((_, index) => (
                              <InputOTPSlot
                                key={index}
                                index={index}
                                className="h-12 w-12 text-lg"
                              />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={resetForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-normal">
                        Новый пароль
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Новый пароль"
                          className="pr-10 h-12 bg-[#F3F1F1]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="rounded-[40px] w-full"
                  disabled={isResetLoading}
                >
                  {isResetLoading ? (
                    <Loader isFullHeight={false} imageSize={24} />
                  ) : isResetSuccess ? (
                    "Обновлено"
                  ) : (
                    "Сохранить новый пароль"
                  )}
                </Button>
                {isResetSuccess && (
                  <p className="text-sm text-green-600 text-center">
                    Пароль обновлен. Сейчас перенаправим на форму входа.
                  </p>
                )}
                {resetError && (
                  <p className="text-sm text-red-500 text-center">
                    {resetError}
                  </p>
                )}
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
