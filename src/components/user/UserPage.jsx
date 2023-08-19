import { Button, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import userService from '../../services/userService';
import "./UserPage.css"


const UserPage = () => {
    const navigate = useNavigate();
    const [userList, setUserList] = useState({
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
        await userService.GetPaginatedUsers(filters.pageSize,filters.pageIndex).then((response) =>{
          if(response && response.status === 200){
            // setBooks(response.data.result);
            setUserList(response.data.result);
          }
        })
      }
    
    
      useEffect(()=>{
        getUsers();
      },[filters]);


  return (
    <div>
        <div className='user-page-container'>
        <Typography variant="h2" sx={{margin:5}}>User Page</Typography>
        <TableContainer sx={{width:"90%"}}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                
                  <TableCell>
                    First Name
                  </TableCell>
                  <TableCell>
                    Last Name
                  </TableCell>
                  <TableCell>
                    Email
                  </TableCell>
                  <TableCell>
                    Role
                  </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList?.items?.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell className='edit-btns'>
                    <Button
                      type="button"
                      sx={{backgroundColor:"white", border:"2px solid green",":hover": {backgroundColor:"green", color: "white"}, color:"green"}}
                      variant="contained"
                      disableElevation
                      onClick={() => {
                        navigate(`/edituser/${row.id}`);
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

        <Pagination sx={{margin:5}} count={userList.totalPages} page={filters.pageIndex} onChange={(e, newPage) => {setFilters({ ...filters, pageIndex: newPage });}} />
        </div>
    </div>
  )
}


export default UserPage