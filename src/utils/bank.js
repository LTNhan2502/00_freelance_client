import instance from "./axios.config";

const createBank = ( nameBank, userBank,  numberBank, userId) => {
    const URL_API = "/v1/api/bank";
    const data = { nameBank, userBank,  numberBank, userId }
    return instance.post(URL_API, data);
}

const getBankByUserId = (userId) => {
    const URL_API = "/v1/api/getBankByUserId";
    const data = { userId }
    return instance.post(URL_API, data);
}

const reqWithdrawal = (userId, moneyOut, statusWithdraw) => {
    const URL_API = "/v1/api/reqWithdrawal";
    const data = { userId, moneyOut, statusWithdraw }
    return instance.post(URL_API, data);
}

const reqDeposit = (userId, deposit, statusDeposit) => {
    const URL_API = "/v1/api/reqDeposit";
    const data = { userId, deposit, statusDeposit }
    return instance.post(URL_API, data);
}

const getAllHistoryBank = () => {
    const URL_API = "/v1/api/history_money";
    return instance.get(URL_API);
}

export { createBank, getBankByUserId, reqWithdrawal, reqDeposit, getAllHistoryBank }