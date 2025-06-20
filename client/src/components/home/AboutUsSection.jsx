// client/src/components/home/AboutUsSection.jsx
import React, { useRef, useEffect } from 'react';
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { FiArrowRight, FiUsers } from "react-icons/fi";
import { MdSchool } from "react-icons/md";

const SECTION_HEIGHT = 1500;

const AboutUsSection = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={scrollRef} className="about-us-section">
      <FloatingNav />
      <HeroSection />
      <TeamSchedule />
    </div>
  );
};

const FloatingNav = () => {
  return (
    <nav className="about-us-nav">
      <MdSchool className="about-us-nav__icon" />
      <button
        onClick={() => {
          document.getElementById("team-section")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        className="about-us-nav__button"
      >
        ĐỘI NGŨ CỦA CHÚNG TÔI <FiArrowRight />
      </button>
    </nav>
  );
};

const HeroSection = () => {
  return (
    <div className="about-us-hero">
      <CenterImage />
      <ParallaxImages />
      <div className="about-us-hero__gradient" />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="about-us-center-image"
      style={{
        clipPath,
        backgroundSize,
        opacity,
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="about-us-parallax">
      <ParallaxImg
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Đội ngũ StudyCards làm việc"
        start={-200}
        end={200}
        className="about-us-parallax__img about-us-parallax__img--1"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Học sinh sử dụng StudyCards"
        start={200}
        end={-250}
        className="about-us-parallax__img about-us-parallax__img--2"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Không gian học tập hiện đại"
        start={-200}
        end={200}
        className="about-us-parallax__img about-us-parallax__img--3"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Technology và học tập"
        start={0}
        end={-500}
        className="about-us-parallax__img about-us-parallax__img--4"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
      loading="lazy"
    />
  );
};

const TeamSchedule = () => {
  return (
    <section
      id="team-section"
      className="about-us-team-schedule"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="about-us-team-schedule__title"
      >
        Đội ngũ StudyCards
      </motion.h1>
      
      <TeamMember 
        title="Nguyễn Văn A - CEO & Founder" 
        description="10+ năm kinh nghiệm EdTech" 
        department="Leadership Team" 
      />
      <TeamMember 
        title="Trần Thị B - CTO" 
        description="Expert React, Node.js, AI" 
        department="Technology Team" 
      />
      <TeamMember 
        title="Lê Văn C - Lead Designer" 
        description="UX/UI Specialist" 
        department="Design Team" 
      />
      <TeamMember 
        title="Phạm Thị D - Education Expert" 
        description="15+ năm nghiên cứu giáo dục" 
        department="Education Team" 
      />
      
      <StatsSection />
    </section>
  );
};

const TeamMember = ({ title, description, department }) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="about-us-team-member"
    >
      <div className="about-us-team-member__info">
        <p className="about-us-team-member__title">{title}</p>
        <p className="about-us-team-member__description">{description}</p>
      </div>
      <div className="about-us-team-member__department">
        <p>{department}</p>
        <FiUsers />
      </div>
    </motion.div>
  );
};

const StatsSection = () => {
  const stats = [
    { number: "1M+", label: "Học viên tin tưởng" },
    { number: "50K+", label: "Bộ thẻ được tạo" },
    { number: "15", label: "Quốc gia sử dụng" },
    { number: "4.9", label: "Đánh giá trung bình" }
  ];

  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75, delay: 0.3 }}
      className="about-us-stats"
    >
      <h3 className="about-us-stats__title">StudyCards trong con số</h3>
      <div className="about-us-stats__grid">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ 
              ease: "easeInOut", 
              duration: 0.5,
              delay: index * 0.1 
            }}
            className="about-us-stats__item"
          >
            <div className="about-us-stats__number">{stat.number}</div>
            <div className="about-us-stats__label">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AboutUsSection;