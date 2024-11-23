export interface BankItem {
	name: string;
	routingKey: string;
	logoImage: string | null;
	bankCode: string;
	categoryId: string;
	nubanCode: string | null;
}

export interface BeneficiaryUser {
	responseCode: string;
	responseMessage: string;
	sessionId: string;
	bankCode: string;
	accountNumber: string;
	accountName: string;
	kycLevel: string;
	bvn: string;
}

export interface PaymentRequest {
	nameEnquiryReference: string; // corresponds to sessionId from name enquiry
	amount?: number;
	beneficiaryBankCode: string; // corresponds to bankCode from name enquiry
	beneficiaryAccountNumber: string;
	narration?: string;
}

export type Transaction = {
	_id: string;
	transactionType: "Outwards" | "Inwards";
	amount: number;
	status: "Completed" | "Pending" | "Failed";
	reference: string;
	narration: string;
	senderAccountNumber: string;
	receiverAccountNumber: string;
	senderAccountName: string;
	receiverAccountName: string;
	senderBank: string;
	receiverBank: string;
	providerChannel: string;
	createdAt: string;
	updatedAt: string;
	transactionLocation: string;
	fees: number;
	sessionId: string;
	client: string;
	__v: number;
};

export type Pagination = {
	currentPage: number;
	itemsPerPage: number;
	totalItems: number;
	totalPages: number;
};
