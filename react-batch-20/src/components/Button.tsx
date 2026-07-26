import type { ReactNode } from "react";

interface IButtonProps {
	onClick?: () => void;
	children: ReactNode;
	type?: "submit";
	disabled?: boolean;
}

function Button(props: IButtonProps) {
	const { onClick, children, type, disabled } = props;

	const state = {
		theme: "dark",
	};
	// const state = useContext(ThemeContext);

	return (
		<button
			className={`navbar-button navbar-button--${state.theme}`}
			onClick={onClick}
			type={type || "button"}
			disabled={disabled}
		>
			{children}
		</button>
	);
}

export default Button;
