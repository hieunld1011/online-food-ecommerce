'use client';

import {
  Button,
  ConfigProvider,
  Form,
  Modal,
  Input,
  Table,
  Typography,
} from 'antd';

import { ProductsProps, UsersProps } from '@/app/types/index.types';
import type { ColumnsType } from 'antd/es/table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { useCallback, useEffect, useState } from 'react';
import { Product, User } from '@prisma/client';
import axios from 'axios';

interface DataType {
  key: React.Key;
  product: string;
  category: string;
  ratings: number | null;
  price: number;
  numOfReviews: number;
  numOfOrders: number;
  createdAt: string;
}

const DashboardProducts = () => {
  const rows: DataType[] = [];
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<DataType>();

  const fetchData = useCallback(async () => {
    const { data } = await axios.get('/api/products');
    setProducts(data.menu);
  }, []);

  const deleteData = async (record: DataType) => {
    await axios.delete(`/api/products/${record.key}`);
    await fetchData();
  };

  const editData = async (record: DataType) => {
    await axios.patch(`/api/products/${record.key}`, editingProduct);
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  products.forEach((product: ProductsProps) => {
    let data = {
      key: product.id,
      product: product.productName,
      category: product.category,
      ratings: product.ratings,
      price: product.price,
      numOfOrders: product.orders.length,
      numOfReviews: product.reviews.length,
      createdAt: product.created_at.toLocaleString().slice(0, 10),
    };

    rows.push(data);
  });

  const resetEditing = () => {
    setIsEditing(false);
    setEditingProduct(undefined);
  };

  const handleEditClick = (record: DataType) => {
    setIsEditing(true);
    setEditingProduct({ ...record });
  };

  const handleDeleteClick = (record: DataType) => {
    deleteData(record);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Product',
      width: 150,
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 150,
    },
    {
      title: 'Ratings',
      dataIndex: 'ratings',
      key: 'ratings',
      width: 100,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Orders',
      dataIndex: 'numOfOrders',
      key: 'numOfOrders',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.numOfOrders - b.numOfOrders,
    },
    {
      title: 'Reviews',
      dataIndex: 'numOfReviews',
      key: 'numOfReviews',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.numOfReviews - b.numOfReviews,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
    },
    {
      title: 'Action',
      key: 'operation',
      align: 'center',
      fixed: 'right',
      width: 100,
      render: (record: DataType) => {
        return (
          <>
            <EditIcon
              className='cursor-pointer text-blue-500 hover:opacity-70'
              onClick={() => {
                handleEditClick(record);
              }}
            />
            <DeleteIcon
              className='cursor-pointer text-redColor hover:opacity-70'
              onClick={() => handleDeleteClick(record)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={rows}
        scroll={{ x: 'max-content' }}
        className='max-w-[300px] md:max-w-[700px] lg:max-w-[1100px]'
        sticky={{ offsetHeader: 64 }}
        tableLayout='auto'
      />
      <Modal
        title='Edit Product'
        open={isEditing}
        okText='Save'
        onCancel={() => resetEditing()}
        onOk={() => {
          editData(editingProduct!);
          resetEditing();
        }}
      >
        <hr />
        <div className='mb-3 mt-6'>
          <label className='mt-6 font-semibold' htmlFor='editName'>
            Name
          </label>
          <Input
            value={editingProduct?.product}
            onChange={(e) =>
              setEditingProduct((pre: any) => {
                return { ...pre, product: e.target.value };
              })
            }
            id='editName'
          />
        </div>
        <div className='mb-3 mt-6'>
          <label className='mt-6 font-semibold' htmlFor='editPrice'>
            Price
          </label>
          <Input
            value={editingProduct?.price}
            id='editPrice'
            onChange={(e) =>
              setEditingProduct((pre: any) => {
                return { ...pre, price: e.target.value };
              })
            }
          />
        </div>
      </Modal>
    </>
  );
};

export default DashboardProducts;
