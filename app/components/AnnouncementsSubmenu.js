"use client";

export const AnnouncementsSubmenu = ({ announcement }) => {
  if (!announcement || !announcement.active) {
    return null;
  }

  return (
    <div className="md:hidden fixed top-[4.5rem] left-0 right-0 bg-[#F7D86B] border-b-[1.5px] border-gray-3c z-40 overflow-hidden">
      <div className="flex animate-marquee">
        <p className="font-sans font-bold text-[17px] tracking-[-0.34px] text-gray-3c px-4 py-3 whitespace-nowrap">
          {announcement.text}
        </p>
        <p className="font-sans font-bold text-[17px] tracking-[-0.34px] text-gray-3c px-4 py-3 whitespace-nowrap">
          {announcement.text}
        </p>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-marquee {
          display: flex;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};
