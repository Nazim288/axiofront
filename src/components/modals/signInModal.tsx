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
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { loginUser } from "@/api/auth";
import Loader from "@/components/loader/loader";
import { useUser } from "@/contexts/UserContext";

const formSchema = z.object({
  email: z.string().email({ message: "Неверный формат почты" }),
  password: z
    .string()
    .min(8, { message: "Пароль должен быть длиннее 8 символов" }),
});

const forgotFormSchema = z.object({
  email: z.string().email({ message: "Неверный формат почты" }),
});

export function SignInModal() {
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  function onSubmitForgot(values: z.infer<typeof forgotFormSchema>) {
    console.log(values);
  }

  const onClose = (open: boolean) => {
    setIsOpen(open);
    setTimeout(() => {
      setStep(1);
      form.reset();
      forgotForm.reset();
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

                <Button type="submit" className="rounded-[40px] w-full">
                  Отправить
                </Button>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
