import express from 'express';
import type { Request, Response } from 'express';

const app = express();
const PORT = 4000; // Server port: 4000

// 💡 [API 창구 1] 프론트엔드가 'http://localhost:4000/'로 노크하면 반응하는 곳
app.get('/', (req: Request, res: Response) => {
  console.log("Jemand ist in die Address reingekommen! 야 되나?");
  res.send('Movie App Backend Server gut funcktiniert! 🚀');
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