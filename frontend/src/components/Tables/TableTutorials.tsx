import React, { useState, useMemo } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import { tutorialInterface } from "@/interfaces/tutorial.interta";

interface TableTutorialProps {
  tutorials: tutorialInterface[];
}

const TableTutorial: React.FC<TableTutorialProps> = ({ tutorials }) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [filters, setFilters] = useState({
    title: '',
    duration: '',
    difficulty: ''
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const filteredTutorials = useMemo(() => {
    return tutorials.filter((tutorial) => {
      if (!tutorial) return false;
      return (
        (tutorial.title ?? '').toLowerCase().includes(filters.title.toLowerCase()) &&
        (tutorial.estimatedDuration ?? '').toLowerCase().includes(filters.duration.toLowerCase()) &&
        (tutorial.difficultyLevel ?? '').toLowerCase().includes(filters.difficulty.toLowerCase())
      );
    });
  }, [filters, tutorials]);

  const visibleTutorials = useMemo(() => {
    return filteredTutorials.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredTutorials, page, rowsPerPage]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filtros
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <TextField
          label="Título"
          name="title"
          value={filters.title}
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Duração"
          name="duration"
          value={filters.duration}
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Nível de Dificuldade"
          name="difficulty"
          value={filters.difficulty}
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        />
      </Box>

      <TableContainer>
        <Table stickyHeader aria-label="tabela de tutoriais">
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Duração Estimada</TableCell>
              <TableCell>Nível de Dificuldade</TableCell>
              <TableCell>Deletado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleTutorials.map((tutorial) => (
              <TableRow hover key={tutorial.id}>
                <TableCell>{tutorial.title}</TableCell>
                <TableCell>{tutorial.estimatedDuration}</TableCell>
                <TableCell>{tutorial.difficultyLevel}</TableCell>
                <TableCell>{tutorial.isDeleted ? "Sim" : "Não"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredTutorials.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableTutorial;