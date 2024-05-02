import React from 'react';
import { useLocation } from 'react-router-dom';
import BackButton from '../backButton/BackButton';
import styled from 'styled-components';

const Header = () => {
  const location = useLocation();
  const isRoot = location.pathname === '/';  // 현재 경로가 루트 경로인지 확인

  return (
    <Headers>
      <div>
        {!isRoot && <BackButton />}
        <h1>쉬운 만세력</h1>
      </div>
    </Headers>
  );
}

export default Header;

const Headers = styled.header`
  background: #2694d6;
  padding: 20px 0;
  text-align: center;
  font-size: 30px;
  color: white;
  div {
    position: relative;
    width: 600px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h1 {
    margin: 0;
    padding: 0 20px;  // h1에 좌우 패딩 추가하여 백 버튼과의 간격 조정
  }
`;
