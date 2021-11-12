import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { MouseEvent as ReactMouseEvent, useEffect } from 'react'
import { toastApolloError } from 'src/apollo/error'
import {
  StoreCardFragment,
  useToggleLikedStoreMutation,
} from 'src/graphql/generated/types-and-hooks'
import { Skeleton } from 'src/styles'
import styled from 'styled-components'

const GridContainerGap = styled.li`
  display: grid;
  gap: 0.4rem;
`

const Frame16to10 = styled.div`
  position: relative;
  padding-top: 62.5%;
  border-radius: 4px;
  overflow: hidden;
`

const FlexContainerBetweenCenter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const FlexContainerCenter = styled.div`
  display: flex;
  align-items: center;
`

const FlexContainerGap = styled.div`
  display: flex;
  gap: 0.3rem;
  flex: 0 0 auto;

  overflow: scroll hidden;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`

const CategoryButton = styled.button`
  background: #ff9f74;
  border: none;
  border-radius: 9999px;
  color: white;
  font-size: 0.85rem;
  padding: 0.4rem 0.7rem 0.5rem;
  text-align: center;
  white-space: nowrap;
`

const Tag = styled.span`
  flex-wrap: nowrap;
  color: grey;
  font-size: 0.85rem;
  white-space: nowrap;
`

const AbsolutePositionHeart = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;

  width: max(1.1rem, min(5vw, 1.3rem));
  height: max(1rem, min(5vw, 1.2rem));
  cursor: pointer;
`

const AbsolutePositionSkeleton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export function StoreLoadingCard() {
  return (
    <GridContainerGap>
      <Frame16to10>
        <AbsolutePositionSkeleton>
          <Skeleton height="100%" width="100%" />
        </AbsolutePositionSkeleton>
        <AbsolutePositionHeart></AbsolutePositionHeart>
      </Frame16to10>

      <FlexContainerBetweenCenter>
        <Skeleton width="40%" />
        <FlexContainerCenter></FlexContainerCenter>
      </FlexContainerBetweenCenter>

      <FlexContainerGap>
        <Skeleton borderRadius="9999px" width="5rem" height="2rem" />
        <Skeleton borderRadius="9999px" width="5rem" height="2rem" />
        <Skeleton borderRadius="9999px" width="5rem" height="2rem" />
      </FlexContainerGap>

      <Skeleton width="80%" height="1.3rem" />
    </GridContainerGap>
  )
}

type Props = {
  store: StoreCardFragment
  coordinates?: GeolocationCoordinates
}

function StoreCard({ store, coordinates }: Props) {
  const router = useRouter()

  const [toggleLikedStoreMutation, { loading }] = useToggleLikedStoreMutation({
    onError: toastApolloError,
    variables: { id: store.id },
  })

  useEffect(() => {
    const pageYOffset = sessionStorage.getItem('pageYOffsetBeforeStorePage')

    if (pageYOffset) {
      window.scrollTo(0, +pageYOffset)
      sessionStorage.removeItem('pageYOffsetBeforeStorePage')
    }
  }, [])

  function goToStorePage() {
    sessionStorage.setItem('urlBeforeStorePage', router.asPath)
    sessionStorage.setItem('pageYOffsetBeforeStorePage', `${window.pageYOffset}`)
    router.push(`/stores/${store.id}`)
  }

  function toggleLikedStore(e: ReactMouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation()

    if (!loading) {
      toggleLikedStoreMutation()
    }
  }

  return (
    <GridContainerGap>
      <Frame16to10 onClick={goToStorePage}>
        <Image
          src={store.imageUrls?.[0] ?? '/images/default-store-cover.png'}
          alt={store.name ?? 'store-cover'}
          layout="fill"
          objectFit="cover"
        />
      </Frame16to10>

      <FlexContainerBetweenCenter>
        <h4>{store.name}</h4>
      </FlexContainerBetweenCenter>

      <FlexContainerGap>
        {store.categories.map((category, i) => (
          <CategoryButton key={i}>{category}</CategoryButton>
        ))}
      </FlexContainerGap>

      <FlexContainerGap>
        {store.hashtags?.map((hashtag, i) => (
          <Tag key={i}>#{hashtag} </Tag>
        ))}
      </FlexContainerGap>
    </GridContainerGap>
  )
}

export default StoreCard
