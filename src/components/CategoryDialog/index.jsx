/* eslint-disable react/prop-types */
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

export default function CategoryDialog({
  show,
  onClose,
  onAddAndUpdateCategory,
  category,
}) {
  return (
    <>
      <Dialog
        open={show}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Save/Edit Category"}
        </DialogTitle>
        <DialogContent>
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
              InputProps={{ inputProps: { min: 0 } }}
            />
            <DialogActions>
              <Button onClick={onClose}>close</Button>
              <Button type="submit">Save</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
