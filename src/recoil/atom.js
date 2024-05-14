import { atom } from "recoil";
import { skyData, groundData, tenSkyRelationShip, tenGroundRelationShip, 지장간관계, 지장간계절, 일간지지운성, 삼합오행살, 공망표, 귀인표, 동물표, 절기표, 월건법지표 } from './Data'

// 유저 이름
export const userName = atom({
  key: 'userName',
  default: '',
})

// 유저 성별
export const userGender = atom({
  key: 'userGender',
  default: '',
})

// 생년월일 인풋
export const dateState = atom({
  key: 'dateState',
  default: '',
})

// 생년월일 액티브용 상태
export const birthdayActiveState = atom({
  key: 'birthdayActiveState',
  default: true,
})

// 음력 체크상태
export const lunarState = atom({
  key: 'lunarState',
  default: false,
})

// 시간 상태
export const timeState = atom({
  key: 'timeState',
  default: 'default',
})

// 만세력 조회후 객체
export const userGangi = atom({
  key: 'userGangi',
  default: {},
})

// 모달 상태
export const modalState = atom({
  key: 'modalState',
  default: {
    isOpen : false,
    content : null,
  }
})

// 천간 데이터
export const skyState = atom({
  key: 'skyState',
  default: skyData,
});

// 지간 데이터
export const groundState = atom({
  key: 'groundState',
  default: groundData,
});

// 천간 십성 데이터
export const skyTenState = atom({
  key: 'skyTenState',
  default: tenSkyRelationShip,
});

// 지간 십성 데이터
export const groundTenState = atom({
  key: 'groundTenState',
  default: tenGroundRelationShip,
});

// 지지 지장간 데이터
export const 지장간상태 = atom({
  key: '지장간상태',
  default: 지장간관계,
});

// 지장간 계절 데이터
export const 지장간계절상태 = atom({
  key: '지장간계절상태',
  default: 지장간계절,
})

// 일간지지운성 데이터
export const 일간지지운성상태 = atom({
  key: '일간지지운성상태',
  default: 일간지지운성,
})

// 일간지지운성 데이터
export const 삼합오행살상태 = atom({
  key: '삼합오행살상태',
  default: 삼합오행살,
})

// 공망 데이터
export const 공망상태 = atom({
  key: '공망상태',
  default: 공망표,
})

// 천을귀인표 데이터 
export const 귀인표상태 = atom({
  key: '귀인표상태',
  default: 귀인표,
})

// 동물표 데이터
export const 동물표상태 = atom({
  key: '동물표상태',
  default: 동물표,
})

// 절기표 데이터
export const 절기표상태 = atom({
  key: '절기표상태',
  default: 절기표,
})

// 절기표 데이터
export const 월건표상태 = atom({
  key: '월건표상태',
  default: 월건법지표,
})