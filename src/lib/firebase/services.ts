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
import { AddTask, LoginUser, RegisterUser, Task } from "./interface";
import bcrypt from "bcrypt";
import { getMonth } from "@/utils/getMonth";

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
  try {
    if (tasks.length > 0) {
      console.log("ada task");
      // Task exists, update the document
      await updateDoc(doc(firestore, "task", tasks[0].id), {
        task: [...tasks[0].task, ...data.task],
      });
    } else {
      console.log("tidak ada task");
      // Task doesn't exist, create a new document
      await addDoc(collection(firestore, "task"), data);
    }
    return { status: 200, message: "Task berhasil di tambahkan" };
  } catch (error) {
    return { status: 400, error };
  }
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
      const filteredTasks = taskData[0].task;
      const fixTasks = filteredTasks.map((task: any) => {
        const date = new Date(task.createdAt);
        const month = getMonth(date.getMonth() + 1);
        return {
          ...task,
          createdAt: `created: ${date.getDate()} - ${month} - ${date.getFullYear()}`,
        };
      });
      return fixTasks;
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

export const deleteHist = async (data: { username: string; title: string }) => {
  const q = query(
    collection(firestore, "task"),
    where("username", "==", data.username)
  );
  try {
    const snapshot = await getDocs(q);
    const taskData: any = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const newTaskDone = taskData[0].taskDone.filter(
      (taskDone: any) => taskDone.title !== data.title
    );
    await updateDoc(doc(firestore, "task", taskData[0].id), {
      taskDone: newTaskDone,
    });
    return true;
  } catch (err) {
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
  const fixTasks = newTask.filter((task: any) => task.title !== data.title);
  const taskOke = newTask.filter((task: any) => task.title === data.title);
  taskOke.forEach((task: any) => {
    task.createdAt = new Date().toISOString();
  });
  try {
    await updateDoc(doc(firestore, "task", tasks[0].id), {
      task: fixTasks,
    });
    if (!tasks[0].taskDone) {
      await updateDoc(doc(firestore, "task", tasks[0].id), {
        taskDone: taskOke,
      });
    } else {
      await updateDoc(doc(firestore, "task", tasks[0].id), {
        taskDone: [...tasks[0].taskDone, ...taskOke] || "ada yang salah",
      });
    }
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
    const histData = tasks[0].taskDone;
    histData.forEach((hist: { title: string; createdAt: string }) => {
      const date = new Date(hist.createdAt);
      const month = getMonth(date.getMonth() + 1);
      hist.createdAt = `Done: ${date.getDate()} - ${month} - ${date.getFullYear()}`;
    });

    if (histData.length > 0) {
      return histData;
    } else {
      return "notfound";
    }
  } catch (error) {
    return false;
  }
};
