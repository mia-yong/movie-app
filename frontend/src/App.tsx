import Header from './components/Header';
import TrendingSection from './components/TrendingSection';

export default function App() {
  const handleSearch = (keyword: string) => {
    alert(`"${keyword}" keyword requested!`);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white block">
      
      {/* Searchbar einfügen */}
      <Header onSearch={handleSearch} />

      {/* Trending 10 Section */}
      <main>
        <TrendingSection />
      </main>
      
    </div>
  );
}