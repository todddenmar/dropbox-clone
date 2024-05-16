import DropzoneComponent from '@/components/DropzoneComponent';
import TableWrapper from '@/components/table/TableWrapper';
import { db } from '@/firebase';
import { FileType } from '@/typings';
import { auth } from '@clerk/nextjs/server';
import { collection, getDocs } from 'firebase/firestore';
import React from 'react';

async function DashboardPage() {
  const { userId } = auth();
  const docResults = await getDocs(collection(db, 'users', userId!, 'files'));
  const skeletonFiles: FileType[] = docResults?.docs.map((doc) => ({
    id: doc.id,
    filename: doc.data().filename,
    fullName: doc.data().fullName,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    downloadURL: doc.data().downloadURL,
    type: doc.data().type,
    size: doc.data().size,
  }));

  return (
    <div>
      <DropzoneComponent />
      <section className="container space-y-5">
        <h2>All Files</h2>
        <div>
          <TableWrapper skeletonFiles={skeletonFiles} />
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
