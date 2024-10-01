import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const goToProducts = () => {
    navigate("/products");
  };
  const goToCategories = () => {
    navigate("/categories");
  };

  return (
    <>
      <Button onClick={goToProducts}>products</Button>
      <Button onClick={goToCategories}>categories</Button>
    </>
  );
}
