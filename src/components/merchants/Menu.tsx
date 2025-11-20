import styled from "styled-components";
import { useRef, useEffect } from "react";

interface Props {
    show: boolean
    onClose: () => void;
    parentRef: React.RefObject<HTMLDivElement | null>;
}

const ProfileMenu = ({
    show,
    onClose,
    parentRef,
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

    return(
        <Container
        $show={show}
        ref={ref}
        >
            <Text >
                삭제하기
            </Text>
            <Text>
                수정하기
            </Text>
        </Container>
    )
}

export default ProfileMenu

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
    top: 55px;
    right: 30%;
    width: 100px;
    box-sizing: border-box;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);

    transition: opacity 0.5s;
    pointer-events: ${(props) => (props.$show ? "auto" : "none")};
`

const Text = styled.p`
    
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