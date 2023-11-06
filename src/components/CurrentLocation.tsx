function CurrentLocation(props: { id?: string }) {
  return (
    <div
      className="bg-white rounded text-center flex justify-center items-center"
      id={props.id}
    >
      Current Location
    </div>
  );
}

export default CurrentLocation;
