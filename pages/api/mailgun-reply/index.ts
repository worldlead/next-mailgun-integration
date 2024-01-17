import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if(req.method === 'POST') {
        try {
            const { sender, recipient, subject } = req.body;

            const bodyPlain = req.body['body-plain']
            const strippedText = req.body['stripped-text']

            console.log(sender)
            console.log(recipient)
            console.log(subject)
    
            console.log(strippedText)
            res.status(200).json({status: true})
        } catch (error) {
            console.log(error)
            res.status(500).json({  });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}