# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js-based website for urbit.org using the Markdoc content management approach. The site is built with Next.js 14 in the App Router architecture and uses Tailwind CSS for styling. Content is managed through Markdown files with custom Markdoc tags and components.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm start` - Start production server
- `npm run lint` - Run ESLint

**IMPORTANT:** The user typically has a dev server already running. Do NOT run `npm run dev` or start new dev servers without explicit permission. Assume the dev server is running at http://localhost:3000 unless told otherwise.

## Architecture

### Content Management
- Content lives in `app/content/` directory organized by type (blog, events, grants, etc.)
- Markdown files use both YAML frontmatter (default) and TOML frontmatter (delimited by `+++`)
- Markdoc configuration in `app/markdocConfig.js` defines custom tags and components
- Content queries handled by `app/lib/queries.js` using gray-matter and glob

### Next.js Structure
- App Router architecture with pages in `app/` directory
- Dynamic routes use bracket notation: `[page]/page.js`, `[blog]/page.js`
- Root layout in `app/layout.js` includes global navigation and footer
- Global styles in `app/globals.css`

### Custom Components
- Custom Markdoc components in `app/components/` for content rendering
- Key components: `OverviewSection`, `IconCard`, `FaqSection`, `SigilCard`
- `MarkdocComponents.js` contains shared Markdoc utilities

### Frame Layout Architecture
The site uses a decorative frame layout (`FrameLayout.js`) that creates a stepped border design with rounded corners. The frame is only visible on desktop (`md:` breakpoint and above).

#### Frame Structure
The frame consists of fixed top and bottom bars with integrated corners and a smooth transition between different height segments:

**Dimensions:**
- **Left side**: 32px × 32px corners + 16px height content bar
- **Transition**: 48px × 51px smooth S-curve SVG (`corner-a.svg`)
- **Right side**: 48px height content bar + 55px × 23px corners
- **Side borders**: 16px wide background fills (left and right)

**Key measurements:**
- Left corner: 32×32px (16px straight edge + 16px curve)
- Right corner: 23×55px (48px straight edge + 7px curve)
- Transition SVG: Creates smooth step from 16px to 48px height

#### Component Breakdown

**Top Navigation Bar** (`app/components/FrameLayout.js:22-57`):
- Fixed to viewport top (`fixed top-0`)
- Left segment: Corner + 16px bar (stretches with `flex-1`)
- Transition: `corner-a.svg` (48×51px)
- Right segment: 48px nav content + 55px corner
- Z-index: 40 (below frame borders at z-50)

**Bottom Footer Bar** (`app/components/FrameLayout.js:59-101`):
- Fixed to viewport bottom (`fixed bottom-0`)
- Same structure as top, but with vertically flipped transition SVG (`scale-y-[-1]`)
- Uses `items-end` to align all elements to bottom edge

**Border Elements**:
- Left border: 16px wide, z-50, spans full viewport height
- Right border: 16px wide, z-50, spans full viewport height
- These provide background fill behind/beside the frame elements

#### SVG Assets
Frame SVG files located in `public/components/frame/`:
- `corner-top-left.svg` - Top left corner (32×32px)
- `corner-bottom-left.svg` - Bottom left corner (32×32px, rotated -90deg)
- `corner-right.svg` - Right corners (23×55px, bottom uses vertical flip)
- `corner-a.svg` - Transition curve between segments (48×51px)

**Important:** All corner SVGs use `preserveAspectRatio="none"` and must fill their viewBox completely to avoid gaps. The path coordinates should extend to the full viewBox dimensions.

#### Modifying Frame Dimensions

To change frame dimensions, update these coordinated values:

1. **Change left segment height:**
   - Update left corner SVG dimensions
   - Adjust left content bar height (`h-[16px]`)
   - May need to modify transition SVG start point

2. **Change right segment height:**
   - Update right corner SVG dimensions
   - Adjust right content bar height (`h-[48px]`)
   - Update content spacers (`h-[55px]` in main content area)
   - May need to modify transition SVG end point

3. **Change corner widths:**
   - Update corner SVG dimensions
   - Adjust corner container widths (`w-[32px]`, `w-[23px]`)

4. **Modify transition curve:**
   - Edit `corner-a.svg` path to adjust curve shape
   - Ensure path fills entire viewBox to prevent gaps
   - Update container dimensions to match SVG viewBox

**Common pitfalls:**
- SVG paths must extend to full viewBox dimensions (no clipPath restrictions)
- Use `gap-0` on flex containers to prevent spacing between elements
- Maintain z-index hierarchy (borders: z-50, nav/footer: z-40)
- Don't forget to flip transition SVG vertically for bottom bar (`scale-y-[-1]`)

#### Integration with HeaderNav and FooterSection
The `HeaderNav` component accepts an `inFrame` prop that conditionally removes positioning classes when rendered within the frame. This allows it to work both as a standalone fixed header and as part of the frame layout.

### Configuration
- Next.js config uses `@markdoc/next.js` plugin with custom schema path
- Static export configuration (`output: 'export'`)
- Image optimization disabled (`unoptimized: true`)
- Supports multiple page extensions: `.js`, `.jsx`, `.ts`, `.tsx`, `.md`, `.mdoc`
- Tailwind configured for dark mode with custom Urbit fonts and color scheme

### Data Flow
1. Content files in `app/content/` are processed by `queries.js`
2. Markdoc parses and transforms content using `markdocConfig.js`
3. Dynamic pages render content through Next.js App Router
4. Custom components handle special content types and layout

## Key Files
- `app/markdocConfig.js` - Markdoc tag and component definitions
- `app/lib/queries.js` - Content fetching and processing utilities
- `app/layout.js` - Root application layout with navigation
- `tailwind.config.js` - Custom Tailwind configuration with Urbit design tokens
- `next.config.js` - Next.js configuration with Markdoc integration

## Content Structure
The site organizes content into several main categories:
- Blog posts (`app/content/blog/`)
- Community pages (`app/content/communities/`)
- Events (`app/content/events/`)
- Grants (`app/content/grants/`)
- General pages for overview sections and navigation

Content files support custom Markdoc tags like `{% iconcard %}`, `{% overview-section %}`, `{% faqSection %}` for rich layouts.