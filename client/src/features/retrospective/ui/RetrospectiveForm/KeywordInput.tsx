import {
  Box,
  Input,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

interface KeywordInputProps {
  keywords: string[];
  onChange: (keywords: string[]) => void;
}

export function KeywordInput({ keywords, onChange }: KeywordInputProps) {
  const [newKeyword, setNewKeyword] = useState('');
  const toast = useToast();

  const handleKeywordAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newKeyword.trim()) {
      e.preventDefault();
      if (keywords.length >= 10) {
        toast({
          title: '키워드는 최대 10개까지 추가할 수 있습니다.',
          status: 'warning',
        });
        return;
      }
      if (!keywords.includes(newKeyword.trim())) {
        onChange([...keywords, newKeyword.trim()]);
      }
      setNewKeyword('');
    }
  };

  const handleKeywordRemove = (keyword: string) => {
    onChange(keywords.filter((k) => k !== keyword));
  };

  return (
    <>
      <Input
        value={newKeyword}
        onChange={(e) => setNewKeyword(e.target.value)}
        onKeyDown={handleKeywordAdd}
        placeholder="키워드를 입력하고 Enter를 누르세요"
      />
      <Text fontSize="sm" color="gray.500" mt={1}>
        최대 10개까지 추가할 수 있습니다.
      </Text>
      {keywords.length > 0 && (
        <Box mt={2}>
          <Stack direction="row" wrap="wrap" spacing={2}>
            {keywords.map((keyword) => (
              <Tag
                key={keyword}
                size="md"
                borderRadius="full"
                variant="solid"
                colorScheme="primary"
              >
                <TagLabel>{keyword}</TagLabel>
                <TagCloseButton
                  aria-label={`${keyword} 삭제`}
                  onClick={() => handleKeywordRemove(keyword)}
                />
              </Tag>
            ))}
          </Stack>
        </Box>
      )}
    </>
  );
} 