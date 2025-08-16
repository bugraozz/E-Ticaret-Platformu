import { ReactNode } from "react";

interface ProductsLayoutProps {
  children: ReactNode;
}

// Add ISR for better performance
export const revalidate = 3600; // Revalidate every hour

export default function ProductsLayout({ children }: ProductsLayoutProps) {
  return children;
}
