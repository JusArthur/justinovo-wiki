import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";           
import ClockView from "./components/ClockView";
import StarshipGameBackground from "./components/StarshipGameBackground";

function App() {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // 1. Check if the user navigated here from the NavBar
  const isFromNav = location.state?.fromNav;

  return (
    <>
      {isDarkMode && <StarshipGameBackground />}

      {location.pathname !== "/" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }} 
          className="fixed top-6 left-6 z-50"
          style={{ willChange: "transform, opacity" }}
        >
          <NavBar lang="EN" />
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          
          <Route 
            path="/" 
            element={
              <motion.div
                // 2. DYNAMIC INITIAL STATE:
                // If returning from Nav: Start tiny at the top-left corner.
                // If Initial Load: Start scaled down slightly in the center.
                initial={
                  isFromNav 
                    ? { opacity: 0, scale: 0.05, borderRadius: "100px" } 
                    : { opacity: 0, scale: 0.8, y: 30, borderRadius: "0px" }
                }
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: 0,
                  borderRadius: "0px",
                  transition: { 
                    duration: isFromNav ? 0.5 : 0.6, 
                    ease: [0.22, 1, 0.36, 1] 
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.05, 
                  borderRadius: "100px",
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
                }}
                style={{ 
                  // 3. DYNAMIC TRANSFORM ORIGIN:
                  // 40px 40px = Drag from top-left. center center = Pop up from middle.
                  transformOrigin: isFromNav ? "40px 40px" : "center center",
                  willChange: "transform, opacity, border-radius" 
                }}
                className="w-full min-h-screen flex flex-col items-center relative z-10"
              >
                <Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
              </motion.div>
            } 
          />

          <Route 
            path="/clock" 
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.4, ease: "easeOut", delay: 0.1 } 
                }}
                exit={{ 
                  opacity: 0,
                  transition: { duration: 0.1 } 
                }}
                style={{ willChange: "transform, opacity" }}
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