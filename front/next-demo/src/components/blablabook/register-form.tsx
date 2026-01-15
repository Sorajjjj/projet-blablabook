'use client'

import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form'
import { OrangeSolidButton } from "./buttons";
import { Card,CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { registerFormSchema } from '@/lib/validation-schemas'

const formSchema = registerFormSchema

export default function RegisterPreview() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // TODO: Appel API pour l'inscription
      console.log(values)
    } catch (error) {
      console.error('Form submission error', error)
    }
  }

  return (
    <div className="flex min-h-[45vh] h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-md w-full p-8 pb-4 px-6">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="Adresse e-mail"
                          type="email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.email && (
                        <p className="text-sm font-medium text-red-500">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormControl>
                        <PasswordInput
                          id="password"
                          placeholder="Mot de passe"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.password && (
                        <p className="text-sm font-medium text-red-500">
                          {form.formState.errors.password.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                {/* Confirm Password Field */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormControl>
                        <PasswordInput
                          id="confirmPassword"
                          placeholder="Confirmation du mot de passe"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.confirmPassword && (
                        <p className="text-sm font-medium text-red-500">
                          {form.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <OrangeSolidButton type="submit" className="w-full text-xl">
                  S&apos;inscrire
                </OrangeSolidButton>
              </div>
            </form>
          </Form>
          <div className="text-center text-lg mt-10">
            J&apos;ai déjà un compte !{' '}
            <Link href="#" className="underline text-blabla-orange">
              Se connecter
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
