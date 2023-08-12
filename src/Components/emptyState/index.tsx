import React from 'react'

const EmptyState = () => {
  return (
    <>
      <div className="px-4 pt-10 sm:px-6 lg:px-8 h-full w-[77%] flex items-center justify-center bg-gray-100">
        <div className="text-center justify-center flex flex-col">
          <h3 className="mt-2 text-2xl font-semibold text-gray-900">
            Select a chat or start a new conversation
          </h3>
        </div>
      </div>
    </>
  )
}

export default EmptyState
