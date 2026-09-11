import { chromium } from 'playwright-core'

const browser = await chromium.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
})

const viewports = [
  ['768x1024', 768, 1024],
  ['430x932', 430, 932],
  ['390x844', 390, 844],
  ['360x800', 360, 800],
]

const rect = (element) => {
  const value = element.getBoundingClientRect()
  return {
    left: value.left,
    right: value.right,
    top: value.top,
    bottom: value.bottom,
    width: value.width,
    height: value.height,
  }
}

const results = []

for (const [name, width, height] of viewports) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: width <= 874 ? 3 : 1,
    hasTouch: width <= 874,
    isMobile: width <= 430,
    reducedMotion: 'no-preference',
  })
  const page = await context.newPage()
  await page.addInitScript(() => {
    window.rect = (element) => {
      const value = element.getBoundingClientRect()
      return {
        left: value.left,
        right: value.right,
        top: value.top,
        bottom: value.bottom,
        width: value.width,
        height: value.height,
      }
    }
  })
  const errors = []
  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') {
      errors.push(`${message.type()}: ${message.text()}`)
    }
  })
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`))
  await page.goto(`http://127.0.0.1:4176/?audit=${name}`, { waitUntil: 'networkidle' })
  await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}' })
  await page.evaluate(async () => {
    await document.fonts?.ready
    await Promise.all(
      [...document.images]
        .filter((image) => image.complete)
        .map((image) => image.decode?.().catch(() => undefined)),
    )
    window.dispatchEvent(new Event('resize'))
  })
  await page.waitForTimeout(450)

  const initial = await page.evaluate(() => {
    const copy = rect(document.querySelector('.hero__copy'))
    const phones = [...document.querySelectorAll('[data-hero-phone] .phone')].map(rect)
    const intersects = (a, b) =>
      Math.max(a.left, b.left) < Math.min(a.right, b.right) &&
      Math.max(a.top, b.top) < Math.min(a.bottom, b.bottom)
    return {
      width: innerWidth,
      height: innerHeight,
      scrollWidth: document.documentElement.scrollWidth,
      heroHeight: rect(document.querySelector('.hero')).height,
      copy,
      phones,
      copyPhoneOverlap: phones.some((phone) => intersects(copy, phone)),
      clippedPhones: phones.some((phone) =>
        phone.left < -1 || phone.right > innerWidth + 1 || phone.top < -1 || phone.bottom > innerHeight + 1,
      ),
      mobileFallbackVisible: getComputedStyle(document.querySelector('.product-story')).display !== 'none',
      storyVisible: getComputedStyle(document.querySelector('.hero__story')).display !== 'none',
      heroPhoneAnimation: getComputedStyle(document.querySelector('.hero__phone .phone')).animationName,
    }
  })

  const end = initial.heroHeight - height
  const states = []
  for (const [label, ratio] of [['lucida', 1.92 / 4.8], ['hera', 3.35 / 4.8], ['nirvaan', 1]]) {
    await page.evaluate((target) => window.scrollTo(0, target), end * ratio)
    await page.waitForTimeout(1250)
    states.push(await page.evaluate((expectedLabel) => {
      const panels = [...document.querySelectorAll('[data-hero-product]')]
      const activeIndex = panels.findIndex((panel) => {
        const style = getComputedStyle(panel)
        return style.visibility === 'visible' && Number(style.opacity) > 0.9
      })
      const panel = panels[activeIndex] ? rect(panels[activeIndex]) : null
      const phone = rect(document.querySelector('[data-hero-story-phone]'))
      const sourcePhone = rect(document.querySelector('[data-hero-phone="0"]'))
      return {
        expectedLabel,
        y: scrollY,
        activeIndex,
        identities: [...document.querySelectorAll('[data-phone-identity]')].map((identity) =>
          Number(getComputedStyle(identity).opacity),
        ),
        phone,
        sourcePhone,
        panel,
        phoneClipped: phone.left < -1 || phone.right > innerWidth + 1 || phone.top < -1 || phone.bottom > innerHeight + 1,
        panelClipped: panel
          ? panel.left < -1 || panel.right > innerWidth + 1 || panel.top < -1 || panel.bottom > innerHeight + 1
          : true,
        centerDelta: panel
          ? panel.top + panel.height / 2 - (phone.top + phone.height / 2)
          : null,
        handoffDelta: expectedLabel === 'lucida'
          ? {
              x: sourcePhone.left + sourcePhone.width / 2 - (phone.left + phone.width / 2),
              y: sourcePhone.top + sourcePhone.height / 2 - (phone.top + phone.height / 2),
              scale: sourcePhone.width / phone.width,
            }
          : null,
        phoneAnimation: getComputedStyle(document.querySelector('.hero__story-phone .story-phone')).animationName,
      }
    }, label))
  }

  const reverse = []
  for (const state of states.slice(0, 2).reverse()) {
    await page.evaluate((target) => window.scrollTo(0, target), state.y + 2)
    await page.waitForTimeout(1250)
    reverse.push(await page.evaluate((expectedLabel) => ({
      expectedLabel,
      activeIndex: [...document.querySelectorAll('[data-hero-product]')].findIndex((panel) => {
        const style = getComputedStyle(panel)
        return style.visibility === 'visible' && Number(style.opacity) > 0.9
      }),
    }), state.expectedLabel))
  }

  let gestures = null
  if (name === '1440x900' || name === '390x844') {
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(850)
    await page.mouse.move(width / 2, height / 2)
    const forward = []
    for (let index = 0; index < 3; index += 1) {
      await page.mouse.wheel(0, height * 0.8)
      await page.waitForTimeout(1350)
      forward.push(await page.evaluate(() => ({
        y: scrollY,
        activeIndex: [...document.querySelectorAll('[data-hero-product]')].findIndex((panel) => {
          const style = getComputedStyle(panel)
          return style.visibility === 'visible' && Number(style.opacity) > 0.9
        }),
      })))
    }
    const backward = []
    for (let index = 0; index < 2; index += 1) {
      await page.mouse.wheel(0, height * -0.8)
      await page.waitForTimeout(1350)
      backward.push(await page.evaluate(() => ({
        y: scrollY,
        activeIndex: [...document.querySelectorAll('[data-hero-product]')].findIndex((panel) => {
          const style = getComputedStyle(panel)
          return style.visibility === 'visible' && Number(style.opacity) > 0.9
        }),
      })))
    }
    gestures = { forward, backward }
  }

  const sections = []
  for (const selector of ['.convergence', '.about', '.footer']) {
    await page.locator(selector).scrollIntoViewIfNeeded()
    await page.waitForTimeout(450)
    sections.push(await page.evaluate((target) => {
      const element = document.querySelector(target)
      const bounds = rect(element)
      return {
        selector: target,
        visible: bounds.bottom > 0 && bounds.top < innerHeight,
        left: bounds.left,
        right: bounds.right,
        scrollWidth: document.documentElement.scrollWidth,
      }
    }, selector))
  }

  const footer = await page.evaluate(() => {
    const element = document.querySelector('.footer')
    const bounds = rect(element)
    const email = rect(document.querySelector('.footer__email'))
    const bottom = rect(document.querySelector('.footer__bottom'))
    return {
      bounds,
      email,
      bottom,
      emailVisible: email.bottom > 0 && email.top < innerHeight,
      contained: email.left >= -1 && email.right <= innerWidth + 1 && bottom.left >= -1 && bottom.right <= innerWidth + 1,
    }
  })

  results.push({ name, initial, states, reverse, gestures, sections, footer, errors })
  await context.close()
}

