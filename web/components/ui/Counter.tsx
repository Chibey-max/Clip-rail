"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";
import { count, usd } from "@/lib/format";

/**
 * Animates from the previous value to the new one when `value` changes.
 * Only feed it real onchain numbers: it must never tick on a timer (docs/design.md).
 */
export function Counter({ value, kind = "int" }: { value: number; kind?: "int" | "usd" }) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => (kind === "usd" ? usd(Math.round(v)) : count(Math.round(v))));

  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.9, ease: "easeOut" });
    return () => controls.stop();
  }, [mv, value]);

  return <motion.span className="tabular">{text}</motion.span>;
}
