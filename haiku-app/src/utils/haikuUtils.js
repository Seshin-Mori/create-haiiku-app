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
import { firestore } from "./firebaseConfig";
import { getUserById } from "./auth";

export const validateCharacter = (character) => {
  if (character.length !== 1) {
    return "文字は1文字で入力してください";
  }
  if (character.trim() === "") {
    return "空白文字は許容されません";
  }
  return null;
};

export const fetchHaikus = async (
  isComplete,
  order,
  lastDoc = null,
  pageSize = 10
) => {
  try {
    const haikusCollectionRef = collection(firestore, "haikus");
    let q = query(
      haikusCollectionRef,
      where("isComplete", "==", isComplete),
      orderBy("createdAt", order),
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
    return {
      haikusData,
      lastDoc: haikusSnapshot.docs[haikusSnapshot.docs.length - 1],
    };
  } catch (err) {
    throw new Error(err.message);
  }
};