const reduced = []
for (const [name, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion: 'reduce',
    hasTouch: name === 'mobile',
    isMobile: name === 'mobile',
  })
  const page = await context.newPage()
  await page.addInitScript(() => {
    window.rect = (element) => {
      const value = element.getBoundingClientRect()
      return {
        left: value.left,
        right: value.right,
        top: value.top,
        bottom: value.bottom,
        width: value.width,
        height: value.height,
      }
    }
  })
  const errors = []
  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto(`http://127.0.0.1:4176/?audit=reduced-${name}`, { waitUntil: 'networkidle' })
  reduced.push(await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    heroHeight: rect(document.querySelector('.hero')).height,
    story: getComputedStyle(document.querySelector('.hero__story')).display,
    productStory: getComputedStyle(document.querySelector('.product-story')).display,
    cards: [...document.querySelectorAll('.mobile-product')].map((card) => ({
      visible: getComputedStyle(card).display !== 'none' && getComputedStyle(card).opacity === '1',
      transform: getComputedStyle(card).transform,
      hasDate: /(?:August|October|December) 2026/.test(card.textContent),
    })),
    heroIdle: getComputedStyle(document.querySelector('.hero__phone .phone')).animationName,
    productIdle: getComputedStyle(document.querySelector('.mobile-product .phone')).animationName,
    pointerX: getComputedStyle(document.querySelector('.hero__phones')).getPropertyValue('--pointer-x').trim(),
    transitionDuration: getComputedStyle(document.querySelector('.hero__phones')).transitionDuration,
    links: [...document.querySelectorAll('a')].map((link) => link.getAttribute('href')),
  })))
  reduced.at(-1).name = name
  reduced.at(-1).errors = errors
  await context.close()
}

