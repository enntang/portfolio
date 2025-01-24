import React, { useState, useEffect } from "react";

const App = () => {
  const [posts, setPosts] = useState([]);

  // 使用 useEffect 讀取 JSON 檔案
  useEffect(() => {
    fetch("/blogPosts.json")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching blog posts:", error));
  }, []);

  return (
    <div className="w-100">
      <div className="container">
        <h1>部落格文章</h1>
        {posts.length > 0 ? (
          <div>
            {posts.map((post) => (
              <div key={post.id} style={{ border: "1px solid #ccc", margin: "10px 0", padding: "10px" }}>
                <div className="d-flex">
                  <div>
                    <img src={post.cover} alt=""
                      className="me-3"
                      style={{
                        width:'200px'
                      }}
                       />
                  </div>
                  <div>
                    <h2>{post.title}</h2>
                    <p>
                      {post.date}
                    </p>
                    <p>{post.content}</p>

                    <strong>標籤:</strong>
                    {post.tags.map((tag, index) => (
                      <span key={index} style={{ marginLeft: "5px", color: "blue" }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>載入中...</p>
        )}
      </div>
    </div>
  );
};

export default App;