function DailyForecast(props: { id?: string }) {
  return (
    <div
      className="bg-white rounded text-center flex justify-center items-center"
      id={props.id}
    >
      Daily Forecast
    </div>
  );
}

export default DailyForecast;
