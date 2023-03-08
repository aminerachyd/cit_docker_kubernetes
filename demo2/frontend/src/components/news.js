import { useEffect, useState } from "react";

const NEWS_ENDPOINT = "http://localhost:8080/news";
const News = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(NEWS_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        setNews(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <div>
      <h2>News</h2>
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
