import axios from 'axios';
import React from 'react';
import UserName from './UserName';
import GenderSelect from './GenderSelect';
import DateInput from './DateInput';
import TimeSelector from './TimeSelector';
import { userName, userGender, dateState, birthdayActiveState, lunarState, timeState, userGangi, modalState } from '../../recoil/atom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useMutation } from 'react-query';
import styled from "styled-components";
import Modal from '../modal/Modal';
import { useNavigate } from 'react-router-dom';

const ManseryeokForm = () => {
  const navigate = useNavigate();
  const setModalInfo = useSetRecoilState(modalState);

  // 사용자 입력 상태 관리
  const [name, setName] = useRecoilState(userName);
  const [gender, setGender] = useRecoilState(userGender);
  const [date, setDate] = useRecoilState(dateState);
  const [isLunar, setIsLunar] = useRecoilState(lunarState);
  const [time, setTime] = useRecoilState(timeState);

  // 리셋을 위한 리코일 함수세팅
  const setBirthday = useSetRecoilState(birthdayActiveState);
  const setUser = useSetRecoilState(userGangi);

  // 비동기함수
  const fetchUserGangi = async (userDate, isLunar) => {
    const { year, month, day } = userDate;
    const url = 'http://localhost:3100/calendar';
    const response = await axios.get(url, { params: { year, month, day, isLunar } });
    return response.data;
  };

  // 리액트쿼리 객체 할당
  const mutation = useMutation(
    ({ userDate, isLunar }) => fetchUserGangi(userDate, isLunar),
    {
      onSuccess: (data) => {
        const extracted = {
          생년월 : [data.solYear,Number(data.solMonth),data.solDay],
          age : data.solYear,
          음력년 : data.lunYear,
          year: extractChineseCharacters(data.lunSecha),
          month: extractChineseCharacters(data.lunWolgeon),
          day: extractChineseCharacters(data.lunIljin)
        };
        // 시주 계산
        const hourStem = time !== 'default' ? calculateHourPillar(extracted.day[0], time) : '';
        setUser({ 
          name, 
          gender,  
          time: hourStem, 
          ...extracted 
        });
      },
      onError: (error) => console.error('Error:', error)
    }
  );

  // 만세력 조회 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    if (date.length < 10) {
      setModalInfo({
        isOpen : true,
        content : (
          <>
            <Heading>입력 오류</Heading>
            <Paragraph>
              <p>모든 필드를 정확히 입력해주세요.</p>
            </Paragraph>
          </>
        )
      })
      return;
    }
    const [year, month, day] = date.split('/');
    mutation.mutate({ userDate: { year, month, day }, isLunar });
    navigate('/result'); 
  };

  // 리셋함수
  const handleReset = () => {
    setDate('');
    setName('');
    setIsLunar(false);
    setGender('');
    setBirthday(false);
    setUser({});
    setTime('default');
  };

  // 한자추출 함수
  function extractChineseCharacters(text) {
    const regex = /[\u4E00-\u9FFF\u3400-\u4DBF\u20000-\u2A6DF]/g;
    return text.match(regex)?.join('') || '';
  }

  // 시주 계산 알고리즘
  function calculateHourPillar(dayStem, hourBranch) {
    const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    const branchIndex = earthlyBranches.indexOf(hourBranch);
    const stemIndex = (heavenlyStems.indexOf(dayStem) * 2 + branchIndex) % 10;
    return heavenlyStems[stemIndex] + hourBranch;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Fieldset>
        <UserName/>
      </Fieldset>
      <Fieldset>
        <GenderSelect/>
      </Fieldset>
      <Fieldset>
        <DateInput></DateInput>
      </Fieldset>
      <Fieldset>
        <TimeSelector/>
      </Fieldset>
      <Fieldset>
        <Button type="submit">만세력조회</Button>
        <Button type="button" onClick={handleReset}>초기화 (Reset)</Button>
      </Fieldset>
      <Modal/>
    </Form>
  );
};
export default ManseryeokForm;


const Form = styled.form`
  display:flex;
  flex-direction:column;
  width:600px;
  padding:30px;
  margin:0 auto;
  input::placeholder{
    color: gray; 
    opacity: 0.8;       
    font-style: italic;
    letter-spacing:0.04rem; 
  }
`
const Fieldset = styled.fieldset`
  margin-bottom:25px;
  h3 {
    margin-bottom:12px;
    letter-spacing:0.05rem;
  }
  button:first-child{
    background-color:#0cbb57;
    color:#fff;
    margin-bottom:10px;
  }
  button:last-child{
    background-color:#ffd36e;
  }
`
const Button = styled.button`
  width:100%;
  padding:15px 0;
  font-size:18px;
  border-radius:8px;
  cursor:pointer;
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

