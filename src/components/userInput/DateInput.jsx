import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { birthdayActiveState, dateState, lunarState, modalState } from '../../recoil/atom';  // 상태 경로를 확인하고 적절하게 수정하세요.
import Modal from '../modal/Modal';

const DateInput = () => {
  const [date, setDate] = useRecoilState(dateState);
  const [isLunar, setIsLunar] = useRecoilState(lunarState);
  const setBirthday = useRecoilValue(birthdayActiveState);
  const setModalInfo = useSetRecoilState(modalState);

  const handleInputChange = (e) => {
    const now = new Date();
    const nowYear = now.getFullYear();
    let value = e.target.value.replace(/[^\d]/g, '');
    if (value.length > 4) {
      let year = value.slice(0, 4);
      let month = value.slice(4, 6);
      let day = value.slice(6, 8);
      if (parseInt(year) > nowYear || parseInt(year) < 1500) year = '1500';
      if (parseInt(month) > 12 || month === '00') month = '01';
      if (parseInt(day) > 31 || day === '00') day = '01';
      value = `${year}${month ? '/' + month : ''}${day ? '/' + day : ''}`;
    }
    setDate(value);
  };

  // 모달함수
  const handleSvgClick = () => {
    setModalInfo({
      isOpen : true,
      content : (
        <>
          <Heading>만세력의 이해</Heading>
          <Paragraph>
            <strong>만세력과 양력의 사용:</strong> 만세력은 일반적으로 음력을 사용하는 것으로 알려져 있지만, 실제로는 태양의 위치를 기반으로 한 양력을 사용합니다. 이는 개인의 운명, 성향, 그리고 중요한 미래 사건들을 예측하는 데 필수적입니다.
          </Paragraph>
          <Paragraph>
            <strong>음력과 양력의 차이:</strong> 음력은 달의 주기를 기반으로 한 반면, 양력은 태양의 위치를 중심으로 합니다. 만세력에서 양력의 사용은 정확한 천문학적 위치가 중요한 역할을 하기 때문입니다.
          </Paragraph>
        </>
      )
    })
    return;
  }

  return (
    <>
      <Label htmlFor="date">생년월일</Label>
      <Svg onClick={handleSvgClick} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="16" rx="8" fill="#524C46"></rect>
        <path d="M7.33309 10.6668C9.17404 10.6668 10.6664 9.17437 10.6664 7.33342C10.6664 5.49248 9.17404 4.00009 7.33309 4.00009C5.49214 4.00009 3.99976 5.49248 3.99976 7.33342C3.99976 9.17437 5.49214 10.6668 7.33309 10.6668Z"></path>
        <path d="M9.69043 9.69034L12 11.9999"></path>
      </Svg>
      <Flexbox>
        <Birthday id="date" type="text" value={date} onChange={handleInputChange} placeholder="YYYY/MM/DD" autoComplete="off" disabled={setBirthday}/>
        <Switch>
          <label htmlFor="lunar">양력</label>
          <input id="lunar" type="checkbox" checked={isLunar} onChange={(e) => setIsLunar(e.target.checked)}/>
          <label htmlFor="lunar">음력</label>
        </Switch>
      </Flexbox>
      <Cation>* 음력체크하시면 자동으로 양력 변환되어 조회됩니다.</Cation>
      <Modal/>
    </>
  );
};

export default DateInput;

const Label = styled.label`
  display:inline-block;
  margin-bottom:12px;
  letter-spacing:0.05rem;
`
const Svg = styled.svg`
  margin:0 0 -2.5px 10px;
  cursor:pointer;
  path {
    stroke:white;
    stroke-width:1.33333;
    stroke-linecap:round; 
    stroke-linejoin:round;
  }
`
const Flexbox = styled.div`
  display:flex;
  align-items:center;
  [type="checkbox"] {
    appearance: none;
    position: relative;
    border: max(2px, 0.1em) solid gray;
    border-radius: 1.25em;
    width: 2.25em;
    height: 1.25em;
    cursor:pointer;
  }
  [type="checkbox"]::before {
    content: "";
    position: absolute;
    left: 0;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    transform: scale(0.8);
    background-color: gray;
    transition: left 0.25s linear;
  }
  [type="checkbox"]:checked {
    background-color: tomato;
    border-color: tomato;
  }
  [type="checkbox"]:checked::before {
    background-color: white;
    left: 1em;
  }
`
const Birthday = styled.input`
  width:80%;
  height:40px;
  border-radius: 8px;
  padding:0 9px;
  margin-right:10px;
  border:1px solid #333;
  letter-spacing:0.04rem; 
`
const Cation = styled.p`
  margin-top:10px;
  color:gray;
  font-size:0.9em;
`
const Switch = styled.div`
  display:flex;
  align-items:center;
  input {
    margin:0 3px;
  }
`
// 모달 css
const Heading = styled.h1`
  margin: 0;
  font-size: 24px;
  color: #333;
  text-align: center;
`;
const Paragraph = styled.div`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
`;


