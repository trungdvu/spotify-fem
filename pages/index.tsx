import { Box, Flex, Image, Text } from "@chakra-ui/react";
import GradientLayout from "../components/GradientLayout";
import { useMe } from "../lib/hooks";
import prisma from "../lib/prisma";

const Home = ({ artists }) => {
  const { user } = useMe();

  return (
    <GradientLayout
      roundedImage
      color="red"
      subtitle="profile"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistsCount} public playlists`}
      image="https://placedog.net/500"
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artists this month
          </Text>
          <Text fontSize="sm">only visible to you</Text>
        </Box>
        <Flex gap="20px">
          {artists.map((artist) => (
            <Box bg="gray.900" borderRadius="4px" padding="12px" width="15%">
              <Image src="https://placedog.net/300/300" rounded="full" />
              <Box marginTop="20px">
                <Text fontSize="medium">{artist.name}</Text>
                <Text fontSize="xs">Artist</Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});

  return {
    props: { artists },
  };
};

export default Home;
