import { IconType } from 'react-icons';
import feature1 from '../assets/home/feature/feature-img-1.jpg';
import feature2 from '../assets/home/feature/feature-img-2.jpg';
import feature3 from '../assets/home/feature/feature-img-3.jpg';
import cusomter1 from '../assets/home/testimonial-1.jpg';
import cusomter2 from '../assets/home/testimonial-2.jpg';
import cusomter3 from '../assets/home/testimonial-3.jpg';
import { FaFacebookF, FaVimeoV, FaTwitter, FaTumblr } from 'react-icons/fa';
import { LuPhone } from 'react-icons/lu';
import { PiEnvelope } from 'react-icons/pi';
import { SlLocationPin } from "react-icons/sl";

export const featureOffers = [
  {
    img: feature1,
    title: 'Chicken Pizaa' as string,
    desc: 'Chicken piza with spinach arugula pea tatsoi aubergine spring onion' as string,
  },
  {
    img: feature2,
    title: 'Chicken Burger' as string,
    desc: 'Water spinach burgar arugula pea tatsoi aubergine spring onion' as string,
  },
  {
    img: feature3,
    title: 'Chicken Juices' as string,
    desc: 'Fresh juice with arugula pea tatsoi aubergine from the austrilia' as string,
  },
];

export const customerReviewLists = [
  {
    img:cusomter1,
    name:"Bithi Broucs" as string,
    address:'New York City' as string,
    desc:`Good food, very filling for the price. One of my favorite
    locations for burgers.` as string,
    review:'Awesomefood!' as string
  },
  {
    img:cusomter2,
    name:"Liton Ahmed" as string,
    address:'Dubai City' as string,
    desc:`Good food, very filling for the price. One of my favorite
    locations for burgers.` as string,
    review:'Really good!' as string
  },
  {
    img:cusomter3,
    name:"Abu Taleb" as string,
    address:'Peiking City' as string,
    desc:`Good food, very filling for the price. One of my favorite
    locations for burgers.` as string,
    review:'Naisu!' as string
  },
]

export const menuListButton = [
  {
    color:'greenColor' as string,
    title:'Burger Menu 1' as string,
    number:1 as  number
  },
  {
    color:'yellowColor' as string,
    title:'Burger Menu 2' as string,
    number:2 as  number
  },
  {
    color:'greenColor' as string,
    title:'Juice Menu' as string,
    number:3 as  number
  },
]

export const mediaLinks = [
  {
    icon:FaFacebookF as IconType,
    href:'#'
  },
  {
    icon:FaVimeoV as IconType,
    href:'#'
  },
  {
    icon:FaTwitter as IconType,
    href:'#'
  },
  {
    icon:FaTumblr as IconType,
    href:'#'
  },
]

export const contactInfo = [
  {
    icon:LuPhone as IconType,
    title:'Phone' as string,
    upContent:'(+65) - 48596 - 5789' as string,
    lowContent:'+65-48596-5789' as string
  },
  {
    icon:PiEnvelope as IconType,
    title:'Email' as string,
    upContent:'info@pizzer.com' as string,
    lowContent:'info.example@gmail.com' as string
  },
  {
    icon:SlLocationPin as IconType,
    title:'Location' as string,
    upContent:'1403 Washington Ave' as string,
    lowContent:'LA 70130, United States' as string
  },
]