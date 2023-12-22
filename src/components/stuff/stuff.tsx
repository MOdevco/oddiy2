import { Box, Button, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
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

const Stuff = () => {
    const [loader , setLoader] = useState(true)
    const [data , setData] = useState([])
    const [value , setValue] = useState({name: ''})
    const toast = useToast()
    const date = new Date()
    const month = date.getMonth()  < 10 ? 0 +  date.getMonth() :  date.getMonth()
    const year = date.getFullYear()        
    const day = date.getDate() < 10 ? 0 + date.getDate() :  date.getDate()
    let time = `${year}-${month+1}-${day}` 
     
    useEffect(() => {
        axios.get(`${api}api/stuff/` , {
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
        if(value.name.length===0) {
            toast({
                description: `Maydon to'lmagan`,
                status: 'error',
                duration: 2000,
                position: 'top-right',
                isClosable: true,
            })
        } else {
            const formData = new FormData()
            
            axios.post(`${api}api/stuff/create` ,{
                "name": value.name
            } ,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                axios.get(`${api}api/stuff/` , {
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
            })
        }
    }

  return (
   <Box>
     <Box>
            <Box pb={5}>
                <Heading fontSize={'30px'}>Lavozimlar</Heading>
            </Box>
            <Box >
                <FormControl isRequired display={'flex'} gap={5} alignItems={'flex-end'}>
                    <Box>
                        <FormLabel>Nom kiriting</FormLabel>
                        <Input value={value.name} onChange={(e) => setValue({...value,name: e.target.value})}  width={'250px'} type='text' placeholder="nom qo'shish..."></Input>
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
                            <Td>{time}</Td>
                        </Tr>
                    ))}
                    </Tbody>
                </Table>}
            </Box>
        </Box>
   </Box>
  )
}

export default Stuff