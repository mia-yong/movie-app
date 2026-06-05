import Header from './components/Header';
import TrendingSection from './components/TrendingSection';
import Route from "./components/Route";
import DetailsSection from "./components/DetailsSection";

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
        <Route regex="/">
          <TrendingSection />
        </Route>
        <Route regex="/film/\d+">
          <DetailsSection filmId={parseInt(location.pathname.split("/")[2])} />
        </Route>
      </main>
      
    </div>
  );
}