/* eslint-disable react/prop-types */
import {
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import DialogContainer from "../DialogContainer";

export default function ProductDialog({
  show,
  onClose,
  categories = [],
  onAddAndUpdateProduct,
  product,
}) {
  const [categoryId, setCategoryId] = useState(product?.categoryId || "");

  useEffect(() => {
    setCategoryId(product?.categoryId || "");
  }, [product]);

  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
  };

  return (
    <>
      <DialogContainer show={show} onClose={onClose} name="Product">
        <form onSubmit={onAddAndUpdateProduct}>
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            name="name"
            defaultValue={product?.name || ""}
            sx={{ width: "100%" }}
          />
          <FormControl
            variant="standard"
            sx={{ width: "100%", margin: "10px 0px" }}
          >
            <InputLabel id="demo-simple-select-standard-label">
              Category ID
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              name="categoryId"
              label="Categories"
              value={categoryId}
              onChange={handleCategoryChange}
            >
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>
                  <em>No categories available</em>
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <TextField
            name="orderNum"
            label="Order Num"
            type="number"
            variant="standard"
            sx={{ width: "100%" }}
            defaultValue={product?.orderNum || ""}
            InputProps={{ inputProps: { min: 1 } }}
          />
          <DialogActions>
            <Button onClick={onClose}>close</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </DialogContainer>
    </>
  );
}
