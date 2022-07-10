import GradientLayout from "../../components/GradientLayout";
import SongsTable from "../../components/SongsTable";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";

const getBgColor = (id) => {
  const colors = ["red", "green", "blue", "purple", "yellow", "orange"];
  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};
const Playlist = ({ playlist }) => {
  const color = getBgColor(playlist.id);

  return (
    <GradientLayout
      color={color}
      roundedImage={false}
      subtitle="playlist"
      description="songs"
      image={`https://picsum.photos/400?random=${playlist.id}`}
      title={playlist.name}
    >
      <SongsTable songs={playlist.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  const { id } = validateToken(req.cookies.SPOTIFY_ACCESS_TOKEN) as any;
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    props: { playlist },
  };
};

export default Playlist;
