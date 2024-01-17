import { NextApiRequest, NextApiResponse } from "next";
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const client = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY as string});
const DOMAIN = process.env.MAILGUN_DOMAIN as string
const FORWARD_URL = process.env.FORWARD_URL as string


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if(req.method === 'POST') {
        try {
            console.log('started')
            const createdRoute = await client.routes.create({
              expression: `match_recipient(".*${DOMAIN}")`,
              action: [`forward("${FORWARD_URL}")`, 'stop()'],
              description: 'Sample route'
            });
            console.log('createdRoute', createdRoute);
            res.status(201).json({status: true})
          } catch (error) {
            console.error(error);
            res.status(500).json({status: true})
          }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}