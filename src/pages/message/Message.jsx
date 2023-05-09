import { Link, useParams } from "react-router-dom";
import "./Message.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Message = () => {

    const {id} = useParams()

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const queryClient = useQueryClient()

    const {isLoading, error, data} = useQuery({
        queryKey: ["messages"],
        queryFn: async () =>{
            const response = await newRequest.get(`/messages/${id}`)
            return response.data
        }
        })

        const mutation = useMutation({
            mutationFn: (message) => newRequest.post(`/messages`, message),
            onSuccess:()=>{
                queryClient.invalidateQueries(["messages"])
            }
        })

        const handleSubmit = (e) =>{
            e.preventDefault()
            mutation.mutate({
                conversationId: id,
                desc: e.target[0].value
            })
            e.target[0].value=""
        }

    return ( 
        <div className="message">
            <div className="container">
                <span className="breadcrumbs">
                    <Link to="/messages" className="link">MESSAGES</Link> &gt; JOHN DOE &gt;
                </span>

                {isLoading ? "Loading....."
                : error ? "Something went wrong"
                : <div className="messages">
                    {data.map((m)=>{
                        return <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
                            <img src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
                            <p>{m.desc}</p>
                        </div>
//                     }) <div className="item">
//                         <img src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
//  alt="" />
//                         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, earum. Veritatis tempore molestias esse, deserunt cupiditate praesentium corporis voluptate velit et aut qui modi labore maiores unde quibusdam vitae? Quidem?</p>
//                     </div>
                    })}
                </div>}

                <hr />

                <form className="write" onSubmit={handleSubmit}>
                    <textarea type="text" placeholder="Write a message" />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
}
 
export default Message;