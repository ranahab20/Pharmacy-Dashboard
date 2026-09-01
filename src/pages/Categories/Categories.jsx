import React, { useState, useEffect } from "react";
import FormModal from "../../components/FormModal/FormModal";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import { GiMedicines } from "react-icons/gi";
import { BiCategoryAlt } from "react-icons/bi";
import "./Categories.css";
import api from "../../api/axiosInstance";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";

const Categories = () => {
  const[loading, setLoading]=useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [editions, setEditions] = useState({
    name: "",
  });

  const [editingId, setEditingId] = useState(null);

  // GET categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await api.get("/categories");

        console.log("Categories:", response.data);

        setCategories(response.data.data);

        setTotalCategories(response.data.total_categories);
        setTotalProducts(response.data.total_products);
        
      } catch (error) {
        console.error("Error fetching categories:", error);
      }finally
      {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/categories/stats");

        console.log("Stats:", response.data);

        setTotalCategories(response.data.data.total_categories);
        setTotalProducts(response.data.data.total_products);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setCategoryName("");
  };

  // Start editing
  const editCat = (category) => {
    setEditingId(category.id);

    setEditions({
      name: category.name,
    });
  };

  // PUT category
  const saveEdit = async (id) => {
    if (!editions.name.trim()) {
      return;
    }

    try {
      const response = await api.put(`/categories/${id}`, {
        name: editions.name,
      });

      console.log("Update response:", response.data);

      const updatedCategory = response.data.data ?? response.data;

      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === id ? updatedCategory : category,
        ),
      );

      setEditingId(null);

      setEditions({
        name: "",
      });
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // POST category
  const addCategory = async () => {
    if (!categoryName.trim()) {
      return;
    }

    try {
      const categoryData = {
        name: categoryName,
      };

      const response = await api.post("/categories", categoryData);

      console.log("Add category response:", response.data);

      const newCategory = response.data.data ?? response.data;

      setCategories((prevCategories) => [...prevCategories, newCategory]);
      toast.success(response.data.message);
      closeForm();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };
  // DELETE CATEGORY
  const deleteCat = async (id) => {
    try {
      const response = await api.delete(`/categories/${id}`);
      console.log("Delete response:", response.data);
      toast.success(response.data.message);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id),
      );
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error(error.response?.data?.message);
    }
  };
if (loading) {
  return <Loading text="جاري تحميل التصنيفات..." />;
}
  return (
    <div className="ctg-div">
      <div className="ctg-header">
        <h3>التصنيفات</h3>

        <Button className="ctg-btn" onClick={openForm}>
          تصنيف جديد +
        </Button>
      </div>

      <div className="ctg-card">
        <Card
          icon={<BiCategoryAlt />}
          title="إجمالي التصنيفات"
          className="ctg-card1"
          data={totalCategories}
        />

        <Card
          icon={<GiMedicines />}
          title="إجمالي المنتجات"
          className="ctg-card2"
          data={totalProducts}
        />
      </div>

      {showForm && (
        <FormModal
          title="إضافة تصنيف جديد"
          label="اسم التصنيف"
          placeholder="أدخل اسم التصنيف"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          onSubmit={addCategory}
          onClose={closeForm}
        />
      )}

      <div className="ctg-table">
        <table>
          <thead>
            <tr>
              <th>رقم التصنيف</th>
              <th>اسم التصنيف</th>
              <th>عدد المنتجات</th>
              <th>تعديل</th>
              <th>حذف</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>

                <td>
                  {editingId === category.id ? (
                    <input
                      value={editions.name}
                      onChange={(e) =>
                        setEditions({
                          ...editions,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    category.name
                  )}
                </td>

                <td>{category.products_count ?? 0}</td>

                <td>
                  {editingId === category.id ? (
                    <button
                      className="save-edit"
                      onClick={() => saveEdit(category.id)}
                    >
                      حفظ
                    </button>
                  ) : (
                    <button
                      className="edit-btn"
                      onClick={() => editCat(category)}
                    >
                      ✏️
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteCat(category.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
