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
import { emailConfirm } from "@/api/auth";
import Loader from "@/components/loader/loader";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const formSchema = z.object({
  code: z.string().min(1, { message: "Введите код верификации" }),
});

interface ErrorResponse {
  error: string;
}

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onSuccess?: () => void;
}

export function EmailVerificationModal({
  isOpen,
  onClose,
  email,
  onSuccess,
}: EmailVerificationModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setIsSuccess(false);
    try {
      await emailConfirm({
        email: email,
        code: values.code,
      });
      setIsSuccess(true);
      toast.success("Email успешно подтвержден!");
      form.reset();
      setTimeout(() => {
        onClose();
        if (onSuccess) {
          onSuccess();
        }
      }, 1000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data as ErrorResponse;
        const errorMessage = errorData.error || "Неверный код верификации";
        toast.error(errorMessage);
        form.setError("code", { message: errorMessage });
      } else {
        toast.error("Ошибка при верификации email");
        form.setError("code", { message: "Ошибка при верификации" });
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleClose = (open: boolean) => {
    if (!open) {
      onClose();
      setTimeout(() => {
        form.reset();
        setIsSuccess(false);
      }, 500);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="rounded-3xl p-6 sm:p-7">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Подтверждение email
          </DialogTitle>
          <DialogDescription>
            Вам отправлен код верификации на почту{" "}
            <span className="font-semibold text-gray-900">{email}</span>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-normal">
                    Код верификации
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Введите код"
                      className="pr-10 bg-muted"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="cta"
              className="w-full"
              disabled={isLoading || isSuccess}
            >
              {isLoading ? (
                <Loader isFullHeight={false} imageSize={24} />
              ) : isSuccess ? (
                "Успешно!"
              ) : (
                "Подтвердить"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
