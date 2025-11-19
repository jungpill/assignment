import { useModalStore } from "../../stores/ModalStore";
import styled from "styled-components";

export const openDetailModal = () => {
    
    const { setField } = useModalStore.getState()

    setField('open', true)
    setField('children', <DetailModal/>)
}

export const DetailModal = () => {

    const reset = useModalStore(p => p.reset)
    const data = useModalStore(p => p.data)
    

    const onClickClose = () => {
        reset()
    }
    
    return(
        <DetailModalContainer>
            <Header>
                asdasd
            </Header>

            <Body>
                asdasd
            </Body>

            <Footer>
                <div>das</div>
                <div>das</div>
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
    padding: 20px;
`

const Body = styled.div`
    display: flex;

`

const Footer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    justfiy-content: flex-end;
`