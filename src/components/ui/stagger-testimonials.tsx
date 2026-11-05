"use client";

import * as React from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const SQRT_5000 = Math.sqrt(5000);

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  imgSrc: string;
}

// Placeholder quotes — replace with real client, mentor, or collaborator feedback.
const TESTIMONIALS: Testimonial[] = [
  {
    id: 0,
    quote: "My favorite collaborator to work with. We shipped 5× faster with Siddiq.",
    author: "Alex",
    role: "CEO at TechCorp",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/f0/f02fed36023656a5b5df6f247c83c96c53bfa9db5b98085cdee93ffc938a5f37.jpg",
  },
  {
    id: 1,
    quote: "I'm confident our frontend is in safe hands with Siddiq. I can't say that about many engineers.",
    author: "Dan",
    role: "CTO at SecureNet",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/5b/5b5b2f3487692d40f629010ea6448d150907f780d8c262c4ca194b7386115c2d.jpg",
  },
  {
    id: 2,
    quote: "I know it's cliché, but we were lost before we found Siddiq. Can't thank him enough.",
    author: "Stephanie",
    role: "COO at InnovateCo",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/10/10e2bfa5446e5c116e269b649b5f5e0106d96643f0a903048f3a056e40c35cd8.jpg",
  },
  {
    id: 3,
    quote: "Siddiq's systems make planning for the future seamless. Can't recommend him enough.",
    author: "Marie",
    role: "CFO at FuturePlanning",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/fa/fae47bb0faba45d1e0696b6557ca36c551a738c7d6e3950e82bb69dd2f963a72.jpg",
  },
  {
    id: 4,
    quote: "If I could give 11 stars, I'd give 12.",
    author: "Andre",
    role: "Head of Design at CreativeSolutions",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/4f/4fb45af36b546e069b72527fdf4d904855a2b11b301fa738c8bc4d235595c4df.jpg",
  },
  {
    id: 5,
    quote: "SO SO SO HAPPY WE FOUND HIM!!!! I'd bet he's saved us 100 hours so far.",
    author: "Jeremy",
    role: "Product Manager at TimeWise",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/a4/a4dd47498f54944edb9cd8095fb751847193faac01d922bae494e68d0cf90f4f.jpg",
  },
  {
    id: 6,
    quote: "Took some convincing, but now that we work with Siddiq, we're never going back.",
    author: "Pam",
    role: "Marketing Director at BrandBuilders",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/b2/b2cd3e4ad761fd9954c265df5f86090c4f17c388c07f78332e75edfd7420f66a.jpg",
  },
  {
    id: 7,
    quote: "I would be lost without Siddiq's in-depth analytics work. The ROI is easily 100× for us.",
    author: "Daniel",
    role: "Data Scientist at AnalyticsPro",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/9a/9a3f3f88dac2ceb807e98d4cbe99acc9813da6d0ce2859b1cf026747727e1667.jpg",
  },
  {
    id: 8,
    quote: "It's just the best. Period.",
    author: "Fernando",
    role: "UX Designer at UserFirst",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/b7/b78f8c42f62ae61f6ebe5c4e79f3af27f49dc05c4f366d2be599d1e14318be86.jpg",
  },
  {
    id: 9,
    quote: "I switched 5 years ago and never looked back.",
    author: "Andy",
    role: "DevOps Engineer at CloudMasters",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/45/45482403ecbfd4f326c4388ca63773a1fbe79376213456ae0f422eea1a94d589.jpg",
  },
  {
    id: 10,
    quote: "I've been searching for an engineer like Siddiq for YEARS. So glad I finally found one.",
    author: "Pete",
    role: "Sales Director at RevenueRockets",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/42/420c64d5e90b2ff05fc182e3d8c3df40076440cb684d927efed247855775ea9b.jpg",
  },
  {
    id: 11,
    quote: "It's so simple and intuitive, we got the team up to speed in 10 minutes.",
    author: "Marina",
    role: "HR Manager at TalentForge",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/be/be1b67757a13dfec4386e8627236a7194c6bcfb07502dbd82f727f6ccac46bcd.jpg",
  },
  {
    id: 12,
    quote: "Siddiq's communication is unparalleled. He's always there when we need him.",
    author: "Olivia",
    role: "Customer Success Manager at ClientCare",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/b4/b48ca5758f41e9f512fa264f7fde87a13a6149e94230111e949268b4780279cc.jpg",
  },
  {
    id: 13,
    quote: "The efficiency gains we've seen since working with Siddiq are off the charts!",
    author: "Raj",
    role: "Operations Manager at StreamlineSolutions",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/84/84811a44ccc64660055b77ed641ae6617edb60314efcdbc945cb91fc27aed815.jpg",
  },
  {
    id: 14,
    quote: "Siddiq has revolutionized how we handle our workflow. It's a game-changer!",
    author: "Lila",
    role: "Workflow Specialist at ProcessPro",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/f9/f99a76bee7ebb41a84ba63d00499ed81588a17e0f1bba07aa22d2c4e4d187a82.jpg",
  },
  {
    id: 15,
    quote: "The scalability of Siddiq's architecture is impressive. It grows with our business seamlessly.",
    author: "Trevor",
    role: "Scaling Officer at GrowthGurus",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/67/6734807085015478f70dc12be3669b8127939ec42f17aa6d995fe317d19971cc.jpg",
  },
  {
    id: 16,
    quote: "I appreciate how Siddiq continually innovates. He's always one step ahead.",
    author: "Naomi",
    role: "Innovation Lead at FutureTech",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/fc/fc2eed941aa10f3a40167ab44dd42877152ec653470854dda5ffb04c048e05e6.jpg",
  },
  {
    id: 17,
    quote: "The ROI we've seen with Siddiq is incredible. It's paid for itself many times over.",
    author: "Victor",
    role: "Finance Analyst at ProfitPeak",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/5e/5ee78465c1b6b6f94dcbf8dccba352fd9f4a3238557b93875887c55c72901927.jpg",
  },
  {
    id: 18,
    quote: "Siddiq's platform is so robust, yet easy to use. It's the perfect balance.",
    author: "Yuki",
    role: "Tech Lead at BalancedTech",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/7e/7ee949310d79d96acce5be2c19f2e5b5b6f75e1c26e45a4cc3c38da71f83899c.jpg",
  },
  {
    id: 19,
    quote: "We've tried many engineers, but Siddiq stands out in terms of reliability and craft.",
    author: "Zoe",
    role: "Performance Manager at ReliableSystems",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/90/90489abb7c7d9823bf203548ba1ed0ea5060abedcac65390a393c171f241eac7.jpg",
  },
];

