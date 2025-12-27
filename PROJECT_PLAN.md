# Rue Ride - Project Plan & Asset List

## Project Overview
A modern ride-sharing landing page and price calculator for Paris, featuring bilingual support (French/English), responsive design, and rich animations.

---

## Design System (Based on Inspiration Image)

### Color Palette
*Note: Extract exact colors from inspiration.webp and update these values*

**Primary Colors:**
- Primary Brand Color: `#XXXXXX` (Main brand color from inspiration)
- Primary Dark: `#XXXXXX` (Darker shade for hover states)
- Primary Light: `#XXXXXX` (Lighter shade for backgrounds)

**Secondary Colors:**
- Secondary: `#XXXXXX` (Accent color from inspiration)
- Success: `#XXXXXX` (For positive actions)
- Warning: `#XXXXXX` (For alerts)
- Error: `#XXXXXX` (For errors)

**Neutral Colors:**
- Background: `#XXXXXX` (Main background)
- Surface: `#XXXXXX` (Card/component backgrounds)
- Text Primary: `#XXXXXX` (Main text)
- Text Secondary: `#XXXXXX` (Secondary text)
- Border: `#XXXXXX` (Borders and dividers)

**Paris Theme Accents:**
- Eiffel Tower Gold: `#XXXXXX` (Optional accent)
- Paris Blue: `#XXXXXX` (Optional accent)

### Typography
- **Heading Font**: Modern sans-serif (e.g., Inter, Poppins, or Geist Sans)
- **Body Font**: Clean sans-serif (e.g., Inter, Geist Sans)
- **Font Sizes**: Responsive scale (mobile-first)

### Spacing & Layout
- Container max-width: 1280px
- Grid system: 12-column responsive grid
- Spacing scale: 4px base unit (4, 8, 12, 16, 24, 32, 48, 64, 96, 128)

### Border Radius
- Small: 8px (buttons, small cards)
- Medium: 12px (cards, inputs)
- Large: 16px (large cards, modals)
- Full: 9999px (pills, badges)

### Shadows
- Small: Subtle elevation for cards
- Medium: Medium elevation for modals
- Large: Strong elevation for overlays

---

## Project Structure

```
src/
├── app/
│   ├── [locale]/              # next-intl routing
│   │   ├── layout.tsx         # Locale layout
│   │   └── page.tsx           # Landing page
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── layout/
│   │   ├── Header.tsx         # Navigation header
│   │   ├── Footer.tsx         # Footer component
│   │   └── LanguageSwitcher.tsx
│   ├── hero/
│   │   ├── HeroSection.tsx    # Main hero section
│   │   └── CTAButtons.tsx     # Call-to-action buttons
│   ├── calculator/
│   │   ├── PriceCalculator.tsx # Main calculator component
│   │   ├── LocationInput.tsx   # Pickup/dropoff inputs
│   │   ├── RouteMap.tsx        # Map visualization
│   │   └── PriceDisplay.tsx    # Price result display
│   ├── features/
│   │   ├── FeatureGrid.tsx     # Feature showcase
│   │   └── FeatureCard.tsx     # Individual feature card
│   └── animations/
│       └── FadeIn.tsx          # Reusable animation components
├── lib/
│   ├── utils.ts               # Utility functions
│   ├── i18n.ts                # i18n configuration
│   └── price-calculator.ts    # Price calculation logic
├── hooks/
│   ├── usePriceCalculation.ts # Price calculation hook
│   └── useGeolocation.ts      # Geolocation hook
└── messages/
    ├── en.json                # English translations
    └── fr.json                # French translations
```

---

## Implementation Phases

### Phase 1: Foundation Setup
1. ✅ Install and configure next-intl
2. ✅ Set up i18n messages (French/English)
3. ✅ Configure routing for locales
4. ✅ Update design system colors from inspiration
5. ✅ Set up animation library (Framer Motion or similar)

### Phase 2: Layout Components
1. Header with navigation
2. Language switcher
3. Footer
4. Responsive mobile menu

