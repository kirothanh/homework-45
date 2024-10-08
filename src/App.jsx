// this is component

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FCommonTable } from "./components";

// import { FButton, FInput, FCommonTable } from "./components/index";

export default function App() {
  const columns = [
    {
      name: "id",
      text: "Id",
    },
    {
      name: "name",
      text: "Tên",
      width: "100px",
    },
    {
      name: "age",
      text: "Tuổi",
    },
    {
      name: "gender",
      text: "Giới tính",
    },
    {
      name: "address",
      text: "Địa chỉ",
    },
    {
      name: "action",
      text: "",
    },
  ];

  const [users, setUsers] = useState([
    { id: uuidv4(), name: "John", age: 25, gender: "male", address: "HN" },
  ]);

  const [user, setUser] = useState({
    id: uuidv4(),
    name: "",
    age: "",
    gender: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const onInput = (e, key) => {
    const updateUser = { ...user };
    updateUser[key] = e.target.value;
    setUser({ ...updateUser });
  };

  const onSave = () => {
    if (isEditing) {
      setUsers(
        users.map((u) => {
          return u.id === user.id ? user : u;
        })
      );
      setIsEditing(false);
    } else {
      setUsers([...users, user]);
    }

    setUser({
      id: uuidv4(),
      name: "",
      age: "",
      gender: "",
      address: "",
    });
  };

  const onUpdate = (row) => {
    console.log(row);
    setIsEditing(true);
  };

  const onDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="name"
        onChange={(e) => onInput(e, "name")}
        value={user.name}
      />
      <input
        type="text"
        placeholder="age"
        onChange={(e) => onInput(e, "age")}
        value={user.age}
      />
      <select
        name="gender"
        onChange={(e) => onInput(e, "gender")}
        value={user.gender}
      >
        <option value="">gender</option>
        <option value="male">male</option>
        <option value="female">female</option>
      </select>
      <input
        type="text"
        placeholder="address"
        onChange={(e) => onInput(e, "address")}
        value={user.address}
      />
      <button onClick={onSave}>{isEditing ? "Update" : "Save"}</button>
      <hr />

      <FCommonTable
        columns={columns}
        rows={users}
        maxWidth={"800px"}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </div>
  );
}
