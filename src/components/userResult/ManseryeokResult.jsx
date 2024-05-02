import { useRecoilValue } from 'recoil';
import { userGangi, skyState, groundState} from '../../recoil/atom';
import { findColor } from './utils'; 
import styled from "styled-components";

const ManseryeokResult = () => {
  
  // 유저의 간지
  const user = useRecoilValue(userGangi);
  const skys = useRecoilValue(skyState);
  const grounds = useRecoilValue(groundState);
  const colorPillar = [...skys,...grounds];

  // 비동기 작업 완료되지않았을때 로딩화면 보여주기
  if (!user || !user.name) { // user.name은 사용자가 정의한 필수 필드 중 하나로 가정
    return (
      <UserGangi>
        <div>Loading...</div>
      </UserGangi>
    )
  }

  const { name, gender, time, day, month, year } = user;
  const fiveEle = [...time, ...day, ...month, ...year];


  const five = {
    '목' : 0,
    '화' : 0,
    '토' : 0,
    '금' : 0,
    '수' : 0
  };
  const findFiveElements = ( arr, Pillar ) =>{
    arr.map(ele=>(
      five[Pillar.find(el => el.code === ele).symbol] = five[Pillar.find(el => el.code === ele).symbol]+1
    ))
  }
  findFiveElements(fiveEle, colorPillar)
  
  return (
    <UserGangi>
      <UserInfo>
        <h1>만세력 결과</h1>
        <p>이름: {name}</p>
        <p>성별: {gender}</p>
      </UserInfo>
      <BoxContainer>
        <PillarsContainer>
          <Pillar>
            <PillarHeading>
              <h3>시주</h3>
            </PillarHeading>
            <SkyTenStar> 
              <span>십성</span>
            </SkyTenStar>
            <Sky bgColor={findColor(time[0], colorPillar)}>
              <span>{time[0]}</span>
            </Sky>
            <Ground bgColor={findColor(time[1], colorPillar)}>
              <span>{time[1]}</span>
            </Ground>
            <GroundTenStar>
              <span>십성</span>
            </GroundTenStar>
            <Season>
              <span>계절</span>
            </Season>
            <SeasonLucky>
              <span>계절에따른 운성</span>
            </SeasonLucky>
            <TwelveKarma>
              <span>십이신살</span>
            </TwelveKarma>
          </Pillar>
          <Pillar>
            <PillarHeading>
              <h3>일주</h3>
            </PillarHeading>
            <SkyTenStar> 
              <span>십성</span>
            </SkyTenStar>
            <Sky bgColor={findColor(day[0], colorPillar)}>
              <span>{day[0]}</span>
            </Sky>
            <Ground bgColor={findColor(day[1], colorPillar)}>
              <span>{day[1]}</span>
            </Ground>
            <GroundTenStar>
              <span>십성</span>
            </GroundTenStar>
            <Season>
              <span>계절</span>
            </Season>
            <SeasonLucky>
              <span>계절에따른 운성</span>
            </SeasonLucky>
            <TwelveKarma>
              <span>십이신살</span>
            </TwelveKarma>
          </Pillar>
          <Pillar>
            <PillarHeading>
              <h3>월주</h3>
            </PillarHeading>
            <SkyTenStar> 
              <span>십성</span>
            </SkyTenStar>
            <Sky bgColor={findColor(month[0], colorPillar)}>
              <span>{month[0]}</span>
            </Sky>
            <Ground bgColor={findColor(month[1], colorPillar)}>
              <span>{month[1]}</span>
            </Ground>
            <GroundTenStar>
              <span>십성</span>
            </GroundTenStar>
            <Season>
              <span>계절</span>
            </Season>
            <SeasonLucky>
              <span>계절에따른 운성</span>
            </SeasonLucky>
            <TwelveKarma>
              <span>십이신살</span>
            </TwelveKarma>
          </Pillar>
          <Pillar>
            <PillarHeading>
              <h3>년주</h3>
            </PillarHeading>
            <SkyTenStar> 
              <span>십성</span>
            </SkyTenStar>
            <Sky bgColor={findColor(year[0], colorPillar)}>
              <span>{year[0]}</span>
            </Sky>
            <Ground bgColor={findColor(year[1], colorPillar)}>
              <span>{year[1]}</span>
            </Ground>
            <GroundTenStar>
              <span>십성</span>
            </GroundTenStar>
            <Season>
              <span>계절</span>
            </Season>
            <SeasonLucky>
              <span>계절에따른 운성</span>
            </SeasonLucky>
            <TwelveKarma>
              <span>십이신살</span>
            </TwelveKarma>
          </Pillar>
        </PillarsContainer>
        <FiveElement>
          <div>
            <span>나무:</span>
            <span>{five.목}개</span>
          </div>
          <div>
            <span>불:</span>
            <span>{five.화}개</span>
          </div>
          <div>
            <span>땅:</span>
            <span>{five.토}개</span>
          </div>
          <div>
            <span>쇠:</span>
            <span>{five.금}개</span>
          </div>
          <div>
            <span>물:</span>
            <span>{five.수}개</span>
          </div>
        </FiveElement>
      </BoxContainer>
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
  margin: 14px 0px;
`
const PillarsContainer = styled.div`
  display: flex;
  width: 100%;
  div:last-child {
    border-right:none;
  }
`;
const Pillar = styled.div`
  width:25%;
  border-right:1px solid #333;
  div {
    text-align:center;
    border-bottom:1px solid #333;
  }
  div:last-child {
    border:none;
  }
`
const FiveElement = styled.div`
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
    span {
      color:white;
    }
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
const PillarHeading = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  padding:10px 0;
`
const SkyTenStar = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  padding:4px 0;
`
const Sky = styled.div.withConfig({
  shouldForwardProp: (prop) => !['bgColor'].includes(prop)
})`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 46px;
  background-color: ${props => props.bgColor};
  color:white;
`;
const Ground = styled.div.withConfig({
  shouldForwardProp: (prop) => !['bgColor'].includes(prop)
})`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 46px;
  background-color: ${props => props.bgColor};
  color:white;
`;
const GroundTenStar = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  padding:4px 0;
`
const Season = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  padding:6px 0;
`
const SeasonLucky = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  padding:8px 0;
`
const TwelveKarma = styled.div`
  display:flex;
  padding:10px 0;
  justify-content:center;
  align-items:center;
`