import { useEffect, useState } from "react";
import { FCommonTable } from "../../components";
import ProductDialog from "../../components/ProductDialog";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [showDialog, setShowDialog] = useState(false);
  const [product, setProduct] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      categoryId: 1,
      orderNum: 1,
    },
  ]);

  const navigate = useNavigate();

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

  const sortedProducts = [...products].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const onSort = (columnName) => {
    let direction = "asc";
    if (sortConfig.key === columnName && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: columnName, direction });
  };

  const onUpdate = (product) => {
    console.log(product);
    setProduct(product);
    setShowDialog(true);
  };

  const onDelete = (id) => {
    const filteredProducts = products.filter((prod) => prod.id !== id);
    setProducts(filteredProducts);
    toast.success("Xóa sản phẩm thành công!", {
      position: "top-right",
      autoClose: 1000,
    });
  };

  const onAddAndUpdateProduct = (e) => {
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
      setShowDialog(false);
      return;
    }

    if (product.id) {
      const updatedProducts = products.map((item) => {
        if (item.id === product.id) {
          const checkOrderNumExist = products.find((prod) => {
            return prod.orderNum === orderNum && prod.id !== product.id;
          });

          if (checkOrderNumExist) {
            toast.error("OrderNum đã tồn tại, Vui lòng nhập số khác!", {
              position: "top-right",
              autoClose: 1000,
            });
            setShowDialog(false);
            return item;
          } else {
            toast.success("Cập nhật sản phẩm thành công!", {
              position: "top-right",
              autoClose: 1000,
            });
            return { ...item, name, categoryId, orderNum };
          }
        } else {
          return item;
        }
      });

      setProducts(updatedProducts);
    } else {
      const checkOrderNumExist = products.find((prod) => {
        return prod.orderNum === orderNum;
      });

      if (checkOrderNumExist) {
        toast.error("OrderNum đã tồn tại, Vui lòng nhập số khác!", {
          position: "top-right",
          autoClose: 1000,
        });
        setShowDialog(false);
        return;
      }

      const product = {
        id: uuidv4(),
        name,
        categoryId,
        orderNum,
      };

      setProducts([...products, product]);
      toast.success("Tạo mới sản phẩm thành công!", {
        position: "top-right",
        autoClose: 1000,
      });
    }

    setShowDialog(false);
    setProduct({});
  };

  const onCloseDialog = () => {
    setShowDialog(false);
  };

  const onOpenDialog = () => {
    setProduct({});
    setShowDialog(true);
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
          onSort={onSort}
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
