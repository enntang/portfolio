# ⭐️企鵝搶地

Type: 主要
類別: UI/UX, 插畫, 視覺設計
完成度: 全部完成
調整項目: 1. 內容撰寫
2. 缺英文版
3. 個人網站切版
year: 2024
歸檔位置: Google Drive
歸檔資料夾名稱: Portfolio/primary/2024-企鵝搶地

![thumb-4x3.png](%E2%AD%90%EF%B8%8F%E4%BC%81%E9%B5%9D%E6%90%B6%E5%9C%B0/thumb-4x3.png)

# Project Brief

## Role

UI/UX Designer

## Timeline

Aug 2024 - Dec 2024

## Tools

Gouache / Watercolor

Figma

Procreate

這是一個side project, 與一位前端工程師、一位後端工程師互相配合完成。

「企鵝搶地」是一款回合制策略遊戲。與桌上型遊戲的玩法類似，玩家操控自己的企鵝，在六角格冰原上移動、分裂、佔領區域，直到所有玩家皆無法再移動為止。

由於遊戲進行中有相當多資訊，包含地圖上分佈的企鵝數量、玩家動作順序、最新戰況的顯示等，所以如何妥善引導和清楚呈現就是 UI 設計的挑戰。

## Target Audience

網頁桌遊玩家，習慣在桌機/筆電操作遊戲，有連線對戰需求

# Design Goals

<aside>
💡

我們的目標很單純：創造具有視覺吸引力、且易於遊玩的線上桌遊。

</aside>

開發者團隊最初已有可遊玩的雛形，只是在 UI 介面上有需多優化空間：

1. 整體美術風格不明，字體與按鈕層級需要梳理
2. 缺乏從登入到遊戲房間的 Onboarding 流程設計

![Untitled](%E2%AD%90%EF%B8%8F%E4%BC%81%E9%B5%9D%E6%90%B6%E5%9C%B0/Untitled.png)

![Untitled](%E2%AD%90%EF%B8%8F%E4%BC%81%E9%B5%9D%E6%90%B6%E5%9C%B0/Untitled%201.png)

![Untitled](%E2%AD%90%EF%B8%8F%E4%BC%81%E9%B5%9D%E6%90%B6%E5%9C%B0/Untitled%202.png)

於是，我的角色是在已定義的範圍內進行 UI 操作優化。

在與團隊協作過程中，我透過 wireframe 進行整體 layout 佈局調整，詳列出所有遊戲進行中的狀態變化，並在 Miro 線上白板交換想法。

![miro.png](%E2%AD%90%EF%B8%8F%E4%BC%81%E9%B5%9D%E6%90%B6%E5%9C%B0/miro.png)

![wireframe2.png](%E2%AD%90%EF%B8%8F%E4%BC%81%E9%B5%9D%E6%90%B6%E5%9C%B0/wireframe2.png)

![wireframe-notext-1.jpg](%E2%AD%90%EF%B8%8F%E4%BC%81%E9%B5%9D%E6%90%B6%E5%9C%B0/wireframe-notext-1.jpg)

![wireframe-notext-2.jpg](%E2%AD%90%EF%B8%8F%E4%BC%81%E9%B5%9D%E6%90%B6%E5%9C%B0/wireframe-notext-2.jpg)

# Design Deliverables

## 清楚的 onboarding 流程

可選擇登入玩家帳號，或是以訪客身份進行遊玩。

登入遊戲後的流程相當單純：使玩家進入等待序列 → 選企鵝 → 房間等待。

![登入.png](%E2%AD%90%EF%B8%8F%E4%BC%81%E9%B5%9D%E6%90%B6%E5%9C%B0/%E7%99%BB%E5%85%A5.png)

房間列表縱向捲動，不同狀態區別化顯示：開放中的房間可隨時加入；滿員的房間會顯示「即將開始」並且禁止進入。

採用符合使用習慣的四角佈局：右上方為登出按鈕，右下角則可以開關背景音樂。

![房間列表.png](%E2%AD%90%EF%B8%8F%E4%BC%81%E9%B5%9D%E6%90%B6%E5%9C%B0/%E6%88%BF%E9%96%93%E5%88%97%E8%A1%A8.png)

加入遊戲房間後，左右切換喜歡的企鵝，選定之後按下「我準備好了」進入等待狀態；房間內所有人都準備好的時候就可以開始遊戲。

![房間-玩家本人尚未準備好.png](%E2%AD%90%EF%B8%8F%E4%BC%81%E9%B5%9D%E6%90%B6%E5%9C%B0/%E6%88%BF%E9%96%93-%E7%8E%A9%E5%AE%B6%E6%9C%AC%E4%BA%BA%E5%B0%9A%E6%9C%AA%E6%BA%96%E5%82%99%E5%A5%BD.png)

## 核心互動流程：遊戲開始

玩家輪流在地圖外圈放置第一隻企鵝。

遊戲以回合制進行，每一輪只有一個玩家的企鵝可以動作。

在規劃 UI 設計時，我採用的設計原則是給玩家清楚的動作提示與反饋。實際方式如下：

- 六角格以不同色塊區隔，使目標格易辨識
- 光暈＋箭頭提示現在可以放在哪裡
- Hover 顯示預覽位置

玩家確認動作結束後自動輪下一位玩家行動。

當輪到該位玩家的時候，出現蓋版訊息，用意是讓玩家不會輕易忽略狀態，導致整體遊戲時間延宕。

