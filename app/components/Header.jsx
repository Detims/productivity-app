import { assets } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';

const Header = () => {
    return(
        <div className='w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50'>
            <Image src={assets.hikari} alt='' className='rounded-full w-32' />
        </div>
    );
}

export default Header;