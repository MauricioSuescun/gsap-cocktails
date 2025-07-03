import { useGSAP } from "@gsap/react";
import { cocktailLists, mockTailLists } from "../../constants";
import gsap from "gsap";

const Cocktails = () => {
  useGSAP(() => {
    const parallaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#cocktails",
        start: "top 30%",
        end: "bottom 80%",
        scrub: true,
      },
    });
    parallaxTimeline.from("#c-left-leaf", { x: -100, y: 100 }).from(
      "#c-right-leaf",
      { x: 100, y: 100 }
      // Start this animation at the same time as the previous one
    );
  });

  return (
    <div className="noisy" id="cocktails">
      <img
        src="/images/cocktail-left-leaf.png"
        alt="Cocktails Left Leaf"
        className="left-leaf"
        id="c-left-leaf"
      />
      <img
        src="/images/cocktail-right-leaf.png"
        alt="Cocktails Right Leaf"
        className="right-leaf"
        id="c-right-leaf"
      />

      <div className="list">
        <div className="popular">
          <h2 className="title">Most popular Cocktails</h2>
          <ul>
            {cocktailLists.map((cocktail) => (
              <li key={cocktail.id}>
                <div className="md:me-28">
                  <h3>{cocktail.name}</h3>
                  <p>
                    {cocktail.country} | {cocktail.detail}
                  </p>
                </div>
                <span>{cocktail.price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="loved">
          <h2 className="title">Most loved Mocktails</h2>
          <ul>
            {mockTailLists.map((cocktail) => (
              <li key={cocktail.id}>
                <div className="me-28">
                  <h3>{cocktail.name}</h3>
                  <p>
                    {cocktail.country} | {cocktail.detail}
                  </p>
                </div>
                <span>{cocktail.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cocktails;
