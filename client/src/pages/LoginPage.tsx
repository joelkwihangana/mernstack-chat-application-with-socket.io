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
          FCCP | Login Page
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
            <Tab>One</Tab>
            <Tab>Two</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default LoginPage;
