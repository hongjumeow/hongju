import styled from 'styled-components';

const Button = styled.div`
  position: relative;
  --radius: 40px;
  width: var(--radius);
  height: var(--radius);
  background-color: #888;
  border: 1px solid #000;
  border-radius: 20px;
  cursor: pointer;
`;

const ControllerButton = ({ $onClick }: {
  $onClick: () => void
}) => (
  <Button onClick={$onClick} />
);

export default ControllerButton;