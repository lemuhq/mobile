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
	toggleScannerModal: () => void;
	scannerOpen: boolean;
	transactionOpen: boolean;
	toggleTransactionModal: () => void;
	emailVerificationOpen: boolean;
	toggleEmailVerification: () => void;
	biometricsVisible: boolean;
	toggleBiometrics: () => void;
	banksModalOpen: boolean;
	toggleBankModal: () => void;
	confirmTransactionOpen: boolean;
	toggleConfirmTransactionModal: () => void;
}

export const ModalContext = createContext<ModalContextTypes>({
	profileOpen: false,
	toggleProfileVisible: () => {},
	scannerOpen: false,
	toggleScannerModal: () => {},
	toggleTransactionModal: () => {},
	transactionOpen: false,
	emailVerificationOpen: false,
	toggleEmailVerification: () => {},
	biometricsVisible: false,
	toggleBiometrics: () => {},
	banksModalOpen: false,
	toggleBankModal: () => {},
	confirmTransactionOpen: false,
	toggleConfirmTransactionModal: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [profileOpen, setProfileOpen] = useState(false);
	const [scannerOpen, setScannerOpen] = useState(false);
	const [transactionOpen, setTransactionOpen] = useState(false);
	const [emailVerificationOpen, setEmailVerificationOpen] = useState(false);
	const [biometricsVisible, setBiometricsVisible] = useState(false);
	const [banksModalOpen, setBankModalOpen] = useState(false);
	const [confirmTransactionOpen, setConfirmTransactionOpen] = useState(false);

	const toggleProfileVisible = () => {
		setProfileOpen(!profileOpen);
	};

	const toggleScannerModal = () => {
		setScannerOpen(!scannerOpen);
	};

	const toggleTransactionModal = () => {
		setTransactionOpen(!transactionOpen);
	};

	const toggleEmailVerification = () => {
		setEmailVerificationOpen(!emailVerificationOpen);
	};

	const toggleBiometrics = () => {
		setBiometricsVisible(!biometricsVisible);
	};

	const toggleBankModal = () => {
		setBankModalOpen(!banksModalOpen);
	};

	const toggleConfirmTransactionModal = () => {
		setConfirmTransactionOpen(!confirmTransactionOpen);
	};

	return (
		<ModalContext.Provider
			value={{
				profileOpen,
				toggleProfileVisible,
				scannerOpen,
				toggleScannerModal,
				transactionOpen,
				toggleTransactionModal,
				emailVerificationOpen,
				toggleEmailVerification,
				biometricsVisible,
				toggleBiometrics,
				banksModalOpen,
				toggleBankModal,
				confirmTransactionOpen,
				toggleConfirmTransactionModal,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};
