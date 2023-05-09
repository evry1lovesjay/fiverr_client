import { Link } from "react-router-dom";
import "./SellerGigs.scss";
import { getCurrentUser } from './../../utils/getCurrentUser';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";


const SellerGigs = () => {

    const currentUser = getCurrentUser();

    const queryClient = useQueryClient()

    const {isLoading, error, data} = useQuery({
        queryKey: ["sellerGigs"],
        queryFn: async () =>{
            const response = await newRequest.get(`/gigs?userId=${currentUser._id}`)

            return response.data
            }
        }
    )

    console.log(data)


    const mutation = useMutation({
        mutationFn: (id) => newRequest.delete(`/gigs/${id}`),
        onSuccess:()=>{
            queryClient.invalidateQueries(["sellerGigs"])
        }
    })

    const handleDelete = (id) => {
        mutation.mutate(id)
    }


    return ( 
    <div className="sellerGigs">
        {isLoading ? "Loading..." 
        : error ? "Something went wrong!!!"
        :   <div className="container">
                <div className="title">
                    <h1>Gigs</h1>
                    <Link to="/add">
                        <button>Add New Gig</button> 
                    </Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Sales</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((g)=>(
                            <tr key={g?._id}>
                                <td>
                                    <img className="img" src={g.cover}  alt="" />
                                </td>
                                <td>{g.title}</td>
                                <td>{g.price}</td>
                                <td>{g.sales}</td>
                                <td>
                                    <img className="delete" src="/img/delete.png" alt="" onClick={()=>handleDelete(g._id)}/>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
            }
        </div> 
        );
}
 
export default SellerGigs;