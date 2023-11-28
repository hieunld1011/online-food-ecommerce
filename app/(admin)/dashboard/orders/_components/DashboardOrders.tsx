'use client';

import { Modal, Table, Input, DatePicker, Select } from 'antd';

import { OrdersProps } from '@/app/types/index.types';
import type { ColumnsType } from 'antd/es/table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';

interface DataType {
  key: React.Key;
  name: string | null;
  phone: string;
  notes: string | null;
  status: string | null;
  total: number;
  delivered: Date | null;
  createdAt: string;
}

const statusData = [
  {
    text: 'Processing',
    value: 'processing',
  },
  {
    text: 'Delivered',
    value: 'delivered',
  },
];

const DashboardOrders = () => {
  const rows: DataType[] = [];
  const [orders, setOrders] = useState<OrdersProps[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingOrder, setEditingProduct] = useState<DataType>();

  const fetchData = useCallback(async () => {
    const { data } = await axios.get('/api/order');
    setOrders(data);
  }, []);

  const deleteData = async (record: any) => {
    await axios.delete(`/api/order/${record.key}`);
    await fetchData();
  };

  const editData = async (record: DataType) => {
    await axios.patch(`/api/order/${record.key}`, editingOrder);
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  orders.forEach((order: OrdersProps) => {
    let data = {
      key: order.id,
      name: order.userOrder.name,
      address: order.address,
      phone: order.receivedPhone,
      notes: order.notes,
      status: order.status,
      total: order.total,
      delivered: order.deliveredTime,
      createdAt: order.created_at.toLocaleString().slice(0, 10),
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
      title: 'Name',
      width: 150,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 150,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
      width: 150,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      filters: statusData,
      onFilter: (value: any, record) => record.status?.indexOf(value) === 0,
    },
    {
      title: 'Deliver Time',
      dataIndex: 'delivered',
      key: 'delivered',
      width: 150,
      render: (record: DataType) => (
        <span>{record?.delivered?.toISOString()}</span>
      ),
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
      render: (record) => (
        <>
          <EditIcon
            className='cursor-pointer text-blue-500 hover:opacity-70'
            onClick={() => handleEditClick(record)}
          />
          <DeleteIcon
            className='cursor-pointer text-redColor hover:opacity-70'
            onClick={() => handleDeleteClick(record)}
          />
        </>
      ),
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
          editData(editingOrder!);
          resetEditing();
        }}
      >
        <hr />
        <div className='mb-3 mt-6'>
          <label className='mt-6 font-semibold' htmlFor='editReceivedPhone'>
            Received Phone
          </label>
          <Input
            value={editingOrder?.phone}
            onChange={(e) =>
              setEditingProduct((pre: any) => {
                return { ...pre, phone: e.target.value };
              })
            }
            id='editReceivedPhone'
          />
        </div>
        <div className='mb-3 mt-6 flex flex-col'>
          <label className='font-semibold' htmlFor='editStatus'>
            Status
          </label>
          <Select
            value={editingOrder?.status}
            onChange={(e) =>
              setEditingProduct((pre: any) => {
                return { ...pre, status: e };
              })
            }
            options={statusData.map((data) => ({
              label: data.text,
              value: data.value,
            }))}
            id='editStatus'
          />
        </div>
        <div className='mb-3 mt-6 flex flex-col'>
          <label className='font-semibold' htmlFor='editTime'>
            Delivered Time
          </label>
          <DatePicker
            value={dayjs(editingOrder?.delivered)}
            id='editTime'
            onChange={(e) =>
              setEditingProduct((pre: any) => {
                return { ...pre, delivered: e?.toDate() };
              })
            }
          />
        </div>
      </Modal>
    </>
  );
};

export default DashboardOrders;
