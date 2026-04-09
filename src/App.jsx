import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";           
import ClockView from "./components/ClockView";
import StarshipGameBackground from "./components/StarshipGameBackground";

function App() {
  const location = useLocation();
  
  // Lift the dark mode state to the top level so the background persists smoothly
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      {/* 1. The Canvas sits entirely outside the animation block. It will never lag now. */}
      {isDarkMode && <StarshipGameBackground />}

      {/* 2. Persistent NavBar */}
      {location.pathname !== "/" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }} 
          className="fixed top-6 left-6 z-50"
          style={{ willChange: "transform, opacity" }}
        >
          <NavBar lang="EN" />
        </motion.div>
      )}

      {/* 3. Optimized AnimatePresence */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          
          <Route 
            path="/" 
            element={
              <motion.div
                // Removed the expensive filter: blur()
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.05, // Stop slightly earlier to avoid floating point math errors in the browser
                  borderRadius: "100px" 
                }}
                
                // Hardware acceleration hints force the GPU to handle this layer
                style={{ 
                  transformOrigin: "40px 40px",
                  willChange: "transform, opacity, border-radius" 
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} 
                className="w-full min-h-screen origin-top-left flex flex-col items-center relative z-10"
              >
                {/* Pass isDarkMode down if Home needs to toggle it */}
                <Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
              </motion.div>
            } 
          />

          <Route 
            path="/clock" 
            element={
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                style={{ willChange: "transform, opacity" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                className="w-full min-h-screen flex flex-col items-center justify-center relative z-10"
              >
                <ClockView lang="EN" />
              </motion.div>
            } 
          />

        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;