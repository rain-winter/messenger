'use client'
import Avatar from '@/app/components/Avatar'
import { http } from '@/app/libs/http'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { FC, useCallback, useState } from 'react'

interface UserBoxProps {
  data: User
}

const UserBox: FC<UserBoxProps> = ({ data }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = useCallback(async () => {
    setIsLoading(true)
    const res = await http('conversations', {
      method: 'POST',
      data: {
        userId: data.id,
      },
    })
    router.push(`/conversations/${data.id}`)
  }, [data, router])
  return (
    <>
      {/* <LoadingModal /> */}
      <div
        onClick={handleClick}
        className=" 
        w-full relative mt-2
        flex items-center space-x-3 bg-white
        hover:bg-neutral-100 rounded-bg translate cursor-pointer
     "
      >
        <Avatar user={data} />
        <div className=" min-w-0 flex-1">
          <div className=" focus:outline-none">
            <div
              className="
                flex justify-between items-center mb-1
            "
            >
              <p className=" text-sm font-medium text-gray-600">{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserBox
