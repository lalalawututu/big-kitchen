import React from 'react';
import { useState, useEffect } from "react";
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDebounce } from '../../utils/index.ts';
import './index.less';

const { Search } = Input;

interface DataList {
	WorkmanshipName: string;
	FinishedProduct: string;
	ProductionLineName: string;
	workerNumber: number;
	WorkerQuantity: number;
	WorkingHours: number;
	WorkmanshipId: string;
}

interface ListProps {
	initialData: DataList[];
	setData: (data: ListProps["initialData"]) => void;
}

export const SearchBanner = ({ initialData, setData }: ListProps) => {
	const [inputValue, setInputValue] = useState('');
	const debouncedInputValue = useDebounce(inputValue, 2000);

	const search = () => {
		let filterData: Array<DataList> = [];
		if (inputValue !== '') {
			initialData.forEach((item, index) => {
				if (item.WorkmanshipName.indexOf(inputValue) >= 0) {
					filterData.push(item);
				}
			});
			setData(filterData);
		} else {
			setData(initialData);
		}
	}

	useEffect(() => {
		let filterData: Array<DataList> = [];
		if (debouncedInputValue !== '') {
			initialData.forEach((item, index) => {
				if (item.WorkmanshipName.indexOf(debouncedInputValue) >= 0) {
					filterData.push(item);
				}
			});
			setData(filterData);
		} else {
			setData(initialData);
		}
	}, [debouncedInputValue]);

	return (
		<div className="search-container">
			<Search
				placeholder="工艺名称"
				value={inputValue}
				onChange={(evt) =>
					setInputValue(evt.target.value)
				}
				onSearch={search}
				prefix={<SearchOutlined />}
				allowClear
				enterButton="搜索" size="middle" />
		</div>
	)
};