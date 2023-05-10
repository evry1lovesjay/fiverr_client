import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import "./Gig.scss";
// import { Slider } from 'infinite-react-carousel';
import { Link, useParams } from "react-router-dom";
import Reviews from "../../components/reviews/Reviews";
import Slide from "../../components/slide/Slide";


const Gig = () => {
    
    const {id} = useParams()

    const {isLoading, error, data} = useQuery({
        queryKey: ["gig"],
        queryFn: async () =>{
            const response = await newRequest.get(`/gigs/single/${id}`)
            return response.data
        }
        })
        
    const userId = data?.userId;

    const {isLoading: isLoadingUser, error:errorUser, data: dataUser} = useQuery({
        queryKey: ["user"],
        queryFn: async () =>{
            // data.userId comes from the code in useQuery above
            
            const response = await newRequest.get(`/users/${userId}`)
            return response.data
            },
            enabled: !!userId,
        })


return ( 
    <div className="gig">
        {isLoading ? "Loading..."
        : error ? "Something went wrong"
        : <div className="container">
            <div className="left">
                <span className="breadCrumbs">FIVERR &gt; GRAPHICS & DESIGN &gt; </span>
                <h1>{data.title}</h1>
            
                {isLoadingUser ? "Loading..."
                : errorUser ? "Something went wrong"
                :
                    <div className="user">
                    <img className="pp" src={dataUser?.img || "https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"}
 alt="" />
                    <span>{dataUser?.title}</span>
                   { !isNaN(data.totalStars/ data.starNumber) && (
                   <div className="stars">
                            {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i)=>(
                                    <img src="/img/star.png" alt="" key={i}/>)
                                    )}
                        <span>{ Math.round(data.totalStars / data.starNumber)}</span>
                    </div>)}
                </div>}

                {data.images && <Slide numToShow={1} className="slider" >
                    {data?.images.map((img) => (
                    <img key={img} src={img} alt="" />
                    ))}
                </Slide> }

                <h2>About This Gig</h2>
                <p>
                    {data.desc}
                </p>

                <div className="seller">
                    <h2>About The Seller</h2>
                    
                    {isLoading ? "Loading..."
                    : error ? "Something went wrong"
                    :<>
                    <div className="user">
                        <img src={dataUser?.img || "https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"}
 alt="" />
                        <div className="info">
                            <span>{dataUser?.username}</span>
                            { !isNaN(data.totalStars/ data.starNumber) && (
                                <div className="stars">
                                    {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i)=>(
                                    <img src="/img/star.png" alt="" key={i}/>)
                                    )}
                               
                                    <span>{ Math.round(data.totalStars / data.starNumber)}</span>
                                </div>
                            )}
                            <button>Contact Me</button>
                        </div>
                    </div>

                    <div className="box">
                        <div className="items">
                            <div className="item">
                                <span className="title">From</span>
                                <span className="desc">{dataUser?.country}</span>
                            </div>
                            <div className="item">
                                <span className="title">Member since</span>
                                <span className="desc">Aug 2022</span>
                            </div>
                            <div className="item">
                                <span className="title">Avg. response time</span>
                                <span className="desc">4 hours</span>
                            </div>
                            <div className="item">
                                <span className="title">Last delivery</span>
                                <span className="desc">1 day</span>
                            </div>
                            <div className="item">
                                <span className="title">Languages</span>
                                <span className="desc">English</span>
                            </div>
                        </div>

                        <hr />

                        <p>{dataUser?.desc}</p>
                    </div>
                    </>}

                    <Reviews gigId={id}/>

                </div>

            </div>

            <div className="right">
                <div className="price">
                    <h3>{data.shortTitle}</h3>
                    <h2>$ {data.price}</h2>
                </div>
                <p>{data.shortDesc}</p>
                <div className="details">
                    <div className="item">
                        <img src="/img/clock.png" alt="" />
                        <span>{data.deliveryDate} days Delivery</span>
                    </div>
                    <div className="item">
                        <img src="/img/recycle.png" alt="" />
                        <span>{data.revisionNumber} Revisions</span>
                    </div>
                </div>

                <div className="features">
                    {data.features.map((feature)=>(
                        <div className="item" key={feature}>
                            <img src="/img/greencheck.png" alt="" />
                            <span>{feature}</span>
                        </div>
                        ))}
                </div>
                <Link to={`/pay/${id}`}>
                <button>Continue</button>
                </Link>
            </div>
        </div>  }  
    </div> );
}
 
export default Gig;