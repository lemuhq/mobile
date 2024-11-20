import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "@/constants";
import { storage } from "@/utils/storage";
import { Pagination, PaymentRequest, Transaction } from "@/types/transfer";

const baseQuery = fetchBaseQuery({
	baseUrl: BACKEND_URL,
	prepareHeaders: async (headers) => {
		const token = await storage.getToken();
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

		//Transaction history
		getTransactionHistory: builder.query<
			{ pagination: Pagination; transactions: Transaction[] },
			{ currentPage?: number }
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
} = transferApi;
