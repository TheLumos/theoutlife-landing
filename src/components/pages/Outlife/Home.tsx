'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import styles from './Home.module.scss'
import Logo from '/public/svg/logo-outlife.svg'
import classNames from 'classnames'
import Image from 'next/image'

const STRINGS = {
  seo: {
    title: 'Outlife – Get Paid to Train Medical AI. Join the Experts Behind the Future',
    description:
      'Outlife is where medical experts shape the future of AI. Get paid to label medical data, work on your schedule, and contribute to groundbreaking AI models. Turn your expertise into impact—join the leading AI labeling community today.',
    image: '/images/outlife-favicon-v1.png',
  },
  content: {
    title_1: 'Shape next-gen ',
    title_2: ' AI with your expertise.',
    text: 'Get paid training AI on your own schedule.',
    button: 'Join Community',
  },
  footer: {
    copyright: `© Outlife ${new Date().getFullYear()}`,
    privacyPolicyLink: 'Privacy Policy',
  },
}
const privacyPolicyLink = '/privacy-policy'
const typeformLink = 'https://form.typeform.com/to/o9VVlIgK'

const hightlights = ['medical', 'health', 'chemistry', 'biology']

const Outlife = () => {
  const intervalRef = useRef<any>(null)
  const hightlightsRef = useRef<HTMLSpanElement>(null)

  const [activeHightligthIndex, setActiveHightlightIndex] = useState(0)

  const { width, height } = useMemo(() => {
    const activeHightligth = hightlightsRef.current?.children[activeHightligthIndex]
    if (!activeHightligth) return { width: undefined, height: undefined }

    const { width, height } = activeHightligth.getBoundingClientRect()
    return { width, height }
  }, [activeHightligthIndex])

  useEffect(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActiveHightlightIndex((v) => (v + 1) % hightlights.length)
    }, 3000)
  }, [])

  const handleRedirectToTypeform = () => {
    window.open(typeformLink)
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Logo className={styles.logo} />
      </header>

      <div className={styles.content}>
        <div className={styles.leftSide}>
          <div className={styles.innerContent}>
            <h1 className={styles.title}>
              {STRINGS.content.title_1}
              <span ref={hightlightsRef} className={styles.hightlightsContainer} style={{ width, height }}>
                {hightlights.map((hightlight, index) => (
                  <span
                    key={`highlight_${index}`}
                    className={classNames(styles.hightlight, {
                      [styles.activeHighlight]: index === activeHightligthIndex,
                    })}
                  >
                    {hightlight}
                  </span>
                ))}
              </span>
              {STRINGS.content.title_2}
            </h1>
            <h2 className={styles.text}>{STRINGS.content.text}</h2>
            <button className={styles.button} onClick={handleRedirectToTypeform}>
              {STRINGS.content.button}
            </button>
          </div>
        </div>
        <div className={styles.rightSide}>
          <Image src={'/webp/outlife-image.webp'} alt={'Image'} width={3320} height={3456} />
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.copyright}>{STRINGS.footer.copyright}</div>

        <a className={styles.privacyPolicyLink} href={privacyPolicyLink} target={'_blank'} rel='noreferrer'>
          {STRINGS.footer.privacyPolicyLink}
        </a>
      </footer>
    </div>
  )
}

export default Outlife
