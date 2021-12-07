import { ReactNode, useCallback, useEffect } from 'react'
import { TABLET_MIN_WIDTH } from 'src/models/constants'
import styled from 'styled-components'

const Transition = styled.div`
  > div {
    transition: background 0.3s ease-out;
  }

  > section {
    transition: 0.3s ease-in-out;
  }
`

const DrawerInput = styled.input`
  display: none;

  :checked ~ div {
    position: fixed;
    inset: 0 0 0 50%;
    width: 100%;
    max-width: ${TABLET_MIN_WIDTH};
    transform: translateX(-50%);
    background: #00000080;
  }

  :checked ~ section {
    bottom: 0;
  }
`

const DrawerBackground = styled.div`
  background: #00000000;
  z-index: 8;
`

const DrawerSection = styled.section`
  position: fixed;
  bottom: -33vh;
  left: 50%;
  z-index: 9;

  width: 100%;
  max-width: ${TABLET_MIN_WIDTH};
  transform: translateX(-50%);
  height: 33vh;
  overflow: hidden scroll;
`

type Props = {
  children: ReactNode
  open: boolean
  setOpen: (e: boolean) => void
}

function Drawer({ children, open, setOpen }: Props) {
  const closeOnEscapeKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        setOpen(false)
      }
    },
    [setOpen]
  )

  function closeDrawer() {
    setOpen(false)
  }

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', closeOnEscapeKey, false)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', closeOnEscapeKey, false)
      document.body.style.overflow = ''
    }
  }, [closeOnEscapeKey, open, setOpen])

  return (
    <Transition>
      <DrawerInput checked={open} type="checkbox" />
      <DrawerBackground onClick={closeDrawer} />
      <DrawerSection>{children}</DrawerSection>
    </Transition>
  )
}

export default Drawer
