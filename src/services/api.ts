import { http } from './common';
import { useQuery } from '@tanstack/react-query'

export type PayType = 'ONLINE' | 'DEVICE' | 'MOBILE' | 'VACT' | 'BILLING'
export type PayLabel = '온라인' | '단말기' | '모바일' | '가상계좌' | '정기결제'

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED'
export type PaymentLabel = '결제 대기' | '결제 완료' | '결제 실패' | '환불 완료'

export type MerchantStatus = 'READY' | 'ACTIVE' | 'INACTIVE' | 'CLOSED'
export type MerchantLabel = '준비중' | '영업중' | '정지' | '영업종료'

const FIVE_MINUTES = 5 * 60 * 1000;

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

export interface DetailMerchantsType{
    data: 
        {
            mchtCode: string
            mchtName: string
            status: MerchantStatus
            bizType: string
            bizNo: string
            address: string
            phone: string
            email: string
            registeredAt: string
            updateAt: string
        }
}

export interface Merchant {
    mchtCode: string;
    mchtName: string;
    status: MerchantStatus;
    bizType: string;
}

export interface MerchantDetail {
    mchtCode: string;
    mchtName: string;
    status: MerchantStatus;
    bizType: string;
    bizNo: string;
    address: string;
    phone: string;
    email: string;
    registeredAt: string;
    updatedAt: string; 
}

export interface Payment {
    paymentCode: string;
    mchtCode: string;
    amount: string;
    currency: string;
    payType: PayType;
    status: PaymentStatus;
    paymentAt: string;
}

const getpaymentList = (signal?: AbortSignal) => {
    return http.get<PaymentListType>('payments/list', {signal})
}

const getMerchantsList = (signal?: AbortSignal) => {
    return http.get<MerchantsListType>('merchants/list', {signal})
}

const getDetailMerchants = ({signal, code} : {signal?:AbortSignal, code: string}) => {
    return http.get<DetailMerchantsType>(`/merchants/details/${code}`, {signal})
}

export const useGetPaymentList = () => {
    return useQuery({
        queryKey: ['dashboard'],
        queryFn: ({ signal }) => getpaymentList(signal).then(res => res.data),
        staleTime: FIVE_MINUTES,
    })
}

export const useGetMerchantsList = () => {
    return useQuery({
        queryKey: ['merchants'],
        queryFn: ({ signal }) => getMerchantsList(signal).then(res => res.data),
        staleTime: FIVE_MINUTES,
    })
}

export const useGetDetailMerchants = (code:string) => {
    return useQuery({
        queryKey: ['merchants', 'detail', code],
        queryFn: ({signal}) => getDetailMerchants({signal,code}).then(res => res.data),
        staleTime: FIVE_MINUTES,
        enabled: !!code
    })
}