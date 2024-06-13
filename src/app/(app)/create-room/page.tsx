import CreateRoomForm from "@/components/app/CreateRoom/CreateRoomForm";

type CreateRoomPageProps = {};

const CreateRoomPage = ({}: CreateRoomPageProps) => {
  return (
    <main className="w-full h-full grid place-items-center">
      <CreateRoomForm />
    </main>
  );
};

export default CreateRoomPage;
