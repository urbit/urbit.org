# urbit.org

The official Urbit website built with Next.js and Markdoc for content management.

urbit.org is maintained by the Urbit Foundation and the Urbit community. Issues and contributions are welcome.

## Development Setup

### Prerequisites
- Node.js (version compatible with Next.js 14)
- npm

### Installation
```bash
npm install
```

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Project Structure

This is a Next.js application using:
- **Next.js 14** with App Router architecture
- **Markdoc** for content management and custom components
- **Tailwind CSS** for styling
- **Static export** configuration for deployment

### Content Management
- Content files are stored in `app/content/` organized by type (blog, events, grants, etc.)
- Markdown files support both YAML and TOML frontmatter
- Custom Markdoc tags enable rich content layouts
- Content is processed through `app/lib/queries.js` utilities

### Key Directories
- `app/` - Next.js App Router pages and components
- `app/content/` - Markdown content files
- `app/components/` - Custom React components for Markdoc rendering
- `app/lib/` - Utility functions for content processing

## Contributing

When contributing to content or code, please ensure:
- Content follows existing Markdoc tag conventions
- Components maintain consistency with the existing design system
- Run `npm run lint` before submitting changes

# ~sarlev's TODOs
- [ ] hide grants page; reward icons were dependent on Urbit Sans font, so be sure to address that.
- [ ] update ecosystem companies page
- [x] Update Articles & Press entires (compact mag hitpiece, LambdaConf talks?)
- [ ] Update the 'get on the network' page. Maybe delete entirely as it is replaced by homepage configurator?
- [ ] Update the Overview page with new narrative
- [ ] Update overview page with new system diagram (including userspace distributions & groundwire IDs)
- [ ] Add fallback fonts and update `.ttf`s to `.woff`.
- [ ] Add icon for Email
- [ ] Test email signup functionality
