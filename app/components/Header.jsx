import { assets } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';

const Header = () => {
    return(
        <div className=''>
            <Image src={assets.hikari} alt='' className='rounded-full w-32' />
        </div>
    );
}

export default Header;