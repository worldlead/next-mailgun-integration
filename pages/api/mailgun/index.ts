import { NextApiRequest, NextApiResponse } from "next";
import Mailgun from 'mailgun.js';
import formData from 'form-data';

const mailgun = new Mailgun(formData as any);
const client = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY as string});
const DOMAIN = process.env.MAILGUN_DOMAIN as string


const sendEmail = async (to: string, subject: string, text: string) => {
    const data = {
      from: `No reply <david@${DOMAIN}>`,
      to,
      subject,
      text,
    };
  
    try {
      const result = await client.messages.create(DOMAIN, data)
      console.log('Email sent successfully:', result);
      return result;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if(req.method === 'POST') {
        try {
            const { to, subject, message } = req.body;
            const result = await sendEmail( to, subject, message);
            console.log({...result})
            res.status(201).json({status: true})
        } catch (error) {
            console.log(error)
            res.status(500).json({  });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}