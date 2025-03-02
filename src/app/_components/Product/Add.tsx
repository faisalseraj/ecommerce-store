"use client"; // Allowing the use of React hooks

import { DialogActionTrigger, DialogFooter } from "@/components/ui/dialog";
import React, { useState } from "react";

import { Box } from "@chakra-ui/react";
import ButtonComponent from "@/components/Buttons/Button";
import DialogComponent from "@/components/Modal/DialogComponent";
import InputComponent from "@/components/Inputs/CustomInputField";
import { ProductSchema } from "@/app/_models/Product";
import axiosInstance from "@/app/_utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useProductsContext } from "@/app/_context/ProductsContext";

const AddProduct: React.FC = () => {
  const [newProduct, setNewProduct] = useState<Partial<ProductSchema>>({
    name: "",
    description: "",
    price: 0,
    brand: "",
    category: "",
    images: [],
    stock: 0,
    sku: "",
    variants: [],
    isInStock: true,
  });
  const [isOpen, setIsOpen] = useState(false); // Manage dialog open/close state
  const { refetchProducts } = useProductsContext();

  const { mutate: handleAddProduct, isPending } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance("/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(newProduct),
      });
      return response.data;
    },
    onSuccess: () => {
      refetchProducts();
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        brand: "",
        category: "",
        images: [],
        stock: 0,
        sku: "",
        variants: [],
        isInStock: true,
      });
      console.log(`Product added `);
    },
    onError: () => {
      console.error("Failed to add product");
    },
  });

  const handleOpenChange = (details: { isOpen: boolean }) => {
    setIsOpen(details.isOpen);
  };

  return (
    <Box p={5}>
      <ButtonComponent
        float={"right"}
        className="btn-3d"
        onClick={() => setIsOpen(true)}
      >
        Add Product
      </ButtonComponent>
      {isOpen ? (
        <DialogComponent
          title="Add Product"
          isOpen={isOpen}
          onOpenChange={handleOpenChange}
        >
          <form onError={(e) => console.log(e, "here")}>
            <InputComponent
              label="Name"
              helperText="Enter product name"
              placeholder="Product Name"
              value={newProduct.name || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              required
            />
            <InputComponent
              mt={4}
              label="Description"
              helperText="Enter product Description"
              placeholder="Product Description"
              value={newProduct.description || ""}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  description: e.target.value,
                })
              }
              required
            />
            <InputComponent
              mt={4}
              label="Price"
              helperText="Enter product Price"
              type="number"
              placeholder="Product Price"
              value={newProduct.price || 0}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: Number(e.target.value),
                })
              }
              required
            />
            <InputComponent
              mt={4}
              label="Brand"
              helperText="Enter product Brand"
              placeholder="Brand Name"
              value={newProduct.brand || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, brand: e.target.value })
              }
              required
            />
            <InputComponent
              mt={4}
              label="Category"
              helperText="Enter product Category"
              placeholder="Category"
              value={newProduct.category || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              required
            />
            <InputComponent
              mt={4}
              label="Images (comma separated URLs)"
              helperText="Enter product image"
              placeholder="Image URLs"
              value={(newProduct.images || []).join(", ")} // Show images as comma-separated
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  images: e.target.value.split(",").map((img) => img.trim()),
                })
              }
              required
            />
            <InputComponent
              mt={4}
              label="Stock Quantity"
              helperText="Enter stock quantity"
              type="number"
              placeholder="Stock Quantity"
              value={newProduct.stock || 0}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  stock: Number(e.target.value),
                })
              }
              required
            />
            <InputComponent
              mt={4}
              label="SKU"
              helperText="Enter SKU"
              placeholder="Stock Keeping Unit"
              value={newProduct.sku || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, sku: e.target.value })
              }
              required
            />
            <InputComponent
              mt={4}
              label="In Stock"
              helperText="Is the stock item currently available?"
              type="checkbox"
              checked={newProduct.isInStock}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  isInStock: e.target.checked,
                })
              }
            />
            <DialogFooter>
              <DialogActionTrigger asChild>
                <ButtonComponent
                  isLoading={isPending}
                  className="neon-btn"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </ButtonComponent>
              </DialogActionTrigger>

              <ButtonComponent
                isLoading={isPending}
                className="gradient-btn"
                onClick={() => handleAddProduct()}
              >
                Add Product
              </ButtonComponent>
            </DialogFooter>
          </form>
        </DialogComponent>
      ) : null}
    </Box>
  );
};

export default AddProduct;
