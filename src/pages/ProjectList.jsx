import React, { useState, useEffect } from "react";
import "./ProjectList.css";

const ProjectList = () => {
  const [projects, setProjects] = useState([]); // 原始數據
  const [filteredProjects, setFilteredProjects] = useState([]); // 篩選後的數據
  const [activeFilter, setActiveFilter] = useState("全部"); // 當前選中的篩選條件


  // 使用 useEffect 讀取 JSON 檔案
  useEffect(() => {
    fetch("./projects.json")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        setFilteredProjects(data); // 預設顯示全部數據
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  // 篩選數據的邏輯
  const handleFilter = (type) => {
    setActiveFilter(type); // 更新當前篩選條件
    if (type === "全部") {
      setFilteredProjects(projects); // 顯示全部數據
    } else {
      const filteredData = projects.filter((item) => item.tag.includes(type));
      setFilteredProjects(filteredData); // 更新篩選後的數據
    }
  };

  return (
    <div className="w-100">
      <div className="container">
        <h1>Projects</h1>
        <div>
          {/* 篩選按鈕 */}
          <div className="filter m-3 d-flex align-items-center">
            <p className="m-0 me-1">作品類型</p>
            {["全部", "視覺設計", "UIUX"].map((type) => (
              <button
                key={type}
                className={`filterBtn btn btn-primary me-1 ${activeFilter === type ? "active" : ""
                  }`}
                onClick={() => handleFilter(type)} // 點擊時觸發篩選邏輯
              >
                {type}
              </button>
            ))}
          </div>

          {/* 項目列表 */}
          <ul>
            {filteredProjects.map((item) => (
              <li
                key={item.id}
                className="card p-2 m-3"
                style={{ border: "1px solid #ccc", padding: "10px" }}
              >
                <h3>{item.title}</h3>
                <div><strong>標籤:</strong>{item.tag.join(" ")}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;