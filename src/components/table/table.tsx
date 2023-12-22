import { Box, Button, Heading, Input  } from '@chakra-ui/react'
import {
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Table
  } from '@chakra-ui/react'
import { useState ,useEffect } from 'react'
import { Spinner } from '@chakra-ui/react'
import axios from 'axios'
import { api } from '../api/apis'
import { useToast } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
const TableProp = () => {
    const [loader , setLoader] = useState(true)
  return (
   <Box>
        <Box bg={'#37414B'} mt={5} py={5} display={'flex'} rounded={'10px'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} width={'100%'}>
                {loader && <Box>
                    <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                    />
                </Box>}
               { !loader &&<Table variant='simple' color={'white'} >
                    <Thead >
                    <Tr >
                        <Th>№</Th>
                        <Th>Kurs nomi</Th>
                        <Th>Havola</Th>
                        <Th>Kurs turi</Th>
                        <Th>Ma'lumot</Th>
                        <Th>Havola</Th>
                        <Th>Sana</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>fdsfds</Td>
                        </Tr>
                    </Tbody>
                </Table>}
        </Box>
   </Box>
  )
}

export default TableProp