import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import AboutSectionTitle from './AboutSectionTitle'
import LazyImage from '../utilities/LazyImage'

gsap.registerPlugin(ScrollTrigger)

// Shared by the panel content and the pinned section label so both sit on the
// same column as the panels slide underneath it.
const CONTENT_COLUMN = 'mx-auto w-full max-w-5xl px-8 xl:px-16'

const SURFACE_LIGHT = '#F4F5F8' // bg
const SURFACE_DARK = '#2E3854' // gray-900

// The handover, as fractions of the transition. Something must be legible on
// screen throughout: earlier versions ran the fade across empty space, and then
// handed straight from the page to the panels, and both left a dead stretch of
// blank screen mid-scroll.
//
// The panels are centred in a viewport-tall block, so they only clear the bottom
// edge around the halfway mark — too late to catch the outgoing page on their
// own. The section label sits at the block's top edge instead and arrives much
// earlier, so it is what bridges the two.
const PAGE_DISSOLVE_END = 0.4
const LABEL_REVEAL = { start: 0.2, duration: 0.25 }
const PANELS_REVEAL = { start: 0.45, duration: 0.55 }

// Where the transition begins, as a percentage of viewport height down from the
// top. Starting partway up rather than at the very bottom edge means the section
// label is already within the viewport when the handover starts, so it has
// somewhere to appear. Also keeps the transition shorter than a full screen.
const TRANSITION_START_VH = 60

// All of this section's text is light, so the background has to be well on its
// way to dark before any of it appears — and the page above has to be gone by
// then, since its dark text goes unreadable at the same point. Front-loading the
// colour gets both handovers done early without lengthening the transition.
const SURFACE_EASE = 'power3.out'

