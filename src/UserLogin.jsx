import React, { useState, useRef, useEffect } from "react";

// import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import { Box, Button, Center, Image, Input, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const username = useRef();
  const password = useRef();
  const toast = useToast();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleloginuser = async () => {
    setLoader(true);
    try {
      console.log("asd");
      const user = {
        email: username.current.value,
        password: password.current.value,
      };
      const response = await axios.post(
        "https://greentenbe-production.up.railway.app/api/user/login",
        // "http://localhost:5000/api/user/login",
        user
      );
      console.log(response.data , "Userlogin response");
      console.log(response)

    //   const endDate = new Date(response.data.user.endDate);
// const currentDate = new Date();
// console.log(endDate.getTime(), currentDate.getTime(), "dates");
// if (endDate.getTime() < currentDate.getTime()) {
//   console.log("in the redirect");
  // navigate("/qccheck", {
  //   state: response.data
  // });
//   return;
// }
      // if(response.data.message === "QUC Failed"){
      //   navigate("/qccheck");
      // }
      // if(response.data.user.status === "Freeze" ){
      //     navigate("/qccheck");
      // }

      if (response.data.message == "Login success..") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("usermobilenumber" , response.data.user.mobile);
        localStorage.setItem("username", response.data.user.name );
        localStorage.setItem("useraddress" , response.data.user.address);

        toast({
          title: "Login",
          description: "Login Successfully",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        // navigate("/");
        console.log(response.data , "data@@@");
        navigate("/qcreport", {
          state: response.data
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error in Login",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    } finally {
      setLoader(false);
    }
  };

  return loader ? (
    <Center height={"100vh"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  ) : (
    <>
      <Box
       bgGradient="linear(to-r, green.500, blue.500)" // Gradient from green to blue
       boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)" // Adding box shadow
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh" // Ensure the content takes up at least the full viewport height
      >
        <Box width={["300px", "500px"]} padding={"2rem"} bg={"white"}>
          <Center
            textAlign={"center"}
            color={"purple"}
            fontSize={"1.2rem"}
            fontWeight={"700"}
          >
            {/* Welcome back ! Log in to your account to Complete Your work */}
             Greenten Services Your QC is Ready plz Visit
          </Center>

          <Box
            display="flex"
            justifyContent={"center"}
            flexDirection="column"
            alignItems="center"
            textAlign={"center"}
            mt="20px"
          >
            <Box width="100%" mb="20px">
              <Input ref={username} placeholder="UserName" />
            </Box>
            <Box width="100%" mb="20px">
              <Input ref={password} placeholder="Password" />
            </Box>
            <Button
              height="3rem"
              width="40%"
              borderRadius="16px"
              color="white"
              background="#00ff1e"
              fontSize={["0.9rem", "1.3rem"]}
              fontWeight={700}
              fontFamily='"Poppins", sans-serif'
              mb="20px"
              _hover={{ background: "FloralWhite", color: "black" }}
              onClick={handleloginuser}
            >
              Log In
            </Button>

            <NavLink
              style={{ textDecoration: "none", width: "100%" }}
            ></NavLink>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default UserLogin;
