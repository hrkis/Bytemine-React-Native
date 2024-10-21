import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis,
  VictoryLegend,
  VictoryZoomContainer,
} from 'victory-native';
import React from 'react';
import normalize from 'react-native-normalize';

const LineChart = ({data}: {data: any}) => {
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      // containerComponent={<VictoryZoomContainer />}
    >
      <VictoryLegend
        x={50}
        y={20}
        centerTitle
        orientation="horizontal"
        gutter={20}
        data={[
          {name: 'Investment Results', symbol: {fill: '#3985b8'}},
          {name: 'Trade Results', symbol: {fill: '#d0afa6'}},
        ]}
      />
      <VictoryLine
        style={{
          data: {stroke: '#3985b8'},
          parent: {border: '1px solid #ccc'},
        }}
        data={data?.investment_array.map((item: number, index: number) => ({
          x: data['time_interval_array'][index],
          y: item,
        }))}
      />

      <VictoryLine
        style={{
          data: {stroke: '#d0afa6'},
          parent: {border: '1px solid #ccc'},
        }}
        data={data?.traded_data.map((item: number, index: number) => ({
          x: data['time_interval_array'][index],
          y: item,
        }))}
      />
      <VictoryAxis dependentAxis={true} />
      <VictoryAxis
        tickLabelComponent={
          <VictoryLabel
            angle={-60}
            dy={-10}
            dx={-13}
            style={{marginBottom: 50, fontSize: normalize(9)}}
          />
        }
        tickFormat={t => t.toString()?.substring(0, 10)}
      />
    </VictoryChart>
  );
};

export default LineChart;
