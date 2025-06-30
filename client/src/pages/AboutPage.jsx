// client/src/pages/AboutPage.jsx - Chuyển từ AboutUsSection
import React, { useRef, useEffect, useState } from 'react';
import '../styles/pages/about.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <AboutHero />
      <MissionSection />
      <TeamSection />
      <StatsSection />
      <ValuesSection />
    </div>
  );
};

// Hero Section
const AboutHero = () => {
  return (
    <div className="about-hero">
      <div className="about-hero__background">
        <div className="about-hero__shapes">
          <div className="floating-shape floating-shape--1"></div>
          <div className="floating-shape floating-shape--2"></div>
          <div className="floating-shape floating-shape--3"></div>
        </div>
      </div>
      
      <div className="about-hero__container">
        <div className="about-hero__content">
          <div className="about-hero__badge">
            <span className="about-hero__badge-text">Về StudyCards</span>
          </div>
          
          <h1 className="about-hero__title">
            Cách mạng hóa <br />
            <span className="about-hero__title-highlight">học tập hiện đại</span>
          </h1>
          
          <p className="about-hero__description">
            StudyCards được sinh ra với sứ mệnh biến việc học tập trở nên thú vị, 
            hiệu quả và dễ tiếp cận cho mọi người. Chúng tôi tin rằng mỗi người đều 
            có tiềm năng học hỏi vô hạn.
          </p>
          
          <div className="about-hero__stats">
            <div className="about-hero__stat">
              <div className="about-hero__stat-number">1M+</div>
              <div className="about-hero__stat-label">Học viên</div>
            </div>
            <div className="about-hero__stat">
              <div className="about-hero__stat-number">50K+</div>
              <div className="about-hero__stat-label">Bộ thẻ</div>
            </div>
            <div className="about-hero__stat">
              <div className="about-hero__stat-number">15</div>
              <div className="about-hero__stat-label">Quốc gia</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mission Section
const MissionSection = () => {
  return (
    <div className="about-mission">
      <div className="about-mission__container">
        <div className="about-mission__content">
          <div className="about-mission__text">
            <h2 className="about-mission__title">Sứ mệnh của chúng tôi</h2>
            <p className="about-mission__description">
              Tạo ra một nền tảng học tập thông minh, giúp người học phát triển 
              kiến thức một cách tự nhiên và bền vững thông qua công nghệ hiện đại 
              và phương pháp giáo dục tiên tiến.
            </p>
            
            <div className="about-mission__features">
              <div className="about-mission__feature">
                <div className="about-mission__feature-icon">🎯</div>
                <div className="about-mission__feature-content">
                  <h3>Học tập cá nhân hóa</h3>
                  <p>Tùy chỉnh trải nghiệm học tập theo nhu cầu và khả năng của từng người</p>
                </div>
              </div>
              
              <div className="about-mission__feature">
                <div className="about-mission__feature-icon">🧠</div>
                <div className="about-mission__feature-content">
                  <h3>Khoa học nhận thức</h3>
                  <p>Áp dụng các nghiên cứu mới nhất về tâm lý học và khoa học não bộ</p>
                </div>
              </div>
              
              <div className="about-mission__feature">
                <div className="about-mission__feature-icon">🌐</div>
                <div className="about-mission__feature-content">
                  <h3>Cộng đồng toàn cầu</h3>
                  <p>Kết nối người học trên toàn thế giới trong một môi trường tích cực</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-mission__visual">
            <div className="about-mission__card">
              <div className="about-mission__card-header">
                <div className="about-mission__card-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="about-mission__card-content">
                <div className="about-mission__progress">
                  <div className="about-mission__progress-item">
                    <span>Từ vựng tiếng Anh</span>
                    <div className="about-mission__progress-bar">
                      <div className="about-mission__progress-fill" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div className="about-mission__progress-item">
                    <span>Toán học cơ bản</span>
                    <div className="about-mission__progress-bar">
                      <div className="about-mission__progress-fill" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  <div className="about-mission__progress-item">
                    <span>Lịch sử Việt Nam</span>
                    <div className="about-mission__progress-bar">
                      <div className="about-mission__progress-fill" style={{width: '78%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Team Section
const TeamSection = () => {
  const teamMembers = [
    {
      name: "Nguyễn Văn An",
      role: "CEO & Founder",
      description: "10+ năm kinh nghiệm trong EdTech và đổi mới giáo dục",
      avatar: "🧑‍💼",
      specialty: "Chiến lược & Lãnh đạo"
    },
    {
      name: "Trần Thị Bình",
      role: "CTO",
      description: "Chuyên gia công nghệ với niềm đam mê AI và Machine Learning",
      avatar: "👩‍💻",
      specialty: "AI & Technology"
    },
    {
      name: "Lê Văn Cường",
      role: "Head of Design",
      description: "Nhà thiết kế UX/UI với tầm nhìn về trải nghiệm người dùng",
      avatar: "🎨",
      specialty: "UX/UI Design"
    },
    {
      name: "Phạm Thị Dung",
      role: "Education Expert",
      description: "15+ năm nghiên cứu phương pháp giáo dục hiện đại",
      avatar: "📚",
      specialty: "Pedagogical Research"
    }
  ];

  return (
    <div className="about-team">
      <div className="about-team__container">
        <div className="about-team__header">
          <h2 className="about-team__title">Đội ngũ chuyên gia</h2>
          <p className="about-team__subtitle">
            Những con người tài năng đang cùng nhau xây dựng tương lai giáo dục
          </p>
        </div>
        
        <div className="about-team__grid">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const TeamMemberCard = ({ member, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className={`team-member-card ${isVisible ? 'team-member-card--visible' : ''}`}
    >
      <div className="team-member-card__avatar">
        <span className="team-member-card__emoji">{member.avatar}</span>
        <div className="team-member-card__status"></div>
      </div>
      
      <div className="team-member-card__content">
        <h3 className="team-member-card__name">{member.name}</h3>
        <div className="team-member-card__role">{member.role}</div>
        <p className="team-member-card__description">{member.description}</p>
        
        <div className="team-member-card__specialty">
          <span className="team-member-card__specialty-label">Chuyên môn:</span>
          <span className="team-member-card__specialty-value">{member.specialty}</span>
        </div>
      </div>
      
      <div className="team-member-card__hover-effect"></div>
    </div>
  );
};

// Stats Section with Counter Animation
const StatsSection = () => {
  const [counters, setCounters] = useState({
    users: 0,
    studySets: 0,
    countries: 0,
    accuracy: 0
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const targetValues = {
    users: 1000000,
    studySets: 50000,
    countries: 15,
    accuracy: 94
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounters({
        users: Math.floor(targetValues.users * easeOut),
        studySets: Math.floor(targetValues.studySets * easeOut),
        countries: Math.floor(targetValues.countries * easeOut),
        accuracy: Math.floor(targetValues.accuracy * easeOut)
      });

      if (step >= steps) {
        clearInterval(interval);
        setCounters(targetValues);
      }
    }, stepDuration);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toString();
  };

  return (
    <div ref={sectionRef} className="about-stats">
      <div className="about-stats__container">
        <div className="about-stats__grid">
          <div className="about-stats__item">
            <div className="about-stats__icon">👥</div>
            <div className="about-stats__number">{formatNumber(counters.users)}+</div>
            <div className="about-stats__label">Học viên tin tưởng</div>
          </div>
          
          <div className="about-stats__item">
            <div className="about-stats__icon">📚</div>
            <div className="about-stats__number">{formatNumber(counters.studySets)}+</div>
            <div className="about-stats__label">Bộ thẻ được tạo</div>
          </div>
          
          <div className="about-stats__item">
            <div className="about-stats__icon">🌍</div>
            <div className="about-stats__number">{counters.countries}</div>
            <div className="about-stats__label">Quốc gia</div>
          </div>
          
          <div className="about-stats__item">
            <div className="about-stats__icon">⭐</div>
            <div className="about-stats__number">{counters.accuracy}%</div>
            <div className="about-stats__label">Độ hài lòng</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Values Section
const ValuesSection = () => {
  const values = [
    {
      icon: "💡",
      title: "Đổi mới sáng tạo",
      description: "Luôn tìm kiếm những cách thức mới để cải thiện trải nghiệm học tập"
    },
    {
      icon: "🤝",
      title: "Cộng tác",
      description: "Xây dựng cộng đồng học tập nơi mọi người cùng nhau phát triển"
    },
    {
      icon: "🎯",
      title: "Chất lượng",
      description: "Cam kết mang đến những sản phẩm và dịch vụ tốt nhất"
    },
    {
      icon: "🌱",
      title: "Phát triển bền vững",
      description: "Tạo ra giá trị lâu dài cho cộng đồng và xã hội"
    }
  ];

  return (
    <div className="about-values">
      <div className="about-values__container">
        <div className="about-values__header">
          <h2 className="about-values__title">Giá trị cốt lõi</h2>
          <p className="about-values__subtitle">
            Những nguyên tắc định hướng mọi hoạt động của chúng tôi
          </p>
        </div>
        
        <div className="about-values__grid">
          {values.map((value, index) => (
            <ValueCard key={index} value={value} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ValueCard = ({ value, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 150);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className={`value-card ${isVisible ? 'value-card--visible' : ''}`}
    >
      <div className="value-card__icon">{value.icon}</div>
      <h3 className="value-card__title">{value.title}</h3>
      <p className="value-card__description">{value.description}</p>
    </div>
  );
};

export default AboutPage;