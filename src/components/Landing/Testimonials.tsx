import { useState, useEffect } from "react";
import AmericanGirlFaceIMG from "../../assets/LandingView/american_girl_face_3.jpeg";
import MexicanManFaceIMG from "../../assets/LandingView/mexican_man_face_3.jpg";
import ChineseGirlFaceIMG from "../../assets/LandingView/chinese_girl_face_1.jpg";
import { useTranslation } from "react-i18next";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();
  
  const testimonials = [
    {
      image: AmericanGirlFaceIMG,
      text: t("Luabla has transformed the way I learn languages..."),
      author: "Maria G., Spain"
    },
    {
      image: MexicanManFaceIMG,
      text: t("I never thought language learning could be this enjoyable. The speaking exercises are amazing!"),
      author: "Alex H., USA"
    },
    {
      image: ChineseGirlFaceIMG,
      text: t("Thanks to Luabla, I can now converse confidently with native speakers. Highly recommended!"),
      author: "Chen W., China"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-20 px-6 bg-linear-to-br from-indigo-50 to-white dark:from-zinc-950 dark:to-zinc-900 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-12 text-zinc-900 dark:text-white">
          {t("What Our")}{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-coral-400">
            {t("Users Say")}
          </span>
        </h2>

        <div className="relative min-h-100 md:min-h-75 flex items-center justify-center">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col md:flex-row items-center gap-8 p-8 rounded-3xl bg-white dark:bg-zinc-800 shadow-2xl border border-indigo-100 dark:border-zinc-700 ${
                index === currentIndex 
                ? "opacity-100 scale-100 translate-x-0 animate-fade-in" 
                : "opacity-0 scale-90 translate-x-12 pointer-events-none"
              }`}
            >
              <div className="relative shrink-0">
                <div className="absolute -inset-2 bg-indigo-600 rounded-full blur opacity-20"></div>
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="relative w-32 h-32 md:w-48 md:h-48 object-cover rounded-full border-4 border-indigo-600 shadow-inner"
                />
                <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white w-10 h-10 flex items-center justify-center rounded-full text-2xl font-serif shadow-lg">
                  “
                </div>
              </div>

              <div className="flex flex-col justify-center text-center md:text-left">
                <p className="text-lg md:text-2xl italic text-zinc-700 dark:text-zinc-300 mb-6 font-medium leading-relaxed">
                  "{testimonial.text}"
                </p>
                <h4 className="text-indigo-600 dark:text-orange-400 font-bold text-xl">
                  — {testimonial.author}
                </h4>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={goToPrev}
            className="p-3 rounded-full border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-110 active:scale-95"
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <div 
                key={idx}
                className={`h-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-8 bg-orange-500" : "w-3 bg-indigo-200 dark:bg-zinc-700"
                }`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="p-3 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all transform hover:scale-110 active:scale-95"
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
