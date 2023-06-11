import { chekUserAuthFx } from "@/app/api/auth"
import { setUser } from "@/context/user"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { runInContext } from "vm"

const userRedirectByUserCheck = (isAuthPage = false) =>{
  //состояние 
  const [shoudLoadContent, setShoudLoadContent] = useState(false)
  const router = useRouter()
  //обход двоёного рендеринга в режиме разработчика
  const shouldCheckAuth = useRef(true)

  useEffect( () =>{
    if(shouldCheckAuth.current){
      shouldCheckAuth.current = false
      chekUser()
    }
  }, [] )

  const chekUser = async () => {
    const user = await chekUserAuthFx('/users/loginCheck')

    //если мы находимся на стр Авторизавции
    if(isAuthPage){
      if(!user){  //если пользователь не залогинился
        setShoudLoadContent(true)   //только для него загружаем страницу
        return
      }

      //иначе перекидываем на главную страницу
      router.push('/home')
      return
    }

    if(user){
      setUser(user) //это состояние в папке context
      setShoudLoadContent(true)
      return
    }

    //и если пользователь не залогинился и находится в какихто страницах, то перекидываем его на корнивую страницу
    router.push('/')
  }

  return {shoudLoadContent}
} 

export default userRedirectByUserCheck