"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type SyntheticEvent,
} from "react";

import useReducedMotion from "@/components/preview/useReducedMotion";

type LoopCrossfadeMetrics = {
  effectiveDuration: number;
  metadataDuration?: number;
  manifestDuration?: number;
  isReady: boolean;
};

type LoopCrossfadeProps = {
  src: string;
  poster?: string;
  /**
   * Optional upper bound sourced from the manifest. If provided, the loop
   * duration will never exceed this value even if the media metadata suggests a
   * longer time.
   */
  durationSec?: number;
  crossfadeMs?: number;
  onMetricsChange?: (metrics: LoopCrossfadeMetrics) => void;
};

const DEFAULT_DURATION = 8;
const DEFAULT_CROSSFADE_MS = 220;

export default function LoopCrossfade({
  src,
  poster,
  durationSec,
  crossfadeMs = DEFAULT_CROSSFADE_MS,
  onMetricsChange,
}: LoopCrossfadeProps) {
  const primaryRef = useRef<HTMLVideoElement | null>(null);
  const secondaryRef = useRef<HTMLVideoElement | null>(null);
  const activeIndexRef = useRef<0 | 1>(0);
  const timeoutRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const readyRef = useRef<{ primary: boolean; secondary: boolean }>({
    primary: false,
    secondary: false,
  });
  const [loopReady, setLoopReady] = useState(false);
  const [metadataDuration, setMetadataDuration] = useState<number | undefined>();

  const prefersReducedMotion = useReducedMotion();

  const manifestDuration = useMemo(() => {
    if (typeof durationSec === "number" && Number.isFinite(durationSec) && durationSec > 0) {
      return durationSec;
    }

    return undefined;
  }, [durationSec]);

  const effectiveDuration = useMemo(() => {
    const fallback = manifestDuration ?? DEFAULT_DURATION;

    if (typeof metadataDuration === "number" && Number.isFinite(metadataDuration)) {
      if (manifestDuration) {
        return Math.max(0.5, Math.min(metadataDuration, manifestDuration));
      }

      return Math.max(0.5, metadataDuration);
    }

    return Math.max(0.5, fallback);
  }, [manifestDuration, metadataDuration]);

  useEffect(() => {
    activeIndexRef.current = 0;
    readyRef.current = { primary: false, secondary: false };
    setLoopReady(false);
    setMetadataDuration(undefined);

    const primary = primaryRef.current;
    const secondary = secondaryRef.current;

    if (primary) {
      try {
        primary.pause();
        primary.currentTime = 0;
        primary.load();
      } catch {
        // Ignore seek/load errors while refreshing sources.
      }

      primary.style.opacity = "1";
    }

    if (secondary) {
      try {
        secondary.pause();
        secondary.currentTime = 0;
        secondary.load();
      } catch {
        // Ignore seek/load errors while refreshing sources.
      }

      secondary.style.opacity = "0";
    }
  }, [src]);

  useEffect(() => {
    onMetricsChange?.({
      effectiveDuration,
      metadataDuration,
      manifestDuration,
      isReady: loopReady,
    });
  }, [effectiveDuration, loopReady, manifestDuration, metadataDuration, onMetricsChange]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const clearTimers = () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const stopVideo = (video: HTMLVideoElement | null) => {
      if (!video) {
        return;
      }

      try {
        video.pause();
      } catch {
        // Ignore pause errors for partially loaded media.
      }

      try {
        video.currentTime = 0;
      } catch {
        // Ignore seek errors when metadata is not ready.
      }
    };

    const startVideo = (video: HTMLVideoElement | null) => {
      if (!video) {
        return;
      }

      try {
        video.currentTime = 0;
      } catch {
        // Ignore seek errors when metadata is not ready.
      }

      const playPromise = video.play();
      if (typeof playPromise?.catch === "function") {
        playPromise.catch(() => {});
      }
    };

    const scheduleNext = () => {
      if (prefersReducedMotion) {
        return;
      }

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      const overlapSeconds = crossfadeMs / 1000;
      const delayMs = Math.max(0, (effectiveDuration - overlapSeconds) * 1000);

      timeoutRef.current = window.setTimeout(() => {
        const currentIndex = activeIndexRef.current;
        const nextIndex = currentIndex === 0 ? 1 : 0;
        const currentVideo =
          currentIndex === 0 ? primaryRef.current : secondaryRef.current;
        const nextVideo = nextIndex === 0 ? primaryRef.current : secondaryRef.current;

        if (!currentVideo || !nextVideo) {
          scheduleNext();
          return;
        }

        try {
          nextVideo.currentTime = 0;
        } catch {
          // Ignore seek errors while preparing the incoming loop.
        }

        const playPromise = nextVideo.play();
        if (typeof playPromise?.catch === "function") {
          playPromise.catch(() => {});
        }

        const startTime = performance.now();

        if (rafRef.current) {
          window.cancelAnimationFrame(rafRef.current);
        }

        const step = (now: number) => {
          const elapsed = now - startTime;
          const progress = crossfadeMs > 0 ? Math.min(1, elapsed / crossfadeMs) : 1;
          const eased = progress;

          currentVideo.style.opacity = `${1 - eased}`;
          nextVideo.style.opacity = `${eased}`;

          if (progress < 1) {
            rafRef.current = window.requestAnimationFrame(step);
            return;
          }

          currentVideo.style.opacity = "0";
          nextVideo.style.opacity = "1";

          stopVideo(currentVideo);
          activeIndexRef.current = nextIndex;
          scheduleNext();
        };

        rafRef.current = window.requestAnimationFrame(step);
      }, delayMs);
    };

    const primary = primaryRef.current;
    const secondary = secondaryRef.current;

    if (prefersReducedMotion || !loopReady) {
      clearTimers();
      stopVideo(primary);
      stopVideo(secondary);

      if (primary) {
        primary.style.opacity = prefersReducedMotion ? "0" : "1";
      }

      if (secondary) {
        secondary.style.opacity = "0";
      }

      return () => {
        clearTimers();
      };
    }

    if (secondary) {
      secondary.style.opacity = "0";
    }

    if (primary) {
      primary.style.opacity = "1";
      startVideo(primary);
    }

    scheduleNext();

    return () => {
      clearTimers();
      stopVideo(primaryRef.current);
      stopVideo(secondaryRef.current);
    };
  }, [crossfadeMs, effectiveDuration, loopReady, prefersReducedMotion, src]);

  const updateMetadata = (key: "primary" | "secondary", value?: number) => {
    if (typeof value === "number" && Number.isFinite(value) && value > 0) {
      setMetadataDuration((prev) => {
        if (typeof prev === "number" && Math.abs(prev - value) < 0.01) {
          return prev;
        }

        return value;
      });
    }

    readyRef.current[key] = true;

    if (readyRef.current.primary && readyRef.current.secondary) {
      setLoopReady(true);
    }
  };

  const handlePrimaryMetadata = (event: SyntheticEvent<HTMLVideoElement, Event>) => {
    updateMetadata("primary", event.currentTarget.duration);
  };

  const handleSecondaryMetadata = (event: SyntheticEvent<HTMLVideoElement, Event>) => {
    updateMetadata("secondary", event.currentTarget.duration);
  };

  const posterOpacity = prefersReducedMotion ? 1 : 0;

  return (
    <>
      <video
        ref={primaryRef}
        autoPlay={!prefersReducedMotion}
        muted
        playsInline
        preload={prefersReducedMotion ? "metadata" : "auto"}
        poster={poster}
        onLoadedMetadata={handlePrimaryMetadata}
        style={{
          opacity: prefersReducedMotion ? 0 : 1,
          transition: "none",
        }}
      >
        <source src={src} type="video/webm" />
      </video>
      <video
        ref={secondaryRef}
        autoPlay={!prefersReducedMotion}
        muted
        playsInline
        preload={prefersReducedMotion ? "metadata" : "auto"}
        poster={poster}
        onLoadedMetadata={handleSecondaryMetadata}
        style={{
          opacity: 0,
          transition: "none",
        }}
      >
        <source src={src} type="video/webm" />
      </video>
      {poster ? (
        <div
          className="loop-poster"
          aria-hidden="true"
          style={{
            backgroundImage: `url(${poster})`,
            opacity: posterOpacity,
          }}
        />
      ) : null}
    </>
  );
}
