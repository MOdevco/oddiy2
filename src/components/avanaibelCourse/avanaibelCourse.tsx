import { Box, Button, FormLabel, Heading, Input, Text } from '@chakra-ui/react'
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
  } from '@chakra-ui/react'
  import { Select } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
const AvanaibelCourse = ({handleFile , obj}:any) => {
    const [loader , setLoader] = useState(true)
    const [data , setData] = useState([])
    const [dataTag , setDataTag] = useState([])
    const [tagValue , setTagValue] = useState({id: ''})   
    const [value , setValue] = useState({name: '' , description: ''})

    const toast = useToast()

    
    
    useEffect(() => {
        axios.get(`${api}api/course-type/` , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            setData(res.data.data)
            setLoader(false)
        })
    } , [])
    useEffect(() => {
        axios.get(`${api}api/tag/` , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            setDataTag(res.data.data)
        })
    } , [])

    const handleSubmit = (e:any) => {
        e.preventDefault()
        if(value.name.length===0||value.description.length===0||tagValue.id.length===0||obj.photo.length===0) {
            toast({
                description: `Maydon to'lmagan`,
                status: 'error',
                duration: 2000,
                position: 'top-right',
                isClosable: true,
            })
        } else {
            const formData = new FormData()
            formData.append("desc ", value.description )
            formData.append("name", value.name )
            formData.append("photo ", obj.photo )
            formData.append("tags ",  tagValue.id)
            axios.post(`${api}api/course-type/new` ,formData ,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                axios.get(`${api}api/course-type/` , {
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
    }


  return (
   <Box mt={5}>
         <Box>
            <Box pb={5}>
                <Heading fontSize={'30px'}>Kurs turlari</Heading>
            </Box>
            <Box display={'flex'} gap={5} alignItems={'flex-end'}>
                <FormControl  isRequired>
                    <FormLabel>Nom qo'shish</FormLabel>
                    <Input value={value.name} onChange={(e) => setValue({...value, name: e.target.value})} type='text' placeholder="nom qo'shish..."></Input>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Ma'lumot</FormLabel>
                    <Input value={value.description} onChange={(e) => setValue({...value, description: e.target.value})} type='text' placeholder="ma'lumot qo'shish..."></Input>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Tag tanlash</FormLabel>
                    <Select onChange={(e) => setTagValue({...tagValue,id: e.target.value})}>
                        {dataTag.map((item:any , i) => (
                            <option style={{background: '#37414B'}} value={item.id} >{item.name}</option>
                        ))}
                    </Select>
                </FormControl>
                    <Box >
                        <form action="" >
                            <input  className='input-field'   hidden type="file" accept='image/*' onChange={handleFile}/>
                        </form>

                        <Button
                        onClick={() => document.querySelector('.input-field').click()}
                        bg={"blue.500"}
                        color={"#fff"}
                        _hover={{ bg: "" }}
                        _active={{ bg: "" }}
                        >
                        Rasm tanlash
                        </Button>
                    
                    </Box>
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
                        <Th>Havola</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {data.map((item:any ,i) => (
                        <Tr key={i}>
                            <Td>{i+1}</Td>
                            <Td>{item.name}</Td>
                            <Td>{item.description}</Td>
                            <Td>{String(item.date).slice(0,10)}</Td>
                            <Td color={'blue'} textDecoration={'underline'}>{<Link className='linkColor' target='_blank' to={`${api}api/image/?id=${item.photo.id}`}>Link</Link>}</Td>
                        </Tr>
                    ))}
                    </Tbody>
                </Table>}
            </Box>
        </Box>
   </Box>
  )
}

export default AvanaibelCourse