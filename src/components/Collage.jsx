import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { photosData } from "../data/photosData";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1875 },
  },
};

const photoVariants = {
  hidden: { 
    opacity: 0, 
    clipPath: "inset(50% -50% 50% -50%)", 
    scale: 0.9 
  },
  visible: {
    opacity: 1,
    clipPath: "inset(-50% -50% -50% -50%)",
    scale: 1,
    transition: {
      opacity: { duration: 0.5 },
      clipPath: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
      scale: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
    },
    transitionEnd: {
      clipPath: "none"
    }
  },
};

export default function Collage() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const isDragging = useRef(false);

  // Mobile detection (768px breakpoint)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // DIRECT NAVBAR HIDING - no external CSS required
  useEffect(() => {
    if (selectedPhoto) {
      // Target all common navbar/header elements
      const navbarElements = document.querySelectorAll(
        "nav, header, .navbar, .header, .nav, .top-bar, [class*='navbar'], [class*='header']"
      );
      
      navbarElements.forEach((el) => {
        // Store original display value so we can restore it exactly
        if (!el.dataset.originalDisplay) {
          el.dataset.originalDisplay = el.style.display || getComputedStyle(el).display;
        }
        el.style.display = "none";
      });
    } else {
      // Restore navbar when lightbox closes
      const navbarElements = document.querySelectorAll(
        "nav, header, .navbar, .header, .nav, .top-bar, [class*='navbar'], [class*='header']"
      );
      
      navbarElements.forEach((el) => {
        if (el.dataset.originalDisplay) {
          el.style.display = el.dataset.originalDisplay;
          delete el.dataset.originalDisplay;
        }
      });
    }

    // Cleanup on unmount
    return () => {
      const navbarElements = document.querySelectorAll(
        "nav, header, .navbar, .header, .nav, .top-bar, [class*='navbar'], [class*='header']"
      );
      navbarElements.forEach((el) => {
        if (el.dataset.originalDisplay) {
          el.style.display = el.dataset.originalDisplay;
          delete el.dataset.originalDisplay;
        }
      });
    };
  }, [selectedPhoto]);

  return (
    <>
      {/* --- COLLAGE CANVAS --- */}
      <motion.div
        className={`relative w-full ${
          isMobile
            ? "h-auto flex flex-wrap justify-center items-center gap-8 py-12 px-4"
            : "h-[600px] flex items-center justify-center overflow-visible mt-20"
        }`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {photosData.map((photo) => (
          // 1. OUTER WRAPPER: Handles Dragging (desktop only) and positioning
          <motion.div
            key={photo.id}
            variants={photoVariants}
            drag={!isMobile}
            dragConstraints={isMobile ? undefined : { left: -500, right: 500, top: -400, bottom: 400 }}
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
            className={`origin-center ${isMobile ? "relative" : "absolute"}`}
            style={{
              ...(isMobile
                ? {}
                : {
                    x: photo.initialX,
                    y: photo.initialY,
                  }),
              width: isMobile ? "170px" : photo.width,
              height: isMobile ? "170px" : photo.height,
              zIndex: photo.id,
              willChange: "transform, opacity",
            }}
          >
            {/* 2. INNER WRAPPER: Handles Morphing and Rotation */}
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
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-0 max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* MORPH TARGET - 25% faster opening */}
              <motion.div 
                layoutId={`polaroid-${selectedPhoto.id}`}
                transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                className="bg-white p-3 shadow-2xl relative z-10 flex-shrink-0"
                style={{ rotate: 0 }}
              >
                <motion.img
                  layoutId={`image-${selectedPhoto.id}`}
                  transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                  src={selectedPhoto.src}
                  alt="Enlarged view"
                  className="max-h-[70vh] max-w-[85vw] md:max-w-none object-contain"
                />
              </motion.div>

              {/* Sticky Note - positioned below photo on mobile, floating to the right on desktop */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 15, rotate: -6 }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 3 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                transition={{ type: "spring", delay: 0.12, bounce: 0.35 }}
                className="relative w-[220px] md:w-[200px] p-5 md:p-6 shadow-xl flex-shrink-0 md:absolute md:-right-52 md:bottom-10 cursor-auto"
                style={{ backgroundColor: "rgb(237, 221, 98)" }}
              >
                <div className="text-gray-600 mb-2 text-xs font-mono tracking-wider">
                  {selectedPhoto.date}
                </div>
                <div className="text-sm text-gray-900 leading-snug">
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