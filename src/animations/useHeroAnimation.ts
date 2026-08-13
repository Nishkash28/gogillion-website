import type { RefObject } from 'react'
import { gsap, ScrollTrigger, useGSAP } from './registerGsap'

const desktopMotion =
  '(min-width: 769px) and (min-height: 601px) and (prefers-reduced-motion: no-preference)'
const compactMotion =
  '(max-width: 768px) and (prefers-reduced-motion: no-preference), ' +
  '(max-height: 600px) and (orientation: landscape) and (prefers-reduced-motion: no-preference)'

export function useHeroAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      const buildStory = (compact: boolean) => {
        const narrow = window.matchMedia('(max-width: 768px)').matches
        const sourcePhone = scope.current?.querySelector<HTMLElement>('[data-hero-phone="0"]')
        const destinationPhone = scope.current?.querySelector<HTMLElement>('[data-hero-story-phone]')
        const heroStage = scope.current?.querySelector<HTMLElement>('[data-hero-stage]')
        const heroPhones = scope.current?.querySelector<HTMLElement>('.hero__phones')
        const heroStory = scope.current?.querySelector<HTMLElement>('[data-hero-story]')
        const storyDivider = scope.current?.querySelector<HTMLElement>('[data-hero-story-divider]')
        const storyDevice = destinationPhone?.querySelector<HTMLElement>('.story-phone')
        const storyLight = storyDevice?.querySelector<HTMLElement>('.phone__screen-light')
        const heroDevices = scope.current?.querySelectorAll<HTMLElement>('[data-hero-phone] .phone')
        const heroScreenLights = scope.current?.querySelectorAll<HTMLElement>(
          '[data-hero-phone] .phone__screen-light',
        )
        const productPanels = scope.current?.querySelectorAll<HTMLElement>('[data-hero-product]')
        const phoneIdentities = scope.current?.querySelectorAll<HTMLElement>('[data-phone-identity]')
        if (
          !sourcePhone || !destinationPhone || !heroStage || !heroPhones || !heroStory ||
          !storyDivider || !storyDevice || !storyLight || !heroDevices?.length ||
          !heroScreenLights?.length || !productPanels?.length || !phoneIdentities?.length
        ) return

        gsap.from('[data-hero-copy] > *', {
          y: compact ? 22 : 24,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        })

        gsap.from('[data-hero-phone]', {
          x: compact ? (index) => (index - 1) * 18 : 0,
          y: compact ? 54 : 90,
          opacity: 0,
          rotateY: compact ? (index) => (index - 1) * -5 : 0,
          duration: compact ? 1.05 : 1.15,
          stagger: 0.12,
          ease: 'power3.out',
        })

        gsap.set(productPanels, { autoAlpha: 0, y: compact ? 20 : 28 })
        gsap.set(phoneIdentities, { autoAlpha: 0 })
        gsap.set(phoneIdentities[0], { autoAlpha: 1 })
        gsap.set(sourcePhone, { autoAlpha: 1 })
        gsap.set(destinationPhone, { autoAlpha: 0, x: 0, rotateY: 0 })
        gsap.set(storyDivider, { x: 0 })
        gsap.set([storyDevice, storyLight], { animationPlayState: 'paused' })

        const getHandoff = () => {
          const source = sourcePhone.getBoundingClientRect()
          const destination = destinationPhone.getBoundingClientRect()
          const sourceWidth = sourcePhone.offsetWidth || source.width
          const destinationWidth = destinationPhone.offsetWidth || destination.width
          return {
            x: destination.left + destination.width / 2 - (source.left + source.width / 2),
            y: destination.top + destination.height / 2 - (source.top + source.height / 2),
            scale: destinationWidth / sourceWidth,
          }
        }

        const getHerATranslateX = () => {
          const rail = heroStory.getBoundingClientRect()
          const phoneWidth = destinationPhone.offsetWidth
          const leftInset = rail.width * (compact ? 0.055 : 0.08)
          return rail.right - leftInset - phoneWidth - (rail.left + leftInset)
        }

        const getDividerTranslateX = () => compact
          ? heroStory.getBoundingClientRect().width * (narrow ? 0.28 : 0.36)
          : 0

        const getPanelMiddleY = (index: number) => {
          const panel = productPanels[index]
          if (!panel) return 0
          const phoneRect = destinationPhone.getBoundingClientRect()
          const panelRect = panel.getBoundingClientRect()
          const currentY = Number(gsap.getProperty(panel, 'y')) || 0
          const phoneCenter = phoneRect.top + phoneRect.height / 2
          const panelCenterWithoutTransform = panelRect.top + panelRect.height / 2 - currentY
          return phoneCenter - panelCenterWithoutTransform
        }

        const timeline = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: scope.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: compact ? 0.72 : 1.1,
            pin: heroStage,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: 'labelsDirectional',
              duration: compact ? { min: 0.3, max: 0.58 } : { min: 0.42, max: 0.8 },
              delay: compact ? 0.06 : 0.08,
              ease: 'power2.inOut',
              inertia: false,
            },
          },
        })

        timeline
          .addLabel('hero', 0)
          .to({}, { duration: 0.48 })
          .to('[data-hero-copy]', { y: compact ? -34 : -48, opacity: 0, duration: 0.82 }, 0.48)
          .to('.hero__orbit, .hero__depth-glow', { opacity: 0, scale: 0.84, duration: 0.9 }, 0.55)
          .set(heroPhones, { pointerEvents: 'none' }, 0.45)
          .to(heroPhones, { '--pointer-x': '0deg', '--pointer-y': '0deg', duration: 0.22 }, 0.45)
          .set(heroDevices, { animation: 'none' }, 0.45)
          .set(heroScreenLights, { animationPlayState: 'paused' }, 0.45)
          .to(sourcePhone, {
            x: 0,
            y: 0,
            yPercent: 0,
            z: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            duration: 0.25,
          }, 0.45)
          .to('[data-hero-phone="1"]', {
            x: compact ? '22vw' : '15vw', z: -360, scale: 0.66, opacity: 0, duration: 1.05,
          }, 0.5)
          .to('[data-hero-phone="2"]', {
            x: compact ? '28vw' : '18vw', z: -460, scale: 0.58, opacity: 0, duration: 1.05,
          }, 0.56)
          .to(sourcePhone, {
            x: () => getHandoff().x,
            y: () => getHandoff().y,
            scale: () => getHandoff().scale,
            z: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            duration: 1.22,
          }, 0.7)
          .to(heroStage, { backgroundColor: '#e9e9e4', duration: 1.15 }, 0.68)
          .to('.scroll-cue', { autoAlpha: 0, duration: 0.35 }, 0.75)
          .to(storyDivider, { opacity: 1, duration: 0.7 }, 1.05)
          .to(productPanels[0], {
            autoAlpha: 1,
            y: () => getPanelMiddleY(0),
            duration: 0.72,
            ease: 'power3.out',
          }, 1.18)
          .to(destinationPhone, { autoAlpha: 1, duration: 0.22 }, 1.72)
          .to(sourcePhone, { autoAlpha: 0, duration: 0.22 }, 1.72)
          .set([storyDevice, storyLight], { animationPlayState: 'running' }, 1.82)
          .addLabel('lucida', 1.92)
          .to(productPanels[0], { autoAlpha: 0, y: compact ? -24 : -34, duration: 0.48 }, 2.12)
          .to(phoneIdentities[0], { autoAlpha: 0, duration: 0.32 }, 2.18)
          .to(phoneIdentities[1], { autoAlpha: 1, duration: 0.38 }, 2.46)
          .to(destinationPhone, {
            x: () => getHerATranslateX(),
            rotateY: -7,
            duration: 1.12,
          }, 2.12)
          .to(storyDivider, { x: () => getDividerTranslateX(), duration: 1.12 }, 2.12)
          .to(productPanels[1], {
            autoAlpha: 1,
            y: () => getPanelMiddleY(1),
            duration: 0.62,
            ease: 'power3.out',
          }, 2.54)
          .addLabel('hera', 3.35)
          .to(productPanels[1], { autoAlpha: 0, y: compact ? -24 : -34, duration: 0.48 }, 3.57)
          .to(phoneIdentities[1], { autoAlpha: 0, duration: 0.32 }, 3.64)
          .to(phoneIdentities[2], { autoAlpha: 1, duration: 0.38 }, 3.91)
          .to(destinationPhone, { x: 0, rotateY: 7, duration: 1.12 }, 3.57)
          .to(storyDivider, { x: 0, duration: 1.12 }, 3.57)
          .to(productPanels[2], {
            autoAlpha: 1,
            y: () => getPanelMiddleY(2),
            duration: 0.62,
            ease: 'power3.out',
          }, 4.02)
          .addLabel('nirvaan', 4.8)

        const refresh = () => ScrollTrigger.refresh()
        document.fonts?.ready.then(refresh)
        window.addEventListener('load', refresh, { once: true })

        return () => window.removeEventListener('load', refresh)
      }

      mm.add(desktopMotion, () => buildStory(false))
      mm.add(compactMotion, () => buildStory(true))

      return () => mm.revert()
    },
    { scope },
  )
}
