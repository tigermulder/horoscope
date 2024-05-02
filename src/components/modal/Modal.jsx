import React from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../../recoil/atom';
import styled from 'styled-components';

const Modal = () => {
  const [modalInfo, setModalInfo] = useRecoilState(modalState);
  const { isOpen, content } = modalInfo;
  if (!isOpen) return null;

  const closeModal = () => setModalInfo({ ...modalInfo, isOpen: false });

  return (
    <ModalContainer onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closeModal}>×</CloseButton>
        {content}
      </ModalContent>
    </ModalContainer>
  );
}

export default Modal;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  position: relative;
  width: auto;
  max-width: 600px;
  min-width: 300px;
  height: auto;
  padding: 40px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  padding:20px;
  top: 0;
  right: 0;
  border: none;
  background: none;
  font-size: 40px;
  line-height:25px;
  color: #333;
  cursor: pointer;
`;
