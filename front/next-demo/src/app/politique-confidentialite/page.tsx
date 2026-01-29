"use client";

import Header from "@/components/blablabook/Header";
import Footer from "@/components/blablabook/footer";
import Link from "next/link";

export default function PolitiqueConfidentialitePage() {
	const lastUpdateDate = new Date().toLocaleDateString("fr-FR", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<div className="min-h-screen flex flex-col bg-white font-sans text-gray-600">
			<Header showLinks={true} showSearchBar={false} />

			<main className="grow w-full max-w-3xl mx-auto px-6 py-12 md:py-20">
				{/* En-tête de la page */}
				<div className="mb-12 text-center md:text-left">
					<h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
						Politique de confidentialité
					</h1>
					<div className="h-1 w-20 bg-orange-500 rounded mx-auto md:mx-0 mb-4"></div>
					<p className="text-sm text-gray-500">
						Dernière mise à jour : {lastUpdateDate}
					</p>
				</div>

				{/* Contenu textuel */}
				<div className="space-y-10 leading-relaxed text-base md:text-lg">
					<section>
						<h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
							<span className="text-orange-500">1.</span> Introduction
						</h2>
						<p>
							Bienvenue sur <strong>BlaBlaBook</strong>. La protection de vos
							données personnelles est au cœur de nos préoccupations. Cette
							politique vise à vous informer en toute transparence sur les
							données que nous collectons, la manière dont nous les utilisons et
							les droits dont vous disposez.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
							<span className="text-orange-500">2.</span> Les données collectées
						</h2>
						<p className="mb-4">
							Dans le cadre de votre utilisation de l&apos;application, nous sommes
							amenés à collecter deux types de données :
						</p>
						<ul className="list-disc pl-6 space-y-2 marker:text-orange-500">
							<li>
								<strong>Données de compte :</strong> Votre identifiant, adresse
								email et mot de passe (chiffré) lors de votre inscription.
							</li>
							<li>
								<strong>Données de bibliothèque :</strong> La liste des livres
								ajoutés, vos statuts de lecture (&quot;À lire&quot;, &quot;Terminé&quot;) et vos
								notes personnelles.
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
							<span className="text-orange-500">3.</span> Utilisation des
							données
						</h2>
						<p>
							Vos données ne sont jamais vendues. Elles servent exclusivement à
							:
						</p>
						<ul className="list-disc pl-6 space-y-2 mt-4 marker:text-orange-500">
							<li>Gérer votre accès personnel à l&apos;application.</li>
							<li>Sauvegarder votre progression de lecture.</li>
							<li>
								Vous permettre de retrouver votre bibliothèque depuis n&apos;importe
								quel appareil.
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
							<span className="text-orange-500">4.</span> Services Tiers (API)
						</h2>
						<p>
							Pour afficher les informations des livres (couvertures, titres,
							auteurs), nous utilisons l&apos;API publique d&apos;
							<strong>OpenLibrary</strong>. Lorsque vous consultez une fiche
							livre, une requête technique est envoyée à leurs serveurs.
							Cependant, nous ne partageons aucune de vos données personnelles
							(email, identité) avec ce service.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
							<span className="text-orange-500">5.</span> Vos droits
						</h2>
						<p>
							Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
							rectification et de suppression de vos données. Si vous souhaitez
							supprimer votre compte BlaBlaBook, toutes vos données seront
							définitivement effacées de notre base de données.
						</p>
					</section>

					<section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
						<h2 className="text-lg font-bold text-gray-900 mb-2">
							Une question ?
						</h2>
						<p className="text-sm">
							Pour toute demande relative à vos données, contactez-nous à :{" "}
							<a
								href="mailto:support@blablabook.com"
								className="text-orange-500 font-medium hover:underline"
							>
								support@blablabook.com
							</a>
						</p>
					</section>
				</div>

				{/* Bouton Retour */}
				<div className="mt-16 pt-8 border-t border-gray-100">
					<Link
						href="/"
						className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-orange-500 transition-colors"
					>
						← Retour à l&apos;accueil
					</Link>
				</div>
			</main>

			<Footer />
		</div>
	);
}
