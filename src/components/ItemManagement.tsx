import { useState, useEffect } from 'react';
import {
	doc,
	getDocs,
	addDoc,
	collection,
	deleteDoc,
} from 'firebase/firestore';

import { db } from '../FirebaseConfig';
import { Item } from './model';
// import { createItem } from './createItem';

export const ItemManagement = () => {
	const [itemList, setItemList] = useState<Item[]>([]);
	const [itemText, setItemText] = useState<string>('');

	console.log(itemText);

	const createItem = (inputText: string) => {
		if (inputText === '') {
			return;
		}

		const itemCollection = collection(db, 'bbs');
		const nowTime = new Date();
		const nowYear = nowTime.getFullYear();
		const nowMonth = nowTime.getMonth();
		const nowDay = nowTime.getDate();
		const nowHour = nowTime.getHours();
		const nowMin = nowTime.getMinutes();
		const nowSec = nowTime.getSeconds();
		const documentRef = addDoc(itemCollection, {
			itemText: inputText,
			timeStamp: `${nowYear}/${nowMonth}/${nowDay} ${nowHour}:${nowMin}:${nowSec}`,
		});
		setItemText('');
		showItem();
	};

	useEffect(() => {
		showItem();
	}, []);

	const showItem = () => {
		const itemCollection = collection(db, 'bbs');
		getDocs(itemCollection).then((query) => {
			const itemList: Item[] = [];
			let count: number = 0;
			query.docs.map((doc, index) => {
				const item: Item = {
					docId: doc.id,
					itemText: doc.data().itemText,
					timeStamp: doc.data({ serverTimestamps: 'estimate' }).timeStamp,
				};
				itemList.push(item);
				count += 1;
			});
			setItemList(itemList);
		});
	};

	return (
		<>
			<div>
				<h1>This is ItemManagement page</h1>
			</div>
			<textarea
				value={itemText}
				onChange={(e) => {
					setItemText(e.target.value);
				}}
			></textarea>
			<br />
			<button onClick={() => createItem(itemText)}>add</button>
		</>
	);
};
