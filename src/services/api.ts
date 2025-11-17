import { http } from './common';

type PayType = 'ONLINE' | 'DEVICE' | 'MOBILE' | 'VACT' | 'BILLING'
type Pending = '"PENDING' | '"SUCCESS' | 'FAILED' | 'CANCELLED'

interface PaymentListType {
    paymentCode: string;
    mchtCode: string
    amount: string
    currency: string
    payType: PayType
    status: Pending
    paymentAt: string
}

export const getPaymenyList = async() => {
    try{
        const res = await http.get('v1/payments/list')
        console.log(res.data)
        return res.data
    }catch(err){
        throw(err)
    }
}