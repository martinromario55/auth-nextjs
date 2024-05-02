'use client'
import Link from 'next/link'
import React, { useState } from 'react'

const SignupPage = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
  })

  const onSignUp = async () => {}

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-white text-2xl mb-10">Signup</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="p-2 my-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        name="username"
        id="username"
        value={user.username}
        onChange={e => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />

      <label htmlFor="email">Email</label>
      <input
        className="p-2 my-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="email"
        name="email"
        id="email"
        value={user.password}
        onChange={e => setUser({ ...user, email: e.target.value })}
        placeholder="email address"
      />

      <label htmlFor="password">Password</label>
      <input
        className="p-2 my-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
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
        Signup here
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
