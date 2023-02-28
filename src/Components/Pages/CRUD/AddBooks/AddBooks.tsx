
import gql from "graphql-tag";
import {  useMutation} from "@apollo/client";
import { toast } from 'react-toastify';
import { BeatLoader } from "react-spinners";


const ADD_BOOK = gql`
    mutation addBook(
        $isbn: String!,
        $title: String!,
        $author: String!,
        $description: String!,
        $publisher: String!,
        $published_year: Int!) {
        addBook(
            isbn: $isbn,
            title: $title,
            author: $author,
            description: $description,
            publisher: $publisher,
            published_year: $published_year) {
            _id
        }
    }
`;

let isbn:any, title:any, author:any, description:any, published_year:any, publisher:any;

const AddBooks = () => {
const [addNewBookInformations, {error , loading }] = useMutation(ADD_BOOK);

    return (
        <>
       
              {/* <Mutation mutation={ADD_BOOK} onCompleted={({history}:any) => history.push('/')}>
            {(addBook:any, { loading, error } :any) => ( */}
                <div className="container mx-auto shadow-2xl my-12 p-9 rounded-lg" style={{"width" : "40%"}}>
                    <div className="panel">
                
                        <div className="panel-body">
                            
                            <form onSubmit={e => {
                                e.preventDefault();
                                addNewBookInformations({ variables: { isbn: isbn.value, title: title.value, author: author.value, description: description.value, publisher: publisher.value, published_year: parseInt(published_year.value) } });
                                isbn.value = "";
                                title.value = "";
                                author.value = "";
                                description.value = "";
                                publisher.value = null;
                                published_year.value = "";
                              toast.success("Book added successfully!!") ;
                            }}>
                       <p className="panel-title text-info my-4  font-extrabold">
                            ADD BOOK
                        </p>
                                <div className="form-control">
                                    <label className="label" htmlFor="isbn">ISBN:</label>
                                    <input type="text" className="input input-info" name="isbn" ref={node => {
                                        isbn = node;
                                    }} placeholder="Please enter ISBN" />
                                </div>
                                <br />
                                <div className="form-control">
                                    <label className="label" htmlFor="title">Book name:</label>
                                    <input type="text" className="input input-info" name="title" ref={node => {
                                        title = node;
                                    }} placeholder="Please enter book name" />
                                </div>
                                <br />
                                <div className="form-control">
                                    <label className="label" htmlFor="author">Author:</label>
                                    <input type="text" className="input input-info" name="author" ref={node => {
                                        author = node;
                                    }} placeholder="Please enter author name" />
                                </div>
                                <br />
                                <div className="form-control">
                                    <label className="label" htmlFor="description">Description:</label>
                                    <textarea className="input h-28 input-info pt-2 pb-7 px-4" name="description" ref={node => {
                                        description = node;
                                    }} placeholder="Please enter book description" rows={5} />
                                </div>
                                <br />
                                <div className="form-control">
                                    <label className="label" htmlFor="author">Publisher:</label>
                                    <input type="text" className="input input-info" name="publisher" ref={node => {
                                        publisher = node;
                                    }} placeholder="Please enter publisher name" />
                                </div>
                                <br />
                                <div className="form-control">
                                    <label className="label"  htmlFor="author">Published Date:</label>
                                    <input type="date" className="input input-info" name="published_year" ref={node => {
                                        published_year = node;
                                    }} placeholder="Please published year" />
                                </div>
                                <button type="submit"  className="btn my-7  float-right px-14 text-white mx-auto btn-success"> 
                                {
                                   loading ?  <BeatLoader color="white" /> : "Add book"
                                }
                                 </button>
                            </form>
                            {error && <p>Error :( Please try again</p>}
                        </div>
                    </div>
                </div>
            {/* )}
        </Mutation> */}
        </>
    );
};

export default AddBooks;