import { Link, useLoaderData } from 'react-router-dom';
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { BeatLoader } from 'react-spinners';


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
    variables: any;
    bookId: String;
}

interface BooksDataVars {
    bookId: String;
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




const UPDATE_BOOK = gql`
    mutation updateBook(
        $id: String!,
        $isbn: String!,
        $title: String!,
        $author: String!,
        $description: String!,
        $publisher: String!,
        $published_year: Int!) {
        updateBook(
        id: $id,
        isbn: $isbn,
        title: $title,
        author: $author,
        description: $description,
        publisher: $publisher,
        published_year: $published_year) {
            updated_date
        }
    }
`;


let isbn: any, title: any, author: any, description: any, published_year: any, publisher: any;


const EditBooks = () => {
    const editData: any = useLoaderData();

    const { data, error } = useQuery<BooksData, BooksDataVars>(
        GET_BOOK,
        { variables: { bookId: editData?._id } }
    );

    //
    // Pass mutation to useMutation
    const [updateBook, { loading }] = useMutation(UPDATE_BOOK);
    //

    return (
        <>
            <div>

                <>

                    <div className="container">
                        <div className="panel panel-default">
                            <div className="flex flex-col lg:flex-row justify-between mx-10">
                                <p className="panel-title text-info mt-5 font-extrabold">
                                    Edit your <span className='text-white'>{data?.book.title}</span> book
                                </p>
                                <h4><Link to="/" className="btn btn-primary mt-5 ">Book List</Link></h4>
                            </div>
                            <div className="container mx-auto shadow-2xl my-12 p-9 rounded-lg" style={{ "width": "40%" }}>

                                <form onSubmit={e => {
                                    e.preventDefault();
                                    updateBook({ variables: { id: editData._id, isbn: isbn.value, title: title.value, author: author.value, description: description.value, publisher: publisher.value, published_year: parseInt(published_year.value) } });
                                    isbn.value = "";
                                    title.value = "";
                                    author.value = "";
                                    description.value = "";
                                    publisher.value = null;
                                    published_year.value = "";
                                }}>
                                    <h2 className="panel-title text-white text-2xl my-5 font-extrabold">
                                        EDIT BOOK
                                    </h2>
                                    <br />
                                    <div className="form-control">
                                        <label className="label">ISBN: </label>
                                        <input type="text" className="input input-info" name="isbn" ref={node => {
                                            isbn = node;
                                        }} placeholder="ISBN" defaultValue={`${data?.book.isbn}`} />

                                    </div>
                                    <br />
                                    <div className="form-control">
                                        <label htmlFor="title" className="label">Book name:</label>
                                        <input type="text" className="input input-info" name="title" ref={node => {
                                            title = node;
                                        }} placeholder="Book name" defaultValue={`${data?.book.title}`} />
                                    </div>
                                    <br />
                                    <div className="form-control">
                                        <label htmlFor="author" className="label">Author:</label>
                                        <input type="text" className="input input-info" name="author" ref={node => {
                                            author = node;
                                        }} placeholder="Author" defaultValue={`${data?.book.author}`} />
                                    </div>
                                    <br />
                                    <div className="form-control">
                                        <label htmlFor="description" className="label">Description:</label>
                                        <textarea className="input input-info h-28 p-5" name="description" ref={node => {
                                            description = node;
                                        }} placeholder="Description" rows={10} defaultValue={`${data?.book.description}`} />
                                    </div>
                                    <br />
                                    <div className="form-control">
                                        <label htmlFor="author" className="label">Publisher:</label>
                                        <input type="text" className="input input-info" name="publisher" ref={node => {
                                            publisher = node;
                                        }} placeholder="Publisher" defaultValue={`${data?.book.publisher}`} />
                                    </div>
                                    <br />
                                    <div className="form-control">
                                        <label htmlFor="author" className="label">Published Date:</label>
                                        <input type="text" className="input input-info" name="published_year" ref={node => {
                                            published_year = node;
                                        }} placeholder="Published date" defaultValue={data?.book.published_year} />
                                    </div>

                                    <button type="submit" className="btn my-7 w-56 px-14 text-white btn-success">
                                        {
                                            loading ? <BeatLoader color="white" /> : "Update book"
                                        }
                                    </button>
                                </form>
                                {error && <p> Message :{error?.message}</p>}
                            </div>
                        </div>
                    </div>

                </>

            </div>
        </>
    );
}

export default EditBooks;

