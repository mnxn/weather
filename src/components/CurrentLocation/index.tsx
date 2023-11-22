import SearchInput from "./SearchInput";
import Box from "@mui/material/Box";

function CurrentLocation(props: { id?: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        borderRadius: 1,
        padding: 2,
      }}
      id={props.id}
    >
      <SearchInput />
    </Box>
  );
}

export default CurrentLocation;
