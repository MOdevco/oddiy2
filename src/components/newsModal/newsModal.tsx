import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
const NewsModal = ({isOpen , onOpen , onClose , itemAll}:any) => {
  return (
   <Box >
        <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent bg={'#37414B'} color={'white'}>
          <ModalHeader>Batafsil</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize={'20px'}>
            {itemAll}
          </ModalBody>
        </ModalContent>
        </Modal>
   </Box>
  )
}

export default NewsModal