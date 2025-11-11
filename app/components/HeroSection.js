"use client";

import Link from "next/link";
import Image from "next/image";

/**
 * HeroSection - Full viewport width hero section
 *
 * Displays a hero section with:
 * - Background image
 * - Logo/wordmark
 * - Title and subtitle
 * - Primary CTA button
 * - Secondary CTA button
 * - Tertiary text link
 *
 * Takes up 100vh up to a maximum of 1080px height
 *
 * @param {Object} hero - Hero configuration object with all content
 */
export function HeroSection({ hero }) {
  if (!hero) return null;

  const {
    backgroundImage,
    logo,
    title,
    subtitle,
    primaryCta,
    secondaryCta,
    tertiaryLink,
    primaryMobileCta,
    secondaryMobileCta,
    tertiaryMobileLink
  } = hero;

  // Generate responsive background image URLs
  const getResponsiveBackgroundImage = (imagePath) => {
    if (!imagePath) return null;

    // Extract base path without extension
    const basePath = imagePath.replace(/\.(png|jpg|jpeg)$/i, '');

    // Create image-set for different screen sizes
    return `
      linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 80%, rgba(255, 255, 255, 1) 100%),
      image-set(
        url('${basePath}-small.webp') 1x,
        url('${basePath}-medium.webp') 2x,
        url('${basePath}-large.webp') 3x,
        url('${basePath}-xl.webp') 4x
      )
    `;
  };

  // Fallback for browsers without image-set support
  const getFallbackBackgroundImage = (imagePath) => {
    if (!imagePath) return null;
    const basePath = imagePath.replace(/\.(png|jpg|jpeg)$/i, '');
    return `
      linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 80%, rgba(255, 255, 255, 1) 100%),
      url('${basePath}-large.webp')
    `;
  };

  return (
    <section
      className="relative flex items-start md:pt-[15vh] min-h-screen md:min-h-[calc(100vh+300px)] z-0 hero-background"
      {...(backgroundImage && {
        style: {
          backgroundImage: getResponsiveBackgroundImage(backgroundImage),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transition: 'background-size 0.5s ease-in-out, min-height 0.5s ease-in-out',
        }
      })}
    >
      {/* Fallback for browsers without image-set support */}
      {backgroundImage && (
        <style jsx>{`
          @supports not (background-image: image-set(url('test.webp') 1x)) {
            .hero-background {
              background-image: ${getFallbackBackgroundImage(backgroundImage)};
            }
          }

          /* Media query fallbacks for precise control */
          @media (max-width: 767px) {
            .hero-background {
              background-image:
                linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 80%, rgba(255, 255, 255, 1) 100%),
                url('${backgroundImage.replace(/\.(png|jpg|jpeg)$/i, '')}-small.webp');
            }
          }

          @media (min-width: 768px) and (max-width: 1535px) {
            .hero-background {
              background-image:
                linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 80%, rgba(255, 255, 255, 1) 100%),
                url('${backgroundImage.replace(/\.(png|jpg|jpeg)$/i, '')}-medium.webp');
            }
          }

          @media (min-width: 1536px) and (max-width: 2559px) {
            .hero-background {
              background-image:
                linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 80%, rgba(255, 255, 255, 1) 100%),
                url('${backgroundImage.replace(/\.(png|jpg|jpeg)$/i, '')}-large.webp');
            }
          }

          @media (min-width: 2560px) {
            .hero-background {
              background-image:
                linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 80%, rgba(255, 255, 255, 1) 100%),
                url('${backgroundImage.replace(/\.(png|jpg|jpeg)$/i, '')}-xl.webp');
            }
          }
        `}</style>
      )}


      {/* Content Container */}
      <div className="relative z-20 mx-[15px] md:ml-[5%] lg:ml-[10%] sm:mx-auto md:px-16 flex flex-col max-w-4xl xl:max-w-[60vw]">
        <div className="hidden md:block">
          <Image
            src="/icons/urbit-digi-accent-2.svg"
            alt="urbit digi logo"
            width={90}
            height={90}
            className="h-16 w-16"
          />
        </div>
        {logo && (
          <div className="my-4">
            <Image
              src={logo}
              alt="Urbit"
              width={197}
              height={86}
              className="hidden md:block h-16 md:h-16 lg:h-24 w-auto"
              priority
            />
            <Image
              src="/icons/urbit-digi-accent-2.svg"
              alt="urbit digi logo"
              width={90}
              height={90}
              className="mt-24 md:hidden"
            />
          </div>
        )}

        {/* Title */}
        {title && (
          <h1 className="relative text-6xl md:text-6xl md:max-w-[60vw] lg:text-7xl xl:text-8xl xl:max-w-[600px] 3xl:text-[8rem] 3xl:max-w-[1600px] font-semibold font-serif italic mb-12 leading-tight text-accent-1 md:text-primary z-20">
            {title}
          </h1>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p className="relative text-3xl md:text-3xl lg:text-4xl text-[#3f3f3f] mb-12 max-w-3xl leading-[130%] z-20">
            {subtitle}
          </p>
        )}

        {/* Mobile CTA Buttons */}
        <div className="md:hidden mb-2 flex-col gap-4">
          {/* Primary Mobile CTA */}
          {primaryMobileCta && (
            <Link
              href={primaryMobileCta.link}
              className="font-sans text-2xl flex w-fit items-center justify-center my-2 px-2 py-2
                bg-accent-1 text-secondary rounded-lg
                hover:bg-primary hover:text-secondary transition-all transform"
            >
              {primaryMobileCta.label}
            </Link>
          )}

          {/* Secondary Mobile CTA */}
          {secondaryMobileCta && (
            <Link
              href={secondaryMobileCta.link}
              className="font-sans text-2xl flex w-fit items-center justify-center my-2 px-2 py-1
                bg-background text-accent-1 border border-accent-1 rounded-lg
                hover:bg-primary hover:text-secondary transition-all transform"
            >
              {secondaryMobileCta.label}
            </Link>
          )}
        </div>

        {/* Mobile Tertiary Link */}
        {tertiaryMobileLink && (
          <Link
            href={tertiaryMobileLink.link}
            className="md:hidden text-base text-contrast-2 hover:text-primary transition-colors font-mono"
            {...(tertiaryMobileLink.link.startsWith('http') && {
              target: "_blank",
              rel: "noopener noreferrer",
            })}
          >
            {tertiaryMobileLink.label}
          </Link>
        )}


        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex flex-col sm:flex-row gap-4 mb-2">
          {/* Primary CTA */}
          {primaryCta && (
            <Link
              href={primaryCta.link}
              className="font-sans font-normal inline-flex items-center justify-center px-4 py-1 text-2xl font-[600]
                bg-accent-1 text-secondary rounded-lg
                hover:bg-accent-2 hover:text-primary transition-all transform"
            >
              {primaryCta.label}
            </Link>
          )}

          {/* Secondary CTA */}
          {secondaryCta && (
            <Link
              href={secondaryCta.link}
              className="font-sans font-normal inline-flex items-center justify-center px-4 py-1 text-2xl font-[600]
                border border-accent-1 text-accent bg-secondary rounded-lg
                hover:bg-accent-2 hover:text-primary transition-all transform"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>

        {/* Desktop Tertiary Link */}
        {tertiaryLink && (
          <Link
            href={tertiaryLink.link}
            className="hidden md:block font-mono text-sm text-contrast-2 hover:text-primary transition-colors"
            {...(tertiaryLink.link.startsWith('http') && {
              target: "_blank",
              rel: "noopener noreferrer",
            })}
          >
            {tertiaryLink.label}
          </Link>
        )}
      </div>
    </section>
  );
}
