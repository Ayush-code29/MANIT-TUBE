import { motion } from "framer-motion";

const categories = [
  "All",
  "CSE",
  "AI & ML",
  "DSA",
  "Web Development",
  "DBMS",
  "Projects",
  "Placements",
  "Coding",
  "Campus Life",
];

function CategoryBar() {
  return (
    <div className="mb-8 overflow-x-auto pb-1 scrollbar-hide">

      <div className="flex min-w-max gap-2">

        {categories.map((category, index) => (

          <motion.button
            key={category}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
              index === 0
                ? "border-[#22c55e]/40 bg-[#22c55e] text-black shadow-lg shadow-[#22c55e]/10"
                : "border-white/[0.07] bg-white/[0.025] text-gray-400 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            {category}
          </motion.button>

        ))}

      </div>

    </div>
  );
}

export default CategoryBar;