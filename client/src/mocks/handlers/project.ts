import { http, HttpResponse } from 'msw';
import { Project } from '@/shared/types/project';

const mockProjects: Project[] = [
  {
    id: '1',
    title: '프로젝트 관리 시스템 개발',
    companyName: '테크 컴퍼니',
    startDate: '2023-01',
    endDate: '2023-06',
    keywords: ['React', 'TypeScript', 'Next.js'],
    isPublic: true,
    summary: '프로젝트 관리 시스템 개발',
    workExperienceId: 'work-1',
  },
  {
    id: '2',
    title: '이력서 빌더 서비스',
    companyName: '스타트업',
    startDate: '2023-07',
    endDate: '2023-12',
    keywords: ['Next.js', 'MongoDB', 'AWS'],
    isPublic: true,
    summary: '이력서 빌더 서비스',
    workExperienceId: 'work-2',
  },
];

export const projectHandlers = [
  http.get('/api/projects', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const keyword = url.searchParams.get('keyword');

    let filteredProjects = [...mockProjects];

    if (keyword) {
      filteredProjects = filteredProjects.filter(project =>
        project.title.toLowerCase().includes(keyword.toLowerCase()) ||
        project.keywords.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
      );
    }

    return HttpResponse.json({
      projects: filteredProjects,
      total: filteredProjects.length,
      page,
      limit,
    });
  }),
]; 