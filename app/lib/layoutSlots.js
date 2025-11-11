"use client";

import { createContext, useContext, useEffect, useState } from "react";

/**
 * Layout Slots Context
 *
 * Provides a mechanism for pages to register optional layout elements:
 * - Hero: Full viewport width hero section (e.g., homepage hero)
 * - Sidebar: Sticky sidebar for navigation/recommended content
 *
 * Usage in pages:
 * ```jsx
 * <Hero>
 *   <HomepageHero {...props} />
 * </Hero>
 *
 * <Sidebar>
 *   <SidebarElement title="...">
 *     {content}
 *   </SidebarElement>
 * </Sidebar>
 * ```
 */

const LayoutSlotsContext = createContext({
  hero: null,
  sidebar: null,
  sidebarPosition: 'right',
  sidebarVisible: true,
  sidebarTransitionsEnabled: false,
  setHero: () => {},
  setSidebar: () => {},
  setSidebarPosition: () => {},
  setSidebarVisible: () => {},
  enableSidebarTransitions: () => {},
});

export function LayoutSlotsProvider({ children }) {
  const [hero, setHero] = useState(null);
  const [sidebar, setSidebar] = useState(null);
  const [sidebarPosition, setSidebarPosition] = useState('right');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarTransitionsEnabled, setSidebarTransitionsEnabled] = useState(false);

  const enableSidebarTransitions = () => {
    setSidebarTransitionsEnabled(true);
  };

  return (
    <LayoutSlotsContext.Provider value={{
      hero,
      sidebar,
      sidebarPosition,
      sidebarVisible,
      sidebarTransitionsEnabled,
      setHero,
      setSidebar,
      setSidebarPosition,
      setSidebarVisible,
      enableSidebarTransitions
    }}>
      {children}
    </LayoutSlotsContext.Provider>
  );
}

export function useLayoutSlots() {
  const context = useContext(LayoutSlotsContext);
  if (!context) {
    throw new Error("useLayoutSlots must be used within LayoutSlotsProvider");
  }
  return context;
}

/**
 * HeroSlot Component
 *
 * Registers hero content with the layout.
 * Hero appears at full viewport width above the main content area.
 */
export function HeroSlot({ children }) {
  const { setHero } = useLayoutSlots();

  useEffect(() => {
    setHero(children);
    return () => setHero(null);
  }, [children, setHero]);

  // Hero renders in layout, not here
  return null;
}

/**
 * SidebarSlot Component
 *
 * Registers sidebar content with the layout.
 * Sidebar appears on desktop (md+) as a sticky element alongside main content.
 * On mobile, sidebar content should be rendered inline by the page.
 */
export function SidebarSlot({ children }) {
  const { setSidebar } = useLayoutSlots();

  useEffect(() => {
    setSidebar(children);
    return () => setSidebar(null);
  }, [children, setSidebar]);

  // Sidebar renders in layout, not here
  return null;
}

/**
 * SidebarPositionSlot Component
 *
 * Sets the sidebar position ('left' or 'right') for the current page.
 * Use this component to configure sidebar positioning on a per-page basis.
 */
export function SidebarPositionSlot({ position = 'right' }) {
  const { setSidebarPosition } = useLayoutSlots();

  useEffect(() => {
    setSidebarPosition(position);
    return () => setSidebarPosition('right');
  }, [position, setSidebarPosition]);

  return null;
}
