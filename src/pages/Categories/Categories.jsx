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
    quantity: 656,
  },
  {
    id: 2,
    name: "تجميل",
    quantity: 7554,
  },
  {
    id: 3,
    name: "أطفال",
    quantity: 34,
  },
  {
    id: 4,
    name: "عناية بالبشرة",
    quantity: 425,
  },
  {
    id: 5,
    name: "فيتامينات ومكملات",
    quantity: 5,
  },
  {
    id: 6,
    name: "أجهزة طبية",
    quantity: 689,
  },
];

const Categories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [editions,setEditions]=useState({name:"",quantity:0});
  const[editingId,setEditingId]=useState(null);

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setCategoryName("");
  };
  const editCat=(category)=>{
    setEditingId(category.id)
    setEditions({name:category.name,quantity:category.quantity})
  }

  const saveEdit=(id)=>{
    setCategories((prevCategories)=>{
      prevCategories.map((category)=>{
        if(category.id===id){
          return{  ...category,
          name: editions.name,
          quantity: editions.quantity,
        }
        }
        else{
          return category;
        }
      });
    });
    setEditingId(null);
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
      quantity: 0,
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
                  <td>
                    {editingId===category.id?(<input value={editions.name}
                                                      onChange={(e)=>setEditions({
                                                        ...editions,
                                                        name:e.target.value
                                                      })
                                                    }
                                                    />
                                                  )
                    :(category.name)}
                    </td>
                  <td>
                    {editingId===category.id?(
                      <input type="number"
                      value={editions.quantity}
                      onChange={(e)=>
                        setEditions({
                          ...editions,
                          quantity:Number(e.target.value)
                        })
                      }  
                      />
                      
                    ):(
                    category.quantity
                    )}
                  </td>
                  <td>
                    {editingId===category.id?(<button className="save-edit">حفظ</button>):
                    (<button className="edit-btn" onClick={()=>editCat(category)}>✏️</button>)
                    }
                    
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
