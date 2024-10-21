import {getStockLogo} from '../services/strategiesService';

export const formatStrategy = (res: any) => {
  let arrData = res.strategies.map((item: any) => ({
    ...item,
    win: res?.metrics[item?.strategy_id],
  }));

  // const newArrData = arrData.map(async (i: any) => {
  //   const res = await getStockLogo(i?.symbol);
  //   console.log('i symbol', i?.symbol, res);
  // });
  // console.log('newArrData', newArrData);
  // .filter((i: any) => i?.is_valid);

  return [
    ...arrData.filter((i: any) => i?.forward_test_status === 'pending'),
    ...arrData.filter((i: any) => i?.forward_test_status !== 'pending'),
  ];
};
