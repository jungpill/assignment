import { http } from './common';
import { useQuery } from '@tanstack/react-query'

export type PayType = 'ONLINE' | 'DEVICE' | 'MOBILE' | 'VACT' | 'BILLING'
export type PayLabel = '온라인' | '단말기' | '모바일' | '가상계좌' | '정기결제'

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED'
export type PaymentLabel = '결제 대기' | '결제 완료' | '결제 실패' | '환불 완료'

interface PaymentListType {
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

const getpaymenyList = (signal?: AbortSignal) => {
    return http.get<PaymentListType>('payments/list', {signal})
}

export const useGetPaymentList = () => {
    return useQuery({
        queryKey: ['dashboard'],
        queryFn: ({ signal }) => getpaymenyList(signal).then(res => res.data),
        staleTime: 5 * 60 * 1000,
    })
}