interface TestimonialCardProps {
  position: number;
  testimonial: Testimonial;
  handleMove: (steps: number) => void;
  cardSize: number;
}

function TestimonialCard({
  position,
  testimonial,
  handleMove,
  cardSize,
}: TestimonialCardProps) {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 select-none border-2 p-6 sm:p-8 motion-reduce:transition-none",
        "cursor-pointer transition-all duration-500 ease-out",
        isCenter
          ? "z-10 border-accent bg-accent text-bg"
          : "z-0 border-border-surface bg-surface text-ink hover:border-accent/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath:
          "polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)",
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? "0px 8px 0px 4px var(--border-surface)"
          : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className={cn(
          "absolute block origin-top-right rotate-45",
          isCenter ? "bg-bg/30" : "bg-border-surface"
        )}
        style={{ right: -2, top: 48, width: SQRT_5000, height: 2 }}
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.author}, ${testimonial.role}`}
        loading="lazy"
        className="mb-3 h-12 w-10 border border-border-surface bg-bg object-cover object-top sm:mb-4 sm:h-14 sm:w-12"
        style={{ boxShadow: "3px 3px 0px var(--bg)" }}
      />

      <blockquote
        className={cn(
          "font-inter text-sm font-medium leading-snug sm:text-xl",
          isCenter ? "text-bg" : "text-ink"
        )}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <p
        className={cn(
          "absolute bottom-6 left-6 right-6 font-inter text-xs italic sm:bottom-8 sm:left-8 sm:right-8 sm:text-sm",
          isCenter ? "text-bg/80" : "text-muted"
        )}
      >
        — {testimonial.author}, {testimonial.role}
      </p>
    </div>
  );
}

export function StaggerTestimonials() {
  const [cardSize, setCardSize] = React.useState(365);
  const [items, setItems] = React.useState(TESTIMONIALS);

  const handleMove = (steps: number) => {
    const next = [...items];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = next.shift();
        if (!item) return;
        next.push(item);
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = next.pop();
        if (!item) return;
        next.unshift(item);
      }
    }
    setItems(next);
  };

  React.useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 600 }}>
      <div className="absolute inset-0 editorial-grid-lines opacity-20 pointer-events-none" />

      {TESTIMONIALS.map((testimonial) => {
        const index = items.findIndex((item) => item.id === testimonial.id);
        const position =
          items.length % 2
            ? index - (items.length + 1) / 2
            : index - items.length / 2;

        return (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        <button
          type="button"
          onClick={() => handleMove(-1)}
          aria-label="Previous testimonial"
          className="flex h-11 w-11 items-center justify-center rounded-[2px] border border-border-surface bg-bg text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <CaretLeft size={18} weight="bold" />
        </button>
        <button
          type="button"
          onClick={() => handleMove(1)}
          aria-label="Next testimonial"
          className="flex h-11 w-11 items-center justify-center rounded-[2px] border border-border-surface bg-bg text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <CaretRight size={18} weight="bold" />
        </button>
      </div>
    </div>
  );
}
