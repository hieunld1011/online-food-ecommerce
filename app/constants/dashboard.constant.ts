import {
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers
} from 'react-icons/hi'
import { PATH_DASHBOARD_ORDERS, PATH_DASHBOARD_PRODUCTS, PATH_DASHBOARD_USERS } from '../routes/router.path'

export const dashboardLinks= [
	{
		label: 'Products',
		path: PATH_DASHBOARD_PRODUCTS,
		icon: HiOutlineCube
	},
	{
		label: 'Orders',
		path: PATH_DASHBOARD_ORDERS,
		icon: HiOutlineShoppingCart
	},
	{
		label: 'Users',
		path: PATH_DASHBOARD_USERS,
		icon: HiOutlineUsers
	},
]