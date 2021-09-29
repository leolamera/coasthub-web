import { useState } from 'react'
import Image from 'next/image'
import nookies from 'nookies'
import axios from 'axios'
import Lottie from 'react-lottie'
import * as animationData from '../public/code.json'



function Animation() {

    const defaultOptionsAnimation = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        renderSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    return (
        <div>
        <Lottie
            height={250}
            width={250}
            options={defaultOptionsAnimation}
        />
        </div>
    )
}


export async function getServerSideProps(ctx) {

    const cookies = nookies.get(ctx)
    const response = await axios({
        url: 'https://coasthub-apis.herokuapp.com/products',
        headers: { 'Authorization': `bearer ${cookies.token}` }
    })

    return {
        props: {
            cookies: cookies.token,
            products: response.data

        }
    }
}

export default function DashBoard({ cookies, products }) {

    const [screen, setScreen] = useState('product')

    return (
        <div className="min-h-screen w-screen bg-purple-50">
            {screen === 'demand' && <DemandComponent />}
            {screen === 'product' && <ProductComponent products={products} />}
            {screen === 'profile' && <ProfileComponent />}

            <NavBar onClick={{ function: setScreen }} />
        </div>
    )
}

function Heading({ children }) {

    return (
        <div>
            <h2 className="px-4 py-8 text-2xl font-semibold">{children}</h2>
        </div>
    )
}



function NavBar({ onClick }) {

    const setFunction = onClick.function

    function handleClick(event) {

        const { id } = event.target

        setFunction(id)
    }

    return (
        <div className="fixed bottom-0 w-full h-20 flex justify-between bg-purple-200">
            <button onClick={handleClick} id="demand" className="w-1/3">
                Pedidos
            </button>
            <button onClick={handleClick} id="product" className="w-1/3">
                Produtos
            </button>
            <button onClick={handleClick} id="profile" className="w-1/3">
                Loja
            </button>
        </div>
    )
}

function DemandComponent() {

    return (
        <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <Animation></Animation>
            <h1 className="text-xl text-center font-medium">Estamos desenvolvendo esta feature. Volte mais tarde 🌞</h1>
        </div>
    )
}

function ProductComponent({ products }) {

    const [editor, setEditor] = useState(false)



    function handleClick(event) {

        const { id } = event.target
        setEditor(!editor)
    }

    const productTags = products.map((data) => {
        return data.tag
    })

    const productsList = products.map((data) => {
        return { id: data.id, tag: data.tag, title: data.product_name, subtitle: data.description, srcImage: '', price: data.price }
    })

    const [productsArray, setProductsArray] = useState(productsList)

    function FilterByTags(tagFilter, selected) {

        if (selected) {
            setProductsArray(productsList)

        }

        if (!selected) {
            const filteredArray = productsArray.filter((x) => {
                if (x.tag === tagFilter) {
                    return x
                }
            })
            setProductsArray(filteredArray)
        }
    }

    return (
        <div className="space-y-3 w-screen">
            {editor && (
                <div className="fixed bottom-0 z-10 w-full text-center bg-white">
                    <h1>Componente de Criação/Edição de Produto</h1>
                </div>
            )}

            <div className="z-0 space-y-3 w-screen bg-white rounded-b-lg">
                <Heading>Produtos</Heading>
                <div className="flex align-middle justify-end">
                    <button id="create" onClick={handleClick} className="bg-purple-400 text-white font-medium px-4 py-2 mb-4 mx-4 rounded-lg justify-end">Adicionar Produto</button>
                </div>
                <TagFilter arrayButtonLabels={{ values: [...new Set(productTags)], function: FilterByTags }} />
                <ListOfProducts onClick={{ function: handleClick }} productsArray={productsArray} />
            </div>
        </div>
    )
}

function ListOfProducts({ productsArray, onClick }) {

    const srcImage = "https://cache-backend-mcd.mcdonaldscupones.com/media/image/product$kzXNUCF7/200/200/original?country=br"

    return (
        <div className="overflow-y-auto flex flex-col items-center justify-center bg-purple-50 w-full py-3 space-y-3 pb-24">
            {
                productsArray.map((data, i) => {
                    return <ButtonProduct key={i} onClick={onClick} productObject={data} />
                })
            }

        </div>
    )
}

function ButtonProduct({ productObject, onClick }) {

    const onClickFunction = onClick.function

    return (

        <button id={productObject.id} onClick={onClickFunction} className="w-11/12 bg-white flex space-x-2 rounded-lg pt-2">
            {/* <Image src={productObject.srcImage} loader={() => productObject.srcImage} height={80} width={80} /> */}
            <div className="flex">
                <div className="w-2/3 text-left">
                    <h3 className="px-2 text-lg font-medium">{productObject.title}</h3>
                    <h3 className="px-2 text-md">{productObject.subtitle}</h3>
                    <h4 className="px-2 text-lg font-medium py-1">R$ {productObject.price}</h4>
                </div>
                <div className="w-1/3 text-right justify-end">

                </div>

            </div>
        </button>
    )
}

function TagFilter({ arrayButtonLabels }) {

    const arrayButtonObjects = arrayButtonLabels.values.map((data) => {
        return { label: data, ativado: false }
    })

    const [arrayButtons, setArrayButtons] = useState(arrayButtonObjects)



    return (

        <div className="w-full flex overflow-x-auto pb-4">
            {
                arrayButtons.map((data, i) => {

                    return (
                        <ButtonFilter onClick={arrayButtonLabels} state={{ value: arrayButtons, function: setArrayButtons }} key={i} buttonObject={data} />
                    )
                })
            }
        </div>
    )
}

function ButtonFilter({ buttonObject, state, onClick }) {

    const setFunction = state.function
    const filterFunction = onClick.function

    function handleClick() {

        const newState = state.value.map((data) => {
            if (data === buttonObject) {
                return { ...data, ativado: data.ativado ? false : true }
            }

            return { ...data, ativado: false }
        })

        setFunction(newState)
        filterFunction(buttonObject.label, buttonObject.ativado)

    }

    return (
        <div className="px-4">
            <button onClick={handleClick} className={buttonObject.ativado ? "px-2.5 border-2 text-lg rounded-lg font-medium text-purple-600 border-purple-400" : "px-2.5 border-2 text-lg rounded-lg text-gray-600 border-gray-300"}>{buttonObject.label}</button>
        </div>
    )
}

function ProfileComponent() {

    return (
        <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <Animation></Animation>
            <h1 className="text-xl text-center font-medium">Estamos desenvolvendo esta feature. Volte mais tarde 🌞</h1>
        </div>
    )
}