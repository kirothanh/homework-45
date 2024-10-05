import { useEffect, useState } from "react";
import { FCommonTable } from "../../components";
import ProductDialog from "../../components/ProductDialog";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { sortElement, onSort } from "../../utils/sort";
import axios from "axios";

export default function Products() {
  const [showDialog, setShowDialog] = useState(false);
  const [product, setProduct] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const SERVER_API = import.meta.env.VITE_SERVER_API;

  const getProducts = async () => {
    try {
      const response = await axios.get(`${SERVER_API}/products`);
      const { data } = response;
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi khi lấy sản phẩm!", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  const addProduct = async (newProduct) => {
    try {
      const response = await axios.post(`${SERVER_API}/products`, newProduct);
      console.log("add", response);
      return response.data;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const response = await axios.patch(
        `${SERVER_API}/products/${id}`,
        updatedProduct
      );
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${SERVER_API}/products/${id}`);
      toast.success("Xóa sản phẩm thành công!", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Lỗi khi xóa sản phẩm!", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  const categories = JSON.parse(localStorage.getItem("categories"));

  const columns = [
    {
      text: "Id",
      name: "id",
    },
    {
      text: "Name",
      name: "name",
    },
    {
      text: "Category",
      name: "categoryId",
    },
    {
      text: "Order Number",
      name: "orderNum",
    },
    {
      text: "",
      name: "action",
    },
  ];

  const sortedProducts = sortElement(sortConfig, products);
  const handleSort = (columnName) => {
    onSort(columnName, sortConfig, setSortConfig);
  };

  const onUpdate = (product) => {
    setProduct(product);
    setShowDialog(true);
  };

  const onDelete = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter((prod) => prod.id !== id));
  };

  const onCloseDialog = () => {
    setShowDialog(false);
  };

  const onOpenDialog = () => {
    setProduct({});
    setShowDialog(true);
  };

  const onAddAndUpdateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const categoryId = formData.get("categoryId");
    const orderNum = Number(formData.get("orderNum"));

    if (!name || !categoryId || !orderNum) {
      toast.error("Vui lòng nhập đầy đủ thông tin!", {
        position: "top-right",
        autoClose: 1000,
      });
      // setShowDialog(false);
      return;
    }

    if (product.id) {
      const updatedProduct = { ...product, name, categoryId, orderNum };
      await updateProduct(product.id, updatedProduct);
      setProducts((prev) =>
        prev.map((item) => (item.id === product.id ? updatedProduct : item))
      );
      toast.success("Cập nhật sản phẩm thành công!", {
        position: "top-right",
        autoClose: 1000,
      });
    } else {
      const newProduct = {
        id: uuidv4(),
        name,
        categoryId,
        orderNum,
      };
      await addProduct(newProduct);
      setProducts([...products, newProduct]);
      toast.success("Tạo mới sản phẩm thành công!", {
        position: "top-right",
        autoClose: 1000,
      });
    }

    setShowDialog(false);
    setProduct({});
  };

  return (
    <>
      <p className="text-center text-3xl text-cyan-900 font-bold py-4">
        Products
      </p>
      <div className="max-w-[80%] mx-auto">
        <Button
          variant="contained"
          className="float-left mb-1"
          onClick={() => navigate("/")}
        >
          <HomeIcon />
        </Button>
        <Button
          variant="contained"
          className="float-right mb-1"
          onClick={onOpenDialog}
        >
          Add Product
        </Button>
        <FCommonTable
          columns={columns}
          rows={sortedProducts}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onSort={handleSort}
          sortConfig={sortConfig}
        />
      </div>
      <ProductDialog
        show={showDialog}
        onClose={onCloseDialog}
        categories={categories}
        onAddAndUpdateProduct={onAddAndUpdateProduct}
        product={product}
      />
      <ToastContainer />
    </>
  );
}
