import { Box, Button, Heading, Input, Text } from '@chakra-ui/react'
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
  } from '@chakra-ui/react'

const CourseTags = () => {
    const [loader , setLoader] = useState(true)
    const [data , setData] = useState([])
    const [value , setValue] = useState({name: '' })
    const toast = useToast()
    const [validate , setValidate] = useState(false)
    useEffect(() => {
        axios.get(`${api}api/tag/` , {
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
        if(value.name.length === 0) {
            toast({
                description: `Maydon to'lmagan`,
                status: 'error',
                duration: 2000,
                position: 'top-right',
                isClosable: true,
            })
            setValidate(true)
        } else {
            axios.post(`${api}api/tag/create` ,{
                "name": value.name.trim()
            } ,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                axios.get(`${api}api/tag/` , {
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
                setValue({name: ''})
                setValidate(false)
            })
        }
    }
  return (
    <Box>
        <Box>
            <Box pb={5}>
                <Heading fontSize={'30px'}>Mavjud taglar</Heading>
            </Box>
            <Box display={'flex'} gap={5}>
                <FormControl isRequired  display={'flex'} gap={5} alignItems={'flex-end'}>
                    <Box>
                        <FormLabel>Tag nomi</FormLabel>
                        <Input value={value.name} onChange={(e) => setValue({...value, name: e.target.value})} width={'300px'} type='text' placeholder="nom qo'shish..."></Input>
                        {validate&&<Text color={'red'}>maydon to'lmagan</Text>}
                    </Box>
                    <Button onClick={handleSubmit} bg={'green'} _hover={{bg: ''}} color={'white'}>Qo'shish</Button>
                </FormControl>
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
                        <Th>Sana</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {data.map((item:any ,i) => (
                        <Tr key={i}>
                            <Td>{i+1}</Td>
                            <Td>{item.name}</Td>
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

export default CourseTags