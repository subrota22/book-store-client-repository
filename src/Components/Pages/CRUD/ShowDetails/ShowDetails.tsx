
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import gql from 'graphql-tag';
// import { Mutation } from 'react-apollo';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import PageLoader from 'Components/Shares/PageLoader/PageLoader';
import { AuthProvider } from 'UserContext/UserContext';
import { useContext } from 'react';

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
  data: any;
}

interface BooksDataVars {
  bookId: any;
}

const GET_BOOK = gql`
    query book($bookId: String) {
        book(id: $bookId) {
            _id
            isbn
            title
            author
            description
            published_year
            publisher
            updated_date
        }
    }
`;


const DELETE_BOOK = gql`
mutation removeBook($id: String!) {
removeBook(id:$id) {
  _id
}
}
`;



const ShowDetails = () => {

  const bookDataGet: any = useLoaderData();
  const { loading, data } = useQuery<BooksData, BooksDataVars>(
    GET_BOOK,
    { variables: { bookId: bookDataGet._id } }
  );

  const {user} :any =  useContext(AuthProvider) ;

  const [deleteSingleBook] = useMutation(DELETE_BOOK);
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h3 className='text-3xl font-bold text-center my-8'> Book name:  {data?.book.title}   </h3>
        {loading ? (
          <PageLoader></PageLoader>
        ) : (
          <div className="overflow-x-auto">

            <div className="card h-auto bg-base-100 shadow-2xl  my-10  mx-auto" style={{ "width": "50%" }}>
              <figure><img src="https://thumbs.dreamstime.com/b/stack-books-isolated-white-background-34637153.jpg" alt="Shoes" /></figure>
              <div className="card-body">
                <h2 className="card-title"> <span className="text-info"> Book name : </span>  {data?.book.title}    </h2>
                <div> <span className="text-info">Author: </span> {data?.book?.author}</div>
                <div> <span className="text-info">Isbn: </span>{data?.book?.isbn}</div>
                <p> <span className="text-info">Descrispantion:  </span> {data?.book?.description}</p>
                <p> <span className="text-info">Published year: </span> {data?.book?.published_year}</p>
                <p> <span className="text-info">Publisher: </span>{data?.book?.publisher}</p>
                <p> <span className="text-info">Updated date: </span> {data?.book?.updated_date}</p>
              {  user.uid && <div className="card-actions justify-end">
                  <div>
                    <Link to={`/edit/${bookDataGet._id}`} className="btn btn-success text-white px-9 mx-2">Edit</Link>&nbsp;
                  </div>
                  <div >
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        const confirm = window.confirm(`Are you want to delete ${bookDataGet?.title} `)
                        if (confirm) {
                          deleteSingleBook({ variables: { id: bookDataGet._id } });
                          toast.info(`Your  ${bookDataGet?.title} is deleted !! `);
                          navigate("/");
                        } else {
                          toast.info(`Your  ${bookDataGet?.title} book safe now !! `);
                        }
                      }}>

                      <button type="submit" className="btn btn-primary text-white">Delete</button>
                    </form>

                  </div>
                </div>}
              </div>
            </div>
          </div>
        )}



      </div>
    </>
  );
};

export default ShowDetails;


