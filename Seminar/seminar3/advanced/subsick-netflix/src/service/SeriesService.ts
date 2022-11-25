const data = require("./../database/data.json");

const getSeries = async (seriesId: string) => {
    return data[seriesId];
};

const toMyList = async (seriesId: string) => {

    data[seriesId].toMyList = true;
    
    return data[seriesId];
};

const notMyList = async (seriesId: string) => {
    
    data[seriesId].toMyList = false;
    
    return data[seriesId];
};

const createEval = async (seriesId: string, evalId: string) => {
    
    data[seriesId].evalId = evalId;

    return data[seriesId];
};

export default {
    getSeries,
    toMyList,
    notMyList,
    createEval
};