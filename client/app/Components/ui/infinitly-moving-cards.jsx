"use client";

import React from "react";
import { cn } from "@/lib/utils"; // يمكنك حذف هذا واستبداله بدمج الكلاسات يدويًا إذا لم تكن تستخدمه

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const duration =
    speed === "fast" ? "20s" : speed === "slow" ? "80s" : "40s";

  const animationDirection = direction === "left" ? "forwards" : "reverse";

  return (
    <div
      className={`relative overflow-hidden w-screen mask-image [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] ${className}`}
    >
      <ul
        className={`flex w-max gap-16 py-4 animate-scroll ${
          pauseOnHover ? "hover:[animation-play-state:paused]" : ""
        }`}
        style={{
          animationDuration: duration,
          animationDirection: animationDirection,
        }}
      >
        {[...items, ...items].map((item, idx) => (
          <li
            key={idx}
            className="w-[90vw] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-800 p-5 md:p-16 md:w-[60vw]"
            style={{
              background:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
            }}
          >
            <blockquote>
              <span className="relative z-20 text-sm md:text-lg leading-[1.6] text-white font-normal">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-xl font-bold leading-[1.6] text-white">
                    {item.name}
                  </span>
                  <span className="text-sm leading-[1.6] text-white text-opacity-70">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
