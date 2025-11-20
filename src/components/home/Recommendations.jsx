import SectionTitle from './SectionTitle';
import { useEffect, useState } from 'react';

function Recommendations() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [selectedRecommendation, setSelectedRecommendation] = useState(null);

    const recommendations = [
        {
            name: "Shin Yang",
            title: "Product Manager",
            recommendation:
                "As design lead, Enn fosters a culture of autonomy and positivity within the design team. She establishes regular and clear communication mechanisms both internally and externally and sets clear directional goals....",
            fullParagraphs: [
                "I was honored to work with Enn at Samebest. Enn joined the company approximately one month before I did, assuming the role of Head of Design. Upon my arrival as a Product Manager, Enn was the first colleague to extend a warm welcome, even though I was not part of the design department. She promptly assisted me in grasping the initial framework of the team's document structure.",
                "Together, we established a collaborative framework for the entire product team, encompassing the PMO, R&D, Design, QC, and other departments. Under Enn's leadership, the design department has established a resilient and dynamic team.",
                "As design lead, Enn fosters a culture of autonomy and positivity within the design team. She establishes regular and clear communication mechanisms both internally and externally and sets clear directional goals. it was evident that Enn was the ideal partner: proactive, organized, and highly responsible. From a PM perspective, It is a great source of reassurance to work with her. Enn utilizes her expertise in UI/UX design to meet PM demands under challenging conditions, while consistently focusing on the distinctive attributes and development of each design team member, guiding them towards achieving and growing together.",
                "Throughout our collaboration, I have deeply felt Enn’s significant impact on the product. Therefore, I highly recommend Enn for any key role in product design. She is certain to bring exceptional vision and success to any product and team she leads.",
                "我有幸與 Enn 在 amebest 共事，Enn 是比我早約一個多月進入公司的設計部門主管，當我以產品經理身份進入公司，她是第一個主動招呼我的同事（即使我並非設計部門），並以極快的速度協助我了解團隊文件架構的初始雛形。當時我就立刻明白：Enn 是一個主動、積極、有條理且具有強烈責任心的最佳夥伴。",
                "後來，我們合力奠定了後來整個產品團隊（包括 PMO、研發、設計、QC 等部門）的協作架構基礎，設計部門也在 Enn 的帶領下，建立了堅韌且有活力的團隊。",
                "Enn 作為設計主管，帶動設計團隊的自主、正向文化，定期且明確的內外溝通機制，清晰建立目標方向；身為PM，與他合作非常安心。Enn 也善用自身的 UIUX 設計專業，在各種具挑戰性的艱難條件下，仍能回應PM需求；同時也始終關注設計夥伴每個人的特性與發展，帶領所有人一起達到目標並成長。",
                "這段共事期間，我深深感到 Enn 的協助為產品帶來的重要影響力。因此，我極力推薦 Enn 擔任任何主責產品設計的重要職位，他必定能為產品與團隊成就美好的願景。",
            ],
        },
        {
            name: "Nomis Yang",
            title: "Design Lead",
            recommendation:
                "To me, Enn was more than a manager — she was a mentor who shaped how I think about design. Her patience, passion, and dedication to learning inspired the whole team. Growing under her guidance was one of the most meaningful experiences in my career...",
            fullParagraphs: [
                "During my time at Samebest as a UI/UX designer, I had the privilege of working with my supervisor, Enn. She used her strong illustration skills and user insight to create a playful and approachable experience for a website designed for children aged 8–14. She carefully balanced the needs of both kids and parents, achieving great results in branding and usability.",
                "To me, Enn was more than a manager — she was a mentor who shaped how I think about design. Her patience, passion, and dedication to learning inspired the whole team. Growing under her guidance was one of the most meaningful experiences in my career.",
                "在 Samebest 擔任 UI/UX 設計師期間，我有幸與主管 Enn 共事。她以強大的手繪能力和細膩的使用者洞察，為一個 8～14 歲孩子的線上直播課官網，打造出充滿童趣與親和力的體驗。她同時考量孩子與家長兩方的需求，讓網站在品牌形象與使用體驗上都取得極佳成果。",
                "對我來說，Enn 不只是主管，更像是啟發我設計思維的導師。她以耐心與行動力陪伴我成長，也持續以對設計的熱情與學習精神感染整個團隊。能在她的帶領下成長，是我職涯中非常珍惜的經驗。",
            ],
        },
    ];

    function openModal(recommendation) {
        setSelectedRecommendation(recommendation);
        setIsModalOpen(true);
        setIsClosing(false);
    }

    function closeModal() {
        setIsClosing(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setSelectedRecommendation(null);
            setIsClosing(false);
        }, 300); // 匹配动画持续时间
    }

    useEffect(() => {
        if (!isModalOpen) return;
        function onKeyDown(event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        }
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isModalOpen]);

    return (
        <>
            {/* Section Title */}
            <SectionTitle name="Recommendations" />

            <div className="space-y-0 grid grid-cols-1 gap-24">
                <div className="flex flex-row gap-4">
                    {recommendations.map((recommendation, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => openModal(recommendation)}
                            className="flex flex-col text-left w-full p-4 bg-white rounded-sm border border-gray-200 cursor-pointer hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 group hover:translate-y-[-2px] transition-all duration-300"
                        >
                            <div className="text-h3 text-gray-700 group-hover:text-gray-400 transition-all duration-300">{recommendation.name}</div>
                            <div className="text-caption text-gray-500 group-hover:text-gray-400 transition-all duration-300">{recommendation.title}</div>
                            <p className='text-caption text-gray-800 mt-3 group-hover:text-gray-400 transition-all duration-300 line-clamp-5'>{recommendation.recommendation}</p>
                        </button>
                    ))}
                </div>
            </div>

            {isModalOpen && selectedRecommendation && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    aria-labelledby="recommendation-modal-title"
                    role="dialog"
                    aria-modal="true"
                    onClick={closeModal}
                >
                    <div 
                        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
                            isClosing ? 'opacity-0' : 'opacity-100'
                        }`} 
                    />
                    <div
                        className={`relative w-full h-2/3 max-w-xl bg-white rounded-sm p-6 transition-all duration-300 ${
                            isClosing 
                                ? 'opacity-0 -translate-y-8' 
                                : 'opacity-100 translate-y-0'
                        }`}
                        style={{ animation: isClosing ? 'none' : 'modalSlideIn 0.3s ease-out' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            aria-label="Close"
                            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center hover:opacity-70"
                            onClick={closeModal}
                        >
                            <img src="/icon-close.svg" alt="Close" className="w-6 h-6" />
                        </button>
                        <div className='overflow-y-auto h-full'>
                            <div>
                                <div id="recommendation-modal-title" className="text-h3 text-gray-800">
                                    {selectedRecommendation.name}
                                </div>
                                <div className="text-caption text-gray-500 mb-4">{selectedRecommendation.title}</div></div>
                            <div className="text-body text-gray-800 space-y-4">
                                {selectedRecommendation.fullParagraphs.map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Recommendations;


