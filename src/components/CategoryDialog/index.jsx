/* eslint-disable react/prop-types */
import { DialogActions, Button, TextField } from "@mui/material";
import DialogContainer from "../DialogContainer";

export default function CategoryDialog({
  show,
  onClose,
  onAddAndUpdateCategory,
  category,
}) {
  return (
    <>
      <DialogContainer show={show} onClose={onClose} name="Category">
        <form onSubmit={onAddAndUpdateCategory}>
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            name="name"
            defaultValue={category?.name || ""}
            sx={{ width: "100%", marginBottom: "10px" }}
          />
          <TextField
            name="orderNum"
            label="Order Num"
            type="number"
            variant="standard"
            sx={{ width: "100%" }}
            defaultValue={category?.orderNum || ""}
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
