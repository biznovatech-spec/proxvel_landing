import * as React from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

const SmoothScrollHeroBackground = ({
  scrollHeight,
  desktopImage,
  mobileImage,
  initialClipPercentage,
  finalClipPercentage,
}) => {
  const { scrollY } = useScroll();

  const clipStart = useTransform(
    scrollY,
    [0, scrollHeight],
    [initialClipPercentage, 0]
  );
  const clipEnd = useTransform(
    scrollY,
    [0, scrollHeight],
    [finalClipPercentage, 100]
  );
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;
  const backgroundSize = useTransform(
    scrollY,
    [0, scrollHeight + 500],
    ["170%", "110%"]
  );

  return (
    <motion.div
      style={{
        position: "sticky",
        top: 0,
        height: "100dvh",
        width: "100%",
        background: "#000",
        clipPath,
        willChange: "clip-path",
      }}
    >
      {/* Mobile */}
      <motion.div
        className="ssh-bg-mobile"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${mobileImage})`,
          backgroundSize,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Desktop */}
      <motion.div
        className="ssh-bg-desktop"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${desktopImage})`,
          backgroundSize,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </motion.div>
  );
};

/**
 * Smooth scroll hero — clip-path reveal + zoom parallax.
 * Crea un scroll track de (scrollHeight + 100dvh) donde el fondo
 * se revela desde un rectángulo central hasta pantalla completa.
 */
const SmoothScrollHero = ({
  scrollHeight = 1500,
  desktopImage = "/images/hero.webp",
  mobileImage = "/images/hero.webp",
  initialClipPercentage = 25,
  finalClipPercentage = 75,
}) => {
  return (
    <div
      style={{
        height: `calc(${scrollHeight}px + 100dvh)`,
        position: "relative",
        width: "100%",
      }}
    >
      <SmoothScrollHeroBackground
        scrollHeight={scrollHeight}
        desktopImage={desktopImage}
        mobileImage={mobileImage}
        initialClipPercentage={initialClipPercentage}
        finalClipPercentage={finalClipPercentage}
      />
    </div>
  );
};

export default SmoothScrollHero;
