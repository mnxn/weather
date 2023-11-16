import { Box } from "@mui/material";

function Map(props: { id?: string }) {
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
      Map
    </Box>
  );
}

export default Map;
