import { Box, Button, ButtonGroup, Divider, Heading, Image, Input, Stack, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import axios from 'axios'
import { api } from '../api/apis'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react'
  import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
  import { useToast } from '@chakra-ui/react'
const News = ({handleFile , obj}:any) => {
    const [data , setData] = useState([])
    const toast = useToast()
    // const { isOpen, onOpen, onClose } = useDisclosure()
    const [show , setShow] = useState(true)
    const [val , setVal] = useState({name: '' , fullDesc: '' , shortDesc: ''})
    useEffect(() => {
        axios.get(`${api}api/news/` , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res:any) => {
            setData(res.data.data)
        })
    } ,[])

    const handleSubmit = () => {
        const formData = new FormData()
        formData.append('name', val.name)
        formData.append('shortDesc', val.shortDesc)
        formData.append('fullDesc', val.fullDesc)
        formData.append('photo ', obj.photo)

        axios.post(`${api}api/news/new` , formData , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            axios.get(`${api}api/news/` , {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then((res:any) => {
                setData(res.data.data)
                toast({
                    title: `${res.data.message}`,
                    position: 'top-right',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
            })
            setVal({name: '' , fullDesc: '' , shortDesc: ''})
        })
    }

  return (
    <Box >
        <Box mb={5}>
            <Heading>Yangiliklar</Heading>
        </Box>

        <Box mb={5} display={'flex'} alignItems={'flex-end'} gap={5}>
            <FormControl isRequired>
                <FormLabel>Yangilik nomi</FormLabel>
                <Input value={val.name} onChange={(e) => setVal({...val, name: e.target.value})} type='text ' placeholder={'yangilik nomi...'} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Qisqa ma'lumot</FormLabel>
                <Input value={val.shortDesc} onChange={(e) => setVal({...val, shortDesc: e.target.value})} type='text ' placeholder={"malumot..."} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>To'liq ma'lumot</FormLabel>
                <Input value={val.fullDesc} onChange={(e) => setVal({...val, fullDesc: e.target.value})} type='text ' placeholder={"malumot..."} />
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

            <Button onClick={handleSubmit} mt={5} width={'220px'} bg={'green'} _hover={{bg: ''}} color={'white'}>Qo'shish</Button>
        </Box>

        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={'30px'} >
            {data.map((item:any ,i) => (
                <Card maxW='sm' rounded={'8px'} bg={'transparent'} mt={5}>
                    <CardBody bg={'#37414B'}rounded={'8px'} color={'white'} >
                        <Image
                        width={'100%'}
                        src={`${api}api/image/?id=${item.photo.id}`}
                        alt='Green double couch with wooden legs'
                        />
                        <Stack mt='6' spacing='3'>
                        <Heading size='md'>{item.name}</Heading>
                        <Text>
                            {item.shortDesc}
                        </Text>
                        <Text color='blue.600'  fontWeight={'bold'} cursor={'pointer'} fontSize='2xl'>
                            <Accordion allowToggle>
                                <AccordionItem border={'none'} >
                                    <h2>
                                    <AccordionButton width={'100%'}>
                                        <Box as="span" flex='1' textAlign='left'>
                                            ko'proq...
                                        </Box>
                                    </AccordionButton>
                                    </h2>
                                    <AccordionPanel width={'100%'} pb={4} color={'white'} fontSize={'17px'}>
                                        {item.fullDesc}
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        </Text>
                        </Stack>
                    </CardBody>
                </Card>
            ))}
        </Box>
    </Box>
  )
}

export default News