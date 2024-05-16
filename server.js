const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// 포트 설정
const port = process.env.PORT || 3100;

// 미들웨어 설정
app.use(cors());
app.use(express.json())

// 서버 시작
app.listen(port, () => {
  console.log(`${port}번 포트에서 서버가 실행되었습니다.`);
});


// Route 음력/양력 간지조회 
app.get('/calendar', async(req, res) => {
  const { year, month, day, isLunar } = req.query; // userInput쿼리 파라미터 추출
  const basicURL = 'http://apis.data.go.kr/B090041/openapi/service/LrsrCldInfoService';
  const key = 'RXB6JuTDS1fjXi31LNmhPh+xX5ThuxlEO6LudRUJ8fuS964UBc6C+0i0C8pcp2mng2SAgUlG9f42HAyxaeK0qA=='
  let url;
  let params;
  if(isLunar === 'true'){
    url = `${basicURL}/getSolCalInfo`;
    params = {
      serviceKey: key,
      lunYear: year,
      lunMonth: month,
      lunDay: day
    }
  }else{
    url = `${basicURL}/getLunCalInfo`;
    params = {
      serviceKey: key,
      solYear: year,
      solMonth: month,
      solDay: day
    }
  }
  try {
    const { data } = await axios.get(url, {
      params: params
    });
    const dataList = data.response.body.items.item;
    // 가져온 데이터를 클라이언트에게 전송
    res.json(dataList);
  } catch (error) {
    console.error('API call error:', error);
    res.status(500).send('서버에러입니다.')
  }
});

