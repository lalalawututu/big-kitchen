import React from 'react';
import { useState, useEffect } from "react";
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDebounce } from '../../utils';
import { searchContentOr } from '../../utils/searchBusiness';
import './index.less';

const { Search } = Input;

export const SearchBanner = ({ initialData, setData, searchKeys }) => {
	const [inputValue, setInputValue] = useState('');
	const debouncedInputValue = useDebounce(inputValue, 2000);

	const search = () => {
		if (inputValue !== '') {
			searchContentOr(inputValue, initialData, searchKeys, setData);
		} else {
			setData(initialData);
		}
	}

	useEffect(() => {
		if (inputValue !== '') {
			searchContentOr(inputValue, initialData, searchKeys, setData);
		} else {
			setData(initialData);
		}
	}, [debouncedInputValue]);

	return (
		<div className="search-container">
			<Search
				placeholder="材料名称"
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
