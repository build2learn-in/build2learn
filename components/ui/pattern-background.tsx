"use client";

export function PatternBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Dominant Electric Blue */}
      <div className="absolute -top-1/4 -right-1/4 w-3/4 h-3/4 rounded-full bg-gradient-to-br from-[#00FFFF]/90 via-[#0099FF]/80 to-[#0033FF]/70 blur-2xl animate-pulse" />
      
      {/* Intense Magenta */}
      <div className="absolute -bottom-1/4 -left-1/4 w-3/4 h-3/4 rounded-full bg-gradient-to-tr from-[#FF00FF]/90 via-[#FF33CC]/80 to-[#9933FF]/70 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Bright Cyan */}
      <div className="absolute top-1/4 right-1/4 w-2/3 h-2/3 rounded-full bg-gradient-to-bl from-[#00FFCC]/90 via-[#00CCFF]/80 to-[#0099FF]/70 blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Neon Pink Core */}
      <div className="absolute top-1/3 left-1/3 w-1/2 h-1/2 rounded-full bg-gradient-to-br from-[#FF1493]/90 via-[#FF00FF]/80 to-[#CC00FF]/70 blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Additional glow layers */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#FF00FF]/20 via-transparent to-[#00FFFF]/20" />
      <div className="absolute inset-0 bg-gradient-to-bl from-[#00FFCC]/20 via-transparent to-[#FF1493]/20" />
      
      {/* Overlay patterns */}
      <div className="absolute inset-0 bg-grid-white/20 mix-blend-overlay" />
      <div className="absolute inset-0 bg-noise-pattern opacity-30 mix-blend-color-dodge" />
      
      {/* Enhanced glow effects */}
      <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-t from-black/20 via-transparent to-white/10" />
    </div>
  );
}
