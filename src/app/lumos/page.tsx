import Lumos from '@/components/pages/Lumos/Home'
import React from 'react'

export async function generateMetadata() {
  return {
    title: 'Lumos – AI Medical Observability & Labeling Platform',
    description:
      'Lumos empowers medical AI teams with advanced observability and precise data labeling. Improve AI accuracy, ensure compliance, and streamline model evaluation with cutting-edge tools. Optimize your AI today.',
  }
}

const page = () => {
  return <Lumos />
}

export default page
