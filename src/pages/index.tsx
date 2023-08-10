import AuthForm from '@/Components/authForm'

export default function Home() {
  return (
    <>
      <div className="h-screen relative">
        <video
          className="w-full h-full object-cover"
          src="/videos/production_id-4003960 (1440p).mp4"
          autoPlay
          muted
          loop
        />
        <div className="absolute w-full h-full bg-black inset-0 bg-opacity-60 z-10" />
        <div className="absolute inset-0 z-20 flex justify-center items-center">
          <div className="bg-gray-600 bg-opacity-40 backdrop-blur-md w-fit px-3 py-1 rounded-md shadow-md shadow-gray-700">
            <AuthForm />
          </div>
        </div>
      </div>
    </>
  )
}
