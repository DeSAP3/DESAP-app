export type History = {
    analyzeId: number;
    date: string;
    eggsNum: number;
    larvaeNum: number;
    mosquitoNum: number;
    analyzeResult: string;
};

const range = (len: number) => {
	const arr = [];
	for (let i = 0; i < len; i++) {
		arr.push(i);
	}
	return arr;
};

const newHistory = (): History => {
    const eggsNum = Math.random();
    const larvaeNum = Math.random();
    const mosquitoNum = Math.random();
    return {
        analyzeId: 1001,
        date: "2021-05-01",
        eggsNum: eggsNum,
        larvaeNum: larvaeNum,
        mosquitoNum: mosquitoNum,
        analyzeResult: "www.google.com",
    };
}

export function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): History[] => {
        const len = lens[depth];
        return range(len).map((d) => {
            return {
                ...newHistory(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
            };
        });
    };

    return makeDataLevel();
}

export const data = [
	{
		analyzeId: 1001,
		date: "2021-05-01",
		eggsNum: 153,
		larvaeNum: 53426,
		mosquitoNum: 132,
		analyzeResult: "www.google.com",
	},
	{
		analyzeId: 1002,
		date: "2021-05-02",
		eggsNum: 312,
		larvaeNum: 6425,
		mosquitoNum: 645,
		analyzeResult: "www.google.com",
	},
	{
		analyzeId: 1001,
		date: "2021-05-01",
		eggsNum: 153,
		larvaeNum: 53426,
		mosquitoNum: 132,
		analyzeResult: "www.google.com",
	},
	{
		analyzeId: 1002,
		date: "2021-05-02",
		eggsNum: 312,
		larvaeNum: 6425,
		mosquitoNum: 645,
		analyzeResult: "www.google.com",
	},
	{
		analyzeId: 1001,
		date: "2021-05-01",
		eggsNum: 153,
		larvaeNum: 53426,
		mosquitoNum: 132,
		analyzeResult: "www.google.com",
	},
	{
		analyzeId: 1002,
		date: "2021-05-02",
		eggsNum: 312,
		larvaeNum: 6425,
		mosquitoNum: 645,
		analyzeResult: "www.google.com",
	},
	{
		analyzeId: 1001,
		date: "2021-05-01",
		eggsNum: 153,
		larvaeNum: 53426,
		mosquitoNum: 132,
		analyzeResult: "www.google.com",
	},
	{
		analyzeId: 1002,
		date: "2021-05-02",
		eggsNum: 312,
		larvaeNum: 6425,
		mosquitoNum: 645,
		analyzeResult: "www.google.com",
	},
	{
		analyzeId: 1001,
		date: "2021-05-01",
		eggsNum: 153,
		larvaeNum: 53426,
		mosquitoNum: 132,
		analyzeResult: "www.google.com",
	},
	{
		analyzeId: 1002,
		date: "2021-05-02",
		eggsNum: 312,
		larvaeNum: 6425,
		mosquitoNum: 645,
		analyzeResult: "www.google.com",
	},
	{
		analyzeId: 1001,
		date: "2021-05-01",
		eggsNum: 153,
		larvaeNum: 53426,
		mosquitoNum: 132,
		analyzeResult: "www.google.com",
	},
	{
		analyzeId: 1002,
		date: "2021-05-02",
		eggsNum: 312,
		larvaeNum: 6425,
		mosquitoNum: 645,
		analyzeResult: "www.google.com",
	},
	{
		analyzeId: 1001,
		date: "2021-05-01",
		eggsNum: 153,
		larvaeNum: 53426,
		mosquitoNum: 132,
		analyzeResult: "www.google.com",
	},
	{
		analyzeId: 1002,
		date: "2021-05-02",
		eggsNum: 312,
		larvaeNum: 6425,
		mosquitoNum: 645,
		analyzeResult: "www.google.com",
	},
	{
		analyzeId: 1001,
		date: "2021-05-01",
		eggsNum: 153,
		larvaeNum: 53426,
		mosquitoNum: 132,
		analyzeResult: "www.google.com",
	},
	{
		analyzeId: 1002,
		date: "2021-05-02",
		eggsNum: 312,
		larvaeNum: 6425,
		mosquitoNum: 645,
		analyzeResult: "www.google.com",
	},
	{
		analyzeId: 1001,
		date: "2021-05-01",
		eggsNum: 153,
		larvaeNum: 53426,
		mosquitoNum: 132,
		analyzeResult: "www.google.com",
	},
	{
		analyzeId: 1002,
		date: "2020-05-02",
		eggsNum: 312,
		larvaeNum: 6425,
		mosquitoNum: 645,
		analyzeResult: "www.google.com",
	},
];
