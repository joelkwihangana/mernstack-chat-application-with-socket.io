import { useToast } from "@chakra-ui/react";

const useCustomToast = () => {
  const toast = useToast();

  const showToast = (
    title: string,
    description: string,
    status: "error" | "success"
  ) => {
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  return { showToast };
};

export default useCustomToast;
