import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  VStack,
  Text,
  Divider,
} from '@chakra-ui/react';
import { useFieldArray, useForm } from 'react-hook-form';
import { CreateProfileRequest, ProfileFormData } from '@/entities/profile/model/types';
import styled from '@emotion/styled';
import { useState } from 'react';
import { EducationInput } from './EducationInput';

interface ProfileFormProps {
  onSubmit: (data: CreateProfileRequest) => void;
  initialData?: ProfileFormData;
}

const LinkInput = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  
  .link-type-select {
    width: 120px;
    height: 44px;
    border: 1px solid #EEEEEE;
    border-radius: 8px;
    padding: 0 16px;
    font-size: 15px;
    color: #333333;
    background-color: white;
    cursor: pointer;
    
    &:hover {
      border-color: #DDDDDD;
    }
    
    &:focus {
      border-color: #3182F6;
      outline: none;
    }
  }
  
  .link-input-wrapper {
    flex: 1;
    position: relative;
  }
  
  .link-input {
    width: 100%;
    height: 44px;
    border: 1px solid #EEEEEE;
    border-radius: 8px;
    padding: 0 40px 0 16px;
    font-size: 15px;
    
    &::placeholder {
      color: #999999;
    }
    
    &:hover {
      border-color: #DDDDDD;
    }
    
    &:focus {
      border-color: #3182F6;
      outline: none;
    }
  }
  
  .clear-button {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    color: #999999;
    
    &:hover {
      color: #666666;
    }
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const AddLinkButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #3182F6;
  font-size: 14px;
  font-weight: 500;
  background: none;
  border: none;
  padding: 8px 0;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const LanguageInput = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  
  .language-input {
    flex: 1;
    height: 44px;
    border: 1px solid #EEEEEE;
    border-radius: 8px;
    padding: 0 16px;
    font-size: 15px;
    color: #333333;
    
    &::placeholder {
      color: #999999;
    }
    
    &:hover {
      border-color: #DDDDDD;
    }
    
    &:focus {
      border-color: #3182F6;
      outline: none;
    }
  }
  
  .level-select {
    width: 120px;
    height: 44px;
    border: 1px solid #EEEEEE;
    border-radius: 8px;
    padding: 0 16px;
    font-size: 15px;
    color: #333333;
    background-color: white;
    cursor: pointer;
    
    &:hover {
      border-color: #DDDDDD;
    }
    
    &:focus {
      border-color: #3182F6;
      outline: none;
    }
  }
  
  .delete-button {
    width: 44px;
    height: 44px;
    border: 1px solid #EEEEEE;
    border-radius: 8px;
    background: white;
    color: #999999;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    &:hover {
      border-color: #DDDDDD;
      color: #666666;
    }
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const AwardInput = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  
  .award-input-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .award-input {
    width: 100%;
    height: 44px;
    border: 1px solid #EEEEEE;
    border-radius: 8px;
    padding: 0 16px;
    font-size: 15px;
    color: #333333;
    
    &::placeholder {
      color: #999999;
    }
    
    &:hover {
      border-color: #DDDDDD;
    }
    
    &:focus {
      border-color: #3182F6;
      outline: none;
    }
  }
  
  .date-input {
    width: 140px;
    height: 44px;
    border: 1px solid #EEEEEE;
    border-radius: 8px;
    padding: 0 16px;
    font-size: 15px;
    color: #333333;
    
    &::-webkit-calendar-picker-indicator {
      cursor: pointer;
    }
    
    &:hover {
      border-color: #DDDDDD;
    }
    
    &:focus {
      border-color: #3182F6;
      outline: none;
    }
  }
  
  .delete-button {
    width: 44px;
    height: 44px;
    border: 1px solid #EEEEEE;
    border-radius: 8px;
    background: white;
    color: #999999;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 0;
    
    &:hover {
      border-color: #DDDDDD;
      color: #666666;
    }
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const SkillTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
  min-height: 44px;
  padding: 8px;
  border: 1px solid #EEEEEE;
  border-radius: 8px;
  
  &:hover {
    border-color: #DDDDDD;
  }
  
  &:focus-within {
    border-color: #3182F6;
  }
`;

const SkillTag = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  height: 28px;
  padding: 0 8px;
  background-color: #F5F6F7;
  border-radius: 4px;
  font-size: 14px;
  color: #333333;
  
  .skill-name {
    margin-right: 4px;
  }
  
  .skill-level {
    color: #3182F6;
  }
  
  .delete-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    padding: 0;
    border: none;
    background: none;
    color: #999999;
    cursor: pointer;
    
    &:hover {
      color: #666666;
    }
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const SkillInput = styled.input`
  flex: 1;
  min-width: 120px;
  height: 28px;
  border: none;
  padding: 0 8px;
  font-size: 14px;
  background: transparent;
  
  &::placeholder {
    color: #999999;
  }
  
  &:focus {
    outline: none;
  }
`;

export function ProfileForm({ onSubmit, initialData }: ProfileFormProps) {
  const {
    register,
    control,
    handleSubmit,
  } = useForm<CreateProfileRequest>({
    defaultValues: initialData || {
      name: '',
      email: '',
      phone: '',
      education: [],
      skills: [],
      awards: [],
      languages: [],
      links: [],
    },
  });

  const education = useFieldArray({
    control,
    name: 'education',
  });

  const skills = useFieldArray({
    control,
    name: 'skills',
  });

  const awards = useFieldArray({
    control,
    name: 'awards',
  });

  const languages = useFieldArray({
    control,
    name: 'languages',
  });

  const [links, setLinks] = useState<Array<{ type: string, url: string }>>([]);
  const [newSkill, setNewSkill] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('');

  const addLink = () => {
    setLinks([...links, { type: 'Link', url: '' }]);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const updateLink = (index: number, field: 'type' | 'url', value: string) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setLinks(newLinks);
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newSkill && newSkillLevel) {
      e.preventDefault();
      skills.append({ name: newSkill, level: parseInt(newSkillLevel, 10) });
      setNewSkill('');
      setNewSkillLevel('');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={8}>
        {/* 기본 정보 */}
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            기본 정보
          </Text>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>이름</FormLabel>
              <Input {...register('name', { required: '이름을 입력해주세요' })} />
            </FormControl>

            <FormControl>
              <FormLabel>이메일</FormLabel>
              <Input
                type="email"
                {...register('email', { required: '이메일을 입력해주세요' })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>연락처</FormLabel>
              <Input {...register('phone', { required: '연락처를 입력해주세요' })} />
            </FormControl>
          </Stack>
        </Box>

        <Divider />

        {/* 학력 */}
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            학력
          </Text>
          <VStack spacing={4} align="stretch">
            {education.fields.map((field, index) => {
              return (
                <EducationInput
                  key={field.id}
                  index={index}
                  control={control}
                  register={register}
                  remove={education.remove}
                />
              )
            })}

            <AddLinkButton
              type="button"
              onClick={() =>
                education.append({
                  schoolName: '',
                  major: '',
                  startDate: '',
                  endDate: '',
                  isAttending: false,
                })
              }
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 5v14m-7-7h14" strokeWidth="2" strokeLinecap="round" />
              </svg>
              학력 추가
            </AddLinkButton>
          </VStack>
        </Box>

        <Divider />

        {/* 스킬 */}
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            스킬
          </Text>
          <VStack spacing={4} align="stretch">
            <SkillTagsContainer>
              {skills.fields.map((field, index) => (
                <SkillTag key={field.id}>
                  <span className="skill-name">
                    {field.name}
                  </span>
                  <span className="skill-level">
                    Lv.{field.level}
                  </span>
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => skills.remove(index)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </SkillTag>
              ))}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <SkillInput
                  placeholder="스킬을 입력하세요"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={handleAddSkill}
                />
                <select
                  style={{
                    height: '28px',
                    border: 'none',
                    background: 'transparent',
                    fontSize: '14px',
                    color: '#333333',
                  }}
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(e.target.value)}
                >
                  <option value="">레벨</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </SkillTagsContainer>
          </VStack>
        </Box>

        <Divider />

        {/* 수상 및 기타 */}
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            수상 및 기타
          </Text>
          <VStack spacing={4} align="stretch">
            {awards.fields.map((field, index) => (
              <AwardInput key={field.id}>
                <div className="award-input-group">
                  <input
                    className="award-input"
                    placeholder="수상명"
                    {...register(`awards.${index}.title`)}
                  />
                  <input
                    className="award-input"
                    placeholder="상세 내용"
                    {...register(`awards.${index}.description`)}
                  />
                </div>

                <input
                  type="month"
                  className="date-input"
                  {...register(`awards.${index}.date`)}
                />

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => awards.remove(index)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </AwardInput>
            ))}

            <AddLinkButton
              type="button"
              onClick={() => awards.append({ title: '', date: '', description: '' })}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 5v14m-7-7h14" strokeWidth="2" strokeLinecap="round" />
              </svg>
              수상 추가
            </AddLinkButton>
          </VStack>
        </Box>

        <Divider />

        {/* 외국어 */}
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            외국어
          </Text>
          <VStack spacing={4} align="stretch">
            {languages.fields.map((field, index) => (
              <LanguageInput key={field.id}>
                <input
                  className="language-input"
                  placeholder="언어를 입력하세요"
                  {...register(`languages.${index}.name`)}
                />
                <select
                  className="level-select"
                  {...register(`languages.${index}.level`)}
                >
                  <option value="">수준 선택</option>
                  <option value="상">상</option>
                  <option value="중">중</option>
                  <option value="하">하</option>
                </select>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => languages.remove(index)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </LanguageInput>
            ))}

            <AddLinkButton
              type="button"
              onClick={() => languages.append({ name: '', level: '', certifications: [] })}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 5v14m-7-7h14" strokeWidth="2" strokeLinecap="round" />
              </svg>
              외국어 추가
            </AddLinkButton>
          </VStack>
        </Box>

        <Divider />

        {/* 링크 */}
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            링크
          </Text>
          <VStack spacing={4} align="stretch">
            {links.map((link, index) => (
              <LinkInput key={index}>
                <select
                  className="link-type-select"
                  value={link.type}
                  onChange={(e) => updateLink(index, 'type', e.target.value)}
                >
                  <option value="Link">Link</option>
                  <option value="GitHub">GitHub</option>
                  <option value="Blog">Blog</option>
                </select>

                <div className="link-input-wrapper">
                  <input
                    type="url"
                    className="link-input"
                    placeholder="https://"
                    value={link.url}
                    onChange={(e) => updateLink(index, 'url', e.target.value)}
                  />
                  <button
                    type="button"
                    className="clear-button"
                    onClick={() => removeLink(index)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </LinkInput>
            ))}

            <AddLinkButton type="button" onClick={addLink}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 5v14m-7-7h14" strokeWidth="2" strokeLinecap="round" />
              </svg>
              링크 추가
            </AddLinkButton>
          </VStack>
        </Box>

        <Button type="submit" colorScheme="blue" size="lg">
          저장
        </Button>
      </Stack>
    </form>
  );
} 