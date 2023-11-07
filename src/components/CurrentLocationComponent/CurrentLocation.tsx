import SearchInput from "./SearchInput";
import Box from "@mui/material/Box";

function CurrentLocation() {
  const handleSearch = (searchTerm: string) => {
    console.log("Search term:", searchTerm);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        borderRadius: 1,
        padding: 2,
      }}
    >
      <SearchInput onSearch={handleSearch} />

    </Box>
  );
}

export default CurrentLocation;