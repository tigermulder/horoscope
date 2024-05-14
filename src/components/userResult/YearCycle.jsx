import { useRecoilValue } from 'recoil';
import { userGangi, skyState, groundState, skyTenState, groundTenState, 일간지지운성상태, 삼합오행살상태 } from '../../recoil/atom';
import { findColor, getStemsAndBranches } from './utils';
import styled from 'styled-components';

const YearCyclesDisplay = ({year}) => {

  const skys = useRecoilValue(skyState);
  const grounds = useRecoilValue(groundState);
  const colorPillar = [...skys,...grounds];
  const 천간십성 = useRecoilValue(skyTenState);
  const 지지십성 = useRecoilValue(groundTenState);
  const 일간지지운성 = useRecoilValue(일간지지운성상태);
  const 십이신살 = useRecoilValue(삼합오행살상태);
  const user = useRecoilValue(userGangi);

  const nowYear = new Date().getFullYear();
  const { day } = user;

  // 세운 시작 연도 배열 생성
  const cycleStartYears = Array.from({length: 11}, (_, i) => {
    return nowYear + i;
  });

  const YearCycle = cycleStartYears.map((year, index) => {
    return { 
      years: nowYear + index, 
      stemsAndBranches: getStemsAndBranches(year) 
    };
  })

  return (
    <YearCycles>
      <h2>세운</h2>
      <ul>
        <ScrollContainer>
          {[...YearCycle].reverse().map((cycle, idx) => (
            <li key={idx}>
              <h3>{cycle.years}년</h3>
              <Pillar>
                <div><span>{천간십성[day[0]][cycle.stemsAndBranches[0]]}</span></div>
                <Sky bgColor={findColor(cycle.stemsAndBranches[0], colorPillar)}>
                  {cycle.stemsAndBranches[0]}
                </Sky>
                <Ground bgColor={findColor(cycle.stemsAndBranches[1], colorPillar)}>
                  {cycle.stemsAndBranches[1]}
                </Ground>
                <div><span>{지지십성[day[0]][cycle.stemsAndBranches[1]]}</span></div>
                <div><span>{일간지지운성[day[0]][cycle.stemsAndBranches[1]]}</span></div>
                <TwelveKarma>
                  <p>{십이신살[year[1]][cycle.stemsAndBranches[1]]}</p>
                  <p>{십이신살[day[1]][cycle.stemsAndBranches[1]]}</p>
                </TwelveKarma>
              </Pillar>
            </li>
          ))}
        </ScrollContainer>
      </ul>
    </YearCycles>
  );
};

export default YearCyclesDisplay;

const YearCycles = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: space-around;
  background-color: #f0f0f0;
  padding: 20px;
  font-size: 16px;
  h2 {
    margin-bottom: 20px;
    font-size:18px;
  }
  ul {
    width:100%;
    min-width:500px;
    display: flex;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;
    li {
      width: 45px;
      display: flex;
      margin-right: 6px;
      flex-direction:column;
      align-items: center;
      h3 {
        margin-bottom:5px;
        font-size:0.8em;
      }
    }
    li:last-child {
      margin-right:0;
    }
  }
`
const ScrollContainer = styled.div`
  width: 600px;
  display: flex;
  align-items: center;
`
const Pillar = styled.div`
  width:100%;
  text-align:center;
  border:1px solid #000;
  div:not(:last-child) {
    border-bottom:1px solid #000;
  }
  span {
    font-size:0.8em;
  }
`
const Sky = styled.div.withConfig({
  shouldForwardProp: (prop) => !['bgColor'].includes(prop)
})`
  line-height:40px;
  background-color: ${props => props.bgColor};
  font-weight: bold;
`;
const Ground = styled.div.withConfig({
  shouldForwardProp: (prop) => !['bgColor'].includes(prop)
})`
  line-height:40px;
  background-color: ${props => props.bgColor};
  font-weight: bold;
`;
const TwelveKarma = styled.div`
  padding: 6px 0;
  font-size: 0.72em;
  p:not(:last-child) {
    margin-bottom:5px;
    padding: 0;
  }
`