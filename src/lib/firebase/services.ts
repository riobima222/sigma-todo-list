import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./init";
import { AddTask, LoginUser, RegisterUser, Task } from "./interface";
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
    await updateDoc(doc(firestore, "task", tasks[0].id), {
      task: [...tasks[0].task, ...data.task],
    });
  } else {
    // Task doesn't exist, create a new document
    await addDoc(collection(firestore, "task"), data);
  }

  return { status: 200, message: "Task berhasil di tambahkan" };
};

//
// GET TASK
export const getTask = async (data: { username: string }) => {
  const q = query(
    collection(firestore, "task"),
    where("username", "==", data.username)
  );
  try {
    const snapshot = await getDocs(q);
    const taskData: any = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (taskData.length > 0) {
      const filteredTasks = taskData[0].task.filter(
        (task: any) => !task.isDone
      );
      return filteredTasks;
    } else return false;
  } catch (err) {
    console.log("Ini adalah error nya : ", err);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const deleteTask = async (data: { username: string; title: string }) => {
  const q = query(
    collection(firestore, "task"),
    where("username", "==", data.username)
  );
  const snapshot = await getDocs(q);
  const taskData: any = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const newData = taskData[0].task.filter(
    (task: Task) => task.title !== data.title
  );
  try {
    await updateDoc(doc(firestore, "task", taskData[0].id), {
      task: newData,
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const taskDone = async (data: { username: string; title: string }) => {
  const q = query(
    collection(firestore, "task"),
    where("username", "==", data.username)
  );
  const snapshot = await getDocs(q);
  const tasks: any = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const newTask = tasks[0].task;
  newTask.forEach((task: Task) => {
    if (task.title === data.title) {
      task.isDone = true;
    }
  });
  try {
    await updateDoc(doc(firestore, "task", tasks[0].id), {
      task: newTask,
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const getHist = async (data: { username: string }) => {
  const q = query(
    collection(firestore, "task"),
    where("username", "==", data.username)
  );
  try {
    const snapshot = await getDocs(q);
    const tasks: any = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const histData = tasks[0].task.filter((task: Task) => task.isDone);

    if (histData.length > 0) {
      return histData;
    } else {
      return "notfound";
    }
  } catch (error) {
    return false;
  }
};
