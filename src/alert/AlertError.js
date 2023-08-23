import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function AlertError(props) {
  return (
    <Collapse in={props.open}>
      <Alert
        action={
          <IconButton aria-label="close" color="error" size="small">
            <CloseIcon
              fontSize="inherit"
              onClick={() => {
                props.setOpen(false);
              }}
            />
          </IconButton>
        }
        severity="error"
        sx={{ mb: 2 }}
      >
        {props.text}
      </Alert>
    </Collapse>
  );
}