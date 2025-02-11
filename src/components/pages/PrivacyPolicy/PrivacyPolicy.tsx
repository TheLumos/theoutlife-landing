'use client'

import React from 'react'
import styles from './PrivacyPolicy.module.scss'
import Logo from '/public/svg/logo.svg'

const STRINGS = {
  title: 'Privacy Policy',
  effectiveDate: `Effective Date: ${new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })}`,
  pp: 'At Lumos, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your email address when you interact with our website.',
}

const homeLink = '/lumos'

const PrivacyPolicy = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <a className={styles.logo} href={homeLink} target={'_blank'} rel='noreferrer'>
          <Logo />
        </a>
      </header>

      <div className={styles.content}>
        <h1 className={styles.title}>{STRINGS.title}</h1>
        <div className={styles.effectiveDate}>{STRINGS.effectiveDate}</div>
        <div className={styles.pp}>
          {STRINGS.pp}
          <div>
            <p>1. Information We Collect</p>
            <p>We collect the following personal information:</p>
            <ul>
              <li>Your email address (provided through the “Get in Touch” form)</li>
            </ul>
          </div>
          <div>
            <p>2. How We Use Your Information</p>
            <p>Your email address is used to:</p>
            <ul>
              <li>Communicate with you about our services, updates, or relevant opportunities.</li>
              <li>Respond to inquiries or requests you make.</li>
            </ul>
          </div>
          <div>
            <p>3. Data Sharing</p>
            <p className={styles.pp__sm}>
              We do not sell or share your email address with third parties, except with trusted service providers
              (e.g., email management platforms) who assist in delivering our communications.
            </p>
          </div>
          <div>
            <p>4. Data Retention</p>
            <p className={styles.pp__sm}>
              We retain your email address only as long as necessary to provide our services or comply with legal
              obligations.
            </p>
          </div>
          <div>
            <p>5. Your Rights</p>
            <p>You have the right to:</p>
            <ul>
              <li>Opt out of communications at any time.</li>
              <li>Request the deletion of your email from our records.</li>
              To exercise these rights, contact us at contact@thelumos.ai.
            </ul>
          </div>
          <div>
            <p> 6. Your Rights</p>
            <p className={styles.pp__sm}>
              Data Security We implement measures to protect your email address from unauthorized access, loss, or
              misuse.
            </p>
          </div>
          <div>
            <p>7. Changes to This Privacy Policy</p>
            <p className={styles.pp__sm}>
              We may update this Privacy Policy periodically. Updates will be posted on this page with the revised
              effective date.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
