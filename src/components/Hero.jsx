import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const videoRef = useRef();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    // Espera a que las fuentes estén listas antes de animar
    const heroSplit = new SplitText(".title", { type: "chars, words" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.fromTo(
      heroSplit.chars,
      { yPercent: 100 },
      {
        yPercent: 0,
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.06,
      }
    );

    gsap.fromTo(
      paragraphSplit.lines,
      { opacity: 0, yPercent: 100 },
      {
        opacity: 1,
        yPercent: 0,
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.06,
        delay: 1,
      }
    );

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0);

    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    const videoTimelineRef = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    videoRef.current.onloadedmetadata = () => {
      videoTimelineRef.to(videoRef.current, {
        currentTime: videoRef.current.duration,
      });
    };
  }, []);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">DRINKS</h1>

        <img
          src="/images/hero-left-leaf.png"
          alt="Hero Left Leaf"
          className="left-leaf"
        />

        <img
          src="/images/hero-right-leaf.png"
          alt="Hero Right Leaf"
          className="right-leaf"
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of fresh ingredients and
                expert mixology. Designed to tantalize your taste buds and
                elevate your senses.
              </p>
              <a href="#cocktails" className="btn">
                View Cocktails
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0">
        <video
          src="/videos/output.mp4"
          muted
          playsInline
          preload="auto"
          ref={videoRef}
        />
      </div>
    </>
  );
};

export default Hero;
