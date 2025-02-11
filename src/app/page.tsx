import Outlife from '@/components/pages/Outlife/Home'
import React from 'react'

export async function generateMetadata() {
  return {
    title: 'Outlife – Get Paid to Train Medical AI. Join the Experts Behind the Future',
    description:
      'Outlife is where medical experts shape the future of AI. Get paid to label medical data, work on your schedule, and contribute to groundbreaking AI models. Turn your expertise into impact—join the leading AI labeling community today.',
  }
}

const page = () => {
  return <Outlife />
}

export default page
