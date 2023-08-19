import { Button, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import bookService from '../../services/bookService';
import { useNavigate } from 'react-router-dom';
import "./AdminBookPage.css"

const AdminBookPage = () => {

  const navigate = useNavigate();
    const [bookRecords, setBookRecords] = useState({
        padeIndex:0,
        pageSize:10,
        totalPages:1,
        items:[],
        totalItems:0
      });

      const [filters,setFilters] = useState({
        pageSize: 10,
        pageIndex: 1,
      });
    
    
      const getBooks = async () => {
        await bookService.GetPaginatedBooks(filters.pageSize,filters.pageIndex).then((response) =>{
          if(response && response.status === 200){
            // setBooks(response.data.result);
            setBookRecords(response.data.result);
          }
        })
      }
    
    
      useEffect(()=>{
        getBooks();
      },[filters]);

    // console.log("rec", bookRecords.items)
    // console.log("all", bookRecords)

  return (
    <div>
        <div className='admin-container'>
        <Typography variant="h2" sx={{margin:5}} >Book Page</Typography>
        <Button type="button" sx={{":hover": {backgroundColor: "#d11932"}}} variant="contained" onClick={() => { navigate(`/addbook`); }} > Add New Book</Button>
        <TableContainer sx={{width:"90%"}}>
          <Table aria-label="simple table">
            <TableHead >
              <TableRow>
                
                  <TableCell>
                   <h3>Book Name </h3> 
                  </TableCell>
                  <TableCell>
                   <h3> Price</h3>
                  </TableCell>
                  <TableCell>
                   <h3> Category </h3> 
                  </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookRecords?.items?.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>
                    {row.category}
                  </TableCell>
                  <TableCell className='edit-btns'>
                    <Button
                      type="button"
                      sx={{backgroundColor:"white", border:"2px solid green",":hover": {backgroundColor:"green", color: "white"}, color:"green"}}
                      variant="contained"
                      disableElevation
                      onClick={() => {
                        navigate(`/editbook/${row.id}`);
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
              {!bookRecords.items.length && (
                <TableRow className="TableRow">
                  <TableCell colSpan={5} className="TableCell">
                    <Typography align="center" className="noDataText">
                      No Books
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination sx={{margin:5}} count={bookRecords.totalPages} page={filters.pageIndex} onChange={(e, newPage) => {setFilters({ ...filters, pageIndex: newPage });}} />
        </div>
    </div>
  )
}

export default AdminBookPage