const metaContext = await browser.newContext({ viewport: { width: 1280, height: 800 } })
const metaPage = await metaContext.newPage()
await metaPage.addInitScript(() => {
  window.rect = (element) => {
    const value = element.getBoundingClientRect()
    return {
      left: value.left,
      right: value.right,
      top: value.top,
      bottom: value.bottom,
      width: value.width,
      height: value.height,
    }
  }
})
await metaPage.goto('http://127.0.0.1:4176/?audit=meta', { waitUntil: 'networkidle' })
await metaPage.locator('.skip-link').focus()
const metadata = await metaPage.evaluate(() => {
  const skip = document.querySelector('.skip-link')
  const skipStyle = getComputedStyle(skip)
  const headings = [...document.querySelectorAll('h1,h2')].map((heading) => ({
    level: heading.tagName,
    name: heading.getAttribute('aria-label') || heading.textContent.trim(),
  }))
  return {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content,
    canonical: document.querySelector('link[rel="canonical"]')?.href,
    favicon: document.querySelector('link[rel="icon"]')?.href,
    og: {
      url: document.querySelector('meta[property="og:url"]')?.content,
      title: document.querySelector('meta[property="og:title"]')?.content,
      description: document.querySelector('meta[property="og:description"]')?.content,
      image: document.querySelector('meta[property="og:image"]')?.content,
    },
    organization: JSON.parse(document.querySelector('script[type="application/ld+json"]')?.textContent || '{}'),
    headings,
    focus: {
      activeText: document.activeElement?.textContent?.trim(),
      outline: skipStyle.outline,
      boxShadow: skipStyle.boxShadow,
      top: rect(skip).top,
    },
    images: [...document.querySelectorAll('img')].map((image) => ({ src: image.getAttribute('src'), alt: image.alt })),
    links: [...document.querySelectorAll('a')].map((link) => ({
      text: link.textContent.trim(),
      href: link.getAttribute('href'),
      label: link.getAttribute('aria-label'),
    })),
    order: [...document.querySelectorAll('.convergence figcaption')].map((item) => item.textContent.trim()),
    landmarks: [...document.querySelectorAll('header,nav,main,section,footer')].map((item) => item.tagName),
  }
})
await metaContext.close()
await browser.close()

console.log(JSON.stringify({
  viewports: results.map((result) => ({
    name: result.name,
    overflow: result.initial.scrollWidth - result.initial.width,
    copyPhoneOverlap: result.initial.copyPhoneOverlap,
    clippedHeroPhones: result.initial.clippedPhones,
    dynamicStory: result.initial.storyVisible && !result.initial.mobileFallbackVisible,
    states: result.states.map((state) => ({
      label: state.expectedLabel,
      activeIndex: state.activeIndex,
      identity: state.identities.indexOf(Math.max(...state.identities)),
      phoneClipped: state.phoneClipped,
      panelClipped: state.panelClipped,
      centerDelta: state.centerDelta,
      handoffDelta: state.handoffDelta,
    })),
    reverse: result.reverse,
    sectionsVisible: result.sections.every((section) => section.visible),
    footerContained: result.footer.contained && result.footer.emailVisible,
    errors: result.errors,
  })),
  reduced: reduced.map(({ name, scrollWidth, heroHeight, story, productStory, cards, heroIdle, productIdle, pointerX, errors }) => ({
    name, scrollWidth, heroHeight, story, productStory, cards, heroIdle, productIdle, pointerX, errors,
  })),
  metadata: {
    title: metadata.title,
    canonical: metadata.canonical,
    order: metadata.order,
    focus: metadata.focus,
  },
}, null, 2))
