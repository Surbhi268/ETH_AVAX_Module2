"use client";
import Image from "next/image";
import FriendComponent from "./Components/FriendComponent";
import { useState } from "react";
import { ethers } from "ethers";
import { useEffect } from "react";

export default function Home() {
  const [acc, setAcc] = useState();

  const contractAddress = "0x7544E92C8AEC387D3ceE80E4533Da2D99e26C1d8";

  const [contractInstance, setContractInstance] = useState();

  const tokenAbi = process.env.abi;

  //-----------------------------------
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [address, setAddress] = useState();
  const [date, setDate] = useState();

  //------------------------------------

  const [ethWindow, setEthWindow] = useState(null);

  //--------------------------------------
  const [studentList, setStudentList] = useState();

  //---------------------------------------

  const [studentNumber, setStudentNumber] = useState(undefined);
  const [removedStudent, setRemovedStudent] = useState(undefined);

  const initialize = async () => {
    if (window.ethereum) {
      console.log("Metamask is installed");
      setEthWindow(window.ethereum);
    }

    if (ethWindow) {
      const accountsArray = await ethWindow.request({ method: "eth_accounts" });
      setAcc(accountsArray[0]);
      console.log(accountsArray[0]);
    }
    ConnectToMetamask();
  };

  const ConnectToMetamask = async () => {
    if (ethWindow) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAcc(accounts[0]);
    }

    // connectToMetaMask();
  };

  //--------------------------------------

  const disconnectWallet = () => {
    setAcc(undefined);
    setContractInstance(undefined);
  };

  const connectToMetaMaskContract = async () => {
    try {
      console.log(tokenAbi);

      const provider = new ethers.BrowserProvider(window.ethereum);

      const signer = await provider.getSigner();

      // Create a new instance of the contract with the signer
      const contract = new ethers.Contract(contractAddress, tokenAbi, signer);
      setContractInstance(contract);
      console.log(contract);
    } catch (error) {
      console.error("User rejected the request:", error);
    }
  };

  const getNumberOfStudent = async () => {
    try {
      if (contractInstance) {
        const girlStudentNumber = await contractInstance.totalstudent();
        setStudentNumber(parseInt(girlStudentNumber));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getNumberOfRemovedStudent = async () => {
    try {
      if (contractInstance) {
        const girlsRemoved = await contractInstance.totalRemoved();
        setRemovedStudent(girlsRemoved);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllStudent = async () => {
    try {
      console.log("this is being called");
      const list = await contractInstance.returnstudentList();
      setStudentList(list);
      console.log(studentList);
    } catch (error) {
      console.log(error);
    }
  };

  const removeStudent = async (index) => {
    try {
      if (contractInstance) {
        const res = await contractInstance.removestudent(index);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addStudent = async () => {
    try {
      if (contractInstance) {
        console.table([name, parseInt(age), address, date]);
        const res = await contractInstance.addStudentInList(
          name,
          parseInt(age),
          address,
          date
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (studentList == undefined) {
    getAllStudent();
  }

  if (studentNumber == undefined) {
    getNumberOfStudent();
  }

  if (removedStudent == undefined) {
    getNumberOfRemovedStudent();
  }

  useEffect(() => {
    async function Operation() {
      await initialize();
    }
    Operation();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(./hostel.jpg)`,
        backgroundSize: "fill",
      }}
      className="bg-black h-full "
    >
      <div className="grid m-10">
        <div className=" flex justify-center">
          <p className="text-[2rem]  font-extrabold ">Heritage Hostel </p>
        </div>
        <div>
          <button
            className="bg-black px-3 py-2 rounded-md my-2"
            onClick={() => connectToMetaMaskContract()}
          >
            Connect to Metamask
          </button>
        </div>
        <div>
          <button
            className="bg-black px-3 py-2 rounded-md my-2"
            onClick={() => disconnectWallet()}
          >
            Disconnect Wallet
          </button>
        </div>
      </div>
      <div className="justify-between border-gray-600 border-2 px-3 py-4 grid grid-cols-2">
        {/* <div className="w-52 flex justify-center align-middle ml-48"> */}
        <div className=" bg-black px-10 py-5 rounded-xl grid-cols-1 ">
          {studentList &&
            studentList.map((eachStudent, index) => (
              <FriendComponent
                key={index}
                index={index}
                name={eachStudent.name}
                age={eachStudent.age}
                address={eachStudent._address}
                date={eachStudent.date}
                removeStudent={removeStudent}
              />
            ))}
          {studentNumber && <p>Total Student : {studentNumber}</p>}
        </div>

        <div className="w-full">
          <div className=" bg-transparent text-white grid-cols-2">
            <form className="grid bg-transparent px-20 py-10  col-start-1 col-end-3  rounded-xl">
              <div className="flex justify-center mb-5">
                <p className="text-2xl font-bold text-white text-transparent">
                  Add Student
                </p>
              </div>
              <label className="grid col-start-1 col-end-1 text-black">
                Enter the Name
              </label>
              <input
                className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5 outline-none focus:outline-black focus:scale-110"
                required
                placeholder="Enter the Name"
                onChange={(e) => setName(e.target.value)}
              />
              <label className="grid col-start-1 col-end-1 text-rose-700 ">
                Enter the Age
              </label>
              <input
                className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5 outline-none focus:outline-black focus:scale-110"
                required
                placeholder="Enter the age"
                onChange={(e) => setAge(e.target.value)}
              />
              <label className="grid col-start-1 col-end-1 text-rose-700">
                Enter the Address
              </label>
              <input
                className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5 outline-none focus:outline-black focus:scale-110"
                required
                placeholder="Enter the Address"
                onChange={(e) => setAddress(e.target.value)}
              />
              <label
                className="grid col-start-1 col-end-1 text-rose-700 "
                placeholder="Choose Date"
              >
                Choose Date
              </label>
              <input
                className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5 outline-none focus:outline-black focus:scale-110"
                required
                onChange={(e) => setDate(e.target.value)}
                type="date"
              />
            </form>

            <div className="flex justify-center col-span-2 items-center py-5">
              <button
                className="bg-blue-900 p-5 rounded-xl hover:bg-rose-900"
                onClick={() => addStudent()}
              >
                Add Student
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
