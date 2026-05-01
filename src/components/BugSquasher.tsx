"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function BugSquasher() {
  const [bugActive, setBugActive] = useState(false);
  const [bountyEarned, setBountyEarned] = useState<{ amount: number; id: number } | null>(null);
  
  // Bug path coordinates
  const [startY, setStartY] = useState(0);
  const [endY, setEndY] = useState(0);

  useEffect(() => {
    const spawnBug = () => {
      // 30% chance to spawn a bug every 10 seconds if one isn't active
      if (Math.random() > 0.7 && !bugActive && typeof window !== "undefined") {
         setStartY(Math.random() * (window.innerHeight - 100) + 50);
         setEndY(Math.random() * (window.innerHeight - 100) + 50);
         setBugActive(true);
      }
    };
    const interval = setInterval(spawnBug, 10000);
    return () => clearInterval(interval);
  }, [bugActive]);

  const squashBug = () => {
    setBugActive(false);
    const amount = Math.floor(Math.random() * 900) + 100; // $100 to $1000 bounty
    setBountyEarned({ amount, id: Date.now() });
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setBountyEarned(null);
    }, 3000);
  };

  return (
    <>
      <AnimatePresence>
        {bugActive && (
          <motion.div
            initial={{ 
              x: -100, 
              y: startY,
              rotate: 90 
            }}
            animate={{ 
              x: typeof window !== "undefined" ? window.innerWidth + 100 : 2000,
              y: endY,
            }}
            transition={{ duration: 15, ease: "linear" }}
            onAnimationComplete={() => setBugActive(false)}
            onPointerDown={squashBug}
            className="fixed z-[100] cursor-crosshair text-muted-foreground/30 hover:text-red-500 transition-all flex items-center justify-center"
            style={{ 
              width: 64, 
              height: 64,
              marginTop: -16,
              marginLeft: -16
            }}
            title="Squash me!"
          >
            <div className="hover:scale-125 transition-transform pointer-events-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/></svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {bountyEarned && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[110] bg-background/95 border border-green-500/50 backdrop-blur-md text-foreground px-5 py-4 rounded-xl shadow-2xl font-mono flex items-center gap-4 border-l-4 border-l-green-500"
          >
            <div className="bg-green-500/20 p-2 rounded-full text-2xl">
              🐛
            </div>
            <div>
              <div className="font-bold text-green-500">Bug Squashed!</div>
              <div className="text-sm text-muted-foreground mt-0.5">Bounty Earned: <span className="text-foreground font-bold">${bountyEarned.amount}</span></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
