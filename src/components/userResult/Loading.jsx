import React from 'react';
import styled from 'styled-components';
import { PuffLoader } from 'react-spinners';

const Loading = () => (
  <LoadingContainer>
    <PuffLoader color="#2694d6" loading={true} size={60} />
    <p>만세력 로딩중...</p>
  </LoadingContainer>
);

export default Loading;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 150px;
`;