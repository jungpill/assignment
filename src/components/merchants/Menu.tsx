import styled from "styled-components";
import { useRef, useEffect } from "react";
import { openDeleteModal } from "../modal/Confirm";
import { type Merchant } from "../../services/api";

interface Props {
    show: boolean
    onClose: () => void;
    parentRef: React.RefObject<HTMLDivElement | null>;
    mchtCode: string
    handleDeleteMerchant: (code: string) => void
}

const Menu = ({
    show,
    onClose,
    parentRef,
    mchtCode,
    handleDeleteMerchant,
    }: Props) => {

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!show) return;

        const handleClickOutside = (event: MouseEvent) => {
            if(ref.current && 
                !ref.current.contains(event.target as Node) && 
                parentRef.current && 
                !parentRef.current.contains(event.target as Node)
            ) onClose();
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }

    }, [show, onClose])

    const handleDeleteModal = (e:React.MouseEvent) => {
        e.stopPropagation
        openDeleteModal({
        title: '선택 매장이 삭제됩니다',
        content: '정말 삭제하시겠습니까?',
        eventHandler: () => {
      handleDeleteMerchant(mchtCode);  
      onClose();           
    },
  });
    }

    // const handleEditModal = (e:React.MouseEvent) => {
    //     e.stopPropagation
    //     openEditModal({
    //         merchant, 
    //         eventHandler: (updatedData) => {
    //             handleUpdateMerchant(updatedData);
    //             onClose();
    //         },
    //     });
    // }

    return(
        <Container
        $show={show}
        ref={ref}
        >
            <Text onClick={handleDeleteModal}>
                삭제하기
            </Text>
            {/* <Text onClick={handleEditModal}>
                수정하기
            </Text> */}
        </Container>
    )
}

export default Menu

const Container = styled.div<{$show: boolean}>`
    padding: 8px 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    z-index: 1001;
    opacity: ${(props) => props.$show ? 1 : 0};
    background: #fff;
    border-radius: 8px;
    top: 20px;
    right: 75%;
    width: 100px;
    box-sizing: border-box;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
    gap: 4px;
    transition: opacity 0.5s;
    pointer-events: ${(props) => (props.$show ? "auto" : "none")};
`

const Text = styled.p`
    margin: 0;
    font-size: 14px;   
    color: #000014;
    cursor: pointer;
    line-height: 140%;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 8px;

    &: hover{
        background: #EBF2FE;
    }
`