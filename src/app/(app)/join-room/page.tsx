import JoinRoomForm from "@/components/app/JoinRoom/JoinRoomForm";

type JoinRoomPageProps = {};

const JoinRoomPage = ({}: JoinRoomPageProps) => {
  return (
    <main className="w-full h-full grid place-items-center">
      <JoinRoomForm />
    </main>
  );
};

export default JoinRoomPage;
