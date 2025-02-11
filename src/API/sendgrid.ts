import axios from 'axios'

const sendGridApiKey = process.env.REACT_APP_SENDGRID_API_KEY

export const saveEmailToSendgridInnerRoute = async (email: string) => {
  const url = 'https://api.sendgrid.com/v3/marketing/contacts'
  const data = { contacts: [{ email }] }

  try {
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${sendGridApiKey}`,
        'Content-Type': 'application/json',
      },
    })

    console.log('Contact added successfully:', response.data)
  } catch (error: any) {
    console.error('Error adding contact:', error.response?.data || error.message)
  }
}
