import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 4000; // Server port: 4000
const TMDB_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDAxYjQzNzQ3MjJmNjJkOWEzNDYyZTAxNmZiNjEwNyIsIm5iZiI6MTc3OTIyNjkyOC43OTgsInN1YiI6IjZhMGNkOTMwYTY1ODMwOTVlZTA2OWI1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uY-Nij6Itq0E3s1DMJ76XY-p38TcqSfJ5aqdZZKhbN8';

app.use(cors());

// 💡 [API 창구 1] 프론트엔드가 'http://localhost:4000/'로 노크하면 반응하는 곳
app.get('/', async (req: Request, res: Response) => {
  console.log("Jemand ist in die Address reingekommen! Nodemon Überwachung!");

  // Get the trending movies on TMDB. (Wochendlich)
  try {
    // A. axios 배달원에게 TMDB 본사 주소로 가서 이번 주 트렌드 영화 가져오라고 명령!
    const response = await axios.get('https://api.themoviedb.org/3/trending/movie/week', { // day oder week Quary 수정가능
      headers: {
        accept: 'application/json',
        Authorization: TMDB_TOKEN // 스마트 카드키 가방에 넣어서 보냄
      },
      params: {
        language: 'de-DE' // auf deutsch
      }
    });

    // B. TMDB가 보내준 수많은 영화 목록(results) 중에서 상위 10개만 싹둑 자릅니다.
    const top10Movies = response.data.results.slice(0, 10);

    // C. 예쁘게 가공된 진짜 데이터 10개를 프론트엔드(리액트)로 당당하게 던져줍니다!
    return res.json({
      success: true,
      data: top10Movies
    });

  } catch (error: any) {
    console.error('⚠️ TMDB 데이터 가져오기 실패:', error.message);
    return res.status(500).json({
      success: false,
      message: 'TMDB 서버 통신 중 에러가 발생했습니다.'
    });
  }

});

// 💡 [API 창구 2] 나중에 진짜 10개 영화 데이터를 던져줄 가상의 창구
app.get('/api/welcome', (req: Request, res: Response) => {
  res.json({
    message: "Hallo! Willkommen! 🇩🇪"
  });
});

// 서버 엔진 가동!
app.listen(PORT, () => {
  console.log(`📡 Backend Server an! Addresse: http://localhost:${PORT}`);
});