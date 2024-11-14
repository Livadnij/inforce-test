import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { Box } from "@mui/system";

import { openCreateModal } from "../store/productSlice";

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
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");

  const handleOpenCreateModal = () => {
    dispatch(openCreateModal(true));
  };

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
      <Button
        onClick={() => {
          handleOpenCreateModal();
        }}
        variant="contained"
      >
        Add Product
      </Button>
    </Box>
  );
}
