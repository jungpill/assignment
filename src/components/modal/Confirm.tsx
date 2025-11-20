import { useModalStore } from "../../stores/useModalStore";
import styled from "styled-components";
import { AppImage } from "../../assets/images/images";
import { ConfirmButton, CancelButton } from "../common/Button";
import { useAlertStore } from "../../stores/useAlertStore";
import SelectDropdown from "../common/Dropdown";
import LabelInput from "../common/Input";
import { useState } from "react";
import { type Merchant } from "../../services/api";

interface DeleteModalProps {
    title: string
    content: string
    eventHandler: () => void
}

interface EditModalProps {
    merchant: Merchant
    eventHandler: (data: Partial<Merchant> & { mchtCode: string }) => void;
}

export const openDeleteModal = ({
    title,
    content,
    eventHandler
    }: DeleteModalProps) => {
    
    const { setField } = useModalStore.getState()
    
    setField('open', true)
    setField('width', '440px')
    setField('children', <ConfirmModal title={title} content={content} eventHandler={eventHandler}/>)
}

// export const openEditModal = ({
//     eventHandler,
//     merchant,
    
//     }: EditModalProps) => {

//     const { setField } = useModalStore.getState()
    
//     setField('open', true)
//     setField('width', '440px')
//     setField('children', <EditModal eventHandler={eventHandler} merchant={merchant} handleUpdateMerchant={handleUpdateMerchant}/>)
// }

const ConfirmModal = ({
    title,
    content,
    eventHandler
    }: DeleteModalProps) => {
        
    const reset = useModalStore(p => p.reset)
    const successAlert = useAlertStore((p) => p.showSuccess)

    const handleEvent = () => {
        eventHandler()
        reset()   
        successAlert('삭제되었습니다.')
    }

    return(
        <Container>
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
                onClick={handleEvent}
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
        </Container>
    )
}

const EditModal = ({
    eventHandler
    }: EditModalProps) => {

    const reset = useModalStore(p => p.reset)

    const [submitData, setSubmitData] = useState({
        name: '',
        status: '',

    })

    const testList = ['dd', 'dd2', 'dd44']
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSubmitData(prev => ({...prev,
            [name]: value
        }))
    }
      

    return(
        <Container>
            <Header>
                <Title>매장 등록</Title>
                <AppImage name="XIcon" onClick={reset} customStyle={{cursor: 'pointer'}}/>
            </Header>

            <Body>
                <LabelInput
                label="매장명"
                value={submitData.name}
                name="name"
                onChange={handleChange}
                placeholder="매장명을 입력하세요"
                />

                <LabelInput
                label="번호"
                value={submitData.name}
                name="name"
                onChange={handleChange}
                placeholder="번호를 입력하세요"
                />

                <LabelInput
                label="주소"
                value={submitData.name}
                name="name"
                onChange={handleChange}
                placeholder="주소를 입력하세요"
                />

                <LabelInput
                label="매장명"
                value={submitData.name}
                name="name"
                onChange={handleChange}
                placeholder="매장명을 입력하세요"
                />

                <RowWrapper>
                    <SelectDropdown 
                    options={testList}
                    onChange={() => console.log('dd')}
                    width="170px"
                    placeholder="상태"
                    />

                    <SelectDropdown 
                    options={testList}
                    onChange={() => console.log('dd')}
                    width="170px"
                    placeholder="업종"
                    />
                </RowWrapper>
                
            </Body>

            <Footer>
                <ConfirmButton 
                style={{width: 88}}
                >
                    등록
                </ConfirmButton>
                <CancelButton
                style={{width: 88}}
                onClick={reset}
                >
                    취소
                </CancelButton>
            </Footer>
        </Container>
    )
}

const Container = styled.div`
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

const RowWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`   