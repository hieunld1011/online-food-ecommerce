'use client';

import type { ColumnsType } from 'antd/es/table';
import { useCallback, useEffect, useState } from 'react';
import { Modal, Input, Table, Button } from 'antd';
import { CldUploadButton, CldUploadWidgetResults } from 'next-cloudinary';
import { toast } from 'react-toastify';
import axios from 'axios';
import Image from 'next/image';

import { ProductsProps } from '@/app/types/index.types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { HiPhotograph } from 'react-icons/hi';
import handleAxiosError from '@/app/utils/axiosError';

interface DataType {
  key: React.Key;
  product: string;
  category: string;
  ratings: number | null;
  price: number;
  picture?: string;
  description?: string;
  numOfReviews: number;
  numOfOrders: number;
  createdAt: Date;
}

const productProps: DataType = {
  key: '',
  product: '',
  category: 'burger',
  ratings: 0.0,
  price: 0.0,
  numOfReviews: 0,
  numOfOrders: 0,
  picture: '',
  description: '',
  createdAt: new Date(Date.now()),
};

const DashboardProducts = () => {
  const rows: DataType[] = [];
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [addingProduct, setAddingProduct] = useState<DataType>(productProps);
  const [editingProduct, setEditingProduct] = useState<DataType>();

  const fetchData = useCallback(async () => {
    await axios
      .get('/api/products')
      .then((res) => {
        const { data } = res;
        setProducts(data.menu);
      })
      .catch((err) => handleAxiosError(err));
  }, []);

  const deleteData = async (record: DataType) => {
    await axios
      .delete(`/api/products/${record.key}`)
      .then((res) => {
        if (res.status === 200) toast.success('Product updated successfully');
      })
      .catch((err) => handleAxiosError(err));
    await fetchData();
  };

  const editData = async (record: DataType) => {
    await axios
      .patch(`/api/products/${record.key}`, editingProduct)
      .then((res) => {
        if (res.status === 200) toast.success('Product deleted successfully');
      })
      .catch((err) => handleAxiosError(err));
    await fetchData();
  };

  const addData = async () => {
    if (addingProduct.ratings)
      addingProduct.ratings = parseFloat(addingProduct?.ratings.toString());
    else addingProduct.ratings = 0;

    addingProduct.price = parseFloat(addingProduct?.price.toString());

    if (!addingProduct.picture) {
      toast.error('Image is required!');
      return;
    }

    await axios
      .post(`/api/products`, addingProduct)
      .then((res) => {
        if (res.status === 200) toast.success('Product created successfully');
      })
      .catch((err) => handleAxiosError(err));
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
      createdAt: product.created_at,
    };

    rows.push(data);
  });

  const resetEditing = () => {
    setIsEditing(false);
    setIsAdding(false);
    setAddingProduct(productProps);
    setEditingProduct(undefined);
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleEditClick = (record: DataType) => {
    setIsEditing(true);
    setEditingProduct({ ...record });
  };

  const handleDeleteClick = (record: DataType) => {
    Modal.confirm({
      title: 'Are you sure deleting this product?',
      okText: 'Yes',
      okType: 'danger',
      onOk: () => {
        deleteData(record);
      },
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      responsive: ['lg'],
      filters: [...new Set(products.map((product) => product.category))].map(
        (item) => ({ value: item, text: item })
      ),
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value: any, record) => record.category.startsWith(value),
    },
    {
      title: 'Ratings',
      dataIndex: 'ratings',
      key: 'ratings',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      sorter: (a, b) => a.price - b.price,
      render: (value: number) => {
        return (
          <span className='font-semibold text-greenColor'>
            {'$' + value.toFixed(2)}
          </span>
        );
      },
    },
    {
      title: 'Orders',
      dataIndex: 'numOfOrders',
      key: 'numOfOrders',
      align: 'center',
      sorter: (a, b) => a.numOfOrders - b.numOfOrders,
    },
    {
      title: 'Reviews',
      dataIndex: 'numOfReviews',
      key: 'numOfReviews',
      align: 'center',
      sorter: (a, b) => a.numOfReviews - b.numOfReviews,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      responsive: ['lg'],
      render: (value: Date) => {
        return value.toLocaleString().slice(0, 10);
      },
    },
    {
      title: 'Action',
      key: 'operation',
      align: 'center',
      fixed: 'right',
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
      <Button
        className='mb-4 max-w-[120px] bg-blue-400 text-white hover:bg-transparent'
        onClick={handleAddClick}
      >
        Add Product
      </Button>
      <Table
        columns={columns}
        dataSource={rows}
        scroll={{ x: true }}
        className='max-w-[300px] md:max-w-[550px] lg:max-w-full'
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
        <label className='font-semibold' htmlFor='selectEditCategory'>
          Choose category:{' '}
        </label>
        <select
          id='selectEditCategory'
          className='my-3 rounded border px-2 outline-none'
          onChange={(e) =>
            setAddingProduct((pre: any) => {
              return { ...pre, category: e.target.value };
            })
          }
        >
          {['burger', 'beverage'].map((cate, index) => (
            <option key={index} value={cate}>
              {cate}
            </option>
          ))}
        </select>
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
      <Modal
        title='Adding Product'
        open={isAdding}
        okText='Save'
        onCancel={() => resetEditing()}
        onOk={() => {
          addData();
          resetEditing();
        }}
      >
        <hr />
        <div className='mb-6 mt-3'>
          <label className='font-semibold' htmlFor='addName'>
            Name <span className='text-sm text-redColor'>*</span>
          </label>
          <Input
            value={editingProduct?.product}
            onChange={(e) =>
              setAddingProduct((pre: any) => {
                return { ...pre, product: e.target.value };
              })
            }
            id='addName'
            required
          />
        </div>
        <label className='font-semibold'>
          Image <span className='text-sm text-redColor'>*</span>
        </label>
        <CldUploadButton
          options={{ maxFiles: 1, folder: '/food_ecommerce' }}
          onUpload={(result: any) => {
            setAddingProduct((pre: any) => {
              return {
                ...pre,
                picture: result?.info?.secure_url,
              };
            });
          }}
          uploadPreset='foodEcommerce'
          className='w-full'
        >
          {addingProduct.picture ? (
            <Image
              src={addingProduct.picture}
              alt='image'
              height={100}
              width={100}
            />
          ) : (
            <HiPhotograph size={30} className=' text-sky-500' />
          )}
        </CldUploadButton>
        <label className='font-semibold' htmlFor='selectCategory'>
          Choose category:{' '}
        </label>
        <select
          id='selectCategory'
          className='my-3 rounded border px-2 outline-none'
          onChange={(e) =>
            setAddingProduct((pre: any) => {
              return { ...pre, category: e.target.value };
            })
          }
        >
          {['burger', 'beverage'].map((cate, index) => (
            <option key={index} value={cate}>
              {cate}
            </option>
          ))}
        </select>
        <div className='mb-6 mt-3'>
          <label htmlFor='ratingProduct' className='font-semibold'>
            Ratings{' '}
            <span className='text-sm text-redColor'>(must be under 5.0)</span>
          </label>
          <Input
            id='ratingProduct'
            value={addingProduct?.ratings!}
            onChange={(e) => {
              setAddingProduct((pre: any) => {
                return {
                  ...pre,
                  ratings: e.target.value,
                };
              });
            }}
          />
        </div>
        <div className='mb-6 mt-3 flex flex-col'>
          <label htmlFor='descProduct' className='font-semibold'>
            Description <span className='text-sm text-redColor'>*</span>
          </label>
          <textarea
            id='descProduct'
            value={addingProduct?.description!}
            onChange={(e) =>
              setAddingProduct((pre: any) => {
                return { ...pre, description: e.target.value };
              })
            }
            className='border p-2 text-sm outline-none'
            required
          />
        </div>
        <div className='my-3'>
          <label className='font-semibold' htmlFor='addPrice'>
            Price <span className='text-sm text-redColor'>*</span>
          </label>
          <Input
            value={addingProduct?.price}
            id='addPrice'
            onChange={(e) =>
              setAddingProduct((pre: any) => {
                return {
                  ...pre,
                  price: e.target.value,
                };
              })
            }
            required
          />
        </div>
      </Modal>
    </>
  );
};

export default DashboardProducts;
