import { IoFastFoodOutline } from 'react-icons/io5';
import { PiHamburger } from 'react-icons/pi';
import { MdOutlineLocalDrink } from 'react-icons/md';
import juiceImage from '@/app/assets/products/product_juice.png';
import burgerImage from '@/app/assets/products/product_burger.png';
import allImage from '@/app/assets/products/product_all.png';
import { IconType } from 'react-icons';
import { StaticImageData } from 'next/image';

export const categoryLists = [
    {
        icon:IoFastFoodOutline as IconType,
        img:allImage as StaticImageData,
        title:'All' as string,
        filterCate:'all' as categoProps
    },
    {
        icon:PiHamburger as IconType,
        img:burgerImage as StaticImageData,
        title:'Burger' as string,
        filterCate:'burger' as categoProps
    },
    {
        icon:MdOutlineLocalDrink as IconType,
        img:juiceImage as StaticImageData,
        title:'Drinks' as string,
        filterCate:'beverage' as categoProps
    },
]

export type categoProps = 'all' | 'burger' | 'beverage';