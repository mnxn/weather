import { Box } from "@mui/material";

function HistoryPreview(props: { id?: string }) {
  return (
    <Box
      id={props.id}
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      bgcolor="white"
      borderRadius={1}
    >
      History Preview
    </Box>
  );
}

export default HistoryPreview;
