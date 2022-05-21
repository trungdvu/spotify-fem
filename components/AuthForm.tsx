import { Box, Flex, Input, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useSWRConfig } from "swr";
import { auth } from "../lib/muations";
import NextImage from "next/image";

interface Props {
  mode: "signin" | "signup";
}

const AuthForm: FC<Props> = ({ mode }) => {
  const [email, setEmail] = useState("user@test.com");
  const [password, setPassword] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await auth(mode, { email, password });

    setIsLoading(false);
    router.push("/");
  };

  return (
    <Box height="100vh" width="100vw" bg="black">
      <Flex
        direction="column"
        justify="center"
        align="center"
        height="calc(100vh - 100px)"
      >
        <Flex justify="center" align="center" height="100px">
          <NextImage src="/logo.png" height={42} width={132} />
        </Flex>
        <Box padding="50px" bg="gray.800" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            <Input
              value={email}
              textColor="white"
              borderColor="gray.500"
              marginBottom="12px"
              placeholder="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              value={password}
              textColor="white"
              borderColor="gray.500"
              marginBottom="12px"
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              bg="green.500"
              _hover={{ background: "green.400" }}
              _active={{ background: "green.300" }}
              _focus={{ background: "green.300" }}
              isLoading={isLoading}
            >
              {mode === "signin" ? "Sign in" : "Sign up"}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
