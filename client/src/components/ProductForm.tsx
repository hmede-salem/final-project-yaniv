import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Select,
  Grid,
  IconButton,
} from "@chakra-ui/react";
import Product from "../entities/Product";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import updateProduct from "../hooks/updateProduct";
import addProduct from "../hooks/addProduct";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import generateRatingNumbers from "../services/generateRatingOptions";

interface Props {
  newProduct?: boolean;
  product: Product;
}

const ProductForm = ({ newProduct = false, product: p }: Props) => {
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const discountOptions = Array.from({ length: 100 }, (_, index) => index);

  const ratingOptions = generateRatingNumbers();

  const [product, setProduct] = useState<Product>(p);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...product.images];
    newImageUrls[index] = value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: newImageUrls,
    }));
  };

  const handleAddImageUrl = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: [...prevProduct.images, ""],
    }));
  };

  const handleRemoveImageUrl = (index: number) => {
    const newImageUrls = [...product.images];
    newImageUrls.splice(index, 1);
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: newImageUrls,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    {
      newProduct ? addProduct(product) : updateProduct(product);
    }
  };

  return (
    <>
      <Box
        key={product.id}
        maxW="2xl"
        mx="auto"
        p={9}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
      >
        <form onSubmit={handleSubmit}>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <FormControl id="title">
              <FormLabel>Title (1-6 Words)</FormLabel>
              <Input
                type="text"
                name="title"
                value={product.title}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="category">
              <FormLabel>Category</FormLabel>
              <Select
                name="category"
                value={
                  typeof product.category === "string"
                    ? ""
                    : product.category._id
                }
                onChange={handleChange}
              >
                {categories?.map((cat, index) => (
                  <option key={index} value={cat._id}>
                    {cat.category}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="details">
              <FormLabel>Details (One Sentence)</FormLabel>
              <Textarea
                name="details"
                value={product.details}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="description">
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={product.description}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="price">
              <FormLabel>Price ($)</FormLabel>
              <Input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="type">
              <FormLabel>Type (1-2 Words)</FormLabel>
              <Input
                type="string"
                name="type"
                value={product.type}
                onChange={handleChange}
              />
            </FormControl>
            {product.images.map((url, index) => (
              <FormControl
                key={index}
                id={`imageUrl-${index}`}
                gridColumn="span 2"
              >
                <FormLabel>Image URL {index + 1}</FormLabel>
                <Input
                  type="text"
                  value={url}
                  onChange={(e) => handleImageUrlChange(index, e.target.value)}
                />
                {product.images.length > 1 && (
                  <IconButton
                    aria-label="Remove Image URL"
                    icon={<MinusIcon />}
                    onClick={() => handleRemoveImageUrl(index)}
                  />
                )}
              </FormControl>
            ))}
            <Button
              type="button"
              isDisabled={product.images.length >= 6 ? true : false}
              onClick={handleAddImageUrl}
              gridColumn="span 2"
              colorScheme="blue"
              leftIcon={<AddIcon />}
            >
              Add Image URL
            </Button>
            <FormControl id="discountPercentage">
              <FormLabel>Discount Percentage (%)</FormLabel>
              <Select
                value={product.discountPercentage}
                name="discountPercentage"
                onChange={handleChange}
              >
                {discountOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="rating">
              <FormLabel>Rating (0-5)</FormLabel>
              <Select
                value={product.rating}
                name="rating"
                onChange={handleChange}
              >
                {ratingOptions.map((rate) => (
                  <option key={rate} value={rate}>
                    {rate}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="quantityInStock">
              <FormLabel>Quantity in Stock</FormLabel>
              <Input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="brand">
              <FormLabel>Brand</FormLabel>
              <Input
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>

          <Button type="submit" mt={4} colorScheme="blue">
            {newProduct ? "Create Product" : "Update Product"}
          </Button>
        </form>
      </Box>
    </>
  );
};

export default ProductForm;
