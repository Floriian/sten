export interface WeatherAPIResponse {
  address: string;
  resolvedAddress: string;
  days: [
    {
      temp: number;
      humidity: number;
    },
  ];
}
