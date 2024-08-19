# Module 2 ETH+AVAX INTERMEDIATE
In this I am creating a smart contract following the guidelines of module 2 of the project requirements.
In this project, I created a simple contract(StudentBook) with 2-3 functions. Then showing the values of those functions in frontend of the application.

## Description

![image](https://github.com/user-attachments/assets/6ad28ada-4e30-49c4-984c-2ded25b872d9)
This project involves the creation of a basic smart contract called "StudentBook" using Solidity. 
vedio walkthrough:

https://www.loom.com/share/81c6a4e5344f407785b740a59e45af98?sid=4b08165c-d31c-4b86-9b3e-9e5194589a37

![image](https://github.com/user-attachments/assets/f898e11d-0a97-4d00-9296-413eff861718)

Functionalities
- Owner Address Retrieval:
This function allows users to retrieve the address of the contract owner. It ensures transparency by displaying the address of the individual or entity that deployed the contract.
- Add student in the list
- Remove student from the list
- Show the total count of student from the list
- MetaMask is used to execute transactions and interact with the smart contract. Users can connect their MetaMask wallet to the application, allowing them to perform actions such as retrieving the owner address and checking the new added students record, no of total students, removed students securely and seamlessly.

Front-End Display:
A simple front-end interface is created to display the results of the interactions with the contract. Users can view the owner address and the total score directly from the web interface, providing a user-friendly experience.
![image](https://github.com/user-attachments/assets/732d7176-de9a-4373-bcc2-0bffa7cc4e1b)

These functionalities provide a straightforward way to interact with the contract, retrieve essential information, and track the progress of the cricket game, all while ensuring secure and transparent transactions through MetaMask.

## Getting Started

### Executing program
Step-by-step guide for executing the program:

1. **Compile and Deploy Smart Contract:**
   - Open Remix IDE.
   - Compile the smart contract code.
   - Deploy the contract.

2. **Copy Contract Details:**
   - Copy the deployed contract address.
   - Copy the ABI (Application Binary Interface).

3. **Integrate with Frontend:**
   - Open our frontend application (page.js).
   - Paste the deployed contract address into page.js.
   - Integrate the ABI into page.js.

4. **Write Functions:**
   - Write JavaScript functions in page.js to interact with the smart contract's functions.

5. **Run Next.js Application:**
   - Run the application using `npm run dev`.

6. **Connect and Interact:**
   - Open a browser and go to `http://localhost:3030`.
   - Connect the frontend application to MetaMask.
   - Call the contract functions and execute transactions via MetaMask.

These steps should help you set up and execute your program efficiently.

## CODE
Solidity CODE
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

contract StudentBook {
    address immutable OWNER;
    struct student {
        string name;
        uint age;
        address _address;
        string date;
    }
    mapping(address => uint) private studentCount;
    mapping(address => uint) private removedStudent;
    mapping(address => student[]) private studentList;

    modifier onlyOwner() {
        _onlyMe();
        _;
    }

    function _onlyMe() private view {
        require(OWNER == msg.sender, "Caller is not the owner");
    }

    constructor() {
        OWNER = msg.sender;
    }

    function addStudentInList(
        string memory _name,
        uint _age,
        address _address,
        string memory _date
    ) external {
        studentList[msg.sender].push(student(_name, _age, _address, _date));
        studentCount[msg.sender]++;
    }

    function returnstudentList() external view returns (student[] memory) {
        uint l = studentList[msg.sender].length;
        uint TotalstudentsRemaining = studentCount[msg.sender] -
            removedStudent[msg.sender];
        uint index = 0;

        student[] memory newstudentArray = new student[](
            TotalstudentsRemaining < 1 ? 0 : TotalstudentsRemaining
        );

        for (uint i = 0; i < l; i++) {
            student memory val = studentList[msg.sender][i];
            if (val._address != address(0)) {
                newstudentArray[index] = val;
                index++;
            }
        }
        return newstudentArray;
    }

    function removestudent(uint index) external {
        uint lastIndex = studentList[msg.sender].length;

        studentList[msg.sender][index] = studentList[msg.sender][lastIndex - 1];
        studentList[msg.sender].pop();

        removedStudent[msg.sender]++;
    }

    function totalstudent() external view returns (uint) {
        return studentCount[msg.sender] - removedStudent[msg.sender];
    }

    function totalRemoved() external view returns (uint) {
        return removedStudent[msg.sender];
    }
}

## Authors

Surbhi Priya

Email- psurbhi237@gmail.com

## License

This project is licensed under the MIT License 

