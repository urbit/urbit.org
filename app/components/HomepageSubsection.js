import Link from "next/link";
import Image from "next/image";

/**
 * HomepageSubsection - Displays a single subsection with title, description, and action links
 *
 * @param {string} id - Subsection ID for anchor linking
 * @param {string} title - Subsection title
 * @param {string} description - Subsection description text
 * @param {string} image - Optional header image path
 * @param {Array} links - Array of {ref, label} link objects
 */
export function HomepageSubsection({ id, title, description, image, links = [] }) {
  return (
    <div id={id} className="mb-12 scroll-mt-0 snap-start">
      {/* Header Image */}
      {image && (
        <div className="mb-6">
          <Image
            src={image}
            alt={title}
            width={1410}
            height={918}
            className="w-full h-auto"
          />
        </div>
      )}

      <h3 className="text-[48px] font-serif italic text-[#44420c] leading-[45px] mb-4">
        {title}
      </h3>
      <p className="text-[24px] text-[#3f3f3f] leading-[27.495px] mb-6">
        {description}
      </p>

      {links.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-4">
          {links.map((link, idx) => {
            const isExternal = link.link.startsWith("http");

            return (
              <Link
                key={idx}
                href={link.link}
                className="inline-flex items-center justify-center px-4 py-2 text-base font-semibold
                  bg-[#44420c] text-white border border-[#3f3f3f] rounded-[5px]
                  hover:bg-[#3f3f3f] transition-colors"
                {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
              >
                {link.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
