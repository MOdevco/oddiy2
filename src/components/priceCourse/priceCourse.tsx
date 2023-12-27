import { Box, Button, Collapse, FormControl, FormLabel, Heading, Input, Text, useDisclosure } from '@chakra-ui/react'
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
import Select from 'react-select';
import { Link } from 'react-router-dom'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react'
const PriceCourse = () => {
    const [loader , setLoader] = useState(true)
    const [data , setData] = useState([])
    const [data2 , setData2] = useState([])
    const [courseForValue , setCourseForValue] = useState({id: ''})
    const [value , setValue] = useState({name: '', startDate: ''})
    const [id , setId] = useState(null)
    const ap = `api/course-price/by-course/?id=${id}`

    const dateBirthday = value.startDate
    const dateYear = dateBirthday.slice(0,4)
    const dateMonth = dateBirthday.slice(5,7)
    const dateDay = dateBirthday.slice(8,10)
    
    const time = new Date()
    const h = time.getHours()
    const m = time.getMinutes()
    const toast = useToast()

    useEffect(() => {
        axios.get(`${api}api/course/` , {
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
        axios.get(`${api}${ap}` , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            setData2(res.data.data)   
            console.log(res.data.data );
                        
        })
    } , [ap])
   
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
            formData.append("",  courseForValue.id)
            axios.post(`${api}api/course-price/new` ,{
                "courseID": courseForValue.id,
                "price": value.name,
                "startDate":`${dateDay}-${dateMonth}-${dateYear}`
            } ,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                axios.get(`${api}api/course/` , {
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
                setValue({name: '' , startDate: ''})
            })
        }
    }
    
    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          backgroundColor: 'transparent', // Set your desired background color here
        }),
      };
  return (
    <Box mt={5}  width={'100%'}>
        <Box width={'100%'}>
            <Box pb={5}>
                <Heading fontSize={'30px'}>Kurs narxi</Heading>
            </Box>
            <Box display={'flex'} gap={5} alignItems={'flex-end'}>
                <FormControl isRequired>
                    <FormLabel>Kurs nomi</FormLabel>
                    <Select styles={customStyles} onChange={(e) => setCourseForValue({...courseForValue,id: e.target.value})}
                    options={data.map((item, index) => ({
                        value: item.id,
                        label: `${item.name}/${item.courseFor.name}/${item.courseType.name}`
                    }))}>
                        
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Kurs narxi</FormLabel>
                    <Input value={value.name} onChange={(e) => setValue({...value,name: e.target.value})}  type='text' placeholder="nom qo'shish..."></Input>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Amal qilish sanasi</FormLabel>
                    <Input value={value.startDate} onChange={(e) => setValue({...value, startDate: e.target.value})}  type='date' placeholder="nom qo'shish..."></Input>
                </FormControl>
                <Button onClick={handleSubmit} bg={'green'} _hover={{bg: ''}} width={'300px'} color={'white'}>Qo'shish</Button>
            </Box>

            
            <Box  mt={5} py={5} display={'flex'} rounded={'10px'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} width={'100%'}>
                {loader && <Box>
                    <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                    />
                </Box>}
               
               {data.map((item:any ,i) => (
                <Box width={'100%'} >
                   <Accordion allowToggle>
                        <AccordionItem border={'none'}bg={'#37414B'} onClick={() => setId(item.id)} mb={3} rounded={5}>
                            <h2>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left' display={'flex'} fontSize={'20px'} justifyContent={'space-between'} alignItems={'center'}>
                                    <Text>{item.name}</Text>
                                    <Text>{item.courseType.name}</Text>
                                    <Text>{item.courseFor.name}</Text>
                                </Box>
                            </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Table variant='simple' color={'white'} >
                            <Thead >
                            <Tr >
                                <Th>№</Th>
                                <Th>Kurs nomi</Th>
                                <Th>Kurs turi</Th>
                                <Th>Kurs kimlar uchun</Th>
                                <Th>Narxi</Th>
                                <Th>Sana</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                            {data2.map((item:any ,i) => (
                                <Tr key={i}>
                                    <Td>{i+1}</Td>
                                    <Td>{item.id}</Td>
                                    <Td>{item.id}</Td>
                                    <Td>{String(item.date).slice(0,10)}</Td>
                                </Tr>
                            ))}
                            </Tbody>
                                </Table>
                            </AccordionPanel>
                        </AccordionItem>


                    </Accordion>
                </Box>
               ))}

                       
                
            </Box>
        </Box>
    </Box>
  )
}

export default PriceCourse