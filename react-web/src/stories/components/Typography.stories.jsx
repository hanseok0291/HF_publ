// Typography.stories.js
import React from 'react';
import { Title1, Title2, Title3, Title4, SubTitle1, SubTitle2, Body1, Body2, Body3, Body4, Description1, Description2, Description3, Description4 } from '@/app/components/TypographyComponents';

export default {
  title: 'Typography',
  tags: ['autodocs'],
};

export const Title1Story = () => <Title1>Title 1 Example</Title1>;
Title1Story.storyName = 'Title 1';
Title1Story.parameters = {
  docs: {
    description: {
      story: 'Title 1은 주요 제목에 사용되며, 볼드체와 30px 크기로 스타일링됩니다.'
    }
  }
};

export const Title2Story = () => <Title2>Title 2 Example</Title2>;
Title2Story.storyName = 'Title 2';
Title2Story.parameters = {
  docs: {
    description: {
      story: 'Title 2는 보조 제목에 사용되며, 볼드체와 28px 크기로 스타일링됩니다.'
    }
  }
};

export const Title3Story = () => <Title3>Title 3 Example</Title3>;
Title3Story.storyName = 'Title 3';
Title3Story.parameters = {
  docs: {
    description: {
      story: 'Title 3은 삼차 제목에 사용되며, 볼드체와 26px 크기로 스타일링됩니다.'
    }
  }
};

export const Title4Story = () => <Title4>Title 4 Example</Title4>;
Title4Story.storyName = 'Title 4';
Title4Story.parameters = {
  docs: {
    description: {
      story: 'Title 4는 더 작은 제목에 사용되며, 볼드체와 24px 크기로 스타일링됩니다.'
    }
  }
};

export const SubTitle1Story = () => <SubTitle1>SubTitle 1 Example</SubTitle1>;
SubTitle1Story.storyName = 'SubTitle 1';
SubTitle1Story.parameters = {
  docs: {
    description: {
      story: 'SubTitle 1은 약간 더 작은 제목에 사용되며, 볼드체와 22px 크기로 스타일링됩니다.'
    }
  }
};

export const SubTitle2Story = () => <SubTitle2>SubTitle 2 Example</SubTitle2>;
SubTitle2Story.storyName = 'SubTitle 2';
SubTitle2Story.parameters = {
  docs: {
    description: {
      story: 'SubTitle 2는 소제목에 사용되며, 볼드체와 20px 크기로 스타일링됩니다.'
    }
  }
};

export const Body1Story = () => <Body1>Body 1 Example</Body1>;
Body1Story.storyName = 'Body 1';
Body1Story.parameters = {
  docs: {
    description: {
      story: 'Body 1은 주요 본문 텍스트에 사용되며, 볼드체와 19px 크기로 스타일링됩니다.'
    }
  }
};

export const Body2Story = () => <Body2>Body 2 Example</Body2>;
Body2Story.storyName = 'Body 2';
Body2Story.parameters = {
  docs: {
    description: {
      story: 'Body 2는 이차적인 텍스트 블록에 사용되며, 볼드체와 18px 크기로 스타일링됩니다.'
    }
  }
};

export const Body3Story = () => <Body3>Body 3 Example</Body3>;
Body3Story.storyName = 'Body 3';
Body3Story.parameters = {
  docs: {
    description: {
      story: 'Body 3은 덜 두드러진 텍스트에 사용되며, 볼드체와 16px 크기로 스타일링됩니다.'
    }
  }
};

export const Body4Story = () => <Body4>Body 4 Example</Body4>;
Body4Story.storyName = 'Body 4';
Body4Story.parameters = {
  docs: {
    description: {
      story: 'Body 4는 추가적인 텍스트에 사용되며, 볼드체와 15px 크기로 스타일링됩니다.'
    }
  }
};

export const Description1Story = () => <Description1>Description 1 Example</Description1>;
Description1Story.storyName = 'Description 1';
Description1Story.parameters = {
  docs: {
    description: {
      story: 'Description 1은 추가 정보에 사용되며, 볼드체와 14px 크기로 스타일링됩니다.'
    }
  }
};

export const Description2Story = () => <Description2>Description 2 Example</Description2>;
Description2Story.storyName = 'Description 2';
Description2Story.parameters = {
  docs: {
    description: {
      story: 'Description 2는 이차적인 정보에 사용되며, 일반체와 13px 크기로 스타일링됩니다.'
    }
  }
};

export const Description3Story = () => <Description3>Description 3 Example</Description3>;
Description3Story.storyName = 'Description 3';
Description3Story.parameters = {
  docs: {
    description: {
      story: 'Description 3은 삼차 정보에 사용되며, 볼드체와 12px 크기로 스타일링됩니다.'
    }
  }
};

export const Description4Story = () => <Description4>Description 4 Example</Description4>;
Description4Story.storyName = 'Description 4';
Description4Story.parameters = {
  docs: {
    description: {
      story: 'Description 4는 사소한 텍스트 세부 정보에 사용되며, 볼드체와 11px 크기로 스타일링됩니다.'
    }
  }
};
