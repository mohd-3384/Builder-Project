import { IProduct } from "../interfaces"
import { numberWithCommas, txtSlicer } from "../utils/functions";
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

            <h3>{txtSlicer(title, 20)}</h3>

            <p>{txtSlicer(description)}</p>

            {colors.length ?
                <div className='flex items-center flex-wrap space-x-1'>
                    {renderProductColor}
                </div> :
                <p className="min-h-[20px] text-red-600 font-medium">Not available colors!</p>}

            <div className="flex items-center justify-between">
                <span>{numberWithCommas(price)}€</span>
                <Image
                    imageURL={category.imageURL}
                    alt={category.name}
                    className={"w-10 h-10 rounded-full object-cover"} />
            </div>

            <div className="flex items-center justify-center space-x-2 mt-5">
                <Button
                    className="bg-indigo-700 hover:bg-indigo-800"
                    onClick={onEdit}>
                    Edit
                </Button>
                <Button
                    className="bg-red-700 hover:bg-red-900"
                    onClick={onRemove}>
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default ProductCard