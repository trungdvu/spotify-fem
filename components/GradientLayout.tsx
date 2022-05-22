import { Box, Flex, Text, Image } from "@chakra-ui/react";
import React from "react";

const GradientLayout = ({
  children,
  color,
  image,
  subtitle,
  title,
  description,
  roundedImage,
}) => {
  return (
    <Box
      height="100%"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex bg={`${color}.600`} padding="40px" align="end">
        <Box padding="20px">
          <Image
            src={image}
            boxSize="160px"
            boxShadow="2xl"
            borderRadius={roundedImage ? "100%" : "3px"}
          />
        </Box>
        <Box padding="20px" lineHeight="40px" color="white">
          <Text fontSize="xs" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="6xl">{title}</Text>
          <Text fontSize="sm">{description}</Text>
        </Box>
      </Flex>
      <Box paddingY="50px">{children}</Box>
    </Box>
  );
};

export default GradientLayout;
