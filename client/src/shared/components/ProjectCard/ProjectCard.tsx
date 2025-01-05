import { HStack, Tag, Tooltip } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { theme } from '../../styles/tokens';
import { getColor, getTypography } from '../../styles/utils/theme';
import { Project } from '../../types/project';
import { format } from 'date-fns';

interface ProjectCardProps {
  project: Project;
  layout?: 'horizontal' | 'vertical';
  onClick?: () => void;
  maxVisibleTags?: number;
}

export const ProjectCard = ({
  project,
  layout = 'vertical',
  onClick,
  maxVisibleTags = 5
}: ProjectCardProps) => {
  const { title, companyName, startDate, endDate, keywords } = project;

  const formatDate = (date: string) => {
    return format(new Date(date), 'yyyy.MM');
  };

  const renderTags = (keywords: string[]) => {
    if (keywords.length <= maxVisibleTags) {
      return keywords.map((keyword) => (
        <Tag size='sm' variant="subtle" colorScheme="gray" key={keyword}>
          {keyword}
        </Tag>
      ));
    }

    const visibleTags = keywords.slice(0, maxVisibleTags);
    const remainingCount = keywords.length - maxVisibleTags;
    const remainingTags = keywords.slice(maxVisibleTags);

    return (
      <>
        {visibleTags.map((keyword) => (
          <Tag size='sm' variant="subtle" colorScheme="gray" key={keyword}>
            {keyword}
          </Tag>
        ))}
        <Tooltip
          label={
            <TagTooltip>
              {remainingTags.map(tag => (
                <Tag size='sm' variant="subtle" colorScheme="gray" key={tag}>
                  {tag}
                </Tag>
              ))}
            </TagTooltip>
          }
          hasArrow
          placement="top"
        >
          <Tag
            size='sm'
            variant="subtle"
            colorScheme="blue"
            cursor="pointer"
          >
            +{remainingCount}
          </Tag>
        </Tooltip>
      </>
    );
  };

  if (layout === 'horizontal') {
    return (
      <HorizontalContainer onClick={onClick}>
        <ContentContainer>
          <CompanyName>{companyName}</CompanyName>
          <Title>{title}</Title>
        </ContentContainer>
        <ProjectInfo>
          <Period>{formatDate(startDate)} - {formatDate(endDate)}</Period>
          <HStack spacing={2} wrap="wrap" justifyContent="flex-end">
            {renderTags(keywords)}
          </HStack>
        </ProjectInfo>
      </HorizontalContainer>
    );
  }

  return (
    <VerticalContainer onClick={onClick}>
      <CardContent>
        <CompanyName>{companyName}</CompanyName>
        <Title>{title}</Title>
        <Period>{formatDate(startDate)} - {formatDate(endDate)}</Period>
        <HStack spacing={2} wrap="wrap">
          {renderTags(keywords)}
        </HStack>
      </CardContent>
    </VerticalContainer>
  );
};

const VerticalContainer = styled.div`
  background: ${getColor(theme, 'neutral.white')};
  border-radius: ${theme.layout.borderRadius.lg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: ${theme.spacing[4]};
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
  }
`;

const HorizontalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${theme.spacing[6]};
  align-items: center;
  padding: ${theme.spacing[4]};
  border-bottom: 1px solid ${getColor(theme, 'neutral.grey200')};
  cursor: pointer;
  background: ${getColor(theme, 'neutral.white')};
  transition: background-color 0.2s ease-in-out;
  
  &:hover {
    background-color: ${getColor(theme, 'neutral.grey100')};
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[2]};
`;

const ProjectInfo = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${theme.spacing[2]};
  min-width: 0;
`;

const Title = styled.h3`
  ${() => getTypography(theme, 'h4')};
  color: ${getColor(theme, 'text.primary')};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  max-height: calc(${theme.typography.lineHeight.h4} * 2);
`;

const CompanyName = styled.p`
  ${() => getTypography(theme, 'body2')};
  color: ${getColor(theme, 'text.secondary')};
  margin: 0;
`;

const Period = styled.span`
  ${() => getTypography(theme, 'caption')};
  color: ${getColor(theme, 'text.secondary')};
`;

const TagTooltip = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[1]};
  max-width: 300px;
  padding: ${theme.spacing[2]};
`;

const ContentContainer = styled.div`
  flex: 6;
  min-width: 0;
`;
