import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BackButton = () => {
  let navigate = useNavigate();

  return (
    <Back onClick={() => navigate(-1)} style={{ marginRight: '10px' }}>
      <svg width="12" height="20" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M9 17L1 9L9 1"></Path></svg>
    </Back>
  );
}

export default BackButton;

const Back = styled.button`
  position:absolute;
  top:50%;
  left:20px;
  transform:translateY(-50%);
  padding:20px;
  background:transparent;
  font-size:24px;
  color:#fff;
  cursor:pointer;
`
const Path = styled.path`
  stroke:#fff;
  stroke-width:2; 
  stroke-linecap:round;
  stroke-linejoin:round;
`