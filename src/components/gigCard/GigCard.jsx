import { Link } from "react-router-dom"
import "./GigCard.scss"
import { useQuery } from "@tanstack/react-query"
import newRequest from "../../utils/newRequest"

const GigCard = ({gig}) => {

    const {isLoading, error, data} = useQuery({
        queryKey: [`${gig.userId}`],
        queryFn: () =>
            newRequest.get(`/users/${gig.userId}`).then((res)=>{
                return res.data
            })
    })

  return (
    <Link to={`/gig/${gig._id}`} className="link">
        <div className="gigCard">
            <img src={gig.cover} alt="" />
            <div className="info">
                {isLoading ? "Loading..." 
                : error ? "Something went wrong"
                : (<div className="user">
                    <img src={data.img || "https://images.pexels.com/photos/11378899/pexels-photo-11378899.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"} alt="" />
                    <span>{data.username}</span>
                </div>)}
                <p>{gig.desc}</p>
                <div className="star">
                    <img src="/img/star.png" alt="" />
                    <span>{!isNaN(gig.totalStars/ gig.starNumber) && Math.round(gig.totalStars / gig.starNumber)}</span>
                </div>
            </div>
            <hr />
            <div className="details">
                <img src="/img/heart.png" alt="lll" />
                <div className="price">
                    <span>STARTING AT</span>
                    <h2>${gig.price}</h2>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default GigCard