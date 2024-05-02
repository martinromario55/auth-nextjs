'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const SignupPage = () => {
  const router = useRouter()
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
  })

  const onSignUp = async () => {
    try {
      setLoading(true)

      const response = await axios.post('/api/users/signup', user)

      console.log('Signup successful', response.data)

      router.push('/login')
    } catch (error: any) {
      console.log('Signup failed', error.message)

      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-white text-2xl mb-10">
        {loading ? 'Processing' : 'Signup'}
      </h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="p-2 my-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        name="username"
        id="username"
        value={user.username}
        onChange={e => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />

      <label htmlFor="email">Email</label>
      <input
        className="p-2 my-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="email"
        name="email"
        id="email"
        value={user.email}
        onChange={e => setUser({ ...user, email: e.target.value })}
        placeholder="email address"
      />

      <label htmlFor="password">Password</label>
      <input
        className="p-2 my-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="password"
        name="password"
        id="password"
        value={user.password}
        onChange={e => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />

      <button
        className="group rounded-lg border border-gray-500 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        onClick={onSignUp}
      >
        {buttonDisabled ? 'Fill in Data' : 'Signup'}
      </button>
      <p className="mt-2">
        Already have an account?{' '}
        <Link href={'/login'} className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  )
}

export default SignupPage
