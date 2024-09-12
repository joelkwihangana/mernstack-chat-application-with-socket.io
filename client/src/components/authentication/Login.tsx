import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Login: React.FC = () => {
  // Form data state
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );

  // State for show/hide password
  const [showPassword, setShowPassword] = useState(false);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing="5px">
        <FormControl isRequired mt={4}>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <InputRightElement w="fit-content">
              <Button
                h="1.5rem"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button mt={6} width="100%" colorScheme="blue" type="submit">
          Login
        </Button>
      </VStack>
    </form>
  );
};

export default Login;
