import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sample data mapped from your HTML
const photosData = [
  {
    id: 1,
    src: "/assets/avatar.jpg",
    width: 200,
    height: 200,
    initialX: -288.8,
    initialY: 0,
    rotate: -1,
    date: "2026-03-04 04:56",
    note: "Bienvenue, bonjour monde",
  },
  {
    id: 2,
    src: "/assets/collage/roy.jpg",
    width: 150,
    height: 200,
    initialX: -243.5,
    initialY: -193.3,
    rotate: 16,
    date: "2026-03-05 14:20",
    note: "The Marvelous New York City",
  },
  {
    id: 3,
    src: "/assets/collage/ferrari.jpg",
    width: 200,
    height: 133,
    initialX: 235.9,
    initialY: -9.1,
    rotate: -26,
    date: "2026-03-06 09:15",
    note: "Her name is Ferrari, whom I adopted in Feb 2025, Winnipeg.",
  },
  {
    id: 4,
    src: "/assets/collage/chiikawa.jpg",
    width: 200,
    height: 133,
    initialX: -378.1,
    initialY: 24,
    rotate: 24,
    date: "2026-03-08 18:30",
    note: "晚霞满天プログラマーは毎日コードを書いてシステムを改善します",
  },
  {
    id: 5,
    src: "/assets/collage/guitar.jpg",
    width: 200,
    height: 200,
    initialX: -37.1,
    initialY: 24,
    rotate: 24,
    date: "2026-03-08 18:30",
    note: "I really miss my guitar, hoping I can play it again someday.",
  },
  {
    id: 6,
    src: "/assets/collage/pho.jpg",
    width: 200,
    height: 153,
    initialX: 30.1,
    initialY: 370,
    rotate: 24,
    date: "2026-03-08 18:30",
    note: "Strongly recommend! The best pho in Canada, Little Saigon!",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const photoVariants = {
  // We ONLY animate scale, opacity, and clipPath. 
  // We leave x and y alone so drag works flawlessly.
  hidden: { 
    opacity: 0, 
    clipPath: "inset(50% 0% 50% 0%)", 
    scale: 0.9 
  },
  visible: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    transition: {
      opacity: { duration: 0.4 },
      clipPath: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  },
};

export default function Collage() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const isDragging = useRef(false);

  return (
    <>
      {/* --- COLLAGE CANVAS --- */}
      <motion.div
        className="relative w-full h-[600px] flex items-center justify-center overflow-visible mt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {photosData.map((photo) => (
          <motion.div
            key={photo.id}
            variants={photoVariants}
            drag
            dragConstraints={{ left: -500, right: 500, top: -400, bottom: 400 }}
            whileHover={{ scale: 1.05, zIndex: 50 }}
            whileDrag={{ scale: 1.1, zIndex: 100, cursor: "grabbing" }}
            
            // Fix: Track dragging so we don't accidentally click to open the modal while dragging
            onDragStart={() => {
              isDragging.current = true;
            }}
            onDragEnd={() => {
              setTimeout(() => {
                isDragging.current = false;
              }, 50);
            }}
            onClick={() => {
              if (!isDragging.current) {
                setSelectedPhoto(photo);
              }
            }}
            className="absolute origin-center cursor-pointer shadow-xl bg-white p-2"
            
            // Fix: Setting initialX and initialY directly into style prevents the modal jumping bug
            style={{
              x: photo.initialX,
              y: photo.initialY,
              rotate: photo.rotate,
              width: photo.width,
              height: photo.height,
              zIndex: photo.id,
              willChange: "transform, opacity, clip-path",
            }}
          >
            <img
              draggable="false"
              className="h-full w-full object-cover select-none pointer-events-none"
              src={photo.src}
              alt="Collage piece"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            // Clean fade-in animation (no layoutId jump bugs)
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white p-3 shadow-2xl relative z-10">
                <img
                  src={selectedPhoto.src}
                  alt="Enlarged view"
                  className="max-h-[75vh] max-w-[75vw] object-contain"
                />
              </div>

              {/* Sticky Note */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 10, rotate: -5 }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 2 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                transition={{ type: "spring", delay: 0.1, bounce: 0.4 }}
                className="absolute -right-52 bottom-10 min-h-[150px] w-[200px] p-6 shadow-xl z-20 cursor-auto"
                style={{ backgroundColor: "rgb(237, 221, 98)" }}
              >
                <div className="text-gray-600 mb-2 text-xs font-mono">
                  {selectedPhoto.date}
                </div>
                <div className="text-sm text-gray-900 font-medium">
                  {selectedPhoto.note}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}