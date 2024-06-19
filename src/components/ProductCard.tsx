import { IProduct } from "../interfaces"
import { txtSlicer } from "../utils/functions";
import CircleColor from "./CircleColor";
import Image from "./Image"
import Button from "./ui/Button"

interface IProps {
    product: IProduct;
    setproductToEdit: (product: IProduct) => void;
    openEditModal: () => void;
    setproductToEditIndex: (value: number) => void;
    index: number;
    openConfirmModal: () => void
}


const ProductCard = ({ product, setproductToEdit, openEditModal, setproductToEditIndex, index, openConfirmModal }: IProps) => {

    const { title, description, imageURL, price, colors, category } = product;

    // ---- Render Colors ---- //
    const renderProductColor = colors.map(color =>
        <CircleColor
            key={color}
            color={color}
        />)

    // ---- Handler  ---- //
    const onEdit = () => {
        setproductToEdit(product)
        openEditModal()
        setproductToEditIndex(index)
    }

    const onRemove = () => {
        setproductToEdit(product);
        openConfirmModal();
    };


    return (
        <div className="border rounded-md p-2 flex flex-col max-w-sm md:max-w-lg mx-auto md:mx-0">
            <Image
                imageURL={imageURL}
                alt={"Ferrari"}
                className={"rounded-md mb-2"} />

            <h3>{title}</h3>

            <p>{txtSlicer(description)}</p>

            {colors.length ?
                <div className='flex items-center flex-wrap space-x-1'>
                    {renderProductColor}
                </div> :
                <p className="min-h-[20px] text-red-600 font-medium">Not available colors!</p>}

            {/* <div className="flex items-center my-4 space-x-2">
                <span className="w-5 h-5 bg-blue-600 rounded-full cursor-pointer"></span>
                <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer"></span>
                <span className="w-5 h-5 bg-black rounded-full cursor-pointer"></span>
                <span className="w-5 h-5 bg-yellow-300 rounded-full cursor-pointer"></span>
            </div> */}

            <div className="flex items-center justify-between">
                <span>{price}€</span>
                <Image
                    imageURL={category.imageURL}
                    alt={category.name}
                    className={"w-10 h-10 rounded-full object-cover"} />
            </div>

            <div className="flex items-center justify-center space-x-2 mt-5">
                <Button
                    className="bg-indigo-700"
                    onClick={onEdit}>
                    Edit
                </Button>
                <Button
                    className="bg-red-700"
                    onClick={onRemove}>
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default ProductCard