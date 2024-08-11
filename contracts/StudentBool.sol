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
