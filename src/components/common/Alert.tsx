import React, {useEffect} from 'react';
import styled from 'styled-components';
import { useAlertStore, type AlertType } from '../../stores/useAlertStore';
import { IoIosWarning } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

const Alert = () => {

  const type = useAlertStore((s) => s.type)
  const clear = useAlertStore((s) => s.clear) 
  const message= useAlertStore((s) => s.message)

  useEffect(() => { 
    if(type === null) return 
    const id = setTimeout(() => { 
      clear() 
    },2500)
     return () => clearTimeout(id); 
  },[type])

  return (
    <Overlay $type={type}>
      <AlertContainer $type={type}>
        <Header>
          {type === 'success' && <FaCheckCircle color={'#3B82F6'} size={20}/>}
          {type === 'warn' && <IoIosWarning color={'red'} size={20} />}
        </Header>
        <Body>
          {message}
        </Body>
       
      </AlertContainer>
    </Overlay>
  );
};

export default Alert;


const Overlay = styled.div<{ $type: AlertType }>`
  position: fixed;
  top: ${({ $type }) => ($type !== null ? '40px' : '0px')};
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1002;

  pointer-events: none;
  opacity: ${({ $type }) => ($type !== null ? 1 : 0)};
  transition: opacity 0.6s, top 0.6s ease;
`;

const AlertContainer = styled.div<{ $type: AlertType }>`
  display: flex;
  background: white;
  padding: 18px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  gap: 14px;
  align-items: center;
  background: #33383F;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Body = styled.div`
  font-size: 14px;
  color: #fff;
  align-items: center;
  font-weight: 600;
`;