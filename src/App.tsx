import { ChangeEvent, FormEvent, useState } from 'react'
import ProductCard from './components/ProductCard'
import Modal from './components/ui/Modal'
import { categories, colors, formInputsList, productList } from './data'
import Button from './components/ui/Button'
import Input from './components/ui/Input'
import { IProduct } from './interfaces'
import { productValidation } from './components/validation'
import ErrorMessage from './components/ErrorMessage'
import CircleColor from './components/CircleColor'
import { v4 as uuid } from "uuid";
import Select from './components/ui/Select'
import { ProductNameTypes } from './components/types/Index'
import toast, { Toaster } from 'react-hot-toast';


function App() {

  const defaultProductObj = {
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: [],
    category: {
      name: '',
      imageURL: '',
    }
  }

  /* =============================================================================
                                    States 
    ============================================================================== */
  const [products, setProducts] = useState<IProduct[]>(productList)
  const [product, setproduct] = useState<IProduct>(defaultProductObj)
  const [isOpen, setIsOpen] = useState(false)
  const [errors, seterrors] = useState({
    title: '',
    description: '',
    imageURL: '',
    price: '',
  })
  const [tempColors, settempColors] = useState<string[]>([])
  // console.log(tempColors)
  const [selectedCategory, setselectedCategory] = useState(categories[0])
  const [productToEdit, setproductToEdit] = useState<IProduct>(defaultProductObj)
  const [productToEditIndex, setproductToEditIndex] = useState<number>(0)
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);



  /* ========================================================================== 
                              Handler Functions
     ========================================================================== */
  //  Add Button Modal
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  //  Edit Button Modal
  const openEditModal = () => setIsOpenEditModal(true)
  const closeEditModal = () => setIsOpenEditModal(false)

  // Delete Button Confirm Modal
  const closeConfirmModal = () => setIsOpenConfirmModal(false);
  const openConfirmModal = () => setIsOpenConfirmModal(true);

  // Modal Inputs ==> Add Product
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setproduct({
      ...product,
      [name]: value,
    })
    seterrors({
      ...errors,
      [name]: ''
    })
  }

  // Modal Inputs ==> Edit Product
  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setproductToEdit({
      ...productToEdit,
      [name]: value,
    })
    seterrors({
      ...errors,
      [name]: ''
    })
  }

  // Cancel Button
  const onCancel = () => {
    setproduct(defaultProductObj)
    closeModal()
    closeEditModal()
  }

  // Submit new Product
  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const { title, description, imageURL, price } = product
    const errors = productValidation({ title, description, imageURL, price })
    const hasErrorMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "")
    if (!hasErrorMsg) {
      seterrors(errors)
      return;
    }
    setProducts(prev => [{ ...product, id: uuid(), colors: tempColors, category: selectedCategory }, ...prev])
    setproduct(defaultProductObj)
    settempColors([])
    closeModal()
    toast("Product has been created successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "green",
        color: "white",
      },
    });
  }

  // Submit Edit Product
  const submitEditHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const { title, description, imageURL, price } = productToEdit
    const errors = productValidation({ title, description, imageURL, price })
    const hasErrorMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "")
    if (!hasErrorMsg) {
      seterrors(errors)
      return;
    }
    const updateProducts = [...products]
    updateProducts[productToEditIndex] = { ...productToEdit, colors: tempColors.concat(productToEdit.colors) }
    setProducts(updateProducts)
    setproductToEdit(defaultProductObj)
    settempColors([])
    closeEditModal()
    toast("Product has been updated successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "green",
        color: "white",
      },
    });
  }

  // Remove Product
  const removeProductHandler = () => {
    const filtered = products.filter(product => product.id !== productToEdit.id);
    setProducts(filtered);
    closeConfirmModal();
    toast("Product has been deleted successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "#c2344d",
        color: "white",
      },
    });
  };
  // ====================================== End Handler Functions ======================================== //



  /* ==================================================================================
                                Rendering Functions 
    =================================================================================== */
  // ---- 1. Produkteliste ---- //
  const renderProductList = products.map((product, index) =>
    <ProductCard
      key={product.id}
      product={product}
      setproductToEdit={setproductToEdit}
      openEditModal={openEditModal}
      setproductToEditIndex={setproductToEditIndex}
      index={index}
      openConfirmModal={openConfirmModal} />)

  // ---- 2. Add Product Modal ---- //
  const renderFormInputsList = formInputsList.map(input =>
    <div className='flex flex-col' key={input.id}>
      <label
        htmlFor={input.id}
        className='mt-2 mb-1 text-sm font-medium text-gray-700'>
        {input.label}
      </label>
      <Input
        type='text'
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onChangeHandler} />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  )

  // ---- 3. Edit Product Modal ---- //
  const renderProductEditWithErrorMsg = (id: string, label: string, name: ProductNameTypes) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="mb-[2px] text-sm font-medium text-gray-700">
          {label}
        </label>
        <Input type="text" id={id} name={name} value={productToEdit[name]} onChange={onChangeEditHandler} />
        <ErrorMessage msg={errors[name]} />
      </div>
    );
  };

  // ---- 4. Colors ---- //
  const renderProductColor = colors.map(color =>
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          settempColors(prev => prev.filter(item => item !== color))
          return
        }
        if (productToEdit.colors.includes(color)) {
          settempColors(prev => prev.filter(item => item !== color))
          return
        }
        settempColors(prev => [...prev, color])
      }
      } />)
  // ========================================== End Rendering ================================================ //



  return (
    <main className='container' >
      <Button
        className='block bg-indigo-600 hover:bg-indigo-800 mx-auto my-10 px-10 font-medium'
        onClick={openModal}>
        Add
      </Button>


      {/* __________ Produkte Liste __________ */}
      <div className='m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md' >
        {renderProductList}
      </div >


      {/* __________ Add Product Modal __________ */}
      <Modal
        isOpen={isOpen}
        close={closeModal}
        title='Add new Product' >
        <form
          className='space-y-3'
          onSubmit={submitHandler}>
          {renderFormInputsList}

          <Select selected={selectedCategory} setSelected={setselectedCategory} />

          <div className='flex items-center flex-wrap space-x-1'>
            {renderProductColor}
          </div>

          <div className='flex items-center flex-wrap space-x-1'>
            {tempColors.map(color =>
              <span
                className='p-1 mr-1 mb-1 text-xs rounded-md text-white'
                style={{ backgroundColor: color }}
                key={color}>
                {color}
              </span>
            )}
          </div>

          <div className='flex items-center space-x-2'>
            <Button
              className='bg-indigo-500 hover:bg-indigo-700'>
              Submit
            </Button>
            <Button
              className='bg-indigo-500 hover:bg-gray-500'
              onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>


      {/* __________ Edit Product Modal __________ */}
      <Modal
        isOpen={isOpenEditModal}
        close={closeEditModal}
        title='Edit this Product' >
        <form
          className='space-y-3'
          onSubmit={submitEditHandler}>

          {renderProductEditWithErrorMsg("title", "Product Title", "title")}
          {renderProductEditWithErrorMsg("description", "Product Description", "description")}
          {renderProductEditWithErrorMsg("imageURL", "Product Image URL", "imageURL")}
          {renderProductEditWithErrorMsg("price", "Product Price", "price")}

          {/* <Select selected={productToEdit.category} setSelected={setselectedCategory} /> */}
          <Select
            selected={productToEdit.category}
            setSelected={(value) => {
              setproductToEdit({ ...productToEdit, category: value })
            }
            } />

          <div className='flex items-center flex-wrap space-x-1'>
            {renderProductColor}
          </div>

          <div className='flex items-center flex-wrap space-x-1'>
            {tempColors.concat(productToEdit.colors).map(color =>
              <span
                className='p-1 mr-1 mb-1 text-xs rounded-md text-white'
                style={{ backgroundColor: color }}
                key={color}>
                {color}
              </span>
            )}
          </div>

          <div className='flex items-center space-x-2'>
            <Button
              className='bg-indigo-500 hover:bg-indigo-700'>
              Submit
            </Button>
            <Button
              className='bg-indigo-500 hover:bg-gray-500'
              onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>


      {/* __________ Delete Product CONFIRM MODAL __________ */}
      <Modal
        isOpen={isOpenConfirmModal}
        close={closeConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button className="bg-[#c2344d] hover:bg-red-800" onClick={removeProductHandler}>
            Yes, remove
          </Button>
          <Button type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={closeConfirmModal}>
            Cancel
          </Button>
        </div>
      </Modal>
      <Toaster />
    </main >
  )
}

export default App
