import React, { useState } from "react";
import axios from "axios";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_KEY = "e582f4d51f8937aeb1a19c145ea48597"; // Replace with your actual API key

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://gnews.io/api/v4/search?q=Jabalpur Madhya Pradesh&lang=en&country=in&token=${API_KEY}`
      );
      setArticles(response.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
    setLoading(false);
  };

  // ... existing imports and state declarations ...

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
          Latest News in Your Area, MP
        </h1>

        <button
          onClick={fetchNews}
          className="group relative mb-12 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:ring-4 focus:ring-blue-300"
        >
          <span className="relative z-10">
            {loading ? "Fetching News..." : "Get Latest News"}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
        </button>

        {articles.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <div
                key={index}
                className="animate-fade-in-up group relative h-full overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                {article.image && (
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="relative mt-4">
                  <h2 className="mb-2 text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-blue-600">
                    {article.title}
                  </h2>
                  <p className="mb-4 text-gray-600">{article.description}</p>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium text-blue-500">
                      {article.source.name}
                    </span>
                    <span className="mx-2">•</span>
                    {new Date(article.publishedAt).toLocaleString()}
                  </div>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center font-semibold text-blue-600 transition-colors duration-300 hover:text-blue-800"
                  >
                    Read More
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
// ... existing export ...
};

export default News;
