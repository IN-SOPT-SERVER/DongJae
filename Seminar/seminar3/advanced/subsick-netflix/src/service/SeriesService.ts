//const data = require("./../database/data.json");

const getSeries = async (seriesId: string) => {
    const data = require("./../database/data.json");
    return data[seriesId];
};

export default {
    getSeries,
};