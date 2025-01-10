import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { Resume } from '../schemas/resume.schema';
import { Profile } from '../../profile/profile.schema';
import { Project } from '../../project/domain/project.entity';

@Injectable()
export class PdfService {
  async generatePdf(resume: Resume, profile: Profile, projects: Project[]): Promise<Buffer> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox']
    });

    try {
      const page = await browser.newPage();

      // HTML 템플릿 생성
      const html = this.generateHtml(resume, profile, projects);
      await page.setContent(html, { waitUntil: 'networkidle0' });

      // PDF 생성
      const pdf = await page.pdf({
        format: 'A4',
        margin: {
          top: '20mm',
          right: '20mm',
          bottom: '20mm',
          left: '20mm'
        },
        printBackground: true
      });

      return Buffer.from(pdf);
    } finally {
      await browser.close();
    }
  }

  private generateHtml(resume: Resume, profile: Profile, projects: Project[]): string {
    // 프로젝트를 회사별로 그룹화
    const groupedProjects = projects.reduce((acc, project) => {
      const company = project.companyName;
      if (!acc[company]) {
        acc[company] = [];
      }
      acc[company].push(project);
      return acc;
    }, {} as Record<string, Project[]>);

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            h1 { font-size: 24px; color: #2c5282; margin-bottom: 20px; }
            h2 { font-size: 20px; color: #2d3748; margin-top: 30px; }
            h3 { font-size: 18px; color: #4a5568; }
            .section { 
              display: grid;
              grid-template-columns: 100px 1fr;
              gap: 20px;
              margin-bottom: 30px;
            }
            .section-title {
              font-weight: bold;
              color: #2d3748;
            }
            .section-content {
              flex: 1;
            }
            .info-item { 
              margin-bottom: 20px;
              _last: { margin-bottom: 0; }
            }
            .info-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 4px;
            }
            .info-title {
              font-weight: bold;
              font-size: 16px;
              margin: 0;
              color: #2d3748;
            }
            .info-date {
              color: #718096;
              font-size: 14px;
            }
            .info-description {
              color: #4a5568;
              margin-top: 4px;
            }
            .company-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 16px;
            }
            .company-name {
              font-size: 18px;
              color: #4a5568;
              font-weight: bold;
              margin: 0;
            }
            .company-period {
              color: #718096;
              font-size: 14px;
            }
            .project { 
              margin-bottom: 20px; 
              padding: 15px 0;
            }
            .project-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 10px;
            }
            .project-title { 
              font-weight: bold;
              font-size: 16px;
              margin: 0;
            }
            .project-date { 
              color: #718096; 
              font-size: 14px;
            }
            .project-summary {
              margin: 8px 0;
              color: #4a5568;
            }
            .project-keywords {
              margin-top: 8px;
            }
            .divider { border-top: 1px solid #e2e8f0; margin: 20px 0; }
            .tag { background: #ebf8ff; color: #2b6cb0; padding: 2px 8px; border-radius: 4px; font-size: 12px; margin-right: 8px; display: inline-block; margin-bottom: 4px; }
          </style>
        </head>
        <body>
          <h1>${resume.title}</h1>
          
          <div>
            <div class="info-item">
                <span class="info-label">이름:</span> ${profile.name}
              </div>
              <div class="info-item">
                <span class="info-label">이메일:</span> ${profile.email}
              </div>
              <div class="info-item">
                <span class="info-label">연락처:</span> ${profile.phone}
              </div>
          </div>

          <div class="divider"></div>

          <div class="section">
            <div class="section-title">경력</div>
            <div class="section-content">
              ${Object.entries(groupedProjects).map(([company, projects]) => {
      const startDate = new Date(Math.min(...projects.map(p => new Date(p.startDate).getTime())));
      const endDate = new Date(Math.max(...projects.map(p => new Date(p.endDate).getTime())));
      return `
                  <div class="company-section">
                    <div class="company-header">
                      <div class="company-name">${company}</div>
                      <div class="company-period">
                        ${startDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })} - 
                        ${endDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
                      </div>
                    </div>
                    ${projects.map(project => `
                      <div class="project">
                        <div class="project-header">
                          <div class="project-title">${project.title}</div>
                          <div class="project-date">
                            ${new Date(project.startDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })} - 
                            ${new Date(project.endDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
                          </div>
                        </div>
                        ${project.summary ? `<div class="project-summary">${project.summary}</div>` : ''}
                        ${project.keywords ? `
                          <div class="project-keywords">
                            ${project.keywords.map(keyword => `<span class="tag">${keyword}</span>`).join(' ')}
                          </div>
                        ` : ''}
                      </div>
                    `).join('')}
                  </div>
                `;
    }).join('')}
            </div>
          </div>

          ${profile.skills && profile.skills.length > 0 ? `
            <div class="divider"></div>
            <div class="section">
              <div class="section-title">기술</div>
              <div class="section-content">
                ${profile.skills.map(skill => `
                  <span class="tag">${skill.name} (LV.${skill.level})</span>
                `).join(' ')}
              </div>
            </div>
          ` : ''}

          ${profile.education && profile.education.length > 0 ? `
            <div class="divider"></div>
            <div class="section">
              <div class="section-title">학력</div>
              <div class="section-content">
                ${profile.education.map(edu => `
                  <div class="info-item">
                    <div class="info-header">
                      <div class="info-title">${edu.schoolName}</div>
                      <div class="info-date">${edu.startDate} - ${edu.endDate}</div>
                    </div>
                    <div class="info-description">${edu.major}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${profile.awards && profile.awards.length > 0 ? `
            <div class="divider"></div>
            <div class="section">
              <div class="section-title">수상 및 기타</div>
              <div class="section-content">
                ${profile.awards.map(award => `
                  <div class="info-item">
                    <div class="info-header">
                      <div class="info-title">${award.title}</div>
                      <div class="info-date">${award.date}</div>
                    </div>
                    ${award.description ? `<div class="info-description">${award.description}</div>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${profile.languages && profile.languages.length > 0 ? `
            <div class="divider"></div>
            <div class="section">
              <div class="section-title">자격증</div>
              <div class="section-content">
                ${profile.languages.map(language => `
                  <div class="info-item">
                    <div class="info-header">
                      <div class="info-title">${language.name}</div>
                      <div class="info-date">
                        ${language.certifications.join(', ')}
                      </div>
                    </div>
                    ${language.level ? `<div class="info-description">Level: ${language.level}</div>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </body>
      </html>
    `;
  }
} 