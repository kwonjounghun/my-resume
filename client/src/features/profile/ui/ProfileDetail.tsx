import {
  Box,
  Stack,
  Text,
  VStack,
  HStack,
  Badge,
  Link,
  Divider,
  Button,
} from '@chakra-ui/react';
import { Profile } from '@/entities/profile/model/types';
import { FiEdit2 } from 'react-icons/fi';
import NextLink from 'next/link';

interface ProfileDetailProps {
  profile: Profile;
}

export function ProfileDetail({ profile }: ProfileDetailProps) {
  return (
    <Stack spacing={8}>
      {/* 기본 정보 */}
      <Box>
        <HStack justify="space-between" mb={4}>
          <Text fontSize="xl" fontWeight="bold">
            기본 정보
          </Text>
          <Button
            as={NextLink}
            href="/profile/edit"
            size="sm"
            leftIcon={<FiEdit2 />}
          >
            수정
          </Button>
        </HStack>
        <Stack spacing={4}>
          <HStack>
            <Text fontWeight="bold" minW="100px">
              이름
            </Text>
            <Text>{profile.name}</Text>
          </HStack>
          <HStack>
            <Text fontWeight="bold" minW="100px">
              이메일
            </Text>
            <Text>{profile.email}</Text>
          </HStack>
          <HStack>
            <Text fontWeight="bold" minW="100px">
              연락처
            </Text>
            <Text>{profile.phone}</Text>
          </HStack>
        </Stack>
      </Box>

      <Divider />

      {/* 학력 */}
      {profile.education?.length > 0 && (
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            학력
          </Text>
          <VStack spacing={4} align="stretch">
            {profile.education.map((edu, index) => (
              <Box key={index} p={4} borderWidth={1} borderRadius="md">
                <Stack spacing={2}>
                  <Text fontWeight="bold">{edu.schoolName}</Text>
                  <Text>
                    {edu.major}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {edu.startDate} - {edu.isAttending ? '재학중' : edu.endDate}
                  </Text>
                </Stack>
              </Box>
            ))}
          </VStack>
        </Box>
      )}

      <Divider />

      {/* 스킬 */}
      {profile.skills?.length > 0 && (
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            스킬
          </Text>
          <HStack spacing={2} flexWrap="wrap">
            {profile.skills.map((skill, index) => (
              <Badge
                key={index}
                colorScheme="blue"
                variant="solid"
                fontSize="sm"
                px={3}
                py={1}
                borderRadius="full"
              >
                {skill.name} (Lv.{skill.level})
              </Badge>
            ))}
          </HStack>
        </Box>
      )}

      <Divider />

      {/* 수상 및 기타 */}
      {profile.awards?.length > 0 && (
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            수상 및 기타
          </Text>
          <VStack spacing={4} align="stretch">
            {profile.awards.map((award, index) => (
              <Box key={index} p={4} borderWidth={1} borderRadius="md">
                <Stack spacing={2}>
                  <Text fontWeight="bold">{award.title}</Text>
                  <Text fontSize="sm" color="gray.600">
                    {award.date}
                  </Text>
                  <Text>{award.description}</Text>
                </Stack>
              </Box>
            ))}
          </VStack>
        </Box>
      )}

      <Divider />

      {/* 외국어 */}
      {profile.languages?.length > 0 && (
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            외국어
          </Text>
          <VStack spacing={4} align="stretch">
            {profile.languages.map((language, index) => (
              <Box key={index} p={4} borderWidth={1} borderRadius="md">
                <Stack spacing={2}>
                  <Text fontWeight="bold">{language.name}</Text>
                  <Badge colorScheme="green">{language.level}</Badge>
                  {language.certifications?.map((cert, certIndex) => (
                    <Text key={certIndex} fontSize="sm">
                      {cert.name}
                    </Text>
                  ))}
                </Stack>
              </Box>
            ))}
          </VStack>
        </Box>
      )}

      <Divider />

      {/* 링크 */}
      {profile.links?.length > 0 && (
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            링크
          </Text>
          <VStack spacing={2} align="stretch">
            {profile.links.map((link, index) => (
              <HStack key={index}>
                <Link href={link.url} isExternal color="blue.500">
                  {link.url}
                </Link>
                {link.description && (
                  <Text color="gray.600">- {link.description}</Text>
                )}
              </HStack>
            ))}
          </VStack>
        </Box>
      )}
    </Stack>
  );
} 