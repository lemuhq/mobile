import { createContext, ReactNode, useState } from "react";

interface ModalContextTypes {
	profileOpen: boolean;
	handleProfileOpen: (value: boolean) => void;
	handleScannerOpen: (value: boolean) => void;
	scannerOpen: boolean;
	transactionOpen: boolean;
	handleTransactionOpen: (value: boolean) => void;
	emailVerificationOpen: boolean;
	handlEmailVerificationOpen: (value: boolean) => void;
}

export const ModalContext = createContext<ModalContextTypes>({
	profileOpen: false,
	handleProfileOpen: (value: boolean) => {},
	scannerOpen: false,
	handleScannerOpen: () => {},
	handleTransactionOpen: () => {},
	transactionOpen: false,
	emailVerificationOpen: false,
	handlEmailVerificationOpen: (value: boolean) => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [profileOpen, setProfileOpen] = useState(false);
	const [scannerOpen, setScannerOpen] = useState(false);
	const [transactionOpen, setTransactionOpen] = useState(false);
	const [emailVerificationOpen, setEmailVerificationOpen] = useState(false);

	const handleProfileOpen = (value: boolean) => {
		setProfileOpen(value);
	};

	const handleScannerOpen = (value: boolean) => {
		setScannerOpen(value);
	};

	const handleTransactionOpen = (value: boolean) => {
		setTransactionOpen(value);
	};

	const handlEmailVerificationOpen = (value: boolean) => {
		setEmailVerificationOpen(value);
	};

	return (
		<ModalContext.Provider
			value={{
				profileOpen,
				handleProfileOpen,
				scannerOpen,
				handleScannerOpen,
				transactionOpen,
				handleTransactionOpen,
				emailVerificationOpen,
				handlEmailVerificationOpen,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};
