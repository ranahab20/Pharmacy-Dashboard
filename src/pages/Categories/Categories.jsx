import React, { useState } from "react";

import FormModal from "../../components/FormModal/FormModal";
import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";

import { GiMedicines } from "react-icons/gi";
import { BiCategoryAlt } from "react-icons/bi";

import "./Categories.css";

const initialCategories = [
  {
    id: 1,
    name: "الأدوية",
    products: 656,
  },
  {
    id: 2,
    name: "تجميل",
    products: 7554,
  },
  {
    id: 3,
    name: "أطفال",
    products: 34,
  },
  {
    id: 4,
    name: "عناية بالبشرة",
    products: 425,
  },
  {
    id: 5,
    name: "فيتامينات ومكملات",
    products: 5,
  },
  {
    id: 6,
    name: "أجهزة طبية",
    products: 689,
  },
];

const Categories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState(initialCategories);

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setCategoryName("");
  };

  const addCategory = () => {
    if (!categoryName.trim()) {
      return;
    }

    const categoryData = {
      name: categoryName,
    };

    console.log("Category data:", categoryData);
    const newCategory = {
      id: categories.length + 1,
      name: categoryName,
      products: 0,
    };

    setCategories((prevCategories) => [...prevCategories, newCategory]);
    closeForm();
  };

  return (
    <>
      <div className="ctg-div">
        <div className="ctg-header">
          <h3>التصنيفات</h3>
          <Button className="ctg-btn" onClick={openForm}>
            تصنيف جديد +
          </Button>
        </div>
        <div className="ctg-card">
          <Card icon={<BiCategoryAlt />} title="إجمالي التصنيفات"  className='ctg-card1' data='10'/>
          <Card icon={<GiMedicines />} title="إجمالي المنتجات"  className='ctg-card2'data='245' />
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
                <th>الإجراءات</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.products}</td>
                  <td>
                    <button className="edit-btn">✏️</button>
                    <button className="delete-btn">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Categories;
