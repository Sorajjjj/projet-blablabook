import { Button } from "@/components/ui/button";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface BlaBlaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

// Bouton orange outline
export const OrangeOutlineButton = forwardRef<HTMLButtonElement, BlaBlaButtonProps>(
  ({ children, className = "", ...props }, ref) => (
    <Button
      ref={ref}
      variant="outline"
      className={`border-2 border-blabla-orange text-blabla-orange hover:bg-blabla-orange/10 bg-transparent px-12 py-6 text-base font-basic ${className}`}
      {...props}
    >
      {children}
    </Button>
  )
);
OrangeOutlineButton.displayName = "OrangeOutlineButton";

// Bouton bleu clair outline
export const LightBlueOutlineButton = forwardRef<HTMLButtonElement, BlaBlaButtonProps>(
  ({ children, className = "", ...props }, ref) => (
    <Button
      ref={ref}
      variant="outline"
      className={`border-2 border-blabla-light-blue text-blabla-teal hover:bg-blabla-light-blue/20 bg-blabla-light-blue/30 px-12 py-6 text-base font-basic ${className}`}
      {...props}
    >
      {children}
    </Button>
  )
);
LightBlueOutlineButton.displayName = "LightBlueOutlineButton";

// Bouton orange plein
export const OrangeSolidButton = forwardRef<HTMLButtonElement, BlaBlaButtonProps>(
  ({ children, className = "", ...props }, ref) => (
    <Button
      ref={ref}
      className={`bg-blabla-orange hover:bg-blabla-orange/90 text-white px-12 py-6 text-base font-basic shadow-none ${className}`}
      {...props}
    >
      {children}
    </Button>
  )
);
OrangeSolidButton.displayName = "OrangeSolidButton";

// Bouton teal plein
export const TealSolidButton = forwardRef<HTMLButtonElement, BlaBlaButtonProps>(
  ({ children, className = "", ...props }, ref) => (
    <Button
      ref={ref}
      className={`bg-blabla-teal hover:bg-blabla-teal/90 text-white px-12 py-6 text-base font-basic shadow-none ${className}`}
      {...props}
    >
      {children}
    </Button>
  )
);
TealSolidButton.displayName = "TealSolidButton";

// Bouton orange outline arrondi
export const OrangeRoundedButton = forwardRef<HTMLButtonElement, BlaBlaButtonProps>(
  ({ children, className = "", ...props }, ref) => (
    <Button
      ref={ref}
      variant="outline"
      className={`border-2 border-blabla-orange text-blabla-orange hover:bg-blabla-orange/10 bg-transparent rounded-full px-12 py-6 text-base font-basic ${className}`}
      {...props}
    >
      {children}
    </Button>
  )
);
OrangeRoundedButton.displayName = "OrangeRoundedButton";

// Bouton teal outline arrondi
export const TealRoundedButton = forwardRef<HTMLButtonElement, BlaBlaButtonProps>(
  ({ children, className = "", ...props }, ref) => (
    <Button
      ref={ref}
      variant="outline"
      className={`border-2 border-blabla-teal text-blabla-teal hover:bg-blabla-teal/10 bg-transparent rounded-full px-12 py-6 text-base font-basic ${className}`}
      {...props}
    >
      {children}
    </Button>
  )
);
TealRoundedButton.displayName = "TealRoundedButton";

// Bouton simple (ghost)
export const SimpleButton = forwardRef<HTMLButtonElement, BlaBlaButtonProps>(
  ({ children, className = "", ...props }, ref) => (
    <Button
      ref={ref}
      variant="ghost"
      className={`text-blabla-dark hover:bg-transparent hover:underline px-12 py-6 text-base font-basic ${className}`}
      {...props}
    >
      {children}
    </Button>
  )
);
SimpleButton.displayName = "SimpleButton";
