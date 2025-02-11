'use client'

import React from 'react'
import styles from './PrivacyPolicy.module.scss'
import Logo from '/public/svg/logo-outlife.svg'

const STRINGS = {
  title: 'Privacy Policy',
  effectiveDate: `Effective Date: ${new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })}`,
  pp: 'Your privacy and trust are important to us. This document explains how we collect, use, and protect your personal information and outlines the terms of using our services. By joining our community or using our website, you agree to this Privacy Policy and Terms of Use.',
}

const homeLink = '/'

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
            <p>
              When you join our community through our Typeform or visit our website, we may collect the following
              personal information:
            </p>
            <ul>
              <li>First Name and Last Name</li>
              <li>Email Address</li>
              <li>Field of Expertise</li>
              <li>Sub-Discipline of Field of Expertise</li>
            </ul>
          </div>
          <div>
            <p>2. How We Use Your Information</p>
            <p>We use the information you provide to:</p>
            <ul>
              <li>Build and manage a community of experts.</li>
              <li>Communicate updates, opportunities, and relevant information.</li>
              <li>Improve our services through demographic analysis.</li>
            </ul>
          </div>
          <div>
            <p>3. Data Sharing</p>
            <p className={styles.pp__sm}>
              We do not sell your personal data. However, we may share your information with trusted third-party service
              providers (e.g., email or analytics platforms) to manage communication and operations.
            </p>
          </div>
          <div>
            <p>4. Data Retention</p>
            <p className={styles.pp__sm}>
              Your personal information will be retained only as long as necessary to fulfill the purposes outlined in
              this document or to comply with legal obligations.
            </p>
          </div>
          <div>
            <p>5. Your Rights</p>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information.</li>
              <li>Correct inaccuracies in your data.</li>
              <li>Request the deletion of your data.</li>
              <li>Opt out of communications at any time.</li>
              To exercise these rights, contact us at contact@thelumos.ai.
            </ul>
          </div>
          <div>
            <p>6. Data Security</p>
            <p className={styles.pp__sm}>
              We take appropriate technical and organizational measures to protect your personal data from unauthorized
              access, loss, or misuse.
            </p>
          </div>
          <div>
            <p>7. Changes to This Privacy Policy</p>
            <p className={styles.pp__sm}>
              We may update this Privacy Policy periodically. Updates will be posted on this page with a revised
              effective date.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
