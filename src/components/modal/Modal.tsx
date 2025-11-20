import styled from "styled-components";
import { useModalStore } from '../../stores/ModalStore'
import React, { useState,useEffect, useRef } from "react";

const ANIM_MS = 300;

const Modal = () => {

    const children = useModalStore(p => p.children)
    const modalStatus = useModalStore(p => p.open)
    const setModalField = useModalStore(p => p.setField)
    const width = useModalStore(p => p.width)

    //마우스가 떨어지는곳 감지하기 위함
    const mouseDownTarget = useRef<EventTarget | null>(null)

    const closeModal = (e:React.MouseEvent) => {
        if(e.target === e.currentTarget && mouseDownTarget.current === e.currentTarget){
            setModalField('open', false)
        }
    }

    //모달 밖(overlay) 마우스 떨어지는거 감지
    const onBackDropMouseDown = (e: React.MouseEvent) => {
      mouseDownTarget.current = e.target;
    };

    useEffect(() => {
    if (!modalStatus) return; 

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        setModalField('open', false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalStatus, setModalField]);

    return(
        <ModalBackdrop
        $open={modalStatus}
        onClick={closeModal}
        onMouseDown={onBackDropMouseDown}
        >
            <ModalLayout
            $open={modalStatus}
            $modalWidth={width || '640px'}
            >
                {children}
            </ModalLayout>
        </ModalBackdrop>
    )
}

export default Modal;

const ModalBackdrop = styled.div<{$open: boolean}>`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0, 0.4);
    z-index: 1001;
    inset: 0;

    opacity: ${({ $open }) => ($open ? 1 : 0)};
    transition: opacity ${ANIM_MS}ms ease;
    pointer-events: ${props => props.$open ? 'auto' : 'none'}
`

const ModalLayout = styled.div<{ $open: boolean , $modalWidth: string,}>`
    outline: none;
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    border-radius: 20px;
    width: ${({$modalWidth})=>($modalWidth)};
    box-sizing: border-box;
  
    transition:
      transform ${ANIM_MS}ms cubic-bezier(.2,0,0,1),
      opacity ${ANIM_MS}ms ease;
  `