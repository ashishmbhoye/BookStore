import { Button, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import bookService from '../../services/bookService';
import "./CategoryPage.css"

const CategoryPage = () => {
    const navigate = useNavigate();
    const [categoryRecords, setCategoryRecords] = useState({
        pageIndex: 0,
        pageSize: 10,
        totalPages: 1,
        items: [],
        totalItems: 0,
      });

      const [filters,setFilters] = useState({
        pageSize: 10,
        pageIndex: 1,
      });
    
    
      const getUsers = async () => {
        await bookService.GetPaginatedCategories (filters.pageSize,filters.pageIndex).then((response) =>{
          if(response && response.status === 200){
            setCategoryRecords(response.data.result);
          }
        })
      }
    
    
      useEffect(()=>{
        getUsers();
      },[filters]);

      // console.log("user", categoryRecords)

  return (
    <div>
        <div className='category-container'>
        <Typography variant="h2" sx={{margin:5}}>Category</Typography>
        <Button type="button" sx={{":hover": {backgroundColor: "#d11932"}}} variant="contained" onClick={() => { navigate(`/addcategory`); }} > Add New Category</Button>
        <TableContainer sx={{width:"50%"}}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                
                  <TableCell>
                    <h3>Category Name</h3>
                  </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoryRecords?.items?.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell className='edit-btns'>
                    <Button
                      type="button"
                      sx={{backgroundColor:"white", border:"2px solid green",":hover": {backgroundColor:"green", color: "white"}, color:"green"}}
                      variant="contained"
                      disableElevation
                      onClick={() => {
                        navigate(`/editcategory/${row.id}`);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      sx={{margin:1 ,backgroundColor:"white", border:"2px solid red",":hover": {backgroundColor:"red", color: "white"}, color:"red"}}
                      variant="contained"
                      disableElevation
                    //   onClick={() => {
                    //     setOpen(true);
                    //     setSelectedId(row.id ?? 0);
                    //   }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination sx={{margin:5}} count={categoryRecords.totalPages} page={filters.pageIndex} onChange={(e, newPage) => {setFilters({ ...filters, pageIndex: newPage });}} />
        </div>
    </div>
  )
}

export default CategoryPage