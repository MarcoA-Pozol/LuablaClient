import { useState, useEffect } from "react";
import AmericanGirlFaceIMG from "../../assets/LandingView/american_girl_face_3.jpeg";
import MexicanManFaceIMG from "../../assets/LandingView/mexican_man_face_3.jpg";
import ChineseGirlFaceIMG from "../../assets/LandingView/chinese_girl_face_1.jpg";


const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    {
      image: AmericanGirlFaceIMG,
      text: "Luabla has transformed the way I learn languages...",
      author: "Maria G., Spain"
    },
    {
        image: MexicanManFaceIMG,
        text: "I never thought language learning could be this enjoyable. The speaking exercises are amazing!",
        author: "Alex H., USA"
    },
    {
        image: ChineseGirlFaceIMG,
        text: "Thanks to Luabla, I can now converse confidently with native speakers. Highly recommended!",
        author: "Chen W., China"
    }
  ];

  // Auto-play effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="testimonials-section">
      <h2 className="testimonials-title">What Our Users Say</h2>
      <div className="testimonials-carousel">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index}
            className={`testimonial ${index === currentIndex ? 'active' : ''}`}
          >
            <img src={testimonial.image} alt={testimonial.author} className="testimonial-image"/>
            <p className="testimonial-text">{testimonial.text}</p>
            <h4 className="testimonial-author">- {testimonial.author}</h4>
          </div>
        ))}
      </div>
      <div className="testimonial-controls">
        <button className="prev-btn" onClick={goToPrev}>❮</button>
        <button className="next-btn" onClick={goToNext}>❯</button>
      </div>
    </div>
  );
};

export default Testimonials;