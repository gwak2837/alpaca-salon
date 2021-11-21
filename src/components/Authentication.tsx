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
    onError: toastApolloError,
    skip: Boolean(
      uniqueName ||
        !(globalThis.sessionStorage?.getItem('jwt') ?? globalThis.localStorage?.getItem('jwt'))
    ),
  })

  return <>{children}</>
}

export default Authentication
