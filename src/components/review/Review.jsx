import { useQuery } from "@tanstack/react-query"
import "./Review.scss"
import newRequest from "../../utils/newRequest"


const Review = ({review}) => {

    const {isLoading, error, data} = useQuery({
        queryKey: [review.userId],
        queryFn: async () =>{
            const response = await newRequest.get(`/users/${review.userId}`)
            return response.data
        }
        })
        

  return (
    <div className="review">
        {isLoading ? "Loading..."
        : error ? "Something went wrong"
        :
        <div className="user">
            <img className="pp" src={data.img || "https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600"}
alt="" />
            <div className="info">
                <span>{data.username}</span>
                <div className="country">
                    <span>{data.country}</span>
                </div>
            </div>
        </div>}

        <div className="stars">
            {
                Array(5).fill().map((item, i)=>(
                    <img src="/img/star.png" alt="" key={i} />
                ))
            }
            <span>{review.star}</span>
        </div>

        <p>{review.desc}</p>

        <div className="helpful">
            <span>Helpful?</span>
            <img src="/img/like.png" alt="" />
            <span>Yes</span>
            <img src="/img/dislike.png" alt="" />
            <span>No</span>
        </div>
    
    </div>
  )
}

export default Review