### Phase 3: Hero Section
1. Hero banner with animated background
2. Main headline and subheadline
3. CTA buttons (Book Ride, Calculate Price)
4. Hero image/illustration

### Phase 4: Price Calculator
1. Location input components (pickup/dropoff)
2. Autocomplete for Paris locations
3. Map integration (optional: Google Maps or Mapbox)
4. Price calculation logic
5. Price display with breakdown
6. Form validation and error handling

### Phase 5: Features Section
1. Feature grid layout
2. Feature cards with icons
3. Hover animations

### Phase 6: Animations & Polish
1. Page transitions
2. Scroll animations
3. Micro-interactions
4. Loading states
5. Error states

### Phase 7: Testing & Optimization
1. Responsive testing (mobile, tablet, desktop)
2. Performance optimization
3. Accessibility audit
4. SEO optimization

---

## Asset List

### Icons (SVG format, 24x24px default, 48x48px for large)

#### Navigation & UI Icons
1. **menu-icon.svg** - Hamburger menu (mobile)
   - Style: Minimal, 3-line hamburger
   - Color: Primary brand color

2. **close-icon.svg** - Close button
   - Style: X icon, rounded
   - Color: Primary brand color

3. **language-icon.svg** - Language switcher
   - Style: Globe/world icon
   - Color: Primary brand color

4. **arrow-right-icon.svg** - Right arrow
   - Style: Simple arrow pointing right
   - Color: Primary brand color

5. **arrow-left-icon.svg** - Left arrow
   - Style: Simple arrow pointing left
   - Color: Primary brand color

#### Location & Map Icons
6. **location-pin.svg** - Location marker
   - Style: Pin/marker icon
   - Color: Primary brand color (fill)
   - Variants: pickup (green), dropoff (red), default (primary)

