import { useRecoilValue } from 'recoil';
import { userGangi, skyState, groundState, 귀인표상태, 동물표상태 } from '../../recoil/atom';
import { findFiveElements } from './utils'; 
import Loading from './Loading';
import Pillars from './Pillars';
import FiveElement from './FiveElement';
import MajorCyclesDisplay from './MajorCycles';
import styled from "styled-components";
import YearCyclesDisplay from './YearCycle';
import MonthCyclesDisplay from './MonthCycle';


const ManseryeokResult = () => {
  
  // 유저의 간지
  const user = useRecoilValue(userGangi);
  const skys = useRecoilValue(skyState);
  const grounds = useRecoilValue(groundState);
  const 천을귀인 = useRecoilValue(귀인표상태);
  const 동물표 = useRecoilValue(동물표상태)
  const colorPillar = [...skys,...grounds];

  // 비동기 작업 완료되지않았을때 로딩화면 보여주기
  if (!user || !user.name) { // user.name은 사용자가 정의한 필수 필드 중 하나로 가정
    return (
      <UserGangi>
        <Loading/>
      </UserGangi>
    )
  }

  const { name, gender, age, time, day, month, year } = user;
  const userAge = new Date().getFullYear() - age;
  const fiveEle = [...time, ...day, ...month, ...year];
  // 오행 갯수 카운트함수
  const fiveElementsCount = findFiveElements(fiveEle, colorPillar);

  return (
    <UserGangi>
      <UserInfo>
        <h1>만세력 결과</h1>
        <p>이름: {name} ({동물표[day]})</p>
        <p>성별: {gender}</p>
        <p>나이: {userAge}세</p>
      </UserInfo>
      <BoxContainer>
        <Pillars 
          time={time || []}
          day={day}
          month={month}
          year={year}
        />
        <Nobleman>
          <p>나에게 천을귀인이되는 글자:{천을귀인[day[0]]['천을귀인']}</p>
        </Nobleman>
        <FiveElement
          wood={fiveElementsCount.목}
          fire={fiveElementsCount.화}
          earth={fiveElementsCount.토}
          metal={fiveElementsCount.금}
          water={fiveElementsCount.수}
        />
      </BoxContainer>
      <MajorCyclesDisplay year={year}></MajorCyclesDisplay>
      <YearCyclesDisplay year={year}></YearCyclesDisplay>
      <MonthCyclesDisplay year={year}></MonthCyclesDisplay>
    </UserGangi>
  );
};

export default ManseryeokResult;

const UserGangi = styled.div`
  width: 600px;
  padding: 30px;
  margin: 0 auto;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction:column;
  h1 {
    font-size: 24px;
    margin-bottom:16px;
  }
  p {
    margin-bottom:8px;
  }
`
const BoxContainer = styled.div`
  border: 1px solid #333;
  margin: 14px 0px 0;
`
const Nobleman = styled.div`
  padding: 5px 0;
  border-top: 1px solid #333;
  text-align:center;
  p {
    font-size:0.8em;
  }
`