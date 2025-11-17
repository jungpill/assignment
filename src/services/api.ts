import { http } from './common';
import { useQuery } from '@tanstack/react-query'

export type PayType = 'ONLINE' | 'DEVICE' | 'MOBILE' | 'VACT' | 'BILLING'
export type Pending = '"PENDING' | '"SUCCESS' | 'FAILED' | 'CANCELLED'

interface PaymentListType {
    data: [
        {
            paymentCode: string
            mchtCode: string
            amount: string
            currency: string
            payType: PayType
            status: Pending
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
