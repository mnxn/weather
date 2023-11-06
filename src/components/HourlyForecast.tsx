function HourlyForecast(props: { id?: string }) {
  return (
    <div
      className="bg-white rounded text-center flex justify-center items-center"
      id={props.id}
    >
      Hourly Forecast
    </div>
  );
}

export default HourlyForecast;