7. **location-pin-pickup.svg** - Pickup location
   - Style: Pin with "P" or distinct marker
   - Color: Success green (#10B981 or from inspiration)

8. **location-pin-dropoff.svg** - Dropoff location
   - Style: Pin with "D" or distinct marker
   - Color: Error red (#EF4444 or from inspiration)

9. **map-icon.svg** - Map view toggle
   - Style: Map outline icon
   - Color: Primary brand color

10. **current-location-icon.svg** - Current location
    - Style: Crosshair or location dot with circle
    - Color: Primary brand color

#### Calculator Icons
11. **swap-icon.svg** - Swap pickup/dropoff
    - Style: Two arrows swapping positions
    - Color: Primary brand color

12. **calculate-icon.svg** - Calculate button
    - Style: Calculator or math symbol
    - Color: White (for button background)

13. **price-tag-icon.svg** - Price display
    - Style: Price tag or euro symbol
    - Color: Primary brand color

#### Feature Icons
14. **car-icon.svg** - Vehicle/Ride icon
    - Style: Modern car silhouette
    - Color: Primary brand color

15. **clock-icon.svg** - Time/ETA icon
    - Style: Clock or timer
    - Color: Primary brand color

16. **shield-icon.svg** - Safety icon
    - Style: Shield or checkmark in shield
    - Color: Primary brand color

17. **star-icon.svg** - Rating/Quality icon
    - Style: Star (filled or outlined)
    - Color: Primary brand color or gold

18. **phone-icon.svg** - Contact/Support icon
    - Style: Phone or smartphone
    - Color: Primary brand color

19. **payment-icon.svg** - Payment method icon
    - Style: Credit card or wallet
    - Color: Primary brand color

20. **users-icon.svg** - Driver/Community icon
    - Style: Users or person icon
    - Color: Primary brand color

#### Status Icons
21. **check-icon.svg** - Success/Checkmark
    - Style: Checkmark in circle
    - Color: Success green

22. **error-icon.svg** - Error/Alert
    - Style: X in circle or alert triangle
    - Color: Error red

23. **loading-spinner.svg** - Loading state
    - Style: Animated spinner (CSS animation)
    - Color: Primary brand color

24. **info-icon.svg** - Information
    - Style: "i" in circle
    - Color: Primary brand color

### Illustrations (SVG or WebP format)

25. **hero-illustration.svg** or **hero-illustration.webp**
    - Style: Modern illustration of car/ride in Paris
    - Size: 800x600px (desktop), 400x300px (mobile)
    - Theme: Paris landmarks (Eiffel Tower, streets) with ride-sharing context
    - Color scheme: Match inspiration palette

26. **empty-state-illustration.svg**
    - Style: Simple illustration for empty calculator state
    - Size: 300x300px
    - Theme: Location pins or map

27. **error-state-illustration.svg**
    - Style: Friendly error illustration
    - Size: 300x300px
    - Theme: Broken connection or location error

### Images (WebP format, optimized)

28. **paris-background.webp**
    - Style: Paris street scene or skyline (subtle, for hero background)
    - Size: 1920x1080px
    - Usage: Hero section background (with overlay)
    - Opacity: 0.3-0.5 with overlay

29. **feature-image-1.webp** (Safety)
    - Style: Professional photo of safe ride
    - Size: 600x400px
    - Theme: Safety, security

30. **feature-image-2.webp** (Convenience)
    - Style: Professional photo showing convenience
    - Size: 600x400px
    - Theme: Easy booking, quick service

31. **feature-image-3.webp** (Quality)
    - Style: Professional photo of quality service
    - Size: 600x400px
    - Theme: Premium vehicles, professional drivers

### Logo & Branding

32. **logo.svg** - Main logo
    - Style: Text logo with icon (if applicable)
    - Color: Primary brand color
    - Variants: Light and dark mode versions
    - Size: Scalable SVG

33. **logo-icon.svg** - Icon only
    - Style: Just the icon part of logo
    - Color: Primary brand color
    - Size: 32x32px, 48x48px, 64x64px variants

34. **favicon.ico** - Browser favicon
    - Style: Simplified logo icon
    - Size: 32x32px, 16x16px

### Patterns & Textures (Optional)

35. **pattern-dots.svg** - Dot pattern
    - Style: Subtle dot pattern for backgrounds
    - Color: Primary brand color at 10% opacity
    - Usage: Decorative background elements

36. **pattern-grid.svg** - Grid pattern
    - Style: Subtle grid lines
    - Color: Border color at 20% opacity
    - Usage: Section dividers

### Animation Assets

37. **loading-dots.svg** - Loading animation
    - Style: Three animated dots
    - Color: Primary brand color
    - Animation: CSS keyframes

38. **success-checkmark.svg** - Animated checkmark
    - Style: Animated checkmark (drawing animation)
    - Color: Success green
    - Animation: SVG path animation

---

## Asset Specifications Summary

### Format Guidelines
- **Icons**: SVG (preferred) or PNG at 2x resolution
- **Illustrations**: SVG (preferred) or WebP
- **Photos**: WebP format, optimized
- **Logo**: SVG (scalable)

### Size Guidelines
- **Icons**: 24x24px (default), 48x48px (large)
- **Hero Images**: 1920x1080px (desktop), 800x600px (mobile)
- **Feature Images**: 600x400px
- **Illustrations**: Variable, maintain aspect ratio

### Color Guidelines
- All assets should support light/dark mode
- Use CSS variables for colors where possible
- Provide both filled and outlined versions for icons
- Ensure sufficient contrast for accessibility (WCAG AA)

### Naming Convention
- Use kebab-case: `icon-name.svg`
- Include size if multiple sizes: `icon-name-24.svg`, `icon-name-48.svg`
- Include variant: `icon-name-filled.svg`, `icon-name-outlined.svg`

---

## Next Steps

1. **Extract colors from inspiration.webp** and update the color palette section
2. **Review asset list** and prioritize which assets to create first
3. **Set up next-intl** for internationalization
4. **Begin Phase 1** implementation
5. **Create or source assets** as needed during development

---

## Notes

- All assets should be optimized for web (SVG minified, images compressed)
- Consider using icon libraries (Lucide React is already installed) for standard icons
- Custom illustrations may need to be commissioned or created
- Ensure all text in images is translatable or replaced with code-rendered text
- Test all assets in both light and dark modes
