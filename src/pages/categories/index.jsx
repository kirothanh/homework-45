import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { FCommonTable } from "../../components";
import CategoryDialog from "../../components/CategoryDialog";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { sortElement, onSort } from "../../utils/sort";
import axios from "axios";

export default function Categories() {
  const [showDialog, setShowDialog] = useState(false);
  const [category, setCategory] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const SERVER_API = import.meta.env.VITE_SERVER_API;

  const getCategories = async () => {
    try {
      const response = await axios.get(`${SERVER_API}/categories`);
      const { data } = response;
      setCategories(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi khi lấy danh mục!", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  const addCategory = async (newCategory) => {
    try {
      const response = await axios.post(
        `${SERVER_API}/categories`,
        newCategory
      );
      console.log("add", response);
      return response.data;
    } catch (error) {
      console.error("Error adding category:", error);
      throw error;
    }
  };

  const updateCategory = async (id, updatedCategory) => {
    try {
      const response = await axios.patch(
        `${SERVER_API}/categories/${id}`,
        updatedCategory
      );
      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${SERVER_API}/categories/${id}`);
      toast.success("Xóa danh mục thành công!", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Lỗi khi xóa danh mục!", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

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

  const sortedCategories = sortElement(sortConfig, categories);
  const handleSort = (columnName) => {
    onSort(columnName, sortConfig, setSortConfig);
  };

  const onUpdate = (category) => {
    setCategory(category);
    setShowDialog(true);
  };

  const onDelete = async (id) => {
    await deleteCategory(id);
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const onCloseDialog = () => {
    setShowDialog(false);
  };

  const onOpenDialog = () => {
    setCategory({});
    setShowDialog(true);
  };

  const onAddAndUpdateCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name").trim();
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
      const updatedCategory = { ...category, name, orderNum };
      await updateCategory(category.id, updatedCategory);
      setCategories((prev) =>
        prev.map((item) => (item.id === category.id ? updatedCategory : item))
      );
      toast.success("Cập nhật danh mục thành công!", {
        position: "top-right",
        autoClose: 1000,
      });
    } else {
      const newCategory = {
        id: uuidv4(),
        name,
        orderNum,
      };
      await addCategory(newCategory);
      setCategories([...categories, newCategory]);
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
          onSort={handleSort}
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
