import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  startAfter,
  startAt,
} from "firebase/firestore";
import { firestore } from "../utils/firebaseConfig";
import HaikuCard from "../components/HaikuCard";
import { getUserById } from "../utils/auth";

const CompletedHaikuPage = () => {
  const [haikus, setHaikus] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [firstDoc, setFirstDoc] = useState(null);
  const [isNextPageAvailable, setIsNextPageAvailable] = useState(false);
  const pageSize = 10;

  const fetchHaikus = async (lastDoc = null, firstDoc = null) => {
    try {
      const haikusCollectionRef = collection(firestore, "haikus");
      let q = query(
        haikusCollectionRef,
        where("isComplete", "==", true),
        orderBy("createdAt"),
        limit(pageSize)
      );
      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }
      if (firstDoc) {
        q = query(q, startAt(firstDoc));
      }
      const haikusSnapshot = await getDocs(q);
      const haikusData = await Promise.all(
        haikusSnapshot.docs.map(async (doc) => {
          const haikuData = doc.data();
          const createdBy = await getUserById(haikuData.createdBy);
          return { id: doc.id, ...haikuData, createdBy: createdBy.username };
        })
      );
      setFirstDoc(haikusSnapshot.docs[0]);
      setLastDoc(haikusSnapshot.docs[haikusSnapshot.docs.length - 1]);
      setIsNextPageAvailable(haikusSnapshot.docs.length === pageSize);
      setHaikus(haikusData);
    } catch (error) {
      console.error("Error fetching haikus: ", error);
    }
  };

  useEffect(() => {
    fetchHaikus();
  }, []);

  const handleNextPage = () => {
    fetchHaikus(lastDoc);
  };

  const handlePreviousPage = () => {
    fetchHaikus(null, firstDoc);
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>完成した俳句一覧</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {haikus.map((haiku) => (
          <HaikuCard key={haiku.id} haiku={haiku} />
        ))}
      </div>
      <div className='flex justify-between mt-4'>
        <button
          onClick={handlePreviousPage}
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            !firstDoc ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!firstDoc}
        >
          前のページ
        </button>
        <button
          onClick={handleNextPage}
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            !isNextPageAvailable ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isNextPageAvailable}
        >
          次のページ
        </button>
      </div>
    </div>
  );
};

export default CompletedHaikuPage;