![輪到玩家本人-01.png](%E2%AD%90%EF%B8%8F%E4%BC%81%E9%B5%9D%E6%90%B6%E5%9C%B0/%E8%BC%AA%E5%88%B0%E7%8E%A9%E5%AE%B6%E6%9C%AC%E4%BA%BA-01.png)

我在設計上利用側邊欄顯示戰況，畫面左右分別是玩家順序和即時計分。

在地圖板塊上，使用顏色、光暈、地板亮起等方式標示「能走」「不能走」「分裂後的目標」，提升可圖性，玩家可依照引導進行點擊和分配企鵝到其他版圖。

![輪到玩家本人-02.png](%E2%AD%90%EF%B8%8F%E4%BC%81%E9%B5%9D%E6%90%B6%E5%9C%B0/%E8%BC%AA%E5%88%B0%E7%8E%A9%E5%AE%B6%E6%9C%AC%E4%BA%BA-02.png)

分配時，來源與目的的「數字」是重要資訊，所以以黑色底襯托。

![輪到玩家本人-04.png](%E2%AD%90%EF%B8%8F%E4%BC%81%E9%B5%9D%E6%90%B6%E5%9C%B0/%E8%BC%AA%E5%88%B0%E7%8E%A9%E5%AE%B6%E6%9C%AC%E4%BA%BA-04.png)

## 清楚的規則說明

遊戲過程中可隨時查看規則說明，每頁搭配簡化插圖，避免文字過長。

![tips-1.png](%E2%AD%90%EF%B8%8F%E4%BC%81%E9%B5%9D%E6%90%B6%E5%9C%B0/tips-1.png)

![tips-2.png](%E2%AD%90%EF%B8%8F%E4%BC%81%E9%B5%9D%E6%90%B6%E5%9C%B0/tips-2.png)

![tips-3.png](%E2%AD%90%EF%B8%8F%E4%BC%81%E9%B5%9D%E6%90%B6%E5%9C%B0/tips-3.png)

## 讓勝利者具有成就感的結算畫面

當勝利條件達成時，遊戲結束，並顯示結算畫面。最高分的勝利者會在最大的欄位閃耀光芒，其餘玩家的分數也會一並顯示在面板上、依序排名。

![結算.png](%E2%AD%90%EF%B8%8F%E4%BC%81%E9%B5%9D%E6%90%B6%E5%9C%B0/%E7%B5%90%E7%AE%97.png)

# Visual Design

整體使用冰原、海水為主的清爽配色，並且用手繪風格增加親切感。在介面上採用大量圓角、柔和陰影，營造友善輕鬆的遊戲氛圍。

![新增房間.png](%E2%AD%90%EF%B8%8F%E4%BC%81%E9%B5%9D%E6%90%B6%E5%9C%B0/%E6%96%B0%E5%A2%9E%E6%88%BF%E9%96%93.png)

企鵝插圖穿插在 UI 狀態與操作提示上，形成一致的風格增加遊玩沈浸感。

![確認登出popup.png](%E2%AD%90%EF%B8%8F%E4%BC%81%E9%B5%9D%E6%90%B6%E5%9C%B0/%E7%A2%BA%E8%AA%8D%E7%99%BB%E5%87%BApopup.png)

想讓遊戲的視覺更具有故事感，所以企鵝的美術設計皆以手繪完成，媒材主要是不透明水彩。紙上作畫後，拍照掃描進電腦後製完成。

![使用不透明水彩繪製的原稿](%E2%AD%90%EF%B8%8F%E4%BC%81%E9%B5%9D%E6%90%B6%E5%9C%B0/IMG_6913.jpg)

使用不透明水彩繪製的原稿

# Reflection

在這個專案，我用 UI 元素簡化複雜規則，利用顏色、對比與動畫去做視覺階層，讓玩家在短時間內理解遊戲機制。遊戲與 App 不同，**動作回饋（Feedback）** 對理解難度影響極大。

如何在不干擾視覺的條件下給予「下一步提示」，是一個很大的挑戰。

另外，我發揮了個人的多媒材風格，插畫與 UI 的融合讓產品更具吸引力，獲得了不錯的使用回饋。

在專案吿一段落後，也用短影片把過程記錄了下來，歡迎點擊觀看。

- code
    
    ```jsx
    <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="[https://www.instagram.com/reel/DQ0eWAQgVW8/?utm_source=ig_embed&amp;utm_campaign=loading](https://www.instagram.com/reel/DQ0eWAQgVW8/?utm_source=ig_embed&amp;utm_campaign=loading)" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="[https://www.instagram.com/reel/DQ0eWAQgVW8/?utm_source=ig_embed&amp;utm_campaign=loading](https://www.instagram.com/reel/DQ0eWAQgVW8/?utm_source=ig_embed&amp;utm_campaign=loading)" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="[https://www.w3.org/2000/svg](https://www.w3.org/2000/svg)" xmlns:xlink="[https://www.w3.org/1999/xlink](https://www.w3.org/1999/xlink)"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="[https://www.instagram.com/reel/DQ0eWAQgVW8/?utm_source=ig_embed&amp;utm_campaign=loading](https://www.instagram.com/reel/DQ0eWAQgVW8/?utm_source=ig_embed&amp;utm_campaign=loading)" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Enn Tang｜愛畫畫的 UX 設計師 (@enntang)</a></p></div></blockquote>
    <script async src="[//www.instagram.com/embed.js](https://www.instagram.com/embed.js)"></script>
    ```
    

[https://www.instagram.com/p/DQ0eWAQgVW8/](https://www.instagram.com/p/DQ0eWAQgVW8/)