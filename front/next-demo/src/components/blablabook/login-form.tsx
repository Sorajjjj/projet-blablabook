"use client";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { LightBlueOutlineButton, OrangeSolidButton } from "./buttons";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

import { loginFormSchema } from "@/lib/validation-schemas";

const formSchema = loginFormSchema;

export default function LoginPreview() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			// TODO: Appel API pour la connexion
			console.log(values);
		} catch (error) {
			console.error("Form submission error", error);
		}
	}

	return (
		<div className="flex flex-col min-h-[45vh] h-full w-full items-center justify-center px-4">
			<Card className="mx-auto max-w-md w-full py-8 px-6">
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<div className="grid gap-4">
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
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem className="grid gap-2">
											<FormControl>
												<PasswordInput
													id="password"
													placeholder="Mot de passe"
													autoComplete="current-password"
													{...field}
												/>
											</FormControl>
											<div className="flex justify-between items-center">
												<Link
													href="#"
													className="ml-auto inline-block text-sm underline"
												>
													Mot de passe oublié ?
												</Link>
											</div>
											{form.formState.errors.password && (
												<p className="text-sm font-medium text-red-500">
													{form.formState.errors.password.message}
												</p>
											)}
										</FormItem>
									)}
								/>
								<OrangeSolidButton
									type="submit"
									className="w-full text-xl py-6"
								>
									Se connecter
								</OrangeSolidButton>
								<p className="text-center">Ou</p>
								<LightBlueOutlineButton className="w-full text-xl py-6">
									Créer un compte
								</LightBlueOutlineButton>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
