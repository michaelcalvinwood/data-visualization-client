import { Button, ButtonGroup } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMode } from '../store/sliceChartFilters';

const modes = ['topic', 'demo'];

const Mode = () => {
  const { mode: activeMode } = useSelector(state => state.chartFilters);

  const dispatch = useDispatch();

  return (
    <ButtonGroup isAttached variant='outline'>
      {modes.map(mode => (
        <Button
          variant={mode === activeMode ? 'solid' : 'outline'}
          // onClick={() => dispatch(toggleMode())}
          textTransform='capitalize'
          letterSpacing={0.5}
          fontWeight={600}
          key={mode}
        >
          {mode}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default Mode;
