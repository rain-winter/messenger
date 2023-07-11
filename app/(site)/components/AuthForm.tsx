'use client'
import Button from '@/app/components/Button'
import Input from '@/app/components/inputs/Input'
import { signIn, useSession } from 'next-auth/react'
// TODO 路由
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { BsGithub, BsTencentQq } from 'react-icons/bs'
import AuthSocialButton from './AuthSocialButton'

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
  const session = useSession()
  const router = useRouter()
  const [variant, setVariant] = useState<Variant>('LOGIN')

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/users')
    }
  }, [session?.status, router])

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER')
    } else {
      setVariant('LOGIN')
    }
  }, [variant])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    if (variant === 'REGISTER') {
      // 注册
      fetch('/api/register', {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded;',
        // },
        body: JSON.stringify(data),
        mode: 'cors', //设置跨域
      })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((err) => toast.error('Something went wrong!'))
        .finally(() => setIsLoading(false))
    }
    if (variant === 'LOGIN') {
      // nextauth signin
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          console.log(callback)

          if (callback?.ok && !callback?.error) {
            toast.success('已登录')
            router.push('/users')
          } else {
            toast.error('Invalid credentials')
          }
        })
        .finally(() => setIsLoading(false))
    }
  }

  // 社交
  const socialAction = (action: string) => {
    setIsLoading(true)
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials!')
        }
        if (callback?.ok) {
          //   router.push('/conversations')
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className=" mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className=" bg-white px-4 py-8 shadow sm:round-lg sm:px-10">
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input
              id="name"
              label="名字"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}

          <Input
            id="email"
            label="邮箱"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            type="password"
            label="密码"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div className=" mt-4">
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === 'LOGIN' ? '登录' : '注册'}
            </Button>
          </div>
        </form>
        {/* 其他登录 */}
        <div className=" mt-6">
          <div className="  relative">
            <div className=" absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-500" />
            </div>
            <div className=" relative flex justify-center">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
        </div>
        {/* 社交登录 */}
        <div className="flex mt-6 gap-2 ">
          <AuthSocialButton
            icon={BsGithub}
            onClick={() => socialAction('github')}
          />
          <AuthSocialButton
            icon={BsTencentQq}
            onClick={() => socialAction('qq')}
          />
        </div>

        {/* 登录注册切换 */}
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === 'LOGIN'
              ? 'new to Messenger'
              : 'Already have an account?'}
          </div>
          <div onClick={toggleVariant} className=" underline cursor-pointer">
            {variant === 'LOGIN' ? '创建账户' : '登录'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
