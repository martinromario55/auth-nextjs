'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const VerifyEmailPage = () => {
  const [token, setToken] = useState('')
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)

  const verifyUserEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token })
      setVerified(true)
    } catch (error: any) {
      setError(true)
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1]
    setToken(urlToken || '')
  }, [])

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail()
    }
  }, [token])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-white text-2xl mb-10">Verify Email</h1>
      <hr />
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : 'no token'}
      </h2>

      {verified && (
        <div className="text-2xl">
          <h2>Email Verified</h2>

          <p>
            You can now{' '}
            <Link href={'/login'} className="text-blue-500">
              login
            </Link>
          </p>
        </div>
      )}

      {error && (
        <div className="text-2xl">
          <h2>Email Verification Failed</h2>
        </div>
      )}
    </div>
  )
}

export default VerifyEmailPage
