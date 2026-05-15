import { useEffect, useState } from "react";

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

const fmt = new Intl.DateTimeFormat("en-IN", {
  hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "Asia/Kolkata",
});

export function LiveClock({ className = "" }: { className?: string }) {
  const now = useClock();
  return (
    <span className={`tabular-nums font-mono ${className}`}>
      {now ? `${fmt.format(now)} IST` : "--:--:-- IST"}
    </span>
  );
}
