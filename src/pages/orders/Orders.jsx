import { useQuery } from "@tanstack/react-query";
import "./Orders.scss";
import newRequest from './../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

const Orders = () => {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const navigate = useNavigate();

    const {isLoading, error, data} = useQuery({
        queryKey: ["orders"],
        queryFn: async () =>{
            const response = await newRequest.get(`/orders`)
            return response.data
        }
        })

        const handleContact= async(order)=>{

            const sellerId = order.sellerId
            const buyerId = order.buyerId
            const id = sellerId + buyerId

            try {
                const response = await newRequest.get(`/conversations/single/${id}`)
                navigate(`/message/${response.data.id}`)
                
            } catch (error) {
                if(error.response.status=== 404){
                    const response = await newRequest.post(`/conversations/`, {
                        to: currentUser.isSeller ? buyerId : sellerId,
                    })

                    navigate(`/message/${response.data.id}`)

                }
            }
        }
        

    return ( 
    <div className="orders">
        {isLoading ? "Loading...."
        : error ? "Some went wrong!!!"
        :    <div className="container">
                <div className="title">
                    <h1>Orders</h1>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Contact</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            data?.map((order) => (
                                
                                <tr key={order._id}>
                                <td>
                                    <img className="img" src={order.img}        alt="" />
                                </td>
                                <td>{order.title}</td>
                                <td>{order.price}</td>
                                <td>
                                    <img className="delete" src="/img/message.png" alt="" onClick={()=>handleContact(order)}/>
                                </td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>}
        </div>
        );
}
 
export default Orders;