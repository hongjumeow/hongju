import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  overflow: hidden;
  left: 0;
  top: 0;
  width: 20vw;
  height: 5vh;
  margin: 0;
  padding: 2vw 1vh;
`;

const ControllerButton = styled.button`
  position: relative;
  --radius: 5vw;
  width: var(--radius);
  height: var(--radius);
  background-color: #000;
  border-radius: 2.5vw;
  cursor: pointer;
`;

interface Props {
  onClickFuncs: Array<() => void>;
}

const Controller = (props: Props) => {
  const {onClickFuncs} = props; 
  return (
    <Wrapper>
      <ControllerButton onClick={onClickFuncs[0]} />
    </Wrapper>
  );
}

export default Controller;