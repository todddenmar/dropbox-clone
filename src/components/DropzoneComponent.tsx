'use client';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { db, storage } from '@/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

function DropzoneComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, isLoaded, isSignedIn } = useUser();
  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadPost = async (selectedFile: File) => {
    if (isLoading) return;
    if (!user) return;

    setIsLoading(true);
    const docRef = await addDoc(collection(db, 'users', user.id, 'files'), {
      userId: user.id,
      filename: selectedFile.name,
      fullName: user.fullName,
      profileImg: user.imageUrl,
      timestamp: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size,
    });

    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);
    await uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, 'users', user.id, 'files', docRef.id), {
        downloadURL: downloadURL,
      });
    });
    setIsLoading(false);
  };
  //max size is 20MB
  const maxSize = 20971520;
  return (
    <Dropzone
      minSize={0}
      maxSize={maxSize}
      onDrop={(acceptedFiles) => onDrop(acceptedFiles)}
    >
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
        return (
          <section className="m-4">
            <div
              {...getRootProps()}
              className={cn(
                'w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center',
                isDragActive
                  ? 'bg-blue-500 text-white animate-pulse'
                  : 'bg-slate-100/20'
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && 'Click here or drop a file to upload!'}
              {isDragActive && !isDragReject && 'Drop to upload this file!'}
              {isDragReject && 'File type not accepted, sorry!'}
              {isFileTooLarge && (
                <div className="text-destructive mt-2">File is too large</div>
              )}
            </div>
          </section>
        );
      }}
    </Dropzone>
  );
}

export default DropzoneComponent;
