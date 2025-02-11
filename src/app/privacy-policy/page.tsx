import PrivacyPolicy from '@/components/pages/PrivacyPolicy/PrivacyPolicy'
import React from 'react'

export async function generateMetadata() {
  return {
    title: 'Privacy Policy',
    description: 'Privacy Policy',
  }
}

const page = () => {
  return <PrivacyPolicy />
}

export default page
