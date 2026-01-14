// Importation of the different types of buttons according to the graphic charter
import {
  OrangeOutlineButton,
  LightBlueOutlineButton,
  OrangeSolidButton,
  TealSolidButton,
  OrangeRoundedButton,
  TealRoundedButton,
  SimpleButton,
} from "@/components/blabla/buttons";

export default function Home() {
  return (
    <div className="min-h-screen bg-blabla-cream flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-5xl font-bold text-blabla-dark font-bayon">BlaBlaBook</h1>
      <p className="text-blabla-teal text-lg font-basic">Exemples de boutons selon la charte graphique</p>
      
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
    </div>
  );
}
