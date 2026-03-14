interface FramedImageProps {
  src: string;
  alt: string;
  /** Any valid CSS value e.g. "380px", "100%", "50vh" */
  height?: string;
  /** Any valid CSS value e.g. "280px", "100%". Defaults to 100% of parent. */
  width?: string;
  objectPosition?: string;
  /** Extra Tailwind classes on the outer wrapper e.g. "mb-8" */
  className?: string;
  /** Extra Tailwind classes on the <img> tag e.g. "grayscale" */
  imgClassName?: string;
  id?: string;
  /** Hover turns image greyscale — used on hero */
  hoverGreyscale?: boolean;
}

const FramedImage = ({
  src,
  alt,
  height = "320px",
  width = "100%",
  objectPosition = "center",
  className = "",
  imgClassName = "",
  id,
  hoverGreyscale = false,
}: FramedImageProps) => {
  return (
    <div
      className={`relative block img-frame ${className}`}
      style={{ width }}
    >
      {/* wine glow */}
      <div
        className="absolute blur-2xl opacity-20 bg-[#7a1c2e] -z-10"
        style={{ inset: "-8px" }}
      />
      <img
        id={id}
        src={src}
        alt={alt}
        className={`block w-full object-cover transition-all duration-700 ${
          hoverGreyscale ? "hover:grayscale" : ""
        } ${imgClassName}`}
        style={{ height, objectPosition }}
      />
    </div>
  );
};

export default FramedImage;
