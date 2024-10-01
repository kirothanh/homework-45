import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { FCommonTable } from "../../components";
import CategoryDialog from "../../components/CategoryDialog";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const [showDialog, setShowDialog] = useState(false);
  const [category, setCategory] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Quan Ao",
      orderNum: 2,
    },
    {
      id: 2,
      name: "Dien Thoai",
      orderNum: 1,
    },
    {
      id: 3,
      name: "Do An",
      orderNum: 3,
    },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem("categories", JSON.stringify(categories));
    }
  }, [categories]);

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
      text: "Order Number",
      name: "orderNum",
    },
    {
      text: "",
      name: "action",
    },
  ];

  const sortedCategories = [...categories].sort((a, b) => {
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

  const onUpdate = (category) => {
    setCategory(category);
    setShowDialog(true);
  };

  const onDelete = (id) => {
    const filteredCategories = categories.filter((cat) => cat.id !== id);
    setCategories(filteredCategories);
    toast.success("Xóa danh mục thành công!", {
      position: "top-right",
      autoClose: 1000,
    });
  };

  const onCloseDialog = () => {
    setShowDialog(false);
  };

  const onOpenDialog = () => {
    setCategory({});
    setShowDialog(true);
  };

  const onAddAndUpdateCategory = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const orderNum = Number(formData.get("orderNum"));

    if (!name || !orderNum) {
      toast.error("Vui lòng nhập đầy đủ thông tin!", {
        position: "top-right",
        autoClose: 1000,
      });
      setShowDialog(false);
      return;
    }

    if (category.id) {
      const updatedCategories = categories.map((item) => {
        if (item.id === category.id) {
          const checkOrderNumExist = categories.find((cat) => {
            return cat.orderNum === orderNum && cat.id !== category.id;
          });

          if (checkOrderNumExist) {
            toast.error("OrderNum đã tồn tại, Vui lòng nhập số khác!", {
              position: "top-right",
              autoClose: 1000,
            });
            setShowDialog(false);
            return item;
          } else {
            toast.success("Cập nhật danh mục thành công!", {
              position: "top-right",
              autoClose: 1000,
            });
            return { ...item, name, orderNum };
          }
        } else {
          return item;
        }
      });

      setCategories(updatedCategories);
    } else {
      const checkOrderNumExist = categories.find((category) => {
        return category.orderNum === orderNum;
      });

      if (checkOrderNumExist) {
        toast.error("OrderNum đã tồn tại, Vui lòng nhập số khác!", {
          position: "top-right",
          autoClose: 1000,
        });
        setShowDialog(false);
        return;
      }

      const category = {
        id: uuidv4(),
        name,
        orderNum,
      };

      setCategories([...categories, category]);
      toast.success("Tạo mới danh mục thành công!", {
        position: "top-right",
        autoClose: 1000,
      });
    }

    setShowDialog(false);
    setCategory({});
  };

  return (
    <>
      <p className="text-center text-3xl text-cyan-900 font-bold py-4">
        Categories
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
          Add Category
        </Button>
        <FCommonTable
          columns={columns}
          rows={sortedCategories}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onSort={onSort}
          sortConfig={sortConfig}
        />
      </div>
      <CategoryDialog
        show={showDialog}
        onClose={onCloseDialog}
        onAddAndUpdateCategory={onAddAndUpdateCategory}
        category={category}
      />
      <ToastContainer />
    </>
  );
}
