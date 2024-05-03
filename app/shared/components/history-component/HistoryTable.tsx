import {
	ChevronLeftIcon,
	ChevronRightIcon
} from "@chakra-ui/icons";
import {
	Column,
	ColumnDef,
	Table as ReactTable,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable
} from "@tanstack/react-table";
import React from "react";
import { History, data } from "./dummy";
import "./style.css";

export default function HistoryTable() {
	const columns = React.useMemo<ColumnDef<History>[]>(
		() => [
			{
				header: "Analysis Details",
				footer: (props) => props.column.id,
				columns: [
					{
						accessorKey: "analyzeId",
						header: "Analysis ID",
						footer: (props) => props.column.id,
					},
					{
						accessorKey: "date",
						header: "Date",
						footer: (props) => props.column.id,
					},
				],
			},
			{
				header: "Analysis Information",
				footer: (props) => props.column.id,
				columns: [
					{
						header: "Number of Samples",
						columns: [
							{
								accessorKey: "eggsNum",
								header: "Eggs",
								footer: (props) => props.column.id,
							},
							{
								accessorKey: "larvaeNum",
								header: "Larvae",
								footer: (props) => props.column.id,
							},
							{
								accessorKey: "mosquitoNum",
								header: "Mosquito",
								footer: (props) => props.column.id,
							},
						],
					},
					{
						accessorKey: "analyzeResult",
						header: "Result",
						footer: (props) => props.column.id,
					},
				],
			},
		],
		[]
	);

	return (
		<>
			<Table data={data} columns={columns} />
		</>
	);
}

function Table({
	data,
	columns,
}: {
	data: History[];
	columns: ColumnDef<History>[];
}) {
	const table = useReactTable({
		data,
		columns,
		// Pipeline
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		//
		debugTable: true,
	});

	return (
		<div className='p-2'>
			<div className='h-2' />
			<table>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<th
										key={header.id}
										colSpan={header.colSpan}
									>
										{header.isPlaceholder ? null : (
											<div>
												{flexRender(
													header.column.columnDef
														.header,
													header.getContext()
												)}
												{header.column.getCanFilter() ? (
													<div>
														<Filter
															column={
																header.column
															}
															table={table}
														/>
													</div>
												) : null}
											</div>
										)}
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => {
						return (
							<tr key={row.id}>
								{row.getVisibleCells().map((cell) => {
									return (
										<td key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className='h-2' />
			<div className='flex gap-2 w-full '>
				<button
					className='border rounded p-1'
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					<ChevronLeftIcon />
				</button>
				<button
					className='border rounded p-1'
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					<ChevronRightIcon />
				</button>
				
				<span className='flex items-center gap-1'>
					<div>Page</div>
					<strong>
						{table.getState().pagination.pageIndex + 1} of{" "}
						{table.getPageCount()}
					</strong>
				</span>
				<span className='flex items-center gap-1'>
					| Go to page:
					<input
						type='number'
						defaultValue={table.getState().pagination.pageIndex + 1}
						onChange={(e) => {
							const page = e.target.value
								? Number(e.target.value) - 1
								: 0;
							table.setPageIndex(page);
						}}
						className='border p-1 rounded w-16'
					/>
				</span>
				<select
					value={table.getState().pagination.pageSize}
					onChange={(e) => {
						table.setPageSize(Number(e.target.value));
					}}
				>
					{[10, 20, 30, 40, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
			<div>
				Total <b>{table.getRowModel().rows.length}</b>Rows
			</div>
		</div>
	);
}
function Filter({
	column,
	table,
}: {
	column: Column<any, any>;
	table: ReactTable<any>;
}) {
	const firstValue = table
		.getPreFilteredRowModel()
		.flatRows[0]?.getValue(column.id);

	const columnFilterValue = column.getFilterValue();

	return typeof firstValue === "number" ? (
		<div className='flex space-x-2'>
			<input
				type='number'
				value={(columnFilterValue as [number, number])?.[1] ?? ""}
				onChange={(e) =>
					column.setFilterValue((old: [number, number]) => [
						old?.[0],
						e.target.value,
					])
				}
				placeholder={`Search`}
				className='w-24 border shadow rounded'
			/>
		</div>
	) : (
		<input
			type='text'
			value={(columnFilterValue ?? "") as string}
			onChange={(e) => column.setFilterValue(e.target.value)}
			placeholder={`Search...`}
			className='w-36 border shadow rounded'
		/>
	);
}
