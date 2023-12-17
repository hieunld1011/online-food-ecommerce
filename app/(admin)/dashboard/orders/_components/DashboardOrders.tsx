'use client';

import { Modal, Table, Input, DatePicker, Select } from 'antd';

import { OrdersProps } from '@/app/types/index.types';
import type { ColumnsType } from 'antd/es/table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import clsx from 'clsx';
import handleAxiosError from '@/app/utils/axiosError';
import { toast } from 'react-toastify';

interface DataType {
  key: React.Key;
  name: string | null;
  phone: string;
  notes: string | null;
  status: string | null;
  total: number;
  delivered: Date | null;
  createdAt: Date;
}

const DataTypeInit = {
  key: '',
  name: '',
  notes: '',
  phone: '',
  status: '',
  total: 0,
  delivered: new Date(Date.now()),
  createdAt: new Date(Date.now()),
};

const statusData = [
  {
    text: 'Invalid',
    value: 'invalid',
  },
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
  const [editingOrder, setEditingProduct] = useState<DataType>(DataTypeInit);

  const fetchData = useCallback(async () => {
    await axios
      .get('/api/order')
      .then((res) => {
        const { data } = res;
        setOrders(
          data.sort(
            (a: OrdersProps, b: OrdersProps) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
        );
      })
      .catch((err) => handleAxiosError(err));
  }, []);

  const deleteData = async (record: any) => {
    await axios
      .delete(`/api/order/${record.key}`)
      .then((res) => {
        if (res.status === 200) toast.success('Order deleted successfully');
      })
      .catch((err) => handleAxiosError(err));
    await fetchData();
  };

  const editData = async (record: DataType) => {
    await axios
      .patch(`/api/order/${record.key}`, record)
      .then((res) => {
        if (res.status === 200) toast.success('Order updated successfully');
      })
      .catch((err) => handleAxiosError(err));
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
      createdAt: order.created_at,
    };

    rows.push(data);
  });

  const resetEditing = () => {
    setIsEditing(false);
    setEditingProduct(DataTypeInit);
  };

  const handleEditClick = (record: DataType) => {
    setIsEditing(true);
    setEditingProduct({ ...record });
  };

  const handleDeleteClick = (record: DataType) => {
    Modal.confirm({
      title: `Are you sure ${
        record.status === 'invalid' ? 'DELETING' : 'INVALID'
      } this order?`,
      okText: 'Yes',
      okType: 'danger',
      onOk: () => {
        if (record.status === 'invalid') {
          return deleteData(record);
        }
        editData({ ...record, status: 'invalid' });
      },
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
      responsive: ['lg'],
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      align: 'center',
      sorter: (a, b) => a.total - b.total,
      render: (value: number) => {
        return '$' + value.toFixed(2);
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: statusData,
      onFilter: (value: any, record) => {
        if (!value) return false;
        return record.status?.indexOf(value) === 0;
      },
      render: (value: string) => {
        return (
          <span
            className={clsx(
              `
              font-semibold`,
              value === 'processing'
                ? 'text-yellowColor'
                : value === 'invalid'
                ? 'text-redColor'
                : 'text-greenColor'
            )}
          >
            {value}
          </span>
        );
      },
    },
    {
      title: 'Deliver Time',
      dataIndex: 'delivered',
      key: 'delivered',
      sorter: (a, b) => {
        if (!a.delivered || !b.delivered) return 0;
        return a.delivered.getTime() - b.delivered.getTime();
      },
      render: (value: Date) => {
        return value?.toLocaleString().slice(0, 10);
      },
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      responsive: ['lg'],
      render: (value: Date) => {
        return value?.toLocaleString().slice(0, 10);
      },
    },
    {
      title: 'Action',
      key: 'operation',
      align: 'center',
      fixed: 'right',
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
        scroll={{ x: true }}
        className='max-w-[300px] md:max-w-[550px] lg:max-w-full'
      />
      <Modal
        title='Edit Product'
        open={isEditing}
        okText='Save'
        onCancel={() => resetEditing()}
        onOk={async () => {
          await editData(editingOrder);
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
