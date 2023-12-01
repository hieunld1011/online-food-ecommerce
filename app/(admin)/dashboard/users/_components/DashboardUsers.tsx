'use client';

import { Input, Modal, Select, Table } from 'antd';

import { UsersProps } from '@/app/types/index.types';
import type { ColumnsType } from 'antd/es/table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';

interface DataType {
  key: React.Key;
  name: string | null;
  email: string;
  phone: string | null;
  role: string;
  numOfOrders: number;
  numOfReviews: number;
  createdAt: Date;
}

const userData = [
  {
    text: 'User',
    value: 'user',
  },
  {
    text: 'Admin',
    value: 'admin',
  },
  {
    text: 'Invalid',
    value: 'invalid',
  },
];

const DashboardUsers = () => {
  const rows: DataType[] = [];
  const [users, setUsers] = useState<UsersProps[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingUsers, setEditingUsers] = useState<DataType>();

  const fetchData = useCallback(async () => {
    const { data } = await axios.get('/api/users');
    setUsers(
      data.sort(
        (a: UsersProps, b: UsersProps) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    );
  }, []);

  const editData = async (record: DataType) => {
    await axios.patch(`/api/users/${record.key}`, editingUsers);
    await fetchData();
  };

  const deleteData = async (record: any) => {
    await axios.delete(`/api/users/${record.key}`);
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  users.forEach((user: UsersProps) => {
    let data = {
      key: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      numOfReviews: user.reviews.length,
      numOfOrders: user.orders.length,
      createdAt: user.created_at,
    };

    rows.push(data);
  });

  const resetEditing = () => {
    setIsEditing(false);
    setEditingUsers(undefined);
  };

  const handleEditClick = (record: DataType) => {
    setIsEditing(true);
    setEditingUsers({ ...record });
  };

  const handleDeleteClick = (record: DataType) => {
    Modal.confirm({
      title: `Are you sure ${
        record.role === 'invalid' ? 'DELETING' : 'INVALID'
      } this order?`,
      okText: 'Yes',
      okType: 'danger',
      onOk: () => {
        if (record.role === 'invalid') {
          return deleteData(record);
        }
        setEditingUsers(() => {
          return { ...record, role: 'invalid' };
        });
        editData(editingUsers!);
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: userData,
      onFilter: (value: any, record) => record.role?.indexOf(value) === 0,
      render: (value: string) => {
        return (
          <span
            className={clsx(
              `
              font-semibold`,
              value === 'user'
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
        onOk={() => {
          editData(editingUsers!);
          resetEditing();
        }}
      >
        <hr />
        <div className='mb-3 mt-6'>
          <label className='mt-6 font-semibold' htmlFor='editName'>
            Name
          </label>
          <Input
            value={editingUsers?.name!}
            onChange={(e) =>
              setEditingUsers((pre: any) => {
                return { ...pre, name: e.target.value };
              })
            }
            id='editName'
          />
        </div>
        <div className='mb-3 mt-6 flex flex-col'>
          <label className='font-semibold' htmlFor='editRole'>
            Role
          </label>
          <Select
            value={editingUsers?.role}
            onChange={(e) =>
              setEditingUsers((pre: any) => {
                return { ...pre, role: e };
              })
            }
            options={userData.map((data) => ({
              label: data.text,
              value: data.value,
            }))}
            id='editRole'
          />
        </div>
        <div className='mb-3 mt-6'>
          <label className='mt-6 font-semibold' htmlFor='editPhone'>
            Phone
          </label>
          <Input
            value={editingUsers?.phone!}
            id='editPhone'
            onChange={(e) =>
              setEditingUsers((pre: any) => {
                return { ...pre, phone: e.target.value };
              })
            }
          />
        </div>
      </Modal>
    </>
  );
};

export default DashboardUsers;
