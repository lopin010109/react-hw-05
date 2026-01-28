import { useEffect } from "react";
import { useNavigate } from "react-router"

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/', {
        replace: true,
      })
    }, 3000);
  }, [navigate]);

  return (
    <>
      <h2>404</h2>
    </>
  )
}

export default NotFound