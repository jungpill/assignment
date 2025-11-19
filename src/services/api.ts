import { http } from './common';
import { useQuery } from '@tanstack/react-query'

export type PayType = 'ONLINE' | 'DEVICE' | 'MOBILE' | 'VACT' | 'BILLING'
export type PayLabel = '온라인' | '단말기' | '모바일' | '가상계좌' | '정기결제'

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED'
export type PaymentLabel = '결제 대기' | '결제 완료' | '결제 실패' | '환불 완료'

export type MerchantStatus = 'READY' | 'ACTIVE' | 'INACTIVE' | 'CLOSED'




export interface PaymentListType {
    data: [
        {
            paymentCode: string
            mchtCode: string
            amount: string
            currency: string
            payType: PayType
            status: PaymentStatus
            paymentAt: string
        }
    ]
}

export interface MerchantsListType {
    data: [
        {
            mchtCode: string
            mchtName: string
            status: MerchantStatus
            bizType: string
        }
    ]
}

const getpaymenyList = (signal?: AbortSignal) => {
    return http.get<PaymentListType>('payments/list', {signal})
}

const getMerchantsList = (signal?: AbortSignal) => {
    return http.get<MerchantsListType>('merchants/list', {signal})
}

export const useGetPaymentList = () => {
    return useQuery({
        queryKey: ['dashboard'],
        queryFn: ({ signal }) => getpaymenyList(signal).then(res => res.data),
        staleTime: 5 * 60 * 1000,
    })
}

export const useGetMerchantsList = () => {
    return useQuery({
        queryKey: ['merchants'],
        queryFn: ({ signal }) => getMerchantsList(signal).then(res => res.data),
        staleTime: 5 * 60 * 1000,
    })
}