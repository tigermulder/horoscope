import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userName, userGender, birthdayActiveState } from '../../recoil/atom';  // Import 구문을 조정하여 atom의 충돌을 방지합니다.
import styled from "styled-components";

const UserName = () => {
  const [user, setUserName] = useRecoilState(userName);
  const setGender = useSetRecoilState(userGender);
  const setBirthday = useSetRecoilState(birthdayActiveState);
  const nameOnChange = (event) => {
    let { value } = event.target;
    value = value.replace(/[^a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣\s]/g, '');
    if (value.length <= 14) {
      setUserName(value);
      if(value.length > 0){
        setGender('남성')
        setBirthday(false)
      }
      if(value.length === 0){
        setGender('')
        setBirthday(true)
      }
    }
  };
  
  return (
    <>
      <Label htmlFor="userNameInput">이름</Label>
      <NameInput
        id="userNameInput"
        type="text"
        value={user}
        onChange={nameOnChange}
        placeholder="최대 14글자 이내로입력하세요."
      />
    </>
  );
};

export default UserName;

const NameInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  padding: 0 9px;
  border: 1px solid #333;
  letter-spacing: 0.04rem;
`
const Label = styled.label`
  display:block;
  margin-bottom:12px;
  letter-spacing:0.05rem;
`
