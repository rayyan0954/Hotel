import { useState, useEffect } from "react";

export function useScrollHeader(isHomePage = false) {
  const [scrolled, setScrolled] = useState(!isHomePage);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!isHomePage || window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      setShowTopBtn(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return { scrolled, showTopBtn };
}
