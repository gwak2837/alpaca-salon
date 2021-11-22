import { ReactNode } from 'react'
import { useRecoilState } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import { useMeQuery } from 'src/graphql/generated/types-and-hooks'
import { currentUser } from 'src/models/recoil'

type Props = {
  children: ReactNode
}

function Authentication({ children }: Props) {
  const [{ uniqueName }, setCurrentUser] = useRecoilState(currentUser)

  useMeQuery({
    onCompleted: ({ me }) => {
      if (me) {
        setCurrentUser({ uniqueName: me.uniqueName })
      }
    },
    onError: (error) => {
      toastApolloError(error)
      globalThis.sessionStorage?.removeItem('jwt')
      globalThis.localStorage?.removeItem('jwt')
    },
    // localStorage(또는 sessionStorage)에 jwt가 존재하는데 uniqueName이 없을 때만 요청
    skip: Boolean(
      uniqueName ||
        !(globalThis.sessionStorage?.getItem('jwt') ?? globalThis.localStorage?.getItem('jwt'))
    ),
  })

  return <>{children}</>
}

export default Authentication
