import Banner from "../organisms/Banner"
import MainProducts from "../organisms/MainProducts.jsx"

const Home = () => {
  return (
    <>
      <Banner />
      <div>
        <h2 className="mt-8 text-2xl">Últimos productos</h2>
        <MainProducts />
      </div>
    </>
  )
}

export default Home