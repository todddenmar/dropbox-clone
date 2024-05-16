import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ThemeToggler } from './ThemeToggler';

function Header() {
  return (
    <div className="flex items-center justify-between">
      <Link href={'/'} className="flex items-center space-x-2">
        <div className="bg-[#0160FE] w-fit p-2">
          <Image
            src={
              'https://www.shareicon.net/data/128x128/2015/11/08/668675_box_512x512.png'
            }
            alt="dropbox logo"
            className="invert "
            height={40}
            width={40}
          />
        </div>
        <span className="font-bold text-xl">Dropbox</span>
      </Link>
      <div className=" p-2 flex items-center space-x-2">
        <ThemeToggler />
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Header;
