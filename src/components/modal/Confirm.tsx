import { useModalStore } from "../../stores/ModalStore";
import styled from "styled-components";
import { AppImage } from "../../assets/images/images";
import { useGetDetailMerchants } from "../../services/api";
import { ConfirmButton, CancelButton } from "../common/Button";

interface ModalProps {
    title: string
    content: string
    eventHandler: () => void
}

export const openConfirmModal = ({
    title,
    content,
    eventHandler
    }: ModalProps) => {
    
    const { setField } = useModalStore.getState()
    
    setField('open', true)
    setField('width', '440px')
    setField('children', <ConfirmModal title={title} content={content} eventHandler={eventHandler}/>)
}

const ConfirmModal = ({
    title,
    content,
    eventHandler
    }: ModalProps) => {
  
    const reset = useModalStore(p => p.reset)

    return(
        <DetailModalContainer>
            <Header>
                <Title>{title}</Title>
                <AppImage name="XIcon" onClick={reset} customStyle={{cursor: 'pointer'}}/>
            </Header>

            <Body>
                {content}
            </Body>

            <Footer>
                <ConfirmButton 
                style={{width: 88}}
                onClick={eventHandler}
                >
                    확인
                </ConfirmButton>
                <CancelButton
                style={{width: 88}}
                onClick={reset}
                >
                    취소
                </CancelButton>
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