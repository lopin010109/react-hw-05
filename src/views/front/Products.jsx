import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";

const { VITE_API_BASE: API_BASE, VITE_API_PATH: API_PATH } = import.meta.env;


function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/${API_PATH}/products`);
        setProducts(data.products);
      } catch (error) {
        console.log(error.response)
      }
    };

    getProducts();
  }, []);

  const handleView = async (id) => {
    navigate(`/product/${id}`);
    // 如果要改用 a 連結 Link 方式也是可以

    // try {
    //   const { data } = await axios.get(`${API_BASE}/api/${API_PATH}/product/${id}`);
    //   使用 state 傳遞方式
    //   navigate(`/product/${id}`, {
    //     state: {
    //       productData: data.product
    //     }
    //   });
    // } catch (error) {
    //   console.log(error.response)
    // }
  };

  return (
    <div className="container">
      <div className="row">
        {
          products.map((product) => (
            <div className="col-md-4 mb-3" key={product.id}>
              <div className="card">
                <img src={product.imageUrl} className="card-img-top" alt={product.title} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">
                    {product.description}
                  </p>
                  <p className="card-text">
                    價格：{product.price}
                  </p>
                  <p className="card-text">
                    <small className="text-body-secondary">
                      {product.unit}
                    </small>
                  </p>
                  <button type="button" className="btn btn-primary"
                    onClick={() => handleView(product.id)}>
                    查看更多
                  </button>
                </div>
              </div>
            </div>
          ))
        }
       
      </div>
    </div>
  )
}

export default Products
