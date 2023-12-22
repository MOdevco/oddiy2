import { Box , Text , Flex} from '@chakra-ui/react'
import { FaBarsStaggered } from "react-icons/fa6";
import { RiHome3Line } from "react-icons/ri";

const Sidebar = () => {


  return (
    <Box width={'200px'} h={'100%'} position={'fixed'} zIndex={2} top={0} left={0} bg={'#37414B'} className='borer' overflow={'hidden'} >
        <Box >
            <Box pt={10} fontSize={'30px'}display={'flex'} flexDirection={'column'} alignItems={'center'} color={'white'} cursor={'pointer'}>
            </Box>

            <Box mt={150} color={'white'} display={'flex'} flexDirection={'column'} gap={5} >
                <Flex fontSize={'30px'}  alignItems={'center'} gap={2} cursor={'pointer'}  justifyContent={'center'}>
                    <RiHome3Line />
                    <Text fontWeight={'700px'} fontSize={'20px'}>Resurslar</Text>
                </Flex>
                <Flex fontSize={'30px'}  alignItems={'center'} gap={2} cursor={'pointer'}  justifyContent={'center'}>
                    <RiHome3Line />
                    <Text fontWeight={'700px'} fontSize={'20px'}>Resurslar</Text>
                </Flex>
                <Flex fontSize={'30px'}  alignItems={'center'} gap={2} cursor={'pointer'}  justifyContent={'center'}>
                    <RiHome3Line />
                    <Text fontWeight={'700px'} fontSize={'20px'}>Resurslar</Text>
                </Flex>
                <Flex fontSize={'30px'}  alignItems={'center'} gap={2} cursor={'pointer'}  justifyContent={'center'}>
                    <RiHome3Line />
                    <Text fontWeight={'700px'} fontSize={'20px'}>Resurslar</Text>
                </Flex>
                <Flex fontSize={'30px'}  alignItems={'center'} gap={2} cursor={'pointer'}  justifyContent={'center'}>
                    <RiHome3Line />
                    <Text fontWeight={'700px'} fontSize={'20px'}>Resurslar</Text>
                </Flex>
            </Box>



        </Box>
    </Box>
  )
}

export default Sidebar