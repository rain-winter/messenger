import Image from 'next/image'
import AuthForm from './components/AuthForm'
export default function Home() {
  return (
    <div
      className="flex 
      min-h-full 
      flex-col 
      justify-center
      bg-gray-100
      py-12
      sm:px-6 
      lg:px-8
     "
    >
      <div className=" sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          className=" mx-auto w-auto"
          alt="logo"
          height={48}
          width={48}
          src="/images/logo.png"
        ></Image>
        <h2 className=" tracking-tight text-gray-900 mt-6 text-center text-3xl font-bold">
          Sign in to your account
        </h2>
      </div>
      {/* AuthForm */}
     <AuthForm/>
    </div>
  )
}
