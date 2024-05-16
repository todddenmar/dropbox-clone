'use client';
import Link from 'next/link';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/firebase';
import { useEffect, useState } from 'react';
import Image from 'next/image';
export default function Home() {
  // Create a reference under which you want to list
  const listRef = ref(storage, 'users/user_2fiPF6f9GTc4EW2Okn8CdGxipGi/files');
  const [images, setImages] = useState<string[] | null>(null);
  const getImages = async () => {
    const files = await listAll(
      ref(storage, 'users/user_2fiPF6f9GTc4EW2Okn8CdGxipGi/files')
    );
    const storageImages = await Promise.all(
      files.items.map(async (imgs) => {
        console.log(imgs);
        const url = await getDownloadURL(imgs);
        return url;
        // imgs.forEach(async (val) => {
        //   const url = await getDownloadURL(val);
        //   console.log({ url });
        //   storageImages.push(url);
        // });
      })
    );
    setImages(storageImages);
  };
  useEffect(() => {
    getImages();
  }, [storage]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center space-y-2">
        <h1>Dropbox Clone</h1>
        <Link
          href={'/dashboard'}
          className="dark:bg-white bg-slate-800 text-white dark:text-black px-4 py-2 rounded-md text-sm"
        >
          Start now for free
        </Link>
        {images?.map((item, idx) => {
          return (
            <Image
              key={`image-${idx}`}
              src={item}
              alt="storage images"
              width={500}
              height={500}
            />
          );
        })}
      </div>
    </main>
  );
}
