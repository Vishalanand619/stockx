import React from "react";

export function Button({ 
  children, 
  variant = "primary", 
  size = "md", 
  className = "", 
  ...props 
}) {
  const baseStyle = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-green-500 hover:bg-green-400 text-black focus:ring-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]",
    destructive: "bg-red-500 hover:bg-red-400 text-white focus:ring-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]",
    outline: "border border-white/20 bg-transparent hover:bg-white/10 text-white focus:ring-white/50",
    ghost: "bg-transparent hover:bg-white/10 text-white",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2 text-sm",
    lg: "h-12 px-8 text-base",
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
