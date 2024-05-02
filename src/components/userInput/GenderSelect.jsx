import React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userName, userGender } from '../../recoil/atom';
import styled from "styled-components";

const GenderSelect = () => {
  const name = useRecoilValue(userName);
  const [gender, setGender] = useRecoilState(userGender);

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const isDisabled = !name; // 이름이 없으면 true (비활성화)

  return (
    <>
      <h3>성별 선택</h3>
      <Container>
        <RadioGroup $gender={gender} value="남성" disabled={isDisabled}>
          <Label htmlFor="male" checked={gender === '남성'}>
            남성(Male)
            <Checkbox
              type="radio"
              id="male"
              name="gender"
              value="남성"
              checked={gender === '남성'}
              onChange={handleChange}
              disabled={isDisabled}  // 이름이 없으면 성별 선택 비활성화
            />
          </Label>
        </RadioGroup>
        <RadioGroup $gender={gender} value="여성" disabled={isDisabled}>
          <Label htmlFor="female" checked={gender === '여성'}>
            여성(Female)
            <Checkbox
              type="radio"
              id="female"
              name="gender"
              value="여성"
              checked={gender === '여성'}
              onChange={handleChange}
              disabled={isDisabled}  // 이름이 없으면 성별 선택 비활성화
            />
          </Label>
        </RadioGroup>
      </Container>
    </>
  );
}

export default GenderSelect;

const Container = styled.div`
  display: flex;
  justify-content:space-between;
  align-items: center;
  border-radius: 8px;
`;

const RadioGroup = styled.div`
  position: relative;
  display: flex;
  width: 49.7%;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${props => props.disabled ? '#ccc' : (props.$gender === props.value ? (props.value === '남성' ? '#3182f6' : 'tomato') : '#ccc')};
`;

const Label = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 15px;
  color: ${props => props.checked ? '#fff' : '#333'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.25s linear;
`;

const Checkbox = styled.input`
  opacity: 0;
  position: absolute;
  cursor: pointer;
  width: 1em;
  height: 1em;
  margin-left: 10px;
  &:focus + ${Label} {
    box-shadow: 0 0 0 3px rgba(21, 156, 228, 0.4);
  }
`;
