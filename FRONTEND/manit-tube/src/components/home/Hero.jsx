import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import GlowBackground from "./GlowBackground";

function Hero() {
  return (
    <section className="relative mb-10 overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0b100d]">

      <GlowBackground />

      {/* Grid */}

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative grid min-h-[420px] items-center gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[1.15fr_.85fr] lg:px-14">

        {/* LEFT */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
        >

          {/* Badge */}

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#22c55e]/20 bg-[#22c55e]/[0.07] px-3 py-1.5 text-xs font-medium text-[#4ade80]">

            <Sparkles size={13} />

            Built for MANIT students

          </div>


          {/* Heading */}

          <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">

            Your campus.

            <br />

            Your knowledge.

            <br />

            <span className="bg-gradient-to-r from-[#22c55e] via-[#4ade80] to-[#86efac] bg-clip-text text-transparent">
              Your platform.
            </span>

          </h1>


          {/* Description */}

          <p className="mt-6 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
            Discover lectures, coding tutorials, placement resources,
            project showcases and knowledge shared by the MANIT community.
          </p>


          {/* Buttons */}

          <div className="mt-8 flex flex-wrap gap-3">

            <Link
              to="/search"
              className="group flex items-center gap-2 rounded-xl bg-[#22c55e] px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-[#22c55e]/10 transition hover:bg-[#4ade80]"
            >

              <Play
                size={16}
                fill="currentColor"
              />

              Explore videos

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />

            </Link>


            <Link
              to="/channel/explore"
              className="rounded-xl border border-white/[0.09] bg-white/[0.03] px-5 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/[0.07] hover:text-white"
            >
              Explore creators
            </Link>

          </div>

        </motion.div>


        {/* RIGHT VISUAL */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
          }}
          className="relative hidden lg:block"
        >

          {/* Main card */}

          <div className="relative mx-auto aspect-square max-w-[360px]">

            {/* Glow */}

            <div className="absolute inset-10 rounded-full bg-[#22c55e]/10 blur-[80px]" />


            {/* Outer circle */}

            <div className="absolute inset-5 rounded-full border border-[#22c55e]/10" />

            <div className="absolute inset-12 rounded-full border border-[#22c55e]/10" />


            {/* Center */}

            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-20 flex items-center justify-center rounded-[32px] border border-[#22c55e]/20 bg-[#0d1610]/80 shadow-2xl shadow-[#22c55e]/10 backdrop-blur-xl"
            >

              <div className="text-center">

                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#22c55e] shadow-xl shadow-[#22c55e]/20">

                  <Play
                    size={28}
                    fill="currentColor"
                    strokeWidth={0}
                    className="ml-1 text-black"
                  />

                </div>

                <p className="text-lg font-bold">
                  MANIT
                  <span className="text-[#22c55e]">
                    Tube
                  </span>
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Learn • Create • Share
                </p>

              </div>

            </motion.div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default Hero;