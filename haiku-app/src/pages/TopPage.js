import React, { useEffect, useState } from "react";
import { fetchHaikus } from "../utils/haikuUtils";
import HaikuCard from "../components/HaikuCard";

const TopPage = () => {
  const [haikus, setHaikus] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [error, setError] = useState("");
  const [isNextPageAvailable, setIsNextPageAvailable] = useState(false);
  const pageSize = 10;

  const loadHaikus = async (lastDoc = null) => {
    try {
      const { haikusData, lastDoc: newLastDoc } = await fetchHaikus(
        false,
        "asc",
        lastDoc,
        pageSize
      );
      setHaikus(haikusData);
      setLastDoc(newLastDoc);
      setIsNextPageAvailable(haikusData.length === pageSize);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadHaikus();
  }, []);

  const handleNextPage = () => {
    loadHaikus(lastDoc);
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>作成中の俳句一覧</h1>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {haikus.map((haiku) => (
          <HaikuCard key={haiku.id} haiku={haiku} />
        ))}
      </div>
      <div className='flex justify-between mt-4'>
        <button
          onClick={() => loadHaikus(null)}
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          最初のページ
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

export default TopPage;
