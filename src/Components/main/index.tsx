'use client'
import React, { useEffect, useState } from 'react'
import AuthForm from '../authForm'
import Image from 'next/image'

export const Main = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <>
      {isClient && (
        <div className="h-screen relative overflow-auto">
          <Image
            fill
            className="object-cover"
            src="/images/night-sky-colorful-2560x1080-12510.jpg"
            alt="backgroundCover"
          />
          <div className="absolute w-full h-full bg-black inset-0 bg-opacity-60 z-10" />
          <div className="absolute inset-0 z-20 flex  justify-center items-center lg:gap-[500px] 2xl:gap-[700px]">
            <div className="flex flex-col w-[30%] gap-4">
              <div className="w-20 h-20 relative flex items-center justify-center">
                <Image
                  fill
                  className="object-cover"
                  src="/images/logo.png"
                  alt="logo"
                />
              </div>
              <div>
                <p className="text-white lg:text-3xl text-lg font-bold">
                  Wellcome to chat messenger
                </p>
                <p className="text-white lg:text-lg text-md mt-5">
                  Join now or already have an account login and send unlimited
                  messages to your contacts
                </p>
                <p className="text-white text-sm mt-14 underline">
                  With respect to all those who helped to me along the way.
                </p>
              </div>
            </div>
            <div className="bg-gray-300 bg-opacity-40 backdrop-blur-md lg:w-[25%] 2xl:w-[20%] px-3 py-1 rounded-md shadow-md shadow-gray-700">
              <AuthForm />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
