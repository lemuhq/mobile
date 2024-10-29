import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useState,
} from "react";

interface ModalContextTypes {
	profileOpen: boolean;
	toggleProfileVisible: () => void;
	handleScannerOpen: (value: boolean) => void;
	scannerOpen: boolean;
	transactionOpen: boolean;
	handleTransactionOpen: (value: boolean) => void;
	emailVerificationOpen: boolean;
	toggleEmailVerification: () => void;
	biometricsVisible: boolean;
	toggleBiometrics: () => void;
}

export const ModalContext = createContext<ModalContextTypes>({
	profileOpen: false,
	toggleProfileVisible: () => {},
	scannerOpen: false,
	handleScannerOpen: () => {},
	handleTransactionOpen: () => {},
	transactionOpen: false,
	emailVerificationOpen: false,
	toggleEmailVerification: () => {},
	biometricsVisible: false,
	toggleBiometrics: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [profileOpen, setProfileOpen] = useState(false);
	const [scannerOpen, setScannerOpen] = useState(false);
	const [transactionOpen, setTransactionOpen] = useState(false);
	const [emailVerificationOpen, setEmailVerificationOpen] = useState(false);
	const [biometricsVisible, setBiometricsVisible] = useState(false);

	const toggleProfileVisible = () => {
		setProfileOpen(!profileOpen);
	};

	const handleScannerOpen = (value: boolean) => {
		setScannerOpen(value);
	};

	const handleTransactionOpen = (value: boolean) => {
		setTransactionOpen(value);
	};

	const toggleEmailVerification = () => {
		setEmailVerificationOpen(!emailVerificationOpen);
	};

	const toggleBiometrics = () => {
		setBiometricsVisible(!biometricsVisible);
	};

	return (
		<ModalContext.Provider
			value={{
				profileOpen,
				toggleProfileVisible,
				scannerOpen,
				handleScannerOpen,
				transactionOpen,
				handleTransactionOpen,
				emailVerificationOpen,
				toggleEmailVerification,
				biometricsVisible,
				toggleBiometrics,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};
