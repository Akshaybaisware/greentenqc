import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Center } from "@chakra-ui/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Box, Input, VStack ,Text, Button } from "@chakra-ui/react";

function QcCheck() {
  const location = useLocation();
  const state = location.state;
  console.log(state, "statedata");

  const [correctCount, setCorrectCount] = useState(state.user.correctAssignmentCount);
  const [incorrectCount, setIncorrectCount] = useState(state.user.incorrectAssignmentCount);
  const [incorrectAssignments, setIncorrectAssignments] = useState([]);
  const[ifnotFilledanyFrom , setIfnotFilledAnyfform] = useState(false);
  const statecorrect = state.user.correctAssignmentCount;
  const stateincorrrect = state.user.incorrectAssignmentCount;
  const totalForms = 510;
console.log(statecorrect , "correct");
  // Calculate percentage for correct assignments
  const correctPercentage = (statecorrect / totalForms) * 100;

  // Data for the pie chart
  const data = [
    { name: "Correct Assignment", value: statecorrect },
    { name: "Incorrect Assignment", value: stateincorrrect },
  ];

  const COLORS = ["green", "red"];

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true  },
    { name: "Address", selector: (row) => row.address, sortable: true },
    { name: "Annual Revenue", selector: (row) => row.annualRevenue, sortable: true },
    { name: "Clean Code", selector: (row) => row.cleanCode, sortable: true },
    { name: "Job Functional", selector: (row) => row.jobFunctional, sortable: true },
    { name: "Pin Code", selector: (row) => row.pinCode, sortable: true },
    { name: "User ID", selector: (row) => row.userId, sortable: true },
  ];

  const renderTooltip = (props) => {
    const { payload } = props;
    if (payload && payload.length) {
      const { name, value } = payload[0];
      const formType = name === "Correct Assignment" ? "correct" : "incorrect";
      return (
        <div style={{ backgroundColor: "white", padding: "5px", border: "1px solid black" }}>
          <p>{`${formType} forms: ${value}`}</p>
        </div>
      );
    }
    return null;
  };

  const getIncorrectForms = async () => {
    const apiUrl = "https://zemixbe-production.up.railway.app/api";
    try {
      const incompleteAssignmentsResponse = await axios.post(`${apiUrl}/user/getreportbyid`, {
        id: state.userId,
      });
      console.log("incompleteAssignmentsResponse", incompleteAssignmentsResponse);
      setIncorrectCount(incompleteAssignmentsResponse.data.incorrectAssignmentCount);
    if(incompleteAssignmentsResponse.data.error === "User did not fill all Assignments"){
      setIfnotFilledAnyfform(true);
    }

    } catch (error) {
      console.error("Error fetching incorrect assignments", error);
    }
  };

  const getAllAssignments = async () => {
    try {
      const allAssignmentsResponse = await axios.get(
        "https://zemixbe-production.up.railway.app/api/assignment/getallassignments"
      );
      console.log("allAssignmentsResponse", allAssignmentsResponse);

      // Randomly select incorrect assignments
      const allAssignments = allAssignmentsResponse.data.assignments;
      const incorrectAssignmentsToShow = getRandomAssignments(allAssignments, stateincorrrect);
      setIncorrectAssignments(incorrectAssignmentsToShow);
    } catch (error) {
      console.error("Error fetching all assignments", error);
    }
  };

  // Function to get random assignments
  const getRandomAssignments = (assignments, count) => {
    const shuffled = assignments.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    getIncorrectForms();
    getAllAssignments();
  }, []);

  return (
    <div>
      <div
        style={{
          fontSize: "2rem",
          textAlign: "center",
          fontWeight: "700",
          color: "blue",
          margin : "1rem"
        }}
      >
        <Center
          style={{
            color: "teal",
            background: "#e6e6ff",
            display: "inline",
            padding: "5px",
            margin: "5px",

          }}
        >
          Cropton Services and Enterprises
        </Center>
          { ifnotFilledanyFrom ?
          <>
            <Center style={{color : "black" }}>
              Sorry You have not Filled any From
            </Center>
            <Center style={{ color: "red" }}>Sorry Your QC is Failed!</Center>
            </>
          :
          <>
        <Center style={{
          fontSize : "1.5rem",
          padding : "1rem"
        }}>QC Report - {correctPercentage.toFixed(2)}% Accuracy</Center>

<Text   style={{
              fontSize:"1rem",
                color:"#859c0f",}}>
              Name : { location ? state.user.name : localStorage.getItem("username")}

            </Text>
            <Text  style={{
                 fontSize:"1rem",
                 color:"#859c0f",}}>

              Mobile No : { location ? state.user.mobile : localStorage.getItem("usermobilenumber")}

            </Text>
            <Text  style={{
                 fontSize:"1rem",
                color:"#859c0f",}}>

              Email : {location ? state.user.email : localStorage.getItem("useremail")}
            </Text>

            <Text  style={{
                 fontSize:"1rem",
                color:"#859c0f",}}>

              Address : {location ? state.user.address : localStorage.getItem("useraddress")}
            </Text>

        <Center>
          <ResponsiveContainer width="80%" height={400}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="40%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`}  style={{fontSize : "1.2rem"}} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={renderTooltip} />
            </PieChart>
          </ResponsiveContainer>
        </Center>

        <Center style={{ color: "red" }}>Sorry Your QC is Failed!</Center>
        <hr style={{ backgroundColor: "gray", height: "2px", margin: "5px" }} />
        <Center>Incorrect Form: {stateincorrrect}</Center>

        <div style={{ margin: "20px" }}>
        <DataTable
          columns={columns}
          data={incorrectAssignments}
          pagination
          customStyles={{
            headCells: {
              style: {
                color: "red",
              },
            },

          }}
        />
      </div>
      </>
              }
      </div>
    </div>
  );
}

export default QcCheck;
