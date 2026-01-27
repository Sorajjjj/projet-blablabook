"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { email, z } from "zod";
import { useAuth } from "@/context/AuthContext";
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

	const { login } = useAuth();
	const router = useRouter();

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
    // Build payload expected by the backend
    const payload = {
      email: values.email,
      password: values.password
    };

    // Call the Express backend login endpoint
    const res = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
	  credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

	// Read backend response
    const responseData = await res.json() as {
		message: string;
		data: {
			username: string;
			email: string;
			userId: string;
		};
	};



	// If login is successful, redirect user
	if (res.ok) {
		login({
			name: responseData.data.username,
			email: responseData.data.email
		});
		
		router.push("/accueil");
	}


  	} catch (error) {
		console.error("Erreur lors de l'inscription", error);
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
								<Link href="/inscription">
									<LightBlueOutlineButton className="w-full text-xl py-6">
										Créer un compte
									</LightBlueOutlineButton>
								</Link>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
