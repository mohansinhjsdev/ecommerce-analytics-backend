import { Product } from "../models/product.model";

export const createProduct = async (data: {
  name: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
}) => {
  //check if product already exists
  const exisitingProduct = await Product.findOne({
    name: data.name,
    category: data.category,
    isActive: true,
  });
  if (exisitingProduct) {
    throw new Error("Product already exists in category");
  }

  //create new product
  const product = await Product.create(data);
  return product;
};

//getall product
export const getAllProducts = async (query: any) => {
  const { page = 1, limit = 10, category, search } = query;

  const filter: any = { isActive: true };

  if (category) {
    filter.category = category;
  }

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [products, total] = await Promise.all([
    Product.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 }),

    Product.countDocuments(filter),
  ]);

  return {
    total,
    page: Number(page),
    limit: Number(limit),
    products,
  };
};
//get single id
export const getProductById = async (id: string) => {
  const product = await Product.findOne({
    _id: id,
    isActive: true,
  });
  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

//update product
export const updateProduct = async (
  id: string,
  data: Partial<{
    name: string;
    category: string;
    price: number;
    stock: number;
  }>,
) => {
  const product = await Product.findOneAndUpdate(
    { _id: id, isActive: true },
    data,
    { new: true },
  );
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

//soft delete
export const deleteProduct = async (id: string) => {
  const product = await Product.findOneAndUpdate(
    { _id: id, isActive: true },
    { isActive: false },
    { new: true },
  );
  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};
