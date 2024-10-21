export const BASE_URL = 'https://app.mktdynamics.com/';

export const apiConstants = {
  LOGIN: BASE_URL + 'web/login',
  SOCIAL_LOGIN: BASE_URL + 'web/social_login',
  SEARCH_STRATEGY: BASE_URL + 'web/search_strategy',
  GET_SYMBOLS: BASE_URL + 'api/get_multiple_stock_logos',
  VIEW_VIRTUAL_ORDER_BOOK: BASE_URL + 'web/view_virtual_strategy_order_book',
  DEPLOY_STRATEGY: BASE_URL + 'web/deploy_virtual_strategy',
  UNDEPLOY_STRATEGY: BASE_URL + 'web/undeploy_virtual_strategy',
  VIRTUAL_WALLET_DETAILS: BASE_URL + 'web/virtual_wallet_details',
  GET_EMAIL_PREFERENCES: BASE_URL + 'web/get_email_preferences',
  SET_EMAIL_PREFERENCES: BASE_URL + 'web/email_preferences',
  GET_AVERAGE_MATRICS: BASE_URL + 'web/get_avg_backtest_metrics',
  SAVE_ADDONS: BASE_URL + 'web/save_addons',
  GET_ALL_BROKERS: BASE_URL + 'web/get_all_brokers',
  GET_AGGREGATED_TESTS: BASE_URL + 'web/get_aggregated_forward_test_stats',
  SAVE_API_KEYS: BASE_URL + 'web/broker_save_api_keys',
  DEPLOY_STRTEGY_LIVE: BASE_URL + 'web/deploy_strategy_live',
  GET_FORK_STRATEGIES: BASE_URL + 'web/get_fork_strategies',
  GET_COPY_STRATEGIES: BASE_URL + 'web/get_copy_strategies',
  GET_COPY_STRATEGY_DETAILS: BASE_URL + "mobile/load_canvas_web_view/"
};
