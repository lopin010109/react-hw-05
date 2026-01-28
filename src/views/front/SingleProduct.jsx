import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router"

const { VITE_API_BASE: API_BASE, VITE_API_PATH: API_PATH } = import.meta.env;


function SingleProduct() {
  // const location = useLocation();
  // const product = location.state?.productData;
  // - 重新整理頁面 → `state` 會消失
  // - `state` 是一次性的前端路由傳值，只存在於**目前瀏覽階段的記憶體中**
  // - 直接貼網址 → 拿不到資料
  // - 適合使用 `state`的情境：
  //     - 適合用於短期的、非持久化的資料傳遞
  //     - 傳遞臨時的通知或狀態，例如操作成功或失敗的訊息
  //     - 多步驟表單中傳遞暫存的表單資料
  //     - 避免重複請求
  // 注意：目前使用 navigate 傳遞 state 僅作為教學示範
  // 後續最終作業或正式專案，會比較建議使用 `useParams` 重新打 API 取得資料

  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const handleView = async (id) => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/${API_PATH}/product/${id}`);
        setProduct(data.product);
      } catch (error) {
        console.log(error.response);
      }
    };

    handleView(id);
  }, []);


  const addCart = async (id, qty = 1) => {
    try {
      const payload = {
        product_id: id,
        qty,
      };
      await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {
        data: payload,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  

  return (
    !product ? (
      <h2>查無產品</h2>
    ) : (
      <div className="container mt-3">
        <div className="card" style={{ width: '18rem' }}>
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
              onClick={() => addCart(product.id)}>
              加入購物車
            </button>
          </div>
        </div>
      </div>
    )
  )
}

export default SingleProduct