// client/src/components/home/FeaturesSection.jsx
import React from 'react';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: "📚",
      title: "Flashcards thông minh",
      description: "Tạo và tùy chỉnh thẻ học với hình ảnh, âm thanh và nhiều định dạng khác nhau"
    },
    {
      id: 2,
      icon: "🎯",
      title: "Nhiều chế độ học",
      description: "Học tập, Kiểm tra, Ghép thẻ và nhiều chế độ học tập thú vị khác"
    },
    {
      id: 3,
      icon: "📊",
      title: "Theo dõi tiến độ",
      description: "Xem thống kê học tập chi tiết và theo dõi sự tiến bộ của bạn"
    },
    {
      id: 4,
      icon: "🌐",
      title: "Chia sẻ & Cộng tác",
      description: "Chia sẻ bộ thẻ với bạn bè và học tập cùng nhau"
    },
    {
      id: 5,
      icon: "🔍",
      title: "Tìm kiếm thông minh",
      description: "Tìm kiếm hàng triệu bộ thẻ được tạo bởi cộng đồng"
    },
    {
      id: 6,
      icon: "📱",
      title: "Học mọi lúc mọi nơi",
      description: "Truy cập trên mọi thiết bị, học tập offline khi cần"
    }
  ];

  return (
    <section className="features">
      <div className="features__container">
        <h2 className="features__title">Tại sao chọn StudyCards?</h2>
        <div className="features__grid">
          {features.map(feature => (
            <FeatureCard 
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;