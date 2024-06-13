type RoomPageProps = {
  params: {
    roomId: string;
  };
};

const RoomPage = ({ params: { roomId } }: RoomPageProps) => {
  return (
    <main className="p-4">
      <h1 className="font-medium text-lg sm:text-xl break-all">Room {roomId}</h1>
    </main>
  );
};

export default RoomPage;
