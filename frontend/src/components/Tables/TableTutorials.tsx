import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  Stack,
  Pagination,
  Select,
  MenuItem,
  SelectChangeEvent,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { tutorialInterface } from "@/interfaces/tutorial.interta";
import { useAppDispatch } from '@/store/hooks';
import { debounce } from '@/utils/debounce';
import { fetchPaginatedTutorials } from '@/store/tutorialManagement/thunks';

export interface fetchParams {
  page?: number;
  rowsPerPage?: number;
  filters?: any;
}

const TableTutorial: React.FC = () => {
  const [tutorials, setTutorials] = useState<tutorialInterface[]>([]);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage] = useState<number>(10);
  const [filters, setFilters] = useState({
    title: '',
    duration: '',
    difficultyLevel: ''
  });
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchTutorials = useCallback(async (updatedFilters = filters) => {
    setLoading(true);
    try {
      const result = await dispatch(fetchPaginatedTutorials({
        page,
        rowsPerPage,
        filters: updatedFilters,
      })).unwrap();
      setTutorials(result.tutorials);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error('Failed to fetch tutorials:', error);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    fetchTutorials();
  }, [fetchTutorials]);

  const debouncedFetch = useCallback(
    debounce((updatedFilters) => {
      setPage(1);
      fetchTutorials(updatedFilters);
    }, 500),
    [fetchTutorials]
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFilters = {
      ...filters,
      [event.target.name]: event.target.value,
    };
    setFilters(updatedFilters);
    setLoading(true);
    debouncedFetch(updatedFilters);
  };

  const handleDifficultyChange = (event: SelectChangeEvent<string>) => {
    const updatedFilters = {
      ...filters,
      difficultyLevel: event.target.value,
    };
    setFilters(updatedFilters);
    setLoading(true);
    debouncedFetch(updatedFilters);
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const mapDifficultyToPortuguese = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'Iniciante';
      case 'intermediate':
        return 'Intermediário';
      case 'advanced':
        return 'Avançado';
      default:
        return 'Nível não especificado';
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: 3, backgroundColor: '#ffffff' }}>
      <Typography
        fontSize={30}
        fontWeight={700}
        sx={{ marginBottom: isSmallScreen ? 2 : 3, textAlign: isSmallScreen ? 'center' : 'left' }}
      >
        Lista de tutoriais
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          gap: 2,
          marginBottom: 3,
        }}
      >
        <TextField
          label="Título"
          name="title"
          value={filters.title}
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
          sx={{ backgroundColor: '#ffffff', flex: 1 }}
        />
        <TextField
          label="Duração"
          name="duration"
          value={filters.duration}
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
          sx={{ backgroundColor: '#ffffff', flex: 1 }}
        />
        <Select
          labelId="select-label"
          name="difficulty"
          value={filters.difficultyLevel}
          onChange={handleDifficultyChange}
          variant="outlined"
          size="small"
          sx={{ backgroundColor: '#ffffff', minWidth: 150, flex: 1 }}
          displayEmpty
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="beginner">Iniciante</MenuItem>
          <MenuItem value="intermediate">Intermediário</MenuItem>
          <MenuItem value="advanced">Avançado</MenuItem>
        </Select>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
          <CircularProgress />
          <Typography variant="subtitle1" sx={{ ml: 2 }}>Carregando...</Typography>
        </Box>
      ) : (
        <TableContainer>
          <Table stickyHeader aria-label="tabela de tutoriais">
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Duração Estimada</TableCell>
                <TableCell>Nível de Dificuldade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tutorials?.map((tutorial) => (
                <TableRow hover key={tutorial.id}>
                  <TableCell>{tutorial.title}</TableCell>
                  <TableCell>{tutorial.summary}</TableCell>
                  <TableCell>{tutorial.estimatedDuration}</TableCell>
                  <TableCell>{mapDifficultyToPortuguese(tutorial.difficultyLevel)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {tutorials?.length === 0 && !loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
          <Typography variant="subtitle1">Não existem tutoriais para serem exibidos.</Typography>
        </Box>
      )}
      <Box
        sx={{
          textAlign: 'right',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          marginRight: 1,
          marginTop: 3,
        }}
      >
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </Box>
    </Paper>
  );
};

export default TableTutorial;