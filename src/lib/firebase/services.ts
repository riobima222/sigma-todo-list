import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./init";
import { AddTask, LoginUser, RegisterUser } from "./interface";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

//
// REGISTER UNTUK USER
export const registerUser = async (data: RegisterUser) => {
  const q1 = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );
  const q2 = query(
    collection(firestore, "users"),
    where("username", "==", data.username)
  );
  const snapshot2 = await getDocs(q2);
  const snapshot1 = await getDocs(q1);
  const user = snapshot1.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  const user2 = snapshot2.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  if (user.length > 0 || user2.length > 0) {
    return false;
  } else {
    data.role = "member";
    data.password = await bcrypt.hash(data.password, 10);
    await addDoc(collection(firestore, "users"), data);
    return true;
  }
};

//
// LOGIN USER
export const loginUser = async (data: LoginUser) => {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );
  const snapshot = await getDocs(q);
  const user = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  if (user.length > 0) {
    return user[0];
  } else {
    return false;
  }
};

//
// LOGIN GOOGLE
export const loginGoogle = async (data: any) => {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );
  const snapshot = await getDocs(q);
  const user = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  if (user.length > 0) {
    await updateDoc(doc(firestore, "users", user[0].id), data);
  } else {
    await addDoc(collection(firestore, "users"), data);
  }
};

//
// ADD TASK
export const addTask = async (data: AddTask) => {
  const q = query(
    collection(firestore, "task"),
    where("username", "==", data.username)
  );
  const snapshot = await getDocs(q);
  const tasks: any = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (tasks.length > 0) {
    // Task exists, update the document
    await updateDoc(doc(firestore, "task", tasks[0].id), {task: [...tasks[0].task, ...data.task]});
  } else {
    // Task doesn't exist, create a new document
    await addDoc(collection(firestore, "task"), data);
  }

  return { status: 200, message: "Task berhasil di tambahkan" };
};
