import Footer from "@/components/footer";
import LoginForm from "@/components/blablabook/login-form";
import Image from "next/image";

export default function ConnexionPage() {
	return (
		<div className="min-h-screen flex flex-col bg-blabla-light-cream">
			<div className="flex-grow flex items-center justify-center">
				<div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center p-10 rounded-lg border-2 border-blabla-taupe/10">
					{/* Description on the left */}
					<div className="space-y-6">
						<Image
							src="/logo/logo01.PNG"
							alt="Logo BlaBlaBook"
							className="w-32 mx-auto mb-4"
							width={400}
							height={400}
						/>
						<p className="text-blabla-dark text-base">
							<strong>BlaBlaBook</strong> est une plateforme qui connecte lesrrgddfgdfghtrfthrthrtrth
							passions de lecture du monde entier. Elle permet de partager ses
							avis, de découvrir de nouveaux livres et d’échanger autour de ses
							lectures favorites, le tout au sein d’une communauté conviviale et
							inspirante.
						</p>
						<p className="italic text-blabla-dark text-lg">
							“Lire, c’est voyager sans bouger, et découvrir le monde à chaque
							page.”
						</p>
					</div>
					{/* Right side of the page */}
					<LoginForm />
				</div>
			</div>
			<Footer />
		</div>
	);
}
