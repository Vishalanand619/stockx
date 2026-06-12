import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div className={`glass-card rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }) {
  return <h3 className={`text-xl font-bold tracking-tight text-white ${className}`}>{children}</h3>;
}

export function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}
