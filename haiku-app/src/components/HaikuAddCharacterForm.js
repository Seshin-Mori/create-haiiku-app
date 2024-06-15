import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../utils/firebaseConfig";
import { getCurrentUser } from "../utils/auth";
import { validateCharacter } from "../utils/haikuUtils";

const HaikuAddCharacterPage = () => {
  const { haikuId } = useParams();
  const [haiku, setHaiku] = useState(null);
  const [character, setCharacter] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    const fetchHaiku = async () => {
      const haikuDocRef = doc(firestore, "haikus", haikuId);
      const haikuDoc = await getDoc(haikuDocRef);
      if (haikuDoc.exists()) {
        setHaiku(haikuDoc.data());
      } else {
        setError("俳句が見つかりません");
      }
    };

    fetchHaiku();
  }, [haikuId]);

  const handleAddCharacter = async () => {
    const validationError = validateCharacter(character);
    if (validationError) {
      setError(validationError);
      return;
    }

    const newContributions = [
      ...haiku.contributions,
      { character, contributedBy: user.userId, contributedAt: new Date() },
    ];
    const newContent = haiku.currentContent + character;
    const isComplete = newContent.length === 17;

    try {
      const haikuDocRef = doc(firestore, "haikus", haikuId);
      await updateDoc(haikuDocRef, {
        currentContent: newContent,
        contributions: newContributions,
        isComplete,
        updatedAt: new Date(),
      });
      navigate("/");
    } catch (err) {
      setError("文字の追加に失敗しました");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!haiku) {
    return <div>読み込み中...</div>;
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>俳句に文字を追加</h1>
      <p className='mb-4'>{haiku.currentContent}</p>
      <input
        type='text'
        placeholder='一文字追加'
        value={character}
        onChange={(e) => setCharacter(e.target.value)}
        className='w-full mb-4 p-2 border'
      />
      <button
        onClick={handleAddCharacter}
        className='w-full bg-blue-500 text-white p-2 rounded'
      >
        追加
      </button>
    </div>
  );
};

export default HaikuAddCharacterPage;
