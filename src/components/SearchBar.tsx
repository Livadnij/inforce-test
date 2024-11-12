import { Button, MenuItem, Select, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

interface SearchBarInterbace {
  sortProductsByName: () => void;
  sortProductsByCount: () => void;
  filterProductsByName: (searchName: string) => void;
}

export default function SearchBar({
  sortProductsByCount,
  sortProductsByName,
  filterProductsByName,
}: SearchBarInterbace) {
  const [searchName, setSearchName] = useState("");

  return (
    <Box>
      <TextField
        value={searchName}
        onChange={(e) => {
          setSearchName(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          filterProductsByName(searchName);
        }}
      >
        Search
      </Button>
      <Select defaultValue={0}>
        <MenuItem value={0}>
          <Button onClick={sortProductsByName}>Sort By Name</Button>
        </MenuItem>
        <MenuItem value={1}>
          <Button onClick={sortProductsByCount}>Sort By Count</Button>
        </MenuItem>
      </Select>
    </Box>
  );
}
