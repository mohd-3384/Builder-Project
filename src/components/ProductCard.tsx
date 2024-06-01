import { IProduct } from "../interfaces"
import { txtSlicer } from "../utils/functions";
import Image from "./Image"
import Button from "./ui/Button"

interface IProps {
    product: IProduct;
}

const ProductCard = ({ product }: IProps) => {

    const { id, title, description, imageURL, colors, price, category } = product;

    return (
        <div className="border rounded-md p-2 flex flex-col">
            <Image
                imageURL={imageURL}
                alt={"Ferrari"}
                className={"rounded-md mb-2"} />

            <h3>{title}</h3>

            <p>{txtSlicer(description)}</p>

            <div className="flex items-center my-4 space-x-2">
                <span className="w-5 h-5 bg-blue-600 rounded-full cursor-pointer"></span>
                <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer"></span>
                <span className="w-5 h-5 bg-black rounded-full cursor-pointer"></span>
                <span className="w-5 h-5 bg-yellow-300 rounded-full cursor-pointer"></span>
            </div>

            <div className="flex items-center justify-between">
                <span>{price}€</span>
                <Image
                    imageURL={"https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"}
                    alt={"Ferrari"}
                    className={"w-10 h-10 rounded-full object-cover"} />
            </div>

            <div className="flex items-center justify-center space-x-2 mt-5">
                <Button className="bg-indigo-700">Edit</Button>
                <Button className="bg-red-700">Delete</Button>
            </div>
        </div>
    )
}

export default ProductCard