/* eslint-disable react/prop-types */
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

export default function DialogContainer({ show, onClose, name, children }) {
  return (
    <>
      <Dialog
        open={show}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Save/Edit ${name}`}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </>
  );
}
