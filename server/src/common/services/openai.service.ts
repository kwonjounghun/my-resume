import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async summarizeRetrospective(situation: string, task: string, action: string, result: string): Promise<{ summary: string; keywords: string[] }> {
    const prompt = `
다음은 프로젝트 회고의 STAR(상황, 과제, 행동, 결과) 내용입니다. 이를 분석하여 3줄로 요약하고, 주요 키워드를 추출해주세요.
키워드는 기술이나 방법론 과 같은 키워들 중심으로 추출해주세요. 예를들면 react, spring, OO디자인 패턴, 유저 스토리, 등과 같은 것들이 있어요.

상황(Situation):
${situation}

과제(Task):
${task}

행동(Action):
${action}

결과(Result):
${result}

다음 형식으로 응답해주세요:
요약:
1. [첫 번째 줄]
2. [두 번째 줄]
3. [세 번째 줄]

키워드: [키워드1], [키워드2], [키워드3], ...
`;

    console.log(prompt);

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: '당신은 개발자의 프로젝트 회고를 분석하고 요약하는 전문가입니다. 주어진 STAR 내용을 간결하고 명확하게 요약하고, 중요한 키워드를 추출해주세요.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const response = completion.choices[0].message.content;
      const [summaryPart, keywordsPart] = response.split('\n\n키워드:');
      console.log(response);

      // 요약 부분에서 번호와 줄바꿈을 제거하고 하나의 문장으로 만듦
      const summary = summaryPart
        .split('\n')
        .filter(line => line.match(/^\d\./))
        .map(line => line.replace(/^\d\.\s/, ''))
        .join(' ');

      // 키워드 부분에서 쉼표로 구분된 키워드를 배열로 변환
      const keywords = keywordsPart
        .split(',')
        .map(keyword => keyword.trim())
        .filter(keyword => keyword.length > 0)
        .slice(0, 10); // 최대 10개까지만 사용

      return { summary, keywords };
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('회고 요약 생성에 실패했습니다.');
    }
  }
} 