'use client'

import { useRef, useState } from 'react'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import { ITEMS, ItemsType } from '../consts/Items'

export default function Home() {

  const [items, setItems] = useState(ITEMS)
  const [fruitsSelected, setFruitsSelected] = useState<ItemsType[]>([])
  const [vegetableSelected, setVegetableSelected] = useState<ItemsType[]>([])
  const selectedTimeoutRef = useRef<Record<string, NodeJS.Timeout>>({})

  const handleClickItems = ({ name, type }: ItemsType) => {
    switch (type) {
      case 'Fruit':
        setFruitsSelected((prev) => [...prev, { name, type }])
        selectedTimeoutRef.current[name] = setTimeout(() => {
          setItems((prev) => [...prev, { name, type }])
          setFruitsSelected((prev) => prev.filter((i) => i.name !== name))
        }, 5000)
        break
      case 'Vegetable':
        setVegetableSelected((prev) => [...prev, { name, type }])
        selectedTimeoutRef.current[name] = setTimeout(() => {
          setItems((prev) => [...prev, { name, type }])
          setVegetableSelected((prev) => prev.filter((i) => i.name !== name))
        }, 5000)
        break
    }
    setItems((prev) => {
      const newPrev = prev.filter((i) => i.name !== name)
      return newPrev
    })
  }

  const handleGetBackItems = ({ name, type }: ItemsType) => {
    switch (type) {
      case 'Fruit':
        setFruitsSelected((prev) => prev.filter((i) => i.name !== name))
        break
      case 'Vegetable':
        setVegetableSelected((prev) => prev.filter((i) => i.name !== name))
        break
    }
    if (selectedTimeoutRef.current && selectedTimeoutRef.current[name]) {
      clearTimeout(selectedTimeoutRef.current[name])
    }
    setItems((prev) => [...prev, { name, type }])
  }

  return (
    <Container maxWidth="lg" sx={containerBox}>
      <Box display="flex" columnGap="1rem" height="100%">
        <Box sx={{ width: '100%' }} flexDirection="column" display="flex" rowGap={2}>
          {items.map((item) => (
            <Box key={`${item?.name}-items`}>
              <Button
                variant="outlined"
                color={"#fff" as any}
                fullWidth
                onClick={() => handleClickItems(item)}
              >
                {item?.name}
              </Button>
            </Box>
          ))}
        </Box>
        <Box sx={selectedBox}>
          <Box width="100%">
            <Box sx={selectedHeaderBox}>
              Fruit
            </Box>
            <Box flexDirection="column" display="flex" rowGap={2} padding={1}>
              {fruitsSelected.map((item) => (
                <Box key={`${item?.name}-fruitsSelected`}>
                  <Button
                    variant="outlined"
                    color={"#fff" as any}
                    fullWidth
                    onClick={() => handleGetBackItems(item)}
                  >
                    {item?.name}
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box sx={selectedBox}>
          <Box width="100%">
            <Box sx={selectedHeaderBox}>
              Vegetable
            </Box>
            <Box flexDirection="column" display="flex" rowGap={2} padding={1}>
              {vegetableSelected.map((item) => (
                <Box key={`${item?.name}-vegetableSelected`}>
                  <Button
                    variant="outlined"
                    color={"#fff" as any}
                    fullWidth
                    onClick={() => handleGetBackItems(item)}
                  >
                    {item?.name}
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}


const selectedBox = {
  width: '100%',
  display: 'flex',
  border: '1px solid black'
} as const

const selectedHeaderBox = {
  backgroundColor: '#f0f0f0',
  height: 'fit-content',
  padding: 1,
  textAlign: 'center',
  borderBottom: '1px solid black'
} as const

const containerBox = {
  py: 4,
  height: '100%'
} as const