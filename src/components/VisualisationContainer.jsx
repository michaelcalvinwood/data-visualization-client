import {
  Box,
  Container,
  FormControl,
  FormLabel,
  GridItem,
  Select,
  SimpleGrid,
  Spinner,
  Center,
  Card,
  CardBody
} from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emit } from '../utils/socket';
import { setFilter } from '../store/sliceChartFilters';
import Mode from './Mode';
import SingleChart from './SingleChart';

const VisualisationContainer = () => {
  const { filters, values, mode, status } = useSelector(
    state => state.chartFilters
  );

  const { data, labels } = useSelector(state => ({
    data: state.chartFilters.data.map(({ value }) => value),
    labels: state.chartFilters.data.map(({ label }) => label)
  }));

  const dispatch = useDispatch();

  const handleUpdateFilter = ({ target: { name, value } }) => {
    dispatch(
      setFilter({
        name,
        value: value ? JSON.parse(value) : ''
      })
    );
  };

  const getFilterValues = (field, values) =>
    field === 'action'
      ? values[filters.topic.value]
      : field === 'demo_cut'
      ? values[filters.demo.value]
      : values;

  const columns = useMemo(
    () =>
      mode === 'topic'
        ? ['topic', 'action', 'demo']
        : ['demo', 'demo_cut', 'topic'],
    [mode]
  );

  const shouldDisplayChart = useMemo(
    () =>
      mode === 'topic' &&
      filters.action.id &&
      filters.demo.id &&
      filters.topic.id,
    [mode, filters]
  );

  useEffect(() => {
    if (shouldDisplayChart) {
      emit('getSingleChartData', {
        project: 'connected_economy',
        action_id: filters.action.id,
        topic_id: filters.topic.id,
        demo_id: filters.demo.id,
        location_id: 1,
        edition_id: 1
      });
    }
  }, [mode, filters, shouldDisplayChart]);

  return (
    <Container maxW='container.md' h='100vh' centerContent pt={12}>
      {status === 'loading' && (
        <Center h='calc(100vh - 3rem)'>
          <Spinner size='xl' />
        </Center>
      )}

      {status === 'success' && (
        <>
          <Card variant='outline' w='100%'>
            <CardBody>
              {/* <Mode /> */}

              <SimpleGrid
                columns={{ sm: 1, md: 1 }}
                spacing={4}
                w='100%'
                pb={3}
              >
                {columns.map(field => {
                  const filterValues =
                    getFilterValues(field, values[field] ?? []) ?? [];

                  return (
                    <GridItem key={field}>
                      <FormControl
                        visibility={filterValues.length ? 'visible' : 'hidden'}
                      >
                        <FormLabel
                          textTransform='capitalize'
                          fontWeight='semibold'
                          letterSpacing='wide'
                          fontSize='.75rem'
                          color='#767982'
                          ml={0.25}
                          mb={1}
                        >
                          {field}
                        </FormLabel>

                        <Select
                          name={field}
                          onChange={handleUpdateFilter}
                          value={JSON.stringify(filters[field])}
                        >
                          {filterValues.map(filter => (
                            <option
                              key={filter.id}
                              value={JSON.stringify(filter)}
                            >
                              {filter.label}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                  );
                })}
              </SimpleGrid>
            </CardBody>
          </Card>

          {shouldDisplayChart && (
            <Box w='100%' py={12}>
              <SingleChart
                data={data}
                labels={labels}
                title={filters.action.label}
                subtitle={filters.demo.label}
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default VisualisationContainer;
