'use client'

import React, { useEffect, useMemo, useState, FormEvent, useRef } from 'react'
import styles from './Home.module.scss'

import Logo from '/public/svg/logo.svg'
import MicrosoftIcon from '/public/svg/microsoft.svg'
import OpenAiIcon from '/public/svg/openai.svg'
import MetaIcon from '/public/svg/meta.svg'
import MarkerIcon from '/public/svg/marker.svg'
import classNames from 'classnames'
import { validateEmail } from '@/utils/validators'
import { identifyCioUser } from '@/API/customerIO'

const STRINGS = {
  seo: {
    title: 'Lumos – AI Medical Observability & Labeling Platform',
    description:
      'Lumos empowers medical AI teams with advanced observability and precise data labeling. Improve AI accuracy, ensure compliance, and streamline model evaluation with cutting-edge tools. Optimize your AI today.',
    image: '/images/lumos-favicon-v1.png',
  },
  form: {
    subtitle: 'Evaluation & labeling',
    title_1: 'Eyes to find the boundaries of your ',
    title_2: ' model.',
    placeholder: 'Email',
    submitBtn: 'Get in Touch',
    submitedText: "We'll get in touch with you soon!",
  },
  handSection: {
    text: 'Our team previously delivered projects for ',
  },
  footer: {
    copyright: `© Lumos ${new Date().getFullYear()}`,
    privacyPolicyLink: 'Privacy Policy',
  },
}
const privacyPolicyLink = '/privacy-policy'

const hightlights = ['medical', 'health', 'chemistry', 'biology']

const Lumos = () => {
  const [email, setEmail] = useState('')
  const [isEmailError, setIsEmailError] = useState(false)
  const [isEmailSaved, setIsEmailSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isEmailValid = useMemo(() => validateEmail(email), [email])

  useEffect(() => {
    if (isEmailValid && isEmailError) {
      setIsEmailError(false)
    }
  }, [isEmailValid, isEmailError])

  const handleSubmitForm = async (event: FormEvent) => {
    event.preventDefault()

    try {
      setIsLoading(true)
      setError(null)

      if (!isEmailValid) {
        setIsEmailError(true)
        return
      }

      // Add timestamp and sanitize email
      const sanitizedEmail = email.toLowerCase().trim()

      // Identify the user through our API route
      await identifyCioUser(sanitizedEmail, {
        email: sanitizedEmail,
        created_at: Math.floor(Date.now() / 1000),
      })

      setEmail('')
      setIsEmailSaved(true)
    } catch (error) {
      console.error('Form submission error:', error)
      setError('Failed to submit form. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const renderVideo = (src: string) => {
    return <video src={src} playsInline autoPlay loop muted />
  }

  // Add loading state to UI
  const buttonText = isLoading ? 'Submitting...' : STRINGS.form.submitBtn
  const buttonDisabled = isLoading

  // Add error message display
  const errorMessage = error && <div className={styles.error}>{error}</div>

  const intervalRef = useRef<any>(null)
  const hightlightsRef = useRef<HTMLSpanElement>(null)

  const [activeHightligthIndex, setActiveHightlightIndex] = useState(0)

  const { width } = useMemo(() => {
    const activeHightligth = hightlightsRef.current?.children[activeHightligthIndex]
    if (!activeHightligth) return { width: undefined, height: undefined }

    const { width } = activeHightligth.getBoundingClientRect()
    return { width }
  }, [activeHightligthIndex])

  useEffect(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActiveHightlightIndex((v) => (v + 1) % hightlights.length)
    }, 2600)
  }, [])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Logo className={styles.logo} />
      </header>
      <div className={styles.content}>
        <div className={styles.leftSide}>
          <div className={styles.formSection}>
            <h2 className={styles.formSubtitle}>{STRINGS.form.subtitle}</h2>
            <h1 className={styles.formTitle}>
              <span>{STRINGS.form.title_1}</span>
              <span ref={hightlightsRef} className={styles.hightlightsContainer} style={{ width }}>
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

              <span>{STRINGS.form.title_2}</span>
            </h1>

            <div className={styles.form}>
              {isEmailSaved ? (
                <>
                  <div className={styles.formSubmitedText}>{STRINGS.form.submitedText}</div>
                  <MarkerIcon className={styles.formSubmitedMarker} />
                </>
              ) : (
                <>
                  <input
                    type='email'
                    className={classNames(styles.formInput, { [styles.error]: isEmailError })}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={STRINGS.form.placeholder}
                  />
                  {errorMessage}
                  <button className={styles.formSubmitBtn} onClick={handleSubmitForm} disabled={buttonDisabled}>
                    {buttonText}
                  </button>
                </>
              )}
            </div>
          </div>

          <div className={styles.handSection}>
            <div className={styles.handVideo}>{renderVideo('/video/hand.mp4')}</div>

            <div className={styles.handSectionContent}>
              <div className={styles.handSectionText}>{STRINGS.handSection.text}</div>
              <div className={styles.companies}>
                <MicrosoftIcon />
                <OpenAiIcon />
                <MetaIcon />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.rightSideVideo}>{renderVideo('/video/cell-video-desktop.mp4')}</div>
          <div className={styles.rightSideVideoMobile}>{renderVideo('/video/cells-video-mobile.mp4')}</div>
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

export default Lumos
