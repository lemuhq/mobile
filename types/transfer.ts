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
