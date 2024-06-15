import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { firestore } from "../utils/firebaseConfig";
import HaikuCard from "../components/HaikuCard";
import { getUserById } from "../utils/auth";

const MasterpieceHaikuPage = () => {
  const [haikus, setHaikus] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const pageSize = 10;

  const fetchHaikus = async (lastDoc = null) => {
    const haikusCollectionRef = collection(firestore, "haikus");
    let q = query(
      haikusCollectionRef,
      where("isMasterpiece", "==", true),
      orderBy("createdAt"),
      limit(pageSize)
    );
    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }
    const haikusSnapshot = await getDocs(q);
    const haikusData = await Promise.all(
      haikusSnapshot.docs.map(async (doc) => {
        const haikuData = doc.data();
        const createdBy = await getUserById(haikuData.createdBy);
        return { id: doc.id, ...haikuData, createdBy: createdBy.username };
      })
    );
    setLastDoc(haikusSnapshot.docs[haikusSnapshot.docs.length - 1]);
    setHaikus(haikusData);
  };

  useEffect(() => {
    fetchHaikus();
  }, []);

  const handleNextPage = () => {
    fetchHaikus(lastDoc);
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>名作俳句</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {haikus.map((haiku) => (
          <HaikuCard key={haiku.id} haiku={haiku} />
        ))}
      </div>
      <div className='flex justify-end mt-4'>
        <button
          onClick={handleNextPage}
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          次のページ
        </button>
      </div>
    </div>
  );
};

export default MasterpieceHaikuPage;
