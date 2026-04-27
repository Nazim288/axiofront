"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { registerUser, emailConfirmSend } from "@/api/auth";
import Loader from "@/components/loader/loader";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { EmailVerificationModal } from "@/components/modals/emailVerificationModal";
import Link from "next/link";

const formSchema = z
  .object({
    gender: z.enum(["male", "female"]),
    yearOfBirth: z.enum(["1944-1963", "1964-1984", "1985-2002", "2003-2023"]),
    login: z.string().min(2, {
      message: "Псевдоним должен быть длиннее 2 символов",
    }),
    email: z.string().email({ message: "Неверный формат почты" }),
    password: z
      .string()
      .min(8, { message: "Пароль должен быть длиннее 8 символов" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Пароль должен быть длиннее 8 символов" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли не совпадают",
  });

interface ErrorResponse {
  error: string;
}

const errorMessages: Record<string, string> = {
  "Email already exists": "Пользователь с такой почтой уже существует",
  "Nickname already exists": "Пользователь с таким псевдонимом уже существует",
};

const SignUp = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState<string>("");
  const [isPersonalDataConsentChecked, setIsPersonalDataConsentChecked] =
    useState(false);
  const [isSiteRulesConsentChecked, setIsSiteRulesConsentChecked] =
    useState(false);
  const [isNewsletterConsentChecked, setIsNewsletterConsentChecked] =
    useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "male",
      yearOfBirth: "1944-1963",
      login: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setIsSuccess(false);
    setError(null);

    try {
      await registerUser({
        email: values.email,
        login: values.login,
        password: values.password,
        confirmPassword: values.confirmPassword,
        gender: values.gender,
        yearOfBirth: values.yearOfBirth,
      });

      setIsSuccess(true);
      toast.success("Регистрация успешна!");

      // Вызываем emailConfirmSend для отправки кода верификации
      try {
        await emailConfirmSend({
          email: values.email,
          code: "", // Пустой код для первоначальной отправки
        });
        // Открываем модальное окно для верификации
        setVerificationEmail(values.email);
        setIsVerificationModalOpen(true);
      } catch (emailError) {
        // Если не удалось отправить код, все равно открываем модальное окно
        console.error("Ошибка при отправке кода верификации:", emailError);
        setVerificationEmail(values.email);
        setIsVerificationModalOpen(true);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data as ErrorResponse;
        const errorMessage = errorData.error
          ? errorMessages[errorData.error] || errorData.error
          : "Произошла ошибка при регистрации. Попробуйте позже";
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        setError("Произошла ошибка при регистрации. Попробуйте позже");
        toast.error("Произошла ошибка при регистрации");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleVerificationSuccess = () => {
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <div className="w-full max-w-[670px] mx-auto pb-10 px-4 sm:px-6 md:pb-20">
      <Form {...form}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 md:mb-10">
          Регистрация
        </h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded relative mb-4 md:mb-6 text-sm sm:text-base">
            {error}
          </div>
        )}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 md:space-y-8"
        >
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-2 md:space-y-3">
                <FormLabel className="text-base sm:text-lg font-semibold">
                  Пол<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="male" />
                      </FormControl>
                      <FormLabel className="font-normal">Мужской</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="female" />
                      </FormControl>
                      <FormLabel className="font-normal">Женский</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="yearOfBirth"
            render={({ field }) => (
              <FormItem className="space-y-2 md:space-y-3">
                <FormLabel className="text-base sm:text-lg font-semibold">
                  Год рождения<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="1944-1963" />
                      </FormControl>
                      <FormLabel className="">1944-1963</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="1964-1984" />
                      </FormControl>
                      <FormLabel className="font-normal">1964-1984</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="1985-2002" />
                      </FormControl>
                      <FormLabel className="font-normal">1985-2002</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="2003-2023" />
                      </FormControl>
                      <FormLabel className="font-normal">2003-2023</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base sm:text-lg font-semibold">
                  Псевдоним<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="username123"
                    className="pr-10 h-10 sm:h-12 bg-muted text-sm sm:text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base sm:text-lg font-semibold">
                  Почта<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@example.com"
                    className="pr-10 h-10 sm:h-12 bg-muted text-sm sm:text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base sm:text-lg font-semibold">
                  Пароль<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="pr-10 h-10 sm:h-12 bg-muted text-sm sm:text-base"
                      placeholder="пароль"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                      ) : (
                        <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base sm:text-lg font-semibold">
                  Подтверждение пароля<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      className="pr-10 h-10 sm:h-12 bg-muted text-sm sm:text-base"
                      placeholder="подтверждение пароля"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                      ) : (
                        <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isPersonalDataConsentChecked}
                onChange={(event) =>
                  setIsPersonalDataConsentChecked(event.target.checked)
                }
                className="mt-1 h-5 w-5 shrink-0"
              />
              <span className="text-sm sm:text-base text-primary underline underline-offset-2">
                <Link href="/consent-personal-data" target="_blank">
                  Согласен (-на) на обработку персональных данных
                </Link>
                <span className="text-red-500">*</span>
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isSiteRulesConsentChecked}
                onChange={(event) =>
                  setIsSiteRulesConsentChecked(event.target.checked)
                }
                className="mt-1 h-5 w-5 shrink-0"
              />
              <span className="text-sm sm:text-base text-primary underline underline-offset-2">
                <Link href="/terms-of-use" target="_blank">
                  Согласен (-на) с правилами пользования сайтом
                </Link>
                <span className="text-red-500">*</span>
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isNewsletterConsentChecked}
                onChange={(event) =>
                  setIsNewsletterConsentChecked(event.target.checked)
                }
                className="mt-1 h-5 w-5 shrink-0"
              />
              <span className="text-sm sm:text-base text-primary underline underline-offset-2">
                <Link href="/consent-newsletter" target="_blank">
                  Согласен (-на) на получение рассылок, информационных и
                  рекламных материалов
                </Link>
              </span>
            </label>
          </div>
          <Button
            type="submit"
            className="w-full text-base sm:text-lg font-semibold rounded-full h-12 sm:h-14 mt-10 sm:mt-16 md:mt-20"
            disabled={
              isLoading ||
              isSuccess ||
              !isPersonalDataConsentChecked ||
              !isSiteRulesConsentChecked
            }
          >
            {isLoading ? (
              <Loader isFullHeight={false} />
            ) : isSuccess ? (
              "Успешно! Перенаправление..."
            ) : (
              "Зарегистрироваться"
            )}
          </Button>
        </form>
      </Form>
      <EmailVerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        email={verificationEmail}
        onSuccess={handleVerificationSuccess}
      />
    </div>
  );
};

export default SignUp;
