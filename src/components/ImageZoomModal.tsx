import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

export default function ImageZoomModal({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      onClick={onClose}
      className="fixed inset-0 z-[5000] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-sm cursor-zoom-out"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        exit={{ scale: 0.9, opacity: 0 }} 
        className="relative max-w-5xl w-full rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={src} className="w-full h-auto max-h-[85vh] object-contain mx-auto" alt="Zoomed Work" />
        <button 
          onClick={onClose}
          aria-label="Fermer l'image"
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-[#053229] transition-colors cursor-pointer"
        >
          <X size={24} />
        </button>
      </motion.div>
    </motion.div>
  );
}
