/**
 * SidebarElement - Reusable sidebar content component
 *
 * Provides sidebar structure with title and scrollable content.
 * Positioning and sizing controlled by parent (SidebarSlot in LayoutFrame).
 * Just handles content layout - title pinned at top, content scrolls.
 *
 * Future use cases:
 * - Blog: Recommended reading
 * - Ecosystem: Announcements/product releases
 * - Overview: Breadcrumbs/anchor links
 * - Documentation: Table of contents
 *
 * @param {string} title - Title to display at top of sidebar (pinned)
 * @param {ReactNode} children - Content to display in the sidebar (scrollable)
 * @param {string} className - Optional additional CSS classes
 */
export function SidebarElement({ title, children, className = "" }) {
  return (
    <div className={` flex flex-col h-full bg-background ${className}`}>
      {/* Pinned title */}
      {title && (
        <div className="px-6 py-6 shrink-0 border-b border-gray-d9">
          <h2 className="text-2xl font-sans">{title}</h2>
        </div>
      )}

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-hide">
        {children}
      </div>
    </div>
  );
}
