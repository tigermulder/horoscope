// 사주원국 해당글자 컬러 찾는 함수
export const findColor = (code, colorPillar) => {
  const item = colorPillar.find(ele => ele.code === code);
  return item ? item.color : 'transparent';
};

// 오행 카운트 함수
export const findFiveElements = (arr, Pillar) => {
  const five = {
    '목': 0, '화': 0, '토': 0, '금': 0, '수': 0
  };
  arr.forEach(ele => {
    const element = Pillar.find(el => el.code === ele);
    if (element) {
      five[element.symbol]++;
    }
  });
  return five;
};


// 공망찾는 함수
export const find공망 = (지지, 공망표) => {
  for(let i = 0; i < 공망표.length; i++){
    if(지지 === 공망표[i]){
      return '[日기준]공망'
    }
  }
  return '-'
}

// 귀인찾는 함수
export const find귀인 = (지지, 귀인표) => {
  let arr = []
  for (const key in 귀인표) {
    if (귀인표[key].includes(지지)) {
      arr.push(key) // 천간을 반환
    }
  }
  return arr;
};

// 일간 코드를 입력받아 해당하는 sign을 반환하는 함수
export const findDaySign = (dayCode, skyData) => {
  // skyData 배열에서 해당 코드를 찾기
  const day = skyData.find(element => element.code === dayCode);
  // 찾은 요소에서 sign 값을 반환
  if (day) {
    return day.sign;
  } 
};

// 다음 절기찾는 함수
export const findSolarTerms = (userDate, solarTerms) => {
  const userDateStr = `${userDate[0]}-${String(userDate[1]).padStart(2, '0')}-${String(userDate[2]).padStart(2, '0')}`;
  const terms = Object.entries(solarTerms).map(([key, value]) => {
    const [month, day] = value.split('-').map(Number); // String을 Number로 변환
    return {
      name: key,
      date: `${userDate[0]}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    };
  }).sort((a, b) => a.date.localeCompare(b.date)); // 문자열 날짜로 비교하기 위해 수정

  // 다음 절기 찾기
  const nextTermIndex = terms.findIndex(term => term.date >= userDateStr);
  const nextTerm = nextTermIndex !== -1 ? terms[nextTermIndex] : {
    ...terms[0],
    date: `${userDate[0] + 1}-${terms[0].date.split('-')[1]}-${terms[0].date.split('-')[2]}`
  };

  // 이전 절기 찾기
  const previousTermIndex = terms.reduce((lastIndex, term, index) => term.date < userDateStr ? index : lastIndex, -1);
  const previousTerm = previousTermIndex > -1 ? terms[previousTermIndex] : {
    name: terms[terms.length - 1].name,
    date: `${userDate[0] - 1}-${terms[terms.length - 1].date.split('-')[1]}-${terms[terms.length - 1].date.split('-')[2]}`
  };
  const hash = {
    nextTerm: nextTerm,
    previousTerm: previousTerm
  }
  return hash;
};



export const calculateMajorCycle = (birthDate, nextTerm, prevTerm, gender, daySign) => {
  const birthDateObj = new Date(birthDate.date);
  const nextTermDateObj = new Date(nextTerm.date);
  const prevTermDateObj = new Date(prevTerm.date);

  // 대운 방향 결정
  const direction = (gender === '남성' && daySign === '양') || (gender === '여성' && daySign === '음') ? '순행' : '역행';
  // 대운 기준시각 계산
  const dayCount = direction === '순행'
  ? Math.round((nextTermDateObj - birthDateObj) / (1000 * 3600 * 24))
  : Math.round((birthDateObj - prevTermDateObj) / (1000 * 3600 * 24));
  // 일수를 3으로 나누어 대운 수 계산
  let years = Math.floor(dayCount / 3);
  if (dayCount % 3 === 2) {
    years += 1;
  }
  return { years, direction };
};


// 역학년도 함수
export const getStemsAndBranches = (year) => {
  const sky10 = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  const ground12 = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

  // 서기 4년을 기준으로 갑자년 (甲子年)으로 시작
  let skyIndex = (year - 4) % 10;
  let groundIndex = (year - 4) % 12;

  // 음수 인덱스 보정
  if (skyIndex < 0) {
      skyIndex += 10;
  }
  if (groundIndex < 0) {
      groundIndex += 12;
  }

  // 천간과 지지를 결합하여 반환
  return sky10[skyIndex] + ground12[groundIndex];
}
