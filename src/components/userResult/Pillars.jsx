import { useRecoilValue } from 'recoil';
import { skyState, groundState, skyTenState, groundTenState, 지장간상태, 지장간계절상태, 일간지지운성상태, 삼합오행살상태, 공망상태, 귀인표상태 } from '../../recoil/atom';
import { findColor, find공망, find귀인 } from './utils';
import styled from 'styled-components';


const Pillars = ({time, day, month, year}) => {

  const skys = useRecoilValue(skyState);
  const grounds = useRecoilValue(groundState);
  const colorPillar = [...skys,...grounds];
  const 천간십성 = useRecoilValue(skyTenState);
  const 지지십성 = useRecoilValue(groundTenState);
  const 지장간 = useRecoilValue(지장간상태);
  const 지장간계절 = useRecoilValue(지장간계절상태);
  const 일간지지운성 = useRecoilValue(일간지지운성상태);
  const 십이신살 = useRecoilValue(삼합오행살상태);
  const 공망 = useRecoilValue(공망상태);
  const 귀인표 = useRecoilValue(귀인표상태);
  const my공망 = 공망[day].split('');
  
  const 시주귀인정보 = find귀인(time[1], 귀인표[day[0]]);
  const 일주귀인정보 = find귀인(day[1], 귀인표[day[0]]);
  const 월주귀인정보 = find귀인(month[1], 귀인표[day[0]]);
  const 년주귀인정보 = find귀인(year[1], 귀인표[day[0]]);
  const max귀인수 = Math.max(
    시주귀인정보.length, 
    일주귀인정보.length, 
    월주귀인정보.length, 
    년주귀인정보.length
  );

  const render귀인정보 = (귀인정보, max귀인수) => {
    const filledItems = 귀인정보.map((귀인, index) => (
      <p key={index}>{귀인}</p>
    ));
    const emptyItemsCount = max귀인수 - 귀인정보.length;
    const emptyItems = [...Array(emptyItemsCount)].map((_, index) => (
      <p key={`empty-${index}`} style={{ visibility: "hidden" }}>None</p> // 빈 태그는 보이지 않게
    ));
    return [...filledItems, ...emptyItems];
  };

  return (
    <PillarsContainer>
      <Pillar>
        <PillarHeading>
          <h3>시주</h3>
        </PillarHeading>
        <SkyTenStar> 
          <span>{천간십성[day[0]][time[0]]}</span>
        </SkyTenStar>
        <Sky bgColor={findColor(time[0], colorPillar)}>
          <span>{time[0]}</span>
        </Sky>
        <Ground bgColor={findColor(time[1], colorPillar)}>
          <span>{time[1]}</span>
        </Ground>
        <GroundTenStar>
          <span>{지지십성[day[0]][time[1]]}</span>
        </GroundTenStar>
        <Season>
          <span>({지장간계절[time[1]]}){지장간[time[1]]}</span>
        </Season>
        <SeasonLucky>
          <span>{일간지지운성[day[0]][time[1]]}</span>
        </SeasonLucky>
        <TwelveKarma>
          <h3>12신살</h3>
          <div>
            <p>년기준: {십이신살[year[1]][time[1]]}</p>
            <p>일기준: {십이신살[day[1]][time[1]]}</p>
          </div>
        </TwelveKarma>
        <EtcKarma>
          <h3>기타신살</h3>
          <div>
            {render귀인정보(시주귀인정보, max귀인수)}
          </div>
        </EtcKarma>
        <Gilshin><span>{find공망(time[1],my공망)}</span></Gilshin>
      </Pillar>
      <Pillar>
        <PillarHeading>
          <h3>일주</h3>
        </PillarHeading>
        <SkyTenStar> 
          <span>일간(나)</span>
        </SkyTenStar>
        <Sky bgColor={findColor(day[0], colorPillar)}>
          <span>{day[0]}</span>
        </Sky>
        <Ground bgColor={findColor(day[1], colorPillar)}>
          <span>{day[1]}</span>
        </Ground>
        <GroundTenStar>
          <span>{지지십성[day[0]][day[1]]}</span>
        </GroundTenStar>
        <Season>
          <span>({지장간계절[day[1]]}){지장간[day[1]]}</span>
        </Season>
        <SeasonLucky>
          <span>{일간지지운성[day[0]][day[1]]}</span>
        </SeasonLucky>
        <TwelveKarma>
          <h3>12신살</h3>
          <div>
            <p>년기준: {십이신살[year[1]][day[1]]}</p>
            <p>일기준: {십이신살[day[1]][day[1]]}</p>
          </div>
        </TwelveKarma>
        <EtcKarma>
          <h3>기타신살</h3>
          <div>
            {render귀인정보(일주귀인정보, max귀인수)}
          </div>
        </EtcKarma>
        <Gilshin><span>{find공망(day[1], my공망)}</span></Gilshin>
      </Pillar>
      <Pillar>
        <PillarHeading>
          <h3>월주</h3>
        </PillarHeading>
        <SkyTenStar> 
          <span>{천간십성[day[0]][month[0]]}</span>
        </SkyTenStar>
        <Sky bgColor={findColor(month[0], colorPillar)}>
          <span>{month[0]}</span>
        </Sky>
        <Ground bgColor={findColor(month[1], colorPillar)}>
          <span>{month[1]}</span>
        </Ground>
        <GroundTenStar>
          <span>{지지십성[day[0]][month[1]]}</span>
        </GroundTenStar>
        <Season>
          <span>({지장간계절[month[1]]}){지장간[month[1]]}</span>
        </Season>
        <SeasonLucky>
          <span>{일간지지운성[day[0]][month[1]]}</span>
        </SeasonLucky>
        <TwelveKarma>
          <h3>12신살</h3>
          <div>
            <p>년기준: {십이신살[year[1]][month[1]]}</p>
            <p>일기준: {십이신살[day[1]][month[1]]}</p>
          </div>
        </TwelveKarma>
        <EtcKarma>
          <h3>기타신살</h3>
          <div>
            {render귀인정보(월주귀인정보, max귀인수)}
          </div>
        </EtcKarma>
        <Gilshin><span>{find공망(month[1], my공망)}</span></Gilshin>
      </Pillar>
      <Pillar>
        <PillarHeading>
          <h3>년주</h3>
        </PillarHeading>
        <SkyTenStar> 
          <span>{천간십성[day[0]][year[0]]}</span>
        </SkyTenStar>
        <Sky bgColor={findColor(year[0], colorPillar)}>
          <span>{year[0]}</span>
        </Sky>
        <Ground bgColor={findColor(year[1], colorPillar)}>
          <span>{year[1]}</span>
        </Ground>
        <GroundTenStar>
          <span>{지지십성[day[0]][year[1]]}</span>
        </GroundTenStar>
        <Season>
          <span>({지장간계절[year[1]]}){지장간[year[1]]}</span>
        </Season>
        <SeasonLucky>
          <span>{일간지지운성[day[0]][year[1]]}</span>
        </SeasonLucky>
        <TwelveKarma>
          <h3>12신살</h3>
          <div>
            <p>년기준: {십이신살[year[1]][year[1]]}</p>
            <p>일기준: {십이신살[day[1]][year[1]]}</p>
          </div>
        </TwelveKarma>
        <EtcKarma>
          <h3>기타신살</h3>
          <div>
            {render귀인정보(년주귀인정보, max귀인수)}
          </div>
        </EtcKarma>
        <Gilshin><span>{find공망(year[1], my공망)}</span></Gilshin>
      </Pillar>
    </PillarsContainer>
  );
};

export default Pillars;

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
  padding:6px 0;
  font-size: 0.85em;
`
const TwelveKarma = styled.div`
  div {
    padding: 6px 0;
    font-size: 0.85em;
    p:not(:last-child) {
      margin-bottom:5px;
      padding: 0;
    }
  }
  h3 {
    padding:4px 0;
    background:#05606e;
    font-size: 0.7em;
    color:#fff;
  }
`
const EtcKarma = styled.div`
  div {
    padding: 6px 0;
    font-size: 0.85em;
    p:not(:last-child) {
      margin-bottom:5px;
      padding: 0;
    }
  }
  h3 {
    padding:4px 0;
    background:#05606e;
    font-size: 0.7em;
    color:#fff;
  }
`
const Gilshin = styled.div`
  padding:6px 0;
  span {
    font-size:0.8em;
  }
`