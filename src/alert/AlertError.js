import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react"; // Import useEffect

export default function AlertError(props) {
  // Use useEffect to monitor changes in props.open
  useEffect(() => {
    if (props.open) {
      // If props.open becomes true, set a timeout to close the alert after 2 seconds
      const timeoutId = setTimeout(() => {
        props.setOpen(false);
      }, 1000);

      // Cleanup function: clear the timeout when props.open becomes false or the component unmounts
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [props.open, props.setOpen]); // Depend on props.open and props.setOpen

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
        sx={{ mb: 2, position: 'relative', zIndex: 1}}
      >
        {props.text}
      </Alert>
    </Collapse>
  );
}