function ThemePanel({ title, intro, photos, preload }) {
  return (
    <div
      data-panel
      className="py-16 first:pt-0 last:pb-0 md:h-full md:w-full md:shrink-0 md:flex md:flex-col md:justify-center md:py-0"
    >
      {/* Full-bleed panels are viewport-wide, so the content column is what
          creates the visible breathing room between one theme and the next. */}
      <div className={`${CONTENT_COLUMN} space-y-10`}>
        <div className="space-y-3">
          <h3 className="text-h1 font-bold text-white">{title}</h3>
          <p className="max-w-2xl text-p text-gray-200">{intro}</p>
        </div>

        <div className="columns-2 gap-4 md:flex md:gap-4">
          {photos.map((photo, idx) => (
            <div
              key={idx}
              className="group relative mb-4 cursor-pointer overflow-hidden rounded-lg break-inside-avoid md:mb-0 md:aspect-[4/3] md:min-w-0 md:flex-1"
            >
              <LazyImage
                src={photo.src}
                alt={photo.caption}
                preload={preload}
                className="w-full h-auto md:h-full md:object-cover"
              />
              <div className="absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-center justify-center px-4 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <p className="text-center text-caption text-white">
                  <span className="font-bold">{photo.year}</span> · {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function AboutValuesTimeline({
  title,
  items,
  surfaceRef,
  precedingRef,
  onDarkChange,
}) {
  const bandRef = useRef(null)
  const rootRef = useRef(null)
  const labelRef = useRef(null)
  const trackRef = useRef(null)
  // Panels that start off-screen never intersect, so lazy-loading would pop in
  // mid-scroll. Preload the whole set once the section is close instead.
  const [preload, setPreload] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setPreload(true)
          observer.disconnect()
        }
      },
      { rootMargin: '600px' }
    )
    observer.observe(root)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const panels = gsap.utils.toArray('[data-panel]', trackRef.current)
      if (panels.length < 2) return

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: () => `+=${rootRef.current.offsetWidth * (panels.length - 1)}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    })

    return () => mm.revert()
    // Keyed on panel count, not `items`: the parent hands us a freshly mapped
    // array every render, and tearing the pin down mid-scroll resets the page
    // height and jumps the scroll position.
  }, [items.length])

  // Scrub the whole page from light to dark as the section arrives, rather than
  // painting a dark block with a hard edge. Runs at every breakpoint and under
  // reduced motion: a colour crossfade carries no movement, only the pin does.
  //
  // There is deliberately no fade back to light — this is the last section, so
  // there is no scroll room after it. The page settles on dark, and scrolling
  // back up reverses the fade.
  useEffect(() => {
    const surface = surfaceRef?.current
    const preceding = precedingRef?.current
    const label = labelRef.current
    const track = trackRef.current
    if (!bandRef.current || !surface || !preceding || !label || !track) return

    // The reveal tweens start partway into the timeline, and GSAP does not apply
    // a tween's "from" value before its start time — so hide these up front.
    gsap.set([label, track], { opacity: 0 })

    const timeline = gsap.timeline({
      defaults: { ease: 'none', immediateRender: false },
      scrollTrigger: {
        trigger: bandRef.current,
        start: `top ${TRANSITION_START_VH}%`,
        end: 'top top',
        scrub: true,
        invalidateOnRefresh: true,
      },
    })

    timeline
      .fromTo(
        surface,
        { backgroundColor: SURFACE_LIGHT },
        { backgroundColor: SURFACE_DARK, duration: 1, ease: SURFACE_EASE },
        0
      )
      .fromTo(preceding, { opacity: 1 }, { opacity: 0, duration: PAGE_DISSOLVE_END }, 0)
      .fromTo(
        label,
        { opacity: 0 },
        { opacity: 1, duration: LABEL_REVEAL.duration },
        LABEL_REVEAL.start
      )
      .fromTo(
        track,
        { opacity: 0 },
        { opacity: 1, duration: PANELS_REVEAL.duration },
        PANELS_REVEAL.start
      )

    return () => {
      timeline.scrollTrigger?.kill()
      timeline.kill()
      gsap.set([surface, preceding, label, track], { clearProps: 'backgroundColor,opacity' })
    }
  }, [items.length, surfaceRef, precedingRef])

  // The navbar's own colours are tuned for the light page, so tell the page when
  // the background behind it has gone dark. Flipped at the fade's midpoint, where
  // the navbar's 300ms colour transition blends into the scrub.
  useEffect(() => {
    if (!onDarkChange) return

    // Measured directly rather than via ScrollTrigger: onToggle never reports the
    // initial state, and the pin rewrites this element's layout underneath it.
    // The band keeps its layout box while its child is pinned, so the rect stays
    // accurate either way.
    const update = () => {
      const rect = bandRef.current?.getBoundingClientRect()
      if (!rect) return
      // A third into the transition, by which point the front-loaded colour has
      // already taken the background past mid-grey.
      const threshold = (window.innerHeight * TRANSITION_START_VH) / 100 / 1.5
      onDarkChange(rect.top <= threshold && rect.bottom > 0)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      onDarkChange(false)
    }
  }, [onDarkChange])

  return (
    // Break out of the page's centered max-w-3xl column so the panels can run
    // edge to edge. The negative margin is applied to this wrapper rather than
    // the pinned element so GSAP's pin-spacer never has to reason about it, and
    // it requires overflow-x: clip on the page root.
    //
    // Ordinary section spacing — the transition no longer needs a run-up.
    <div ref={bandRef} className="mt-24 w-screen ml-[calc(50%-50vw)] py-16 md:py-0">
      <div ref={rootRef} className="relative md:h-screen md:overflow-hidden">
        <div
          ref={labelRef}
          className="mb-10 md:absolute md:inset-x-0 md:top-0 md:z-10 md:mb-0 md:pt-32"
        >
          <div className={CONTENT_COLUMN}>
            <AboutSectionTitle className="text-gray-400">{title}</AboutSectionTitle>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex flex-col divide-y divide-gray-700 md:h-full md:flex-row md:divide-y-0"
        >
          {items.map((item, idx) => (
            <ThemePanel
              key={idx}
              title={item.title}
              intro={item.body}
              photos={item.photos}
              preload={preload}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
