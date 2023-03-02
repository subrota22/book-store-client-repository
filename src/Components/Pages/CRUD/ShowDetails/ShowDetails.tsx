import { useLoaderData } from 'react-router-dom';
import PageLoader from 'Components/Shares/PageLoader/PageLoader';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';

const ShowDetails = () => {
  const bookDataGet: any = useLoaderData();
  const [loadingPage, setLoadingPage] = useState<Boolean>(true);
  const [data, setData]: any = useState({});
  const uri = `https://books-libarary.vercel.app/bookData/${bookDataGet._id}`;
  useQuery({
    queryKey: [bookDataGet._id],
    queryFn: () => fetch(uri, { method: "GET" })
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoadingPage(false);
      })
  })

  return (
    <>
            <Helmet> <title>  Book details  </title> </Helmet>
      <div>
        <h3 className='text-3xl font-bold text-center my-8'> Book name:  {data.bookName ? data.bookName : "Book name not found !!"}   </h3>
        {loadingPage ? (
          <PageLoader></PageLoader>
        ) : (
          <div className="card  bg-base-100 shadow-xl h-auto mx-auto mb-40" key={data?._id} style={{ width: "60%" }}>
            <figure><img src={data?.bookImage ? data?.bookImage : "https://i.ibb.co/RSCmwXf/imagenot.jpg"}
              className="h-60 w-full" alt="Book" /></figure>
            <div className="card-body">
              <h2 className="card-title"> <span className="text-info">Book name : </span> {data?.bookName ? data?.bookName : "book name not found"}</h2>
              <h2 className="card-title"><span className="text-info">Author : </span>{data?.author ? data?.author : "author not found"}</h2>
              <p><span className="text-info">Description : </span>{data?.description ? data?.description?.length > 32 ?
                data?.description?.slice(0, 32) + "...." : data?.description : "book description not found"}</p>
            </div>
          </div>
        )}



      </div>
    </>
  );
};

export default ShowDetails;


