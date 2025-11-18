import styled from "styled-components";

const ANIM_MS = 300;

const Modal = () => {

    return(
        <ModalBackdrop>
            
        </ModalBackdrop>
    )
}

export default Modal;

const ModalBackdrop = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0, 0.4);
    z-index: 1001;

`

const ModalLayout = styled.div<{ $open: boolean , $modalwidth: string, $modalpadding: string}>`
    outline: none;
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    border-radius: 20px;
    padding: ${({$modalpadding})=>($modalpadding)};
    width: ${({$modalwidth})=>($modalwidth)};
    box-sizing: border-box;
  
    transition:
      transform ${ANIM_MS}ms cubic-bezier(.2,0,0,1),
      opacity ${ANIM_MS}ms ease;
  `