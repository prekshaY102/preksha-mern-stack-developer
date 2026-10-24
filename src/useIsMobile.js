import { useEffect, useState } from "react";

export default function useIsMobile() {
  const query = "(max-width: 767px)";
  const [mobile, setMobile] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const q = window.matchMedia(query);
    const onChange = () => setMobile(q.matches);
    q.addEventListener("change", onChange);
    return () => q.removeEventListener("change", onChange);
  }, []);
  return mobile;
}