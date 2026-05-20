import { useEffect, useState } from 'react';

interface Movie {
  id: number;
  rank: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
}

// 💡 1. Mock-up 10 Filme Daten hardcoding

const dummyTrendingMovies = [
  { id: 1, rank: 1, title: 'Toystory', posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80' },
  { id: 2, rank: 2, title: 'Inception', posterUrl: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=400&q=80' },
  { id: 3, rank: 3, title: 'Zootopia 2', posterUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=400&q=80' },
  { id: 4, rank: 4, title: 'Fight Club', posterUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&q=80' },
  { id: 5, rank: 5, title: 'Forrest Gump', posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80' },
  { id: 6, rank: 6, title: 'Titanic', posterUrl: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=400&q=80' },
  { id: 7, rank: 7, title: 'Pulp Fiction', posterUrl: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&q=80' },
  { id: 8, rank: 8, title: 'The Matrix', posterUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80' },
  { id: 9, rank: 9, title: 'Gladiator', posterUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&q=80' },
  { id: 10, rank: 10, title: 'Avatar', posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80' },
];

export default function TrendingSection() {
  // 2. 백엔드에서 받아온 영화 10개를 담아둘 상자(State)
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 3. 화면이 켜지자마자 4000번 백엔드로 퀵 배달(요청) 보내기!
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // 🚀 핵심: 우리가 만든 백엔드 주소로 빨대를 꽂습니다.
        const response = await fetch('http://localhost:4000/');
        const result = await response.json();

        if (result.success) {
          // 백엔드의 top10Movies 데이터를 리액트 상자에 쏙!
          setMovies(result.data);
        }
      } catch (error) {
        console.error('백엔드에서 데이터를 떼어오는 데 실패했습니다 ㅠ_ㅠ:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div className="p-10 text-center text-zinc-400">Filme werden geladen... 🎬</div>;
  }

  return (
    <section className="w-full mt-6 px-4" style={{ boxSizing: 'border-box' }}>
      
      {/* 2. Titel (Today's Trending) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0, color: '#ffffff' }}>
          Today's Trending
        </h2>
        <span style={{ fontSize: '0.875rem', color: '#71717a', cursor: 'pointer' }}>
          See All &gt;
        </span>
      </div>

      {/* 3. ↔️ Horizental Scroll-layout box */}
      <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', WebkitOverflowScrolling: 'touch' }}>
        
        {/* 4. 10 DummyDaten repeated anzeigen (map) */}
        {movies.map((movie, index) => (
          <div key={movie.id} style={{ flex: '0 0 auto', width: '120px', position: 'relative' }}>
            
            {/* 🔢 Ranking Nummer */}
            <span style={{ position: 'absolute', top: '-15px', left: '-10px', fontSize: '4rem', fontWeight: 900, color: '#71717a', zIndex: 2, userSelect: 'none' }}>
              {index + 1}
            </span>

            {/* 🎬 Poster Image */}
            <div style={{ width: '100%', height: '170px', borderRadius: '0.75rem', overflow: 'hidden', backgroundColor: '#1c1c1e', position: 'relative', zIndex: 1, border: '1px solid #2c2c2e', marginTop: '1.5rem' }}>
              <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt={movie.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* 📝 Filme Namen */}
            <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#a1a1aa', textAlign: 'center', margin: '0.5rem 0 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {movie.title}
            </p>

          </div>
        ))}
      </div>
    </section>
  );
}