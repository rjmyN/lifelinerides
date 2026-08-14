# Images Folder — Lifeline Ride Services

This folder is reserved for locally stored image assets for the Lifeline Ride Services website.

## Current Image Strategy

The website currently uses **Unsplash source URLs** directly in `<img>` tags for all photos. This is suitable for development and initial launch.

## Recommended Production Images

For best performance and reliability, replace the Unsplash URLs with locally hosted images placed in this folder.

### Image Slots Used in the Website

| File Name (suggested)     | Used In           | Description                                      |
|---------------------------|-------------------|--------------------------------------------------|
| `hero-bg.jpg`             | index.html (hero) | Medical/healthcare professional background       |
| `about-seniors.jpg`       | index.html, about | Diverse seniors, warm and positive               |
| `about-community.jpg`     | about.html        | Diverse group of seniors outdoors                |
| `driver-portrait.jpg`     | about.html (team) | Professional driver headshot                     |
| `medical-appointment.jpg` | why-choose-us.html| Medical professional environment                 |
| `senior-walking.jpg`      | multiple pages    | Elderly Black woman walking confidently          |

## Current Unsplash URLs

1. **Hero background:** `https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80`
2. **Elderly woman with cane:** `https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80`
3. **Diverse seniors:** `https://images.unsplash.com/photo-1516733968668-dbdce39c4651?w=800&q=80`
4. **Professional driver:** `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80`
5. **Medical/appointment:** `https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80`

## How to Replace with Local Images

1. Add your image files to this `/images/` folder
2. Update the `src` attribute in each HTML file to point to `images/filename.jpg`
3. Example: Replace `https://images.unsplash.com/photo-...` with `images/hero-bg.jpg`

## Image Guidelines

- **Format:** JPG for photos, PNG for graphics with transparency, WebP for best compression
- **Hero image:** At least 1600px wide, optimized for web (under 500KB)
- **Content images:** 800px wide recommended, optimized (under 200KB each)
- **Alt text:** All `<img>` tags already contain descriptive alt text — update if you change images
- **NO:** Wheelchairs, stretchers, ambulances, hospital beds, or anything that looks like emergency transport
- **YES:** Diverse adults and seniors, smiling people, professional environments, warm and inviting imagery

## Brand Notes

- Primary Blue: #2563EB
- Healthcare Green: #10B981
- Avoid: bright yellow, orange (taxi-associated colors)
- Target audience: ambulatory adults and seniors needing medical transportation in Louisville, KY

---
*Lifeline Ride Services — Louisville, Kentucky | LifelineRides.com*
