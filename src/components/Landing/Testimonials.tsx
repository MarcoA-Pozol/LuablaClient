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
    <section className="relative py-32 px-6 bg-[#050505] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-10 w-72 h-72 bg-indigo-600/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-violet-600/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex flex-col items-center mb-16">
          <div className="px-4 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-widest mb-4">
            {t("Community Hub")}
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-center text-white tracking-tighter">
            {t("What Our")}{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-violet-400">
              {t("Users Say")}
            </span>
          </h2>
        </div>

        <div className="relative min-h-112.5 md:min-h-87.5 flex items-center justify-center">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col md:flex-row items-center gap-10 p-8 md:p-12 rounded-[3rem] bg-zinc-900/40 backdrop-blur-xl border border-white/5 shadow-2xl ${
                index === currentIndex 
                ? "opacity-100 scale-100 translate-x-0 rotate-0" 
                : "opacity-0 scale-90 translate-x-20 rotate-2 pointer-events-none"
              }`}
            >
              <div className="relative shrink-0">
                <div className="absolute -inset-4 bg-linear-to-tr from-indigo-600 to-violet-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-32 h-32 md:w-44 md:h-44 object-cover rounded-[2.5rem] border-2 border-white/10 shadow-2xl"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-linear-to-br from-indigo-500 to-violet-600 p-3 rounded-2xl shadow-xl border border-white/20">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center text-center md:text-left space-y-4">
                <div className="text-indigo-400 text-5xl font-serif leading-none opacity-50">“</div>
                <p className="text-xl md:text-3xl font-medium text-zinc-200 leading-tight tracking-tight">
                  {testimonial.text}
                </p>
                <div className="pt-4">
                  <h4 className="text-transparent bg-clip-text bg-linear-to-r from-indigo-300 to-violet-300 font-black text-xl uppercase tracking-widest">
                    {testimonial.author}
                  </h4>
                  <div className="h-1 w-12 bg-violet-500 mt-2 mx-auto md:mx-0 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-8 mt-16">
          <button
            onClick={goToPrev}
            className="cursor-pointer group p-4 rounded-2xl bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all active:scale-90"
            aria-label="Previous"
          >
            <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-3">
            {testimonials.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`group relative h-2 transition-all duration-500 rounded-full overflow-hidden ${
                  idx === currentIndex ? "w-12 bg-indigo-500" : "w-3 bg-zinc-800 hover:bg-zinc-700"
                }`}
              >
                {idx === currentIndex && (
                  <div className="absolute inset-0 bg-linear-to-r from-indigo-400 to-violet-500 animate-gradient"></div>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={goToNext}
            className="cursor-pointer group p-4 rounded-2xl bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:bg-indigo-500 transition-all active:scale-90"
            aria-label="Next"
          >
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
