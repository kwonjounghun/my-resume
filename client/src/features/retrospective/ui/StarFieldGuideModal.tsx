import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  useDisclosure,
  Text,
  VStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from '@chakra-ui/react';
import { useRef, useState, MutableRefObject } from 'react';

interface StarFieldGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  guide: string;
  initialValue?: string;
  onComplete: (value: string) => void;
}

export function StarFieldGuideModal({
  isOpen,
  onClose,
  title,
  guide,
  initialValue = '',
  onComplete,
}: StarFieldGuideModalProps) {
  const [content, setContent] = useState(initialValue);
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null) as MutableRefObject<HTMLButtonElement>;
  const toast = useToast();

  const handleClose = () => {
    if (content && content !== initialValue) {
      onAlertOpen();
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    onAlertClose();
    onClose();
    setContent(initialValue);
  };

  const handleComplete = () => {
    if (!content.trim()) {
      toast({
        title: '내용을 입력해주세요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    onComplete(content);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2xl" borderBottomWidth={1}>
            {title}
          </ModalHeader>
          <ModalBody py={8}>
            <VStack spacing={8} align="stretch">
              <VStack spacing={4} align="stretch" bg="gray.50" p={6} borderRadius="md">
                <Text fontWeight="bold" fontSize="lg">
                  작성 가이드
                </Text>
                <Text whiteSpace="pre-wrap">{guide}</Text>
              </VStack>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 입력해주세요"
                minH="400px"
                size="lg"
              />
            </VStack>
          </ModalBody>
          <ModalFooter borderTopWidth={1} gap={2}>
            <Button variant="ghost" onClick={handleClose}>
              닫기
            </Button>
            <Button colorScheme="blue" onClick={handleComplete}>
              완료
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              작성 중단
            </AlertDialogHeader>

            <AlertDialogBody>
              작성 중인 내용이 있습니다. 정말 작성을 중단하시겠습니까?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onAlertClose}>
                취소
              </Button>
              <Button colorScheme="red" onClick={handleConfirmClose} ml={3}>
                중단
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
} 