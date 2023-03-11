import { useEffect, useState } from "react";

const NEWS_ENDPOINT = "http://localhost:8080/news";
const News = ({ newsEndpoint }) => {
  const [hostname, setHostname] = useState("");
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      (process.env.NODE_ENV === "production" && newsEndpoint) || NEWS_ENDPOINT
    )
      .then((response) => response.json())
      .then((data) => {
        setNews(data.news);
        setHostname(data.hostname);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <div>
      <h2>News, from {hostname}</h2>
      {error && <p>{error.message}</p>}
      {news.map((article) => (
        <div key={article.id}>
          <h3>{article.title}</h3>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
};

export default News;
