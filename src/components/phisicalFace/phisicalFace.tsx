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
import { Select } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const PhisicalFace = () => {
    const [loader , setLoader] = useState(true)
    const [data , setData] = useState([])
    const [value , setValue] = useState({firstname: '' , lastname: '' , middlename: '' , passport: '',birthday: '' ,tel1: '' , tel2: ''})
    const toast = useToast()
    const dateBirthday = value.birthday
    console.log(dateBirthday);
    const dateYear = dateBirthday.slice(0,4)
    const dateMonth = dateBirthday.slice(5,7)
    const dateDay = dateBirthday.slice(8,10)
    
    
    
    useEffect(() => {
        axios.get(`${api}api/face/` , {
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
        if(value.firstname.length===0) {
            toast({
                description: `Maydon to'lmagan`,
                status: 'error',
                duration: 2000,
                position: 'top-right',
                isClosable: true,
            })
        } else {
            axios.post(`${api}api/face/new`,{
                "birthday": `${dateDay}-${dateMonth}-${dateYear}`,
                "firstname": value.firstname,
                "lastname": value.lastname,
                "middlename": value.middlename,
                "passport": value.passport,
                "tel1": value.tel1,
                "tel2": value.tel2
            }  ,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                axios.get(`${api}api/face/` , {
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
                setValue({firstname: '' , lastname: '' , middlename: '' , passport: '',birthday: '' ,tel1: '' , tel2: ''})
            })
        }
    }

  return (
   <Box mt={5}>
        <Box>
            <Box pb={5}>
                <Heading fontSize={'30px'}>Jismoniy shaxslar</Heading>
            </Box>
            <Box display={'flex'} gap={5}>
                <FormControl isRequired>
                    <FormLabel>Ism</FormLabel>
                    <Input value={value.firstname} onChange={(e) => setValue({...value,firstname: e.target.value})} type='text' placeholder='Ism...' />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Familiya</FormLabel>
                    <Input value={value.lastname}  onChange={(e) => setValue({...value,lastname: e.target.value})} width={'100%'} type='text' placeholder='Familiya...' />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Sharif</FormLabel>
                    <Input value={value.middlename}  onChange={(e) => setValue({...value,middlename: e.target.value})} width={'100%'} type='text' placeholder='Sharif...' />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Passport</FormLabel>
                    <Input value={value.passport}  onChange={(e) => setValue({...value,passport: e.target.value})} width={'100%'} type='text' placeholder='Passport...' />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Tug'ilgan sana</FormLabel>
                    <Input value={value.birthday}  onChange={(e) => setValue({...value,birthday: e.target.value})} width={'100%'} type='date' placeholder="Tug'ilgan sana..." />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Telefon1</FormLabel>
                    <Input value={value.tel1}  onChange={(e) => setValue({...value,tel1: e.target.value})} width={'100%'} type='text' placeholder='Telefon1...' />
                </FormControl>
                <FormControl >
                    <FormLabel>Telefon2</FormLabel>
                    <Input value={value.tel2}  onChange={(e) => setValue({...value,tel2: e.target.value})} width={'100%'} type='text' placeholder='Telefon2...' />
                </FormControl>
            </Box>
            <Button mt={5} onClick={handleSubmit} width={'220px'} bg={'green'} _hover={{bg: ''}} color={'white'}>Qo'shish</Button>

            
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
                        <Th>Ism</Th>
                        <Th>Familiya</Th>
                        <Th>Sharif</Th>
                        <Th>Passport</Th>
                        <Th>Tug'ilgan sana</Th>
                        <Th>Telefon1</Th>
                        <Th>Telefon2</Th>
                        <Th>Sana</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {data.map((item:any ,i) => (
                        <Tr key={i}>
                            <Td>{i+1}</Td>
                            <Td>{item.firstname}</Td>
                            <Td>{item.lastname}</Td>
                            <Td>{item.middlename}</Td>
                            <Td>{item.passport}</Td>
                            <Td>{item.birthday}</Td>
                            <Td>{item.tel1}</Td>
                            <Td>{item.tel2}</Td>
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

export default PhisicalFace