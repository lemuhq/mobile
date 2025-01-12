import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "@/constants";
import { storage } from "@/utils/storage";
import { Pagination, PaymentRequest, Transaction } from "@/types/transfer";

const baseQuery = fetchBaseQuery({
	baseUrl: `http://192.168.1.147:5000/api/v1`,
	prepareHeaders: async (headers) => {
		// const token = await storage.getToken();
		const token = await storage.getUserToken("token");
		console.log("token", token);
		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}

		return headers;
	},
});

export const transferApi = createApi({
	reducerPath: "transfer",
	baseQuery: baseQuery,

	endpoints: (builder) => ({
		getBankList: builder.query({
			query: () => ({
				url: "/transfer/list-of-banks",
				method: "GET",
			}),
		}),

		verifyAccountNumber: builder.mutation({
			query: ({ accountNumber, bankCode }) => ({
				url: "/transfer/name-enquiry",
				method: "POST",
				body: { accountNumber, bankCode },
			}),
		}),

		//transfer to other banks
		transferToBank: builder.mutation({
			query: ({
				nameEnquiryReference,
				narration,
				amount,
				beneficiaryAccountNumber,
				beneficiaryBankCode,
			}: PaymentRequest) => ({
				url: "/transfer/transfer-to-other-banks",
				method: "POST",
				body: {
					nameEnquiryReference,
					narration,
					amount,
					beneficiaryAccountNumber,
					beneficiaryBankCode,
				},
			}),
		}),

		transferToLemu: builder.mutation({
			query: ({amount, accountNumber, accountName, transactionPin}: {amount: number, accountNumber: string, accountName: string, transactionPin: string}) => ({
				url: "/transfer/transfer-to-lemu",
				method: "POST",
				body: {amount, accountNumber, accountName, transactionPin},
			}),
		}),

		//Transaction history
		getTransactionHistory: builder.query<
			{ pagination: Pagination; transactions: Transaction[] },
			{ currentPage?: number; limit?: number }
		>({
			query: () => ({
				url: "/transaction/get-transaction-history",
				method: "GET",
			}),
		}),
	}),
});

export const {
	useGetBankListQuery,
	useVerifyAccountNumberMutation,
	useTransferToBankMutation,
	useGetTransactionHistoryQuery,
	useTransferToLemuMutation,
} = transferApi;
