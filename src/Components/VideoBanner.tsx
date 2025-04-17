import { useEffect, useRef, useState } from "react";

const VideoBanner = ({
  videoPath,
  className,
}: {
  videoPath: string;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <div className={className}>
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        poster="/poster-image.jpeg"
        preload="metadata"
        // preload="auto"
        className="object-cover rounded-lg"
      >
        <source src={`${videoPath}.webm`} type="video/webm" />
        <source src={`${videoPath}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoBanner;
