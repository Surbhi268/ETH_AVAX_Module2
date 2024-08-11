/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    abi: [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_age",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "_address",
            type: "address",
          },
          {
            internalType: "string",
            name: "_date",
            type: "string",
          },
        ],
        name: "addStudentInList",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
        ],
        name: "removestudent",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "returnstudentList",
        outputs: [
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "age",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "_address",
                type: "address",
              },
              {
                internalType: "string",
                name: "date",
                type: "string",
              },
            ],
            internalType: "struct StudentBook.student[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalRemoved",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalstudent",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
  },
};

export default nextConfig;
