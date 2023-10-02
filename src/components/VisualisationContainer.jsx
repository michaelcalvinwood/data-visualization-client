import {
  Box,
  Code,
  Container,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Select
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterInitialValues, setFilter } from '../store/sliceChartFilters';

const VisualisationContainer = () => {
  const { filters, values, status } = useSelector(state => state.chartFilters);

  const dispatch = useDispatch();

  const handleUpdateFilter = ({ target: { name, value } }) => {
    dispatch(setFilter({ name, value }));
  };

  const getFilterValues = (field, values) =>
    field === 'action' ? values[filters.topic] ?? [] : values;

  useEffect(() => {
    dispatch(getFilterInitialValues());
  }, [dispatch]);

  return (
    <Container>
      <Grid templateColumns='repeat(3, 1fr)' w='100%' gap={6} my={6}>
        {Object.entries(values).map(([field, values]) => (
          <GridItem key={field}>
            <FormControl>
              <FormLabel>{field}</FormLabel>

              <Select
                name={field}
                placeholder='All'
                value={filters[field]}
                onChange={handleUpdateFilter}
              >
                {getFilterValues(field, values).map(value => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>
        ))}
      </Grid>

      <Box>
        <h3>status: {status}</h3>

        <Code py={2} px={4} mx='auto' my={6}>
          <pre>{JSON.stringify(filters, null, 2)}</pre>
        </Code>
      </Box>
    </Container>
  );
};

export default VisualisationContainer;
