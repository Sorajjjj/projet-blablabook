import { Button } from "@/components/ui/button";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface BlaBlaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

// Orange outline button
export const OrangeOutlineButton = forwardRef<
	HTMLButtonElement,
	BlaBlaButtonProps
>(({ children, className = "", ...props }, ref) => (
	<Button
		ref={ref}
		variant="outline"
		className={`border-2 border-blabla-orange text-blabla-orange hover:bg-blabla-orange/10 bg-transparent px-10 py-2 text-base font-basic ${className}`}
		{...props}
	>
		{children}
	</Button>
));
OrangeOutlineButton.displayName = "OrangeOutlineButton";

// Light blue outline button
export const LightBlueOutlineButton = forwardRef<
	HTMLButtonElement,
	BlaBlaButtonProps
>(({ children, className = "", ...props }, ref) => (
	<Button
		ref={ref}
		variant="outline"
		className={`border-2 border-blabla-light-blue text-blabla-teal hover:bg-blabla-light-blue/20 bg-blabla-light-blue/30 px-10 py-2 text-base font-basic ${className}`}
		{...props}
	>
		{children}
	</Button>
));
LightBlueOutlineButton.displayName = "LightBlueOutlineButton";

// Orange solid button
export const OrangeSolidButton = forwardRef<
	HTMLButtonElement,
	BlaBlaButtonProps
>(({ children, className = "", ...props }, ref) => (
	<Button
		ref={ref}
		className={`bg-blabla-orange hover:bg-blabla-orange/90 text-white px-10 py-1 text-base font-basic shadow-none ${className}`}
		{...props}
	>
		{children}
	</Button>
));
OrangeSolidButton.displayName = "OrangeSolidButton";

// Teal solid button
export const TealSolidButton = forwardRef<HTMLButtonElement, BlaBlaButtonProps>(
	({ children, className = "", ...props }, ref) => (
		<Button
			ref={ref}
			className={`bg-blabla-teal hover:bg-blabla-teal/90 text-white px-10 py-1 text-base font-basic shadow-none ${className}`}
			{...props}
		>
			{children}
		</Button>
	)
);
TealSolidButton.displayName = "TealSolidButton";

// Orange rounded outline button
export const OrangeRoundedButton = forwardRef<
	HTMLButtonElement,
	BlaBlaButtonProps
>(({ children, className = "", ...props }, ref) => (
	<Button
		ref={ref}
		variant="outline"
		className={`border-2 border-blabla-orange text-blabla-orange hover:bg-blabla-orange/10 bg-transparent rounded-full px-10 py-2 text-base font-basic ${className}`}
		{...props}
	>
		{children}
	</Button>
));
OrangeRoundedButton.displayName = "OrangeRoundedButton";

// Teal rounded outline button
export const TealRoundedButton = forwardRef<
	HTMLButtonElement,
	BlaBlaButtonProps
>(({ children, className = "", ...props }, ref) => (
	<Button
		ref={ref}
		variant="outline"
		className={`border-2 border-blabla-teal text-blabla-teal hover:bg-blabla-teal/10 bg-transparent rounded-full px-10 py-2 text-base font-basic ${className}`}
		{...props}
	>
		{children}
	</Button>
));
TealRoundedButton.displayName = "TealRoundedButton";

// Simple button (ghost)
export const SimpleButton = forwardRef<HTMLButtonElement, BlaBlaButtonProps>(
	({ children, className = "", ...props }, ref) => (
		<Button
			ref={ref}
			variant="ghost"
			className={`text-blabla-dark hover:bg-transparent hover:underline px-10 py-2 text-base font-basic ${className}`}
			{...props}
		>
			{children}
		</Button>
	)
);
SimpleButton.displayName = "SimpleButton";
