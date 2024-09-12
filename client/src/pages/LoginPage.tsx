import React from "react";
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Signup from "../components/authentication/Signup";
import Login from "../components/authentication/Login";

const LoginPage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        justifyContent="center"
        display="flex"
        padding={3}
        bg="white"
        color="black"
        borderRadius="lg"
        borderWidth="1px"
        margin="40px 0 15px 0"
        w="100%"
      >
        <Text fontSize="4xl" color="black">
          WELCOME TO FCCP
        </Text>
      </Box>
      <Box
        padding={4}
        w="100%"
        bg="white"
        textColor="white"
        borderRadius="md"
        borderWidth={1}
      >
        <Tabs isFitted variant="enclosed" textColor="black">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default LoginPage;
