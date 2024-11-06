import React, { useState } from 'react';
import Header from '../components/Header';
// import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Pagination, TextField, Button, Card, CardContent, InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search'; 
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const initialRows = [
  { id: 1, name: 'Product 1', category: 'Category 1', source: 'Source 1', price: '₹2000', fromDate: '30-09-2024', toDate: '30-09-2024' },
  { id: 2, name: 'Product 2', category: 'Category 2', source: 'Source 2', price: '₹1500', fromDate: '30-09-2024', toDate: '30-09-2024' },
  { id: 3, name: 'Product 3', category: 'Category 3', source: 'Source 3', price: '₹3000', fromDate: '30-09-2024', toDate: '30-09-2024' },
  { id: 4, name: 'Product 4', category: 'Category 4', source: 'Source 4', price: '₹2500', fromDate: '30-09-2024', toDate: '30-09-2024' },
  { id: 5, name: 'Product 5', category: 'Category 5', source: 'Source 5', price: '₹3500', fromDate: '30-09-2024', toDate: '30-09-2024' },
  { id: 6, name: 'Product 6', category: 'Category 6', source: 'Source 6', price: '₹4000', fromDate: '30-09-2024', toDate: '30-09-2024' },
];

const ProductList = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState(initialRows);

  const navigateToAddNewProduct = () => {
    navigate("/createProduct");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setRows(rows.filter(row => row.id !== id));
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  };

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Header />
          <Container>
            {/* Title and Search+Button Row */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap',marginBottom:'24px' }}>
              <Typography variant="h6" gutterBottom>
                Product List
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: { xs: 1, sm: 0 } }}>
                <TextField
                  label="Search"
                  variant="outlined"
                  size="small"
                  sx={{ width: { xs: '100%', sm: '200px' } }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button variant="contained" color="primary" onClick={navigateToAddNewProduct}>
                  + Create Product
                </Button>
              </Box>
            </Box>

            {/* Table */}
            <Card elevation={3} sx={{ borderRadius: 4 }}>
              <CardContent>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{fontWeight: 'bold'}}>Sr.</TableCell>
                        <TableCell sx={{fontWeight: 'bold'}}>Product Name</TableCell>
                        <TableCell sx={{fontWeight: 'bold'}}>Product Category</TableCell>
                        <TableCell sx={{fontWeight: 'bold'}}>Product Source</TableCell>
                        <TableCell sx={{fontWeight: 'bold'}}>Product Price</TableCell>
                        <TableCell sx={{fontWeight: 'bold'}}>From Date</TableCell>
                        <TableCell sx={{fontWeight: 'bold'}}>To Date</TableCell>
                        <TableCell sx={{fontWeight: 'bold'}}>Action</TableCell>
                        <TableCell sx={{fontWeight: 'bold'}}>View</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.category}</TableCell>
                          <TableCell>{row.source}</TableCell>
                          <TableCell>{row.price}</TableCell>
                          <TableCell>{row.fromDate}</TableCell>
                          <TableCell>{row.toDate}</TableCell>
                          <TableCell>
                            <IconButton size="small" color="primary">
                              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.3916 27.8206H28.0343" stroke="#131313" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M24.2278 12.5609V12.5609C22.8278 11.5109 20.8424 11.7942 19.7924 13.1932C19.7924 13.1932 14.5705 20.1494 12.759 22.563C10.9476 24.9776 12.6611 27.9692 12.6611 27.9692C12.6611 27.9692 16.0403 28.7463 17.8257 26.3661C19.6121 23.9869 24.859 16.9963 24.859 16.9963C25.909 15.5973 25.6267 13.6109 24.2278 12.5609Z" stroke="#131313" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M18.4424 15.0117L23.509 18.8148" stroke="#131313" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </IconButton>
                            <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M27.1768 17.4521C27.1768 25.8053 28.3792 29.5811 20.2919 29.5811C12.2036 29.5811 13.4308 25.8053 13.4308 17.4521" stroke="#131313" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M28.714 14.2499H11.8906" stroke="#131313" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M23.8694 14.2498C23.8694 14.2498 24.42 10.3271 20.301 10.3271C16.1829 10.3271 16.7335 14.2498 16.7335 14.2498" stroke="#131313" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            <IconButton size="small" color="primary">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11.5863 21.7788C13.3657 23.5478 16.469 25.9999 19.9997 25.9999C23.5303 25.9999 26.6331 23.5478 28.4125 21.7788C28.8818 21.3123 29.1172 21.0782 29.2667 20.6201C29.3733 20.2933 29.3733 19.7067 29.2667 19.3799C29.1172 18.9218 28.8818 18.6877 28.4125 18.2211C26.633 16.4521 23.5303 14 19.9997 14C16.469 14 13.3657 16.4521 11.5863 18.2211C11.1166 18.688 10.8818 18.9216 10.7323 19.3799C10.6257 19.7067 10.6257 20.2933 10.7323 20.6201C10.8818 21.0784 11.1166 21.3119 11.5863 21.7788Z" stroke="#131313" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M17.9995 20C17.9995 21.1046 18.8949 22 19.9995 22C21.1041 22 21.9995 21.1046 21.9995 20C21.9995 18.8954 21.1041 18 19.9995 18C18.8949 18 17.9995 18.8954 17.9995 20Z" stroke="#131313" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>

                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Typography variant="body2">Showing {rows.length} of {rows.length}</Typography>
              <Pagination count={1} color="primary" />
            </Box>
          </Container>
          {/* Footer  */}
          {/* <Footer /> */}
        </Box>
      </Box>
    </div>
  );
};

export default ProductList;
