import { atom } from "recoil";
import { skyData, groundData } from './Data'

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
  key: 'skyState', // 고유한 key
  default: skyData, // 기본값으로 Data 클래스의 천간 데이터 사용
});
// 지간 데이터
export const groundState = atom({
  key: 'groundState',
  default: groundData, // 기본값으로 Data 클래스의 지지 데이터 사용
});