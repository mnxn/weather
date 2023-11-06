function CurrentWeather(props: { id?: string }) {
  return (
    <div
      className="bg-white rounded text-center flex justify-center items-center"
      id={props.id}
    >
      Current Weather
    </div>
  );
}

export default CurrentWeather;
