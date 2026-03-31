"use client";

import Link from "next/link";
import { FIGMA_LIGHTBOX_MODAL_PROPS, Modal } from "./Modal";

export function FooterContactModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} {...FIGMA_LIGHTBOX_MODAL_PROPS}>
      <div className="w-full">
        <h2 className="mb-4 pr-[3.25rem] font-serif text-[44px] font-[700] leading-[0.94] tracking-[-0.03em] text-accent-1 md:text-[48px]">
          Get in touch
        </h2>

        <div className="space-y-6">
          <div>
            <p className="font-sans text-[20px] leading-[1.25] tracking-[0.01em] text-primary md:text-[24px] md:leading-[25px]">
              Need help getting your urbit running?
            </p>
            <a
              href="mailto:support@urbit.org"
              data-umami-event="link-contact"
              data-umami-event-label="support@urbit.org"
              data-umami-event-destination="mailto:support@urbit.org"
              data-umami-event-variant="footer-contact-modal"
              className="mt-2 inline-flex font-mono text-[18px] tracking-[-0.02em] text-primary hover:text-accent-1 md:text-[22px]"
            >
              support@urbit.org
            </a>
          </div>

          <div>
            <p className="font-sans text-[20px] leading-[1.25] tracking-[0.01em] text-primary md:text-[24px] md:leading-[25px]">
              Want to collaborate with us?
            </p>
            <a
              href="mailto:partnerships@urbit.org"
              data-umami-event="link-contact"
              data-umami-event-label="partnerships@urbit.org"
              data-umami-event-destination="mailto:partnerships@urbit.org"
              data-umami-event-variant="footer-contact-modal"
              className="mt-2 inline-flex font-mono text-[18px] tracking-[-0.02em] text-primary hover:text-accent-1 md:text-[22px]"
            >
              partnerships@urbit.org
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-end gap-3">
          <Link
            href="/overview/running-urbit/support"
            onClick={onClose}
            data-umami-event="cta-footer-contact-modal-support"
            data-umami-event-label="More support options"
            data-umami-event-destination="/overview/running-urbit/support"
            data-umami-event-variant="modal"
            className="font-sans text-lg flex items-center py-1 px-3 rounded-lg text-contrast-2 hover:text-primary font-[600]"
          >
            More support options
          </Link>
        </div>
      </div>
    </Modal>
  );
}
