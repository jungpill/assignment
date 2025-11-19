import { useModalStore } from "../../stores/ModalStore";
import styled from "styled-components";
import { AppImage } from "../../assets/images/images";
import { useGetDetailMerchants } from "../../services/api";
import { ConfirmButton, CancelButton } from "../common/Button";

export const openDetailModal = (code:string) => {
    
    const { setField } = useModalStore.getState()
    
    setField('open', true)
    setField('children', <DetailModal code={code}/>)
}

export const DetailModal = ({code}:{code:string}) => {

    const {data: detailData, isLoading, error} = useGetDetailMerchants(code)
  
    const reset = useModalStore(p => p.reset)
    
    if (isLoading) return null;
    if (error) return null;
    if (!detailData?.data) return null;

    return(
        <DetailModalContainer>
            <Header>
                <Title>{detailData.data.mchtName}</Title>
                <AppImage name="XIcon" onClick={reset} customStyle={{cursor: 'pointer'}}/>
            </Header>

            <Body>
                <Cell>
                    <AppImage 
                    name="MarkerIcon" 
                    fill="black" 
                    customStyle={{width: 25, height: 25, margin: 0}}
                    /> 
                    {detailData.data.address}
                </Cell>

                <Cell>
                    <AppImage 
                    name="PhoneIcon" 
                    customStyle={{width: 25, height: 20, margin: 0}}
                    />
                    {detailData.data.phone}
                </Cell>

                <Cell>
                    <AppImage 
                    name="MailIcon"  
                    customStyle={{width: 25, height: 20, margin: 0}}
                    />
                    {detailData.data.email}
                </Cell>

                <Cell>
                    <AppImage 
                    name="JobIcon"  
                    customStyle={{width: 25, height: 20, margin: 0}}
                    />
                    {detailData.data.bizType}
                </Cell>
            </Body>

            <Footer>
                <ConfirmButton 
                style={{width: 130}}
                onClick={reset}
                >
                    닫기
                </ConfirmButton>
            </Footer>
        </DetailModalContainer>
    )
}

const DetailModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 28px;
    gap: 20px;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: #fff;
    border-radius: 8px;
    box-sizing: border-box;
`

const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

const Footer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: flex-end;
    width: 100%;
`

const Title = styled.h3`
    margin: 0;
`

const Cell = styled.span`
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 4px;
`