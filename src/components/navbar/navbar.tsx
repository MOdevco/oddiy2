import { Box , Button, Text} from '@chakra-ui/react'
import { useState} from 'react'
const Navbar = () => {

  const data = new Date()
  
  
  

  return (
    <Box  width={'100%'} h={'7vh'} pl={'200px'}  className='borderBottom' bg={'#37414B'} >
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}minH={'100%'} px={30}>
          <Box display={'flex'} alignItems={'center'} gap={10}> 
            <Text fontSize={'25px'} color={'white'}>Admin holati</Text>
            <Button display={'flex'} gap={3} fontSize={'20px'} height={'40px'} bg={'transparent'} border={'1px'} borderColor={'white'} color={'white'} _hover={{bg: ''}}>
              01/01/2023 dan
            </Button>
            <Button display={'flex'} gap={3} fontSize={'20px'} height={'40px'} bg={'transparent'} border={'1px'} borderColor={'white'} color={'white'} _hover={{bg: ''}}>
              Cheklanmagan
            </Button>

            <Box>
              
            </Box>
          </Box>
        </Box>

    </Box>
  )
}

export default Navbar