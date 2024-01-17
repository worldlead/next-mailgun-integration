"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
require('dotenv').config();


export default function Home() {

  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');


  const sendInfo = async () => {
    await axios.post('/api/mailgun', { to, subject, message });
  }

  return (
    <main >
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[800px] bg-white p-12">
          <div className="mb-5">
            <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
              Email Address
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={to}
              placeholder="example@domain.com"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              required
              onChange={e => setTo(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="subject" className="mb-3 block text-base font-medium text-[#07074D]">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              value={subject}
              placeholder='Enter your subject'
              required
              onChange={e => setSubject(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="mb-3 block text-base font-medium text-[#07074D]">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder='Type your message'
              className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              value={message}
              required
              onChange={e => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button
              className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
              onClick={sendInfo}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </main >
  )
}



