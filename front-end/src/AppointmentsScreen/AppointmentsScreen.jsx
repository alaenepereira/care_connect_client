// AppointmentsScreen.jsx
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, MenuItem, Grid, Alert,
  Snackbar, IconButton, Chip, Card, CardContent, Tabs, Tab, Avatar,
  LinearProgress, Tooltip, Fab, InputAdornment, FormControl, InputLabel
} from '@mui/material';
import {
  Add as AddIcon, Edit as EditIcon, Search as SearchIcon,
  CalendarMonth as CalendarIcon, Person as PersonIcon,
  LocalHospital as HospitalIcon, EventAvailable as EventIcon
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Criar tema personalizado com a cor #00a896
const theme = createTheme({
  palette: {
    primary: {
      main: '#00a896',
      light: '#33b9ab',
      dark: '#007566',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f9a826',
      light: '#fbb950',
      dark: '#ae751a',
      contrastText: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 'bold',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

const AppointmentsScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    data: '',
    status: 'AGENDADO',
    value: '',
    observations: '',
    patientId: '',
    professionalId: ''
  });

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/appointment/listAll');
      
      if (response.ok) {
        const data = await response.json();
        setAppointments(data.listAppointments || []);
      } else {
        throw new Error('Erro ao carregar agendamentos');
      }
    } catch (error) {
      showSnackbar(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch patients and professionals
  const fetchData = async () => {
    try {
      // Fetch patients
      const patientsResponse = await fetch('http://localhost:3000/api/patient/listAll');
      
      if (patientsResponse.ok) {
        const patientsData = await patientsResponse.json();
        setPatients(patientsData || []);
      }
      
      // Fetch professionals
      const professionalsResponse = await fetch('http://localhost:3000/api/professional/listAll');
      
      if (professionalsResponse.ok) {
        const professionalsData = await professionalsResponse.json();
        setProfessionals(professionalsData.professionalList || []);
      }
    } catch (error) {
      showSnackbar('Erro ao carregar dados', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchData();
  }, []);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleOpenDialog = (appointment = null) => {
    if (appointment) {
      setEditingAppointment(appointment);
      setFormData({
        data: formatDateForInput(appointment.data),
        status: appointment.status,
        value: appointment.value || '',
        observations: appointment.observations || '',
        patientId: appointment.patientId,
        professionalId: appointment.professionalId
      });
    } else {
      setEditingAppointment(null);
      setFormData({
        data: '',
        status: 'AGENDADO',
        value: '',
        observations: '',
        patientId: '',
        professionalId: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAppointment(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação dos campos obrigatórios
    if (!formData.data || !formData.patientId || !formData.professionalId) {
      showSnackbar('Preencha todos os campos obrigatórios', 'error');
      return;
    }
    
    try {
      const url = editingAppointment 
        ? `http://localhost:3000/api/appointment/update/${editingAppointment.id}`
        : 'http://localhost:3000/api/appointment/create';
      
      const method = editingAppointment ? 'PUT' : 'POST';
      
      // Preparar dados para enviar (converter data para formato ISO)
      const dataToSend = {
        ...formData,
        data: new Date(formData.data).toISOString()
      };
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });
      
      if (response.ok) {
        const _result = await response.json();
        showSnackbar(
          editingAppointment 
            ? 'Agendamento atualizado com sucesso!' 
            : 'Agendamento criado com sucesso!'
        );
        fetchAppointments();
        handleCloseDialog();
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erro ao salvar agendamento');
      }
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'AGENDADO': return 'primary';
      case 'CONCLUIDO': return 'success';
      case 'CANCELADO': return 'error';
      default: return 'default';
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (tabValue === 1) {
      const date = new Date(appointment.data);
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      return date.toDateString() === today.toDateString() || 
             date.toDateString() === tomorrow.toDateString();
    }
    
    if (tabValue === 2) {
      return appointment.status === 'AGENDADO';
    }
    
    if (tabValue === 3) {
      return appointment.status === 'CONCLUIDO';
    }
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        (appointment.patient?.name || '').toLowerCase().includes(searchLower) ||
        (appointment.Professional?.name || '').toLowerCase().includes(searchLower) ||
        (appointment.Professional?.specialty || '').toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  const upcomingAppointments = appointments.filter(appointment => {
    const date = new Date(appointment.data);
    const now = new Date();
    return date >= now && appointment.status === 'AGENDADO';
  }).slice(0, 3);

  if (loading) {
    return (
      <Container>
        <Box sx={{ width: '100%', mt: 4 }}>
          <LinearProgress />
        </Box>
      </Container>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4" component="h1" fontWeight="bold" color="primary.main">
              <EventIcon sx={{ fontSize: 36, verticalAlign: 'bottom', mr: 1 }} />
              Agendamentos
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{ px: 3, py: 1 }}
            >
              Novo Agendamento
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Tabs 
                    value={tabValue} 
                    onChange={(e, newValue) => setTabValue(newValue)}
                    indicatorColor="primary"
                    textColor="primary"
                  >
                    <Tab label="Todos" />
                    <Tab label="Próximos" />
                    <Tab label="Agendados" />
                    <Tab label="Concluídos" />
                  </Tabs>
                  
                  <TextField
                    placeholder="Buscar agendamentos..."
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Paciente</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Profissional</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Data/Hora</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Valor</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Status</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredAppointments.map((appointment) => (
                        <TableRow key={appointment.id} hover>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'primary.main' }}>
                                <PersonIcon fontSize="small" />
                              </Avatar>
                              {appointment.patient?.name || 'N/A'}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'secondary.main' }}>
                                <HospitalIcon fontSize="small" />
                              </Avatar>
                              <Box>
                                <Typography variant="body2">{appointment.Professional?.name || 'N/A'}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {appointment.Professional?.specialty || ''}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            {formatDateForDisplay(appointment.data)}
                          </TableCell>
                          <TableCell>
                            {appointment.value ? (
                              <Typography fontWeight="bold" color="primary.main">
                                R$ {parseFloat(appointment.value).toFixed(2)}
                              </Typography>
                            ) : 'N/A'}
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={appointment.status} 
                              color={getStatusColor(appointment.status)}
                              size="small"
                              variant={appointment.status === 'AGENDADO' ? 'filled' : 'outlined'}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Editar">
                              <IconButton
                                color="primary"
                                onClick={() => handleOpenDialog(appointment)}
                                size="small"
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {filteredAppointments.length === 0 && (
                  <Box textAlign="center" py={4}>
                    <CalendarIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                    <Typography variant="h6" color="text.secondary">
                      Nenhum agendamento encontrado
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3, mb: 3, borderLeft: `4px solid #00a896` }}>
                <Typography variant="h6" gutterBottom color="primary.main" fontWeight="bold">
                  Próximos Agendamentos
                </Typography>
                
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id} sx={{ mb: 2, bgcolor: 'rgba(0, 168, 150, 0.05)' }}>
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {appointment.patient?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        com {appointment.Professional?.name}
                      </Typography>
                      <Typography variant="caption" display="block" color="primary.main" fontWeight="bold">
                        {formatDateForDisplay(appointment.data)}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
                
                {upcomingAppointments.length === 0 && (
                  <Typography variant="body2" color="text.secondary" textAlign="center" py={2}>
                    Nenhum agendamento futuro
                  </Typography>
                )}
              </Paper>

              <Paper elevation={2} sx={{ p: 3, borderLeft: `4px solid #f9a826` }}>
                <Typography variant="h6" gutterBottom color="primary.main" fontWeight="bold">
                  Estatísticas
                </Typography>
                
                <Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="body2">Total de agendamentos:</Typography>
                    <Typography variant="body2" fontWeight="bold" color="primary.main">{appointments.length}</Typography>
                  </Box>
                  
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="body2">Agendados:</Typography>
                    <Typography variant="body2" fontWeight="bold" color="primary.main">
                      {appointments.filter(a => a.status === 'AGENDADO').length}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="body2">Concluídos:</Typography>
                    <Typography variant="body2" fontWeight="bold" color="primary.main">
                      {appointments.filter(a => a.status === 'CONCLUIDO').length}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">Cancelados:</Typography>
                    <Typography variant="body2" fontWeight="bold" color="primary.main">
                      {appointments.filter(a => a.status === 'CANCELADO').length}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          <Fab
            color="primary"
            aria-label="add"
            sx={{ position: 'fixed', bottom: 24, right: 24 }}
            onClick={() => handleOpenDialog()}
          >
            <AddIcon />
          </Fab>

          {/* Dialog para criar/editar agendamento */}
          <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
            <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
              {editingAppointment ? 'Editar Agendamento' : 'Novo Agendamento'}
            </DialogTitle>
            <form onSubmit={handleSubmit}>
              <DialogContent sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Data e Hora *"
                      type="datetime-local"
                      name="data"
                      value={formData.data}
                      onChange={handleInputChange}
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Status *</InputLabel>
                      <TextField
                        select
                        name="status"
                        value={formData.status}
                        label="Status *"
                        onChange={handleInputChange}
                      >
                        <MenuItem value="AGENDADO">Agendado</MenuItem>
                        <MenuItem value="CONCLUIDO">Concluído</MenuItem>
                        <MenuItem value="CANCELADO">Cancelado</MenuItem>
                      </TextField>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Valor (R$)"
                      type="number"
                      name="value"
                      value={formData.value}
                      onChange={handleInputChange}
                      inputProps={{ step: "0.01", min: "0" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Paciente *</InputLabel>
                      <TextField
                        select
                        name="patientId"
                        value={formData.patientId}
                        label="Paciente *"
                        onChange={handleInputChange}
                      >
                        {patients.map((patient) => (
                          <MenuItem key={patient.id} value={patient.id}>
                            {patient.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Profissional *</InputLabel>
                      <TextField
                        select
                        name="professionalId"
                        value={formData.professionalId}
                        label="Profissional *"
                        onChange={handleInputChange}
                      >
                        {professionals.map((professional) => (
                          <MenuItem key={professional.id} value={professional.id}>
                            {professional.name} - {professional.specialty}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Observações"
                      name="observations"
                      value={formData.observations}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancelar</Button>
                <Button type="submit" variant="contained">
                  {editingAppointment ? 'Atualizar' : 'Criar'}
                </Button>
              </DialogActions>
            </form>
          </Dialog>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          >
            <Alert 
              onClose={() => setSnackbar({ ...snackbar, open: false })} 
              severity={snackbar.severity}
              sx={{ width: '100%' }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AppointmentsScreen;