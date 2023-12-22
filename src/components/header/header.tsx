import React from 'react'
import { Box ,Heading  } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { GoPlusCircle } from "react-icons/go";

const Header = () => {
  return (
    <Box  width={'100%'} h={'10vh'} pl={'200px'} className='borderBottom' bg={'#37414B'} >
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} px={30} minH={'100%'}>
            <Box display={'flex'} alignItems={'center'} color={'white'} gap={5}>
                <Avatar width={'50px'}  />
                <Heading fontWeight={'bold'}>MOdevco</Heading>
            </Box>

            <Box display={'flex'} alignItems={'center'} gap={10}>
                <Button display={'flex'} gap={3} fontSize={'20px'} height={'50px'} bg={'transparent'} border={'1px'} borderColor={'white'} color={'white'} _hover={{bg: ''}}>
                  <GoPlusCircle  />
                  Xodim qo'shish
                </Button>
                <Button display={'flex'} gap={3} fontSize={'20px'} height={'50px'} bg={'transparent'} border={'1px'} borderColor={'white'} color={'white'} _hover={{bg: ''}}>
                  <GoPlusCircle  />
                  O'quvchi qo'shish
                </Button>
            </Box>
        </Box>

    </Box>
  )
}

export default Header