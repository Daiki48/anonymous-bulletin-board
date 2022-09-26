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
	let [itemList, setItemList] = useState<Item[]>([]);
	const [itemText, setItemText] = useState<string>('');
	const [delDocid, setDelDocid] = useState<string>('');

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
		addDoc(itemCollection, {
			itemText: inputText,
			timeStamp: `${nowYear}/${nowMonth}/${nowDay} ${nowHour}:${nowMin}:${nowSec}`,
		});
		setItemText('');
	};

	console.log(itemList);

	const getAlldoc = async () => {
		const docList = await getDocs(collection(db, 'bbs'));
		// return docList.map(user => user.data());
		console.log(docList);
	};

	const deleteItem = async () => {
		await deleteDoc(doc(db, 'bbs', 'HWR4HBnOaUeCwK5on6s1'));
	};

	const itemListTest = () => {
		// const testPush: Item = {
		// 	docId: 'docId',
		// 	itemText: 'testdaiki',
		// 	timeStamp: 'timedaiki',
		// };

		// itemList.push(testPush);

		// FireStoreに格納されているitemTextを常に表示したい

		setItemList(itemList);

		console.log(`This is`, itemList);
	};

	// useEffect(() => {}, []);

	return (
		<>
			<div>
				<h1>BBS</h1>
			</div>
			<div>
				<textarea
					value={itemText}
					onChange={(e) => {
						setItemText(e.target.value);
					}}
				></textarea>
				<br />
				<button onClick={() => createItem(itemText)}>add</button>
			</div>
			<button onClick={() => getAlldoc()}>getAll</button>
			<br />
			<button onClick={() => deleteItem()}>delete</button>
			<br />

			<button onClick={() => itemListTest()}>push</button>
			<ul>
				{itemList.map((item) => (
					<li key={item.docId}>{item.itemText}</li>
				))}
			</ul>
		</>
	);
};
