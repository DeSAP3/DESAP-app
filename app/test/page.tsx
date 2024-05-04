"use client";

import { useMemo } from "react";
import {
	useMaterialReactTable,
	MaterialReactTable,
	MRT_ColumnDef,
} from "material-react-table";

const myExampleData = [
	{
		name: "John Doe",
		age: 25,
	},
	{
		name: "Jane Doe",
		age: 22,
	},
	{
		name: "John Smith",
		age: 30,
	},
];

const TestTable = () => {
	const columns = useMemo<MRT_ColumnDef<(typeof myExampleData)[0]>[]>(
		() => [
			{
				header: "Name",
				accessorKey: "name",
			},
			{
				header: "Age",
				accessorKey: "age",
			},
		],
		[]
	);

	const table = useMaterialReactTable({
		columns,
		data: myExampleData,
	});

	return <MaterialReactTable table={table} />;
};

export default TestTable;
