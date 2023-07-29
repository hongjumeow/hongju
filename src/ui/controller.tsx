import styled from 'styled-components';

import ControllerButton from './controllerButton';

const Wrapper = styled.div`
  position: absolute;
  overflow: hidden;
  left: 0;
  top: 0;
  width: 200px;
  height: 40px;
  margin: 0;
  padding: 20px;
`;

interface Props {
  onClickFuncs: Array<() => void>,
}

const Controller = (props: Props) => {
  const {onClickFuncs} = props;

  return (
    <Wrapper>
      { onClickFuncs.map((func, idx) => 
        <ControllerButton key={idx} $onClick={func} />)
      }
    </Wrapper>
  );
}

export default Controller;