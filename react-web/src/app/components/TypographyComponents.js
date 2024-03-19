import styled from '@emotion/styled';

// props로 받은 weight 값에 따라 font-weight를 결정하는 함수
const getFontWeight = (weight) => weight === 'Regular' ? 'normal' : 'bold';
const getFontColor = (color) => color ? color : '#151515';

export const Title1 = styled.h1`
  color: ${props => getFontColor(props.color)};
  font-weight: ${props => getFontWeight(props.weight)};
  font-size: 30px;
  line-height: 135%;
  letter-spacing: 0px;
`;

export const Title2 = styled.h2`
  color: ${props => getFontColor(props.color)};
  font-weight: ${props => getFontWeight(props.weight)};
  font-size: 28px;
  line-height: 135%;
  letter-spacing: 0px;
`;

export const Title3 = styled.h3`
  color: ${props => getFontColor(props.color)};
  font-weight: ${props => getFontWeight(props.weight)};
  font-size: 26px;
  line-height: 135%;
  letter-spacing: 0px;
`;

export const Title4 = styled.h4`
  color: ${props => getFontColor(props.color)};
  font-weight: ${props => getFontWeight(props.weight)};
  font-size: 24px;
  line-height: 135%;
  letter-spacing: 0px;
`;

export const SubTitle1 = styled.h5`
  color: ${props => getFontColor(props.color)};
  font-weight: ${props => getFontWeight(props.weight)};
  font-size: 22px;
  line-height: 135%;
  letter-spacing: 0px;
`;

export const SubTitle2 = styled.h6`
  color: ${props => getFontColor(props.color)};
  font-weight: ${props => getFontWeight(props.weight)};
  font-size: 20px;
  line-height: 135%;
  letter-spacing: 0px;
`;

export const Body1 = styled.p`
  color: ${props => getFontColor(props.color)};
  font-weight: ${props => getFontWeight(props.weight)};
  font-size: 19px;
  line-height: 135%;
  letter-spacing: 0px;
`;

export const Body2 = styled.p`
  color: ${props => getFontColor(props.color)};
  font-weight: ${props => getFontWeight(props.weight)};
  font-size: 18px;
  line-height: 135%;
  letter-spacing: 0px;
`;

export const Body3 = styled.p`
  color: ${props => getFontColor(props.color)};
  font-weight: ${props => getFontWeight(props.weight)};
  font-size: 16px;
  line-height: 135%;
  letter-spacing: 0px;
`;

export const Body4 = styled.p`
  color: ${props => getFontColor(props.color)};
  font-weight: ${props => getFontWeight(props.weight)};
  font-size: 15px;
  line-height: 140%;
  letter-spacing: 0px;
`;

export const Description1 = styled.p`
  color: ${props => getFontColor(props.color)};
  font-weight: ${props => getFontWeight(props.weight)};
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0px;
`;

export const Description2 = styled.p`
  color: ${props => getFontColor(props.color)};
  font-weight: ${props => getFontWeight(props.weight)};
  font-size: 13px;
  line-height: 140%;
  letter-spacing: 0px;
`;

export const Description3 = styled.p`
  color: ${props => getFontColor(props.color)};
  font-weight: ${props => getFontWeight(props.weight)};
  font-size: 12px;
  line-height: 150%;
  letter-spacing: -0.4px;
`;

export const Description4 = styled.p`
  color: ${props => getFontColor(props.color)};
  font-weight: ${props => getFontWeight(props.weight)};
  font-size: 11px;
  line-height: 150%;
  letter-spacing: -0.4px;
`;