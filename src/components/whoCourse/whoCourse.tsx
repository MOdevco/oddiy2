import { Box, Button, Heading, Input } from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
  } from '@chakra-ui/react'
import { useState ,useEffect } from 'react'
import { Spinner } from '@chakra-ui/react'
import axios from 'axios'
import { api } from '../api/apis'
import { useToast } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
const WhoCourse = () => {
    const [loader , setLoader] = useState(true)
    const [data , setData] = useState([])
    const [value , setValue] = useState({name: '' , description: ''})
    const toast = useToast()
    useEffect(() => {
        axios.get(`${api}api/course-for/` , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            setData(res.data.data)
            setLoader(false)
        })
    } , [])

    const handleSubmit = (e:any) => {
        e.preventDefault()
        axios.post(`${api}api/course-for/create` ,{
            "name": value.name,
            "description": value.description
        } ,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            axios.get(`${api}api/course-for/` , {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                setData(res.data.data)
                setLoader(false)
            })
            toast({
                description: `${res.data.message}`,
                status: 'success',
                duration: 2000,
                position: 'top-right',
                isClosable: true,
            })
            setValue({name: '' , description: ''})
        })
    }

  return (
    <Box>
        <Box>
            <Box pb={5}>
                <Heading fontSize={'30px'}>Kurs kimlar uchun?</Heading>
            </Box>
            <Box display={'flex'} justifyContent={'flex-start'} alignItems={'flex-end'} gap={5}>
                <FormControl isRequired>
                    <FormLabel>Kurs nomi</FormLabel>
                    <Input value={value.name} onChange={(e) => setValue({...value, name: e.target.value})}  type='text' placeholder="nom qo'shish..."></Input>
                </FormControl>

                <FormControl isRequired >
                    <FormLabel>Malumot</FormLabel>
                    <Input value={value.description} onChange={(e) => setValue({...value, description: e.target.value})}  type='text' placeholder="ma'lumot qo'shish..."></Input>
                </FormControl>
                <Button onClick={handleSubmit} bg={'green'} _hover={{bg: ''}} width={'300px'} color={'white'}>Qo'shish</Button>
            </Box>

            
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
                        <Th>Nomi</Th>
                        <Th>Ma'lumoti</Th>
                        <Th>Sana</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {data.map((item:any ,i) => (
                        <Tr key={i}>
                            <Td>{i+1}</Td>
                            <Td>{item.name}</Td>
                            <Td>{item.description}</Td>
                            <Td>{String(item.date).slice(0,10)}</Td>
                        </Tr>
                    ))}
                    </Tbody>
                </Table>}
            </Box>
        </Box>
    </Box>
  )
}

export default WhoCourse