import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

export default function ImageZoomModal({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photo agrandie"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
      exit={{ opacity: 0, transition: { duration: 0.15, ease: 'easeOut' } }}
      onClick={onClose}
      className="fixed inset-0 z-[5000] flex items-center justify-center p-3 md:p-12 bg-[#0A192F]/90 cursor-zoom-out overscroll-contain"
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: { duration: 0.22, ease: [0.23, 1, 0.32, 1] } }}
        exit={{ scale: 0.98, opacity: 0, transition: { duration: 0.15, ease: 'easeOut' } }}
        className="relative max-w-5xl w-full rounded-lg overflow-hidden bg-[#0A192F] cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={src} className="w-full h-auto max-h-[85svh] object-contain mx-auto" alt="Photo agrandie" />
        <button
          type="button"
          onClick={onClose}
          autoFocus
          aria-label="Fermer la photo"
          className="press absolute top-3 right-3 w-11 h-11 rounded-lg bg-[#0A192F]/70 hover:bg-[#0A192F] flex items-center justify-center text-white"
        >
          <X size={22} aria-hidden="true" />
        </button>
      </motion.div>
    </motion.div>
  );
}
