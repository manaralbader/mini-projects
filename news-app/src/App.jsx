import { useEffect, useState } from "react";
import ArticleCard from "./components/ArticleCard";
import { API_CONFIG } from "./config";
import "./App.css";

// the main app component that fetches and displays news articles

// get the API key and base URL from config file
const API_KEY = API_CONFIG.API_KEY;
const BASE_URL = API_CONFIG.BASE_URL;


export default function App() {
  // state to hold the list of articles in an array
  const [articles, setArticles] = useState([]);
  //state for the defualt search query
  const [query, setQuery] = useState("technology");
  // state to indicate if data is being loaded
  const [loading, setLoading] = useState(false);
  // state to hold any error message
  const [error, setError] = useState(null);

  // function to fetch articles from the API based on the search query
  const fetchArticles = async (q = query) => {
    setLoading(true); // set loading to true before starting the fetch
    setError(null); // reset any previous error

    // try to fetch data from the news API
    try {
      const url = `${BASE_URL}?q=${encodeURIComponent(q)}&pageSize=20&apiKey=${API_KEY}`;
      const res = await fetch(url);
      // check if the response is ok (status in the range 200-299)
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // parse the JSON response
      const data = await res.json();
      // optional chaining to safely access articles array
      setArticles(data?.articles ?? []); // update articles state
    } catch (err) {
      setError(err.message); // set error message if fetch fails
      setArticles([]); // clear articles on error
      console.error("Failed to fetch articles:", err); // log the error for debugging
    } finally {
      setLoading(false); // set loading to false after fetch completes
    }
  };

  // useEffect to fetch articles when the component mounts
  useEffect(() => {
    fetchArticles("technology");
  }, []); // empty dependency array means this runs once on mount

  // filter articles client-side based on the search query
  const filtered = articles.filter((a) =>
    (a?.title ?? "").toLowerCase().includes(query.toLowerCase()) ||
    (a?.description ?? "").toLowerCase().includes(query.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent the default form submission behavior
    fetchArticles(query);
  };

  return (
    <div>
      <header className="header">
        <h1>News App</h1>
        <form onSubmit={handleSubmit} className="search">
          <input 
            placeholder = "Search for news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            />
          <button type="submit">Search</button>
        </form>
      </header>

      {error && <div className="error">Error: {error}</div>}
      
      {loading ? (
        <p>Loading Articles</p>
      ):filtered.length > 0? 
       (
        <main className="grid">
          {filtered.map((article, index) => (
            <ArticleCard key={article.url ?? index} article={article} />
          ))}
        </main>
       ): (
        <p>No articles found for "{query}"</p>
       )}
    </div>
  );
}

