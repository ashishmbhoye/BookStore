import React, { useEffect, useMemo, useState } from 'react'
import bookService from '../services/bookService';
import { Box, Button, Card, CardContent, CardMedia, FormControl, InputLabel, MenuItem, Pagination, Select, TextField, Typography } from '@mui/material';
import "../styles/booklist.css"
import cartService from '../services/cartService';
import { useAuthContext } from '../context/authContext';
import { useCartContext } from '../context/cartContext';
import { toast } from 'react-toastify';
// import WithAuth from '../layout/WithAuth'

const BooksList = () => {

  const authContext = useAuthContext();
  const cartContext = useCartContext();


  const [bookResponse, setBookResponse] = useState({
    padeIndex: 0,
    pageSize: 10,
    totalPages: 1,
    items: [],
    totalItems: 0
  });
  const [books, setBooks] = useState([]);
  const [sortBy, setSortBy] = useState();
  const [filters, setFilters] = useState({
    pageSize: 10,
    pageIndex: 1,
  });

  // console.log("fil",filters.pageSize )

  const getBooks = async () => {
    await bookService.GetPaginatedBooks(filters.pageSize, filters.pageIndex).then((response) => {
      if (response && response.status === 200) {
        // setBooks(response.data.result);
        setBookResponse(response.data.result);
      }
    })
  }

  // console.log("thisi", bookService.getById())


  const sortBooks = (e) => {
    setSortBy(e.target.value);
    const bookList = bookResponse.items;

    bookList.sort((a, b) => {
      if (a.name < b.name) {
        return e.target.value === "a-z" ? -1 : 1;
      }
      if (a.name > b.name) {
        return e.target.value === "a-z" ? 1 : -1;
      }
      return 0;
    });
    setBookResponse({ ...bookResponse, items: bookList });
  }


  useEffect(() => {
    getBooks();
  }, [filters]);

  useEffect(() => {

  })

  // console.log("books",books);
  // console.log("bokres", bookResponse)

  // ADD TO CART 

  const addingtocart = async (sbook, id) => {
    return cartService.addToCart({
      userId: id,
      bookId: sbook.id,
      quantity: 1,
    })
      .then((res) => {
        return { error: false, message: "Item added in cart" };
      })
      .catch((e) => {
        if (e.status === 500)
          return { error: true, message: "Item already in the cart" };
        else return { error: true, message: "Plese login or create Account" };
      });
  };




  const addToCart = (book) => {
    addingtocart(book, authContext.user.id).then((res) => {
      if (res.error) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        cartContext.updateCart();
      }
    });
  };
  // _________________________________________________--------------------------

  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const filteredData = bookResponse.items.filter((el) => {
    if (inputText === '') {
      return el;
    } else {
      return el.name.toLowerCase().includes(inputText)
    }
  })
  // _____________________________________----------------------------



  return (
    <div className='booklist-container'>

      <div className='book-head'>
        <Typography variant="body1">Total books: {bookResponse.totalItems}</Typography>
        {/* <TextField sx={{width:600}}></TextField> */}
        <TextField id="standard-basic" onChange={inputHandler} label="Search Book" variant="outlined" sx={{ width: 600 }} />

        <FormControl className="sorting" variant="outlined">

          <InputLabel htmlFor="select">Sort By</InputLabel>
          <Select sx={{ width: 150 }} onChange={sortBooks} value={sortBy}>
            <MenuItem value="a-z">a - z</MenuItem>
            <MenuItem value="z-a">z - a</MenuItem>
          </Select>
        </FormControl>


      </div>


      <Box sx={{ margin: "auto", marginTop: 4, display: "flex", width: "80%", flexWrap: "wrap", justifyContent: "center" }}>
        {filteredData.map((book, index) => (
          <Card key={index} sx={{ margin: 2, width: 250, height: 420, boxShadow: 5 }}>

            <CardMedia style={{ height: 250, width: 250 }} image={book.base64image} />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div" style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} >
                {book.name}
              </Typography>
              <Typography gutterBottom variant="body1" >
                {book.category}
              </Typography>
              <Typography style={{ width: 150, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} variant="body2" color="text.secondary" >
                {book.description}
              </Typography>

              <Button sx={{ ":hover": { backgroundColor: "#d11932" } }} variant="contained" onClick={() => addToCart(book)}>Add To Cart</Button>



            </CardContent>
          </Card>
        ))}
      </Box>

      <Pagination count={bookResponse.totalPages} page={filters.pageIndex} onChange={(e, newPage) => { setFilters({ ...filters, pageIndex: newPage }); }} />
    </div>
  )
}

export default BooksList