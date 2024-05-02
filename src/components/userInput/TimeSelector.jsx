import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { timeState } from '../../recoil/atom';
import { isDateEnteredSelector } from '../../recoil/selector';
import styled from "styled-components";

const TimeSelector = () => {
  const [isTimeUnknown, setIsTimeUnknown] = useState(false);
  const [selectedTime, setSelectedTime] = useRecoilState(timeState);
  const isDateEntered = useRecoilValue(isDateEnteredSelector);

  useEffect(() => {
    if (isTimeUnknown) {
      setSelectedTime('default');  // '모름' 체크시 초기값으로 리셋
    }
  }, [isTimeUnknown, setSelectedTime]);  // 의존성 배열에 isTimeUnknown과 setSelectedTime 추가

  // 간지 시간대를 나타내는 배열
  const times = [
    { value: "子", label: "23:30 ~ 01:30 자시(子시)" },
    { value: "丑", label: "01:30 ~ 03:30 축시(丑시)" },
    { value: "寅", label: "03:30 ~ 05:30 인시(寅시)" },
    { value: "卯", label: "05:30 ~ 07:30 묘시(卯시)" },
    { value: "辰", label: "07:30 ~ 09:30 진시(辰시)" },
    { value: "巳", label: "09:30 ~ 11:30 사시(巳시)" },
    { value: "午", label: "11:30 ~ 13:30 오시(午시)" },
    { value: "未", label: "13:30 ~ 15:30 미시(未시)" },
    { value: "申", label: "15:30 ~ 17:30 신시(申시)" },
    { value: "酉", label: "17:30 ~ 19:30 유시(酉시)" },
    { value: "戌", label: "19:30 ~ 21:30 술시(戌시)" },
    { value: "亥", label: "21:30 ~ 23:30 해시(亥시)" }
  ];
  const handleChange = (event) => {
    if (!isDateEntered) {
      alert('생년월일을 모두 입력해주세요.');
      document.getElementById("date").focus();
      return;
    }
    setSelectedTime(event.target.value);
  };

  const isDisabled = !isDateEntered || isTimeUnknown;

  return (
    <>
      <Label htmlFor="selectedTime">시간</Label>
      <Flexbox>
      <Select
        id="selectedTime"
        value={selectedTime}
        onChange={handleChange}
        disabled={isDisabled}
      >
        <option value="default">태어난 시간</option>
        {times.map(time => (
          <option key={time.value} value={time.value}>{time.label}</option>
        ))}
      </Select>
      <Switch>
        <input
          id="noTime"
          type="checkbox"
          checked={isTimeUnknown}
          onChange={e => setIsTimeUnknown(e.target.checked)}
          disabled={!isDateEntered}
        />
        <label htmlFor="noTime">모름</label>
      </Switch>
    </Flexbox>
    </>
  );
}

export default TimeSelector;

const Label = styled.label`
  display:inline-block;
  margin-bottom:12px;
  letter-spacing:0.05rem;
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
const Select = styled.select`
  width: 80%;
  height: 40px;
  padding:0 9px;
  border-radius: 8px;
  margin-right: 24px;
  border: 1px solid #333;
  background-color: ${props => props.disabled ? '#f4f4f4' : 'white'};
`;

const Switch = styled.div`
  display: flex;
  align-items: center;
  label {
    margin-left: 4px;
  }
`;
