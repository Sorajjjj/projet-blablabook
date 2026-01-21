// Import of page components
import Footer from "@/components/blablabook/footer";
import Header from "@/components/blablabook/Header";

// Importation of the different types of buttons according to the graphic charter
import {
	OrangeOutlineButton,
	LightBlueOutlineButton,
	OrangeSolidButton,
	TealSolidButton,
	OrangeRoundedButton,
	TealRoundedButton,
	SimpleButton,
} from "@/components/blablabook/buttons";

// Importation of the react hook form
import LoginForm from "@/components/blablabook/login-form";
import RegisterForm from "@/components/blablabook/register-form";

// ---------------Testing some components below ---------------------

export default function Home() {
	return (
		// Buttons components
		<>
    <Header showSearchBar={true} />
			<div className="bg-blabla-cream flex flex-col items-center justify-center py-10 ">
				<h1 className="text-5xl font-bold text-blabla-dark font-bayon">
					BlaBlaBook
				</h1>
				<p className="text-blabla-teal text-lg font-basic">
					Exemples de boutons selon la charte graphique
				</p>

				<div className="grid grid-cols-2 gap-6 mt-8">
					{/* Ligne 1 - Boutons outline */}
					<OrangeOutlineButton>Button</OrangeOutlineButton>
					<LightBlueOutlineButton>Button</LightBlueOutlineButton>

					{/* Ligne 2 - Boutons pleins */}
					<OrangeSolidButton>Button</OrangeSolidButton>
					<TealSolidButton>Button</TealSolidButton>

					{/* Ligne 3 - Boutons outline arrondis */}
					<OrangeRoundedButton>Button</OrangeRoundedButton>
					<TealRoundedButton>Button</TealRoundedButton>

					{/* Ligne 4 - Bouton simple */}
					<SimpleButton className="col-span-2">Button</SimpleButton>
				</div>

				{/* Form components*/}

				{/* Login form*/}

				<div className="bg-blabla-cream w-full max-w-md ">
					<h2 className="text-2xl font-bold text-blabla-dark  text-center">
						Test du formulaire de connexion
					</h2>
					<LoginForm />
				</div>

				{/*Register form*/}
				<div className="bg-blabla-cream w-full max-w-md ">
					<h2 className="text-2xl font-bold text-blabla-dark  text-center">
						Test du formulaire d&apos;inscription
					</h2>
					<RegisterForm />
				</div>


			</div>
      <Footer />
		</>
	);
}


