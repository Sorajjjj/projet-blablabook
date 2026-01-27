"use client";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { OrangeSolidButton } from "./buttons";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { registerFormSchema } from "@/lib/validation-schemas";

const formSchema = registerFormSchema;

export default function RegisterPreview() {

	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

async function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    // Prepare the data to be sent to the backend
    const payload = {
      username: values.username,
      email: values.email,
      password: values.password,
	  confirmPassword: values.confirmPassword
    };

    // Send a POST request to the registration endpoint
    const res = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    
    const data = await res.json();

    
    console.log("OK Réponse backend :", data);

	if (res.ok) {
		router.push("/login");
	}


  } catch (error) {
    console.error("Erreur lors de l'inscription", error);
  }
}
	return (
		<div className="flex min-h-[45vh] h-full w-full items-center justify-center px-4">
			<Card className="mx-auto max-w-md w-full p-8 pb-4 px-6">
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<div className="grid gap-4">
								{/* username Field */}
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem className="grid gap-2">
											<FormControl>
												<Input
													id="username"
													placeholder="username"
													type="text"
													autoComplete="username"
													{...field}
												/>
											</FormControl>
											{form.formState.errors.username && (
												<p className="text-sm font-medium text-red-500">
													{form.formState.errors.username.message}
												</p>
											)}
										</FormItem>
									)}
								/>

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
						J&apos;ai déjà un compte !{" "}
						<Link href="/login" className="underline text-blabla-orange">
							Se connecter
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
