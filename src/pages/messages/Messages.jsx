import { Link } from "react-router-dom";
import "./Messages.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import moment from "moment"

const Messages = () => {

    // const message = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, vero! Lorem255 ipsum dolor sit amet consectetur adipisicing elit. Qui, vero!"

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const queryClient = useQueryClient()

    const {isLoading, error, data} = useQuery({
        queryKey: ["conversations"],
        queryFn: async () =>{
            const response = await newRequest.get(`/conversations`)
            return response.data
        }
        })


        const mutation = useMutation({
            mutationFn: (id) => newRequest.put(`/conversations/${id}`),
            onSuccess:()=>{
                queryClient.invalidateQueries(["conversations"])
            }
        })

        const handleRead = (id) =>{
            mutation.mutate(id)
        }

    return ( 
        <div className="messages">
        {isLoading ? "Loading......"
        : error ? "Something went wrong!!!"
        :    <div className="container">
                <div className="title">
                    <h1>Messages</h1>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Buyer</th>
                            <th>Last Message</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data?.map((conversation) => (
                            <tr className={((currentUser.isSeller && !conversation.readBySeller) || (!currentUser.isSeller && !conversation.readByBuyer)) &&  "active"} key={conversation.id}>
                            <td>
                                {currentUser.isSeller ? conversation.buyerId : conversation.sellerId}
                            </td>
                            <td>
                                <Link to={`/message/${conversation.id}`} className="link">
                                    {conversation?.lastMessage?.substring(0,100)}...
                                </Link>
                            </td>
                            <td>{moment(conversation.updatedAt).fromNow()}</td>
                            <td>{
                                ((currentUser.isSeller && !conversation.readBySeller) || (!currentUser.isSeller && !conversation.readByBuyer)) &&
                                <button onClick={()=>handleRead(conversation.id)}>Mark as Read</button>}
                            </td>
                        </tr>
                        ))}
                    </tbody>

                </table>
            </div>}
        </div>
        );
}
 
export default Messages;