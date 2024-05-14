import React from 'react';
import styled from "styled-components";

const FiveElement = ({ wood, fire, earth, metal, water }) => {
  return (
    <FiveElementStyled>
      <div>나무: {wood}개</div>
      <div>불: {fire}개</div>
      <div>땅: {earth}개</div>
      <div>쇠: {metal}개</div>
      <div>물: {water}개</div>
    </FiveElementStyled>
  )
}

export default FiveElement

const FiveElementStyled = styled.div`
  display:flex;
  justify-content:space-around;
  align-items:center;
  width:100%;
  border-top:1px solid #333;
  div {
    width:20%;
    padding:5px 0;
    display:flex;
    justify-content:center;
    color:white;
  }
  div:first-child {
    background:#699d39;
  }
  div:nth-child(2) {
    background:#c85152;
  }
  div:nth-child(3) {
    background:#e8af2a;
  }
  div:nth-child(4) {
    background:#a0a0a0;
  }
  div:last-child {
    background:#1392f0;
  }
`

