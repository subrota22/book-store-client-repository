
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import PageLoader from 'Components/Shares/PageLoader/PageLoader';
import { useState } from 'react';
import DefultBooksData from './InitiaLBooks';


interface BooksData {
  books: BooksData[];
  _id: String;
  isbn: String;
  title: String;
  author: String;
  description: String;
  published_year: any;
  publisher: String;
  updated_date: any;
  book: any;
}

interface BooksDataVars {
  bookId: String;
}

const GET_BOOKS = gql`
  {
    books {
      _id
      title
      author
    }
  }
`;

const BooksInfo = () => {
const [searchData , setSearchData] = useState <any> ([]) ;
  const { loading, data } = useQuery<BooksData, BooksDataVars>(
    GET_BOOKS
  );
//search data
const handleSearchFeild = (searchText:any) => {
const findData:any = data?.books.filter(bookData => bookData?.title.toLowerCase().includes(searchText.toLowerCase()) ) ;
// return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
setSearchData(findData);
}
  return (
    <>


      {loading ? (
        <PageLoader></PageLoader>
      ) : (
        <div className="container">
          <div className={`panel ${searchData?.length === 0 && 'mb-48'}`}>
            <div className="panel-heading flex justify-between my-9 mx-6 flex-col lg:flex-row ">
              <p className="panel-title text-3xl mt-5 animate-pulse duration-1000  font-bolder text-center text-success uppercase">
                LIST OF BOOKS
              </p>
              <p className='btn btn-success text-white mx-7'><Link to="/add-books">Add Book</Link></p>
            </div>
            <div className="searchDiv my-8 flex justify-center ">
              <input type="search" placeholder='Search by book name' onChange={(e) => handleSearchFeild(e.target.value)} className='input input-primary w-80'/>
            </div>
          
          {  searchData?.length !== 0  &&  <div className="overflow-x-auto ">
                <table className="table w-full rounded-2xl  mb-20 shadow-2xl">
                  {/* head*/}
                  <thead className='text-info text-xl font-bold'>
                    <tr>
                      <th>Serial number </th>
                      <th>Book name</th>
                      <th>Author</th>
                      <th>Show details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchData.map((book: any, index: any) => (
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{book.title}</td>
                        <td>{book?.author}</td>
                        <td><Link to={`/details/${book?._id}`} className="btn btn-primary"> Show details </Link> </td>
                      </tr>
                    ))}
                  
                  </tbody>
                </table>
              </div>}

              {  searchData?.length === 0 && 
            <DefultBooksData></DefultBooksData>
            }

          </div>
        </div>


      )}
    </>
  )
};


export default BooksInfo;