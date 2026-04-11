import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { photosData } from "../data/photosData";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const photoVariants = {
  hidden: { 
    opacity: 0, 
    // Notice the -50% on left/right. This lets the corners stick out immediately without cropping!
    clipPath: "inset(50% -50% 50% -50%)", 
    scale: 0.9 
  },
  visible: {
    opacity: 1,
    // Expand the box way past the edges so it doesn't crop the rotation
    clipPath: "inset(-50% -50% -50% -50%)",
    scale: 1,
    transition: {
      opacity: { duration: 0.4 },
      clipPath: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
    // THE FIX: Completely remove the clip path after the animation finishes!
    transitionEnd: {
      clipPath: "none"
    }
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
          // 1. OUTER WRAPPER: Handles Dragging and X/Y Position
          <motion.div
            key={photo.id}
            variants={photoVariants}
            drag
            dragConstraints={{ left: -500, right: 500, top: -400, bottom: 400 }}
            whileHover={{ zIndex: 50 }}
            whileDrag={{ zIndex: 100, cursor: "grabbing" }}
            onDragStart={() => {
              isDragging.current = true;
            }}
            onDragEnd={() => {
              setTimeout(() => {
                isDragging.current = false;
              }, 50);
            }}
            className="absolute origin-center"
            style={{
              x: photo.initialX,
              y: photo.initialY,
              width: photo.width,
              height: photo.height,
              zIndex: photo.id,
              willChange: "transform, opacity",
            }}
          >
            {/* 2. INNER WRAPPER: Handles Morphing (layoutId) and Rotation */}
            <motion.div
              layoutId={`polaroid-${photo.id}`}
              onClick={() => {
                if (!isDragging.current) {
                  setSelectedPhoto(photo);
                }
              }}
              whileHover={{ scale: 1.05 }}
              className="w-full h-full bg-white p-2 shadow-xl cursor-pointer"
              style={{ rotate: photo.rotate }} 
            >
              <motion.img
                layoutId={`image-${photo.id}`}
                draggable="false"
                className="h-full w-full object-cover select-none pointer-events-none"
                src={photo.src}
                alt="Collage piece"
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* MORPH TARGET */}
              <motion.div 
                layoutId={`polaroid-${selectedPhoto.id}`}
                className="bg-white p-3 shadow-2xl relative z-10"
                style={{ rotate: 0 }} // Straightens out when it opens
              >
                <motion.img
                  layoutId={`image-${selectedPhoto.id}`}
                  src={selectedPhoto.src}
                  alt="Enlarged view"
                  className="max-h-[75vh] max-w-[75vw] object-contain"
                />
              </motion.div>